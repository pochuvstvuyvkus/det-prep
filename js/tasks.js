// One function per DET task type. Each takes the runner context and the items of the
// step and resolves with { type, got, max, rows, obs, open }.
(function () {
  'use strict';
  const X = window.DET, el = X.el, S = window.DETSpeech;

  const ICON = {
    speaker: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.48 4.48 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><path d="M12 15a3.5 3.5 0 0 0 3.5-3.5v-5a3.5 3.5 0 0 0-7 0v5A3.5 3.5 0 0 0 12 15zm6-3.5a6 6 0 0 1-12 0H4.5a7.5 7.5 0 0 0 6.75 7.46V21.5h1.5v-2.54A7.5 7.5 0 0 0 19.5 11.5z"/></svg>',
    person: '<svg viewBox="0 0 24 24"><path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z"/></svg>'
  };

  const sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  // Waits for the footer button or for the timer, whichever comes first.
  function until(ctx, seconds, label, setup) {
    return new Promise(function (resolve) {
      let timer = null, done = false;
      const t0 = performance.now();
      function finish(why) {
        if (done) return; done = true;
        if (timer) timer.stop();
        ctx.footer(null);
        resolve({ why: why, seconds: Math.round((performance.now() - t0) / 100) / 10 });
      }
      const btn = label ? ctx.footer(label, function () { finish('click'); }) : null;
      if (seconds) timer = ctx.startTimer(seconds, function () { finish('time'); });
      if (setup) setup(btn, finish);
    });
  }

  function imageReady(img, ms) {
    return new Promise(function (resolve) {
      if (img.complete && img.naturalWidth) return resolve(true);
      const t = setTimeout(function () { resolve(!!(img.complete && img.naturalWidth)); }, ms);
      img.onload = function () { clearTimeout(t); resolve(true); };
      img.onerror = function () { clearTimeout(t); resolve(false); };
    });
  }

  function textArea(rows) {
    const input = el('textarea', { class: 'ta', rows: rows || 6, placeholder: 'Your response', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false' });
    const count = el('span', null, '0 words');
    input.addEventListener('input', function () { count.textContent = X.countWords(input.value) + ' words'; });
    return { input: input, node: el('div', null, input, el('div', { class: 'counter' }, count)) };
  }

  function optionList(options, onPick) {
    let value = null;
    const buttons = options.map(function (o) {
      return el('button', { class: 'opt', type: 'button', onclick: function (e) {
        value = o;
        buttons.forEach(function (b) { b.classList.toggle('sel', b === e.currentTarget); });
        if (onPick) onPick(o);
      } }, o);
    });
    return {
      node: el('div', { class: 'opts' }, buttons),
      value: function () { return value; },
      reveal: function (answer) {
        buttons.forEach(function (b, i) {
          b.disabled = true;
          if (options[i] === answer) b.classList.add('right');
          else if (options[i] === value) b.classList.add('wrong');
          b.classList.remove('sel');
        });
      }
    };
  }

  function split(left, right) { return el('div', { class: 'split' }, left, el('div', null, right)); }

  // A word with its second half missing: the shown letters plus one box per missing letter.
  function makeGap(word) {
    const keep = Math.max(1, Math.floor(word.length / 2));
    const pre = word.slice(0, keep), rest = word.slice(keep);
    const boxes = rest.split('').map(function () { return el('i', { class: 'gbox' }); });
    const input = el('input', { class: 'ginput', type: 'text', maxlength: rest.length, autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', 'aria-label': pre + ' plus ' + rest.length + ' letters' });
    const api = {
      node: el('span', { class: 'gap' }, el('span', null, pre), el('span', { class: 'gboxes' }, boxes, input)),
      input: input, word: word, onFull: null, onBack: null, onEnter: null,
      value: function () { return pre + input.value; },
      correct: function () { return input.value.toLowerCase() === rest.toLowerCase(); }
    };
    function render() {
      const v = input.value, focused = document.activeElement === input;
      boxes.forEach(function (b, i) {
        b.textContent = v[i] || '';
        b.classList.toggle('cur', focused && i === Math.min(v.length, boxes.length - 1));
      });
    }
    input.addEventListener('input', function () {
      input.value = input.value.replace(/[^a-zA-Z]/g, '').toLowerCase().slice(0, rest.length);
      render();
      if (input.value.length === rest.length && api.onFull) api.onFull();
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !input.value && api.onBack) { e.preventDefault(); api.onBack(); }
      if (e.key === 'Enter' && api.onEnter) { e.preventDefault(); api.onEnter(); }
    });
    input.addEventListener('focus', render);
    input.addEventListener('blur', render);
    return api;
  }

  // Splits a paragraph the way the test does: first and last sentences stay whole,
  // in between every second word loses its second half.
  function buildCTest(text) {
    const ss = text.match(/[^.!?]+[.!?]+["”']?\s*/g) || [text];
    const parts = [], cands = [];
    let prev = false;
    ss.forEach(function (s, si) {
      const middle = si > 0 && si < ss.length - 1;
      let wi = 0;
      s.split(/(\s+)/).forEach(function (tok) {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { parts.push({ t: 'text', s: tok }); return; }
        const m = tok.match(/^([("“]*)(.*?)([.,;:!?"”)]*)$/);
        const core = m[2];
        const ok = middle && /^[A-Za-z]{2,}$/.test(core) && (wi === 0 || core === core.toLowerCase());
        if (ok && !prev) {
          prev = true;
          if (m[1]) parts.push({ t: 'text', s: m[1] });
          cands.push(parts.length);
          parts.push({ t: 'gap', word: core });
          if (m[3]) parts.push({ t: 'text', s: m[3] });
        } else {
          prev = false;
          parts.push({ t: 'text', s: tok });
        }
        wi++;
      });
    });
    // Keep at most 15 gaps, spread evenly over the middle sentences.
    const MAX = 15;
    if (cands.length > MAX) {
      const keep = {};
      for (let i = 0; i < MAX; i++) keep[cands[Math.round(i * (cands.length - 1) / (MAX - 1))]] = true;
      cands.forEach(function (pi) { if (!keep[pi]) parts[pi] = { t: 'text', s: parts[pi].word }; });
    }
    return parts;
  }

  const T = {};

  // ---------- Read and Select ----------
  T.readSelect = async function (ctx, items) {
    const rows = [];
    for (let i = 0; i < items.length && !ctx.aborted; i++) {
      const it = items[i];
      ctx.sub((i + 1) + ' / ' + items.length);
      const ans = await new Promise(function (resolve) {
        let done = false, timer = null;
        function fin(v) { if (done) return; done = true; timer.stop(); resolve(v); }
        ctx.body(el('div', { class: 'center-stack' },
          el('p', { class: 'ask' }, 'Is this a real English word?'),
          el('div', { class: 'bigword' }, it.w),
          el('div', { class: 'yn' },
            el('button', { class: 'yes', type: 'button', onclick: function () { fin(true); } }, '✓ Yes'),
            el('button', { class: 'no', type: 'button', onclick: function () { fin(false); } }, '✕ No'))));
        ctx.footer(null);
        timer = ctx.startTimer(5, function () { fin(null); });
      });
      rows.push({ w: it.w, real: it.real, ans: ans, ok: ans === it.real, level: it.level });
      ctx.body(el('div', { class: 'center-stack' }));
      await sleep(220);
    }
    return {
      type: 'readSelect', got: rows.filter(function (r) { return r.ok; }).length, max: rows.length, rows: rows,
      obs: rows.map(function (r) { return { skill: 'R', b: X.DIFF[r.level] - 6, x: r.ok ? 1 : 0, c: 0.5 }; })
    };
  };

  // ---------- Fill in the Blanks ----------
  T.fill = async function (ctx, items) {
    const rows = [];
    for (let i = 0; i < items.length && !ctx.aborted; i++) {
      const it = items[i];
      ctx.sub((i + 1) + ' / ' + items.length);
      const m = it.s.match(/^(.*)\{([^}]+)\}(.*)$/);
      const gap = makeGap(m[2]);
      ctx.body(el('div', { style: 'display:flex;flex-direction:column;flex:1' },
        el('p', { class: 'ask' }, 'Complete the sentence with the correct word'),
        el('p', { class: 'sentence' }, m[1], gap.node, m[3])));
      setTimeout(function () { gap.input.focus(); }, 60);
      await until(ctx, 20, 'Continue', function (btn) { gap.onEnter = function () { btn.click(); }; });
      rows.push({ id: it.id, s: it.s, answer: m[2], given: gap.value(), ok: gap.correct(), level: it.level });
    }
    return {
      type: 'fill', got: rows.filter(function (r) { return r.ok; }).length, max: rows.length, rows: rows,
      obs: rows.map(function (r) { return { skill: 'R', b: X.DIFF[r.level], x: r.ok ? 1 : 0, c: 0 }; })
    };
  };

  // ---------- Read and Complete ----------
  T.complete = async function (ctx, items) {
    const rows = [];
    for (let i = 0; i < items.length && !ctx.aborted; i++) {
      const it = items[i];
      ctx.sub((i + 1) + ' / ' + items.length);
      const gaps = [];
      const p = el('p');
      buildCTest(it.text).forEach(function (pt) {
        if (pt.t === 'gap') { const g = makeGap(pt.word); gaps.push(g); p.appendChild(g.node); }
        else p.appendChild(document.createTextNode(pt.s));
      });
      gaps.forEach(function (g, gi) {
        g.onFull = function () { if (gaps[gi + 1]) gaps[gi + 1].input.focus(); };
        g.onBack = function () { if (gaps[gi - 1]) gaps[gi - 1].input.focus(); };
      });
      ctx.body(el('div', null,
        el('p', { class: 'ask' }, 'Type the missing letters to complete the text below'),
        el('div', { class: 'passage' }, el('h3', null, it.title), p)));
      await until(ctx, 180, 'Continue');
      rows.push({ id: it.id, title: it.title, level: it.level, blanks: gaps.map(function (g) { return { answer: g.word, given: g.value(), ok: g.correct() }; }) });
    }
    let got = 0, max = 0; const obs = [];
    rows.forEach(function (r) {
      r.blanks.forEach(function (b) { max++; if (b.ok) got++; obs.push({ skill: 'R', b: X.DIFF[r.level] - 12, x: b.ok ? 1 : 0, c: 0 }); });
    });
    return { type: 'complete', got: got, max: max, rows: rows, obs: obs };
  };

  // ---------- Listen and Type ----------
  T.dictation = async function (ctx, items) {
    if (!S.ttsOK) return { type: 'dictation', skipped: 'no-tts' };
    const rows = [];
    for (let i = 0; i < items.length && !ctx.aborted; i++) {
      const it = items[i];
      ctx.sub((i + 1) + ' / ' + items.length);
      let plays = 0, speaking = false;
      const left = el('span', { class: 'hint' });
      const btn = el('button', { class: 'play', type: 'button', html: ICON.speaker, 'aria-label': 'Play the sentence' });
      const ta = el('textarea', { class: 'ta', rows: 3, placeholder: 'Your response', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false' });
      const upd = function () {
        left.textContent = 'Number of replays left: ' + (3 - plays);
        btn.disabled = plays >= 3 && !speaking;
        btn.classList.toggle('on', speaking);
      };
      const play = function () {
        if (speaking || plays >= 3) return;
        plays++; speaking = true; upd();
        S.speak(it.s, { voice: i % 2 ? 'm' : 'f', rate: 0.9 }).then(function () { speaking = false; upd(); });
      };
      btn.addEventListener('click', play);
      ctx.body(el('div', null,
        el('p', { class: 'ask' }, 'Type the statement that you hear'),
        el('div', { class: 'player' }, btn, left), ta));
      upd(); play();
      setTimeout(function () { ta.focus(); }, 60);
      await until(ctx, 60, 'Continue');
      S.stop();
      rows.push({ id: it.id, ref: it.s, given: ta.value.trim(), score: X.dictationScore(it.s, ta.value), level: it.level });
    }
    return {
      type: 'dictation', got: rows.reduce(function (a, r) { return a + r.score; }, 0), max: rows.length, rows: rows,
      obs: rows.map(function (r) { return { skill: 'L', b: X.DIFF[r.level], x: r.score * r.score, c: 0 }; })
    };
  };

  // ---------- Interactive Reading ----------
  // Passage as tappable words; the answer is a range picked by its first and last word.
  function highlighter(full) {
    const ws = full.split(/\s+/).filter(Boolean);
    let a = null, b = null, down = null, dragged = false;
    const status = el('p', { class: 'hint' }, 'Нажмите первое и последнее слово ответа или протяните мышью.');
    const spans = ws.map(function (w, i) { return el('span', { class: 'w', 'data-i': i }, w); });
    const p = el('p');
    spans.forEach(function (s, i) { if (i) p.appendChild(document.createTextNode(' ')); p.appendChild(s); });
    const node = el('div', { class: 'passage hl' }, p);
    function paint() {
      const lo = a == null ? -1 : Math.min(a, b == null ? a : b), hi = a == null ? -1 : Math.max(a, b == null ? a : b);
      spans.forEach(function (s, i) {
        const on = i >= lo && i <= hi;
        s.classList.toggle('sel', on);
        s.classList.toggle('first', on && i === lo);
        s.classList.toggle('last', on && i === hi);
      });
    }
    function idx(t) { const s = t && t.closest ? t.closest('.w') : null; return s ? +s.getAttribute('data-i') : null; }
    node.addEventListener('mousedown', function (e) { down = idx(e.target); dragged = false; });
    node.addEventListener('mouseover', function (e) {
      if (down == null || !(e.buttons & 1)) return;
      const i = idx(e.target);
      if (i != null && i !== down) { dragged = true; a = down; b = i; paint(); }
    });
    node.addEventListener('mouseup', function () { down = null; });
    node.addEventListener('click', function (e) {
      if (dragged) { dragged = false; return; }
      const i = idx(e.target);
      if (i == null) return;
      if (a == null || b != null) { a = i; b = null; } else b = i;
      paint();
    });
    return {
      node: node, status: status, words: ws,
      range: function () { return a == null ? null : [Math.min(a, b == null ? a : b), Math.max(a, b == null ? a : b)]; }
    };
  }

  async function readingOne(ctx, it, pi, total) {
    const seconds = it.blanks.length > 6 ? 480 : 420;
    let timeUp = false, wake = null;
    const timer = ctx.startTimer(seconds, function () { timeUp = true; if (wake) wake(); });
    function next() {
      return new Promise(function (res) {
        if (timeUp) return res();
        wake = res;
        ctx.footer('Next', function () { res(); });
      }).then(function () { wake = null; ctx.footer(null); });
    }
    const where = function (n) { ctx.sub('Passage ' + (pi + 1) + ' / ' + total + ' · question ' + n + ' / 6'); };
    const seed = X.hash(it.id);
    const p1 = it.part1.replace(/\{(\d+)\}/g, function (_, i) { return it.blanks[+i].a; });
    const full = p1 + ' ' + it.missing.a + ' ' + it.part2;
    const out = { id: it.id, kind: it.kind, level: it.level, blanks: [], missing: null, highlights: [], idea: null, title: null };

    // 1. Complete the Sentences
    where(1);
    const selects = [];
    const para = el('p');
    it.part1.split(/(\{\d+\})/).forEach(function (chunk) {
      const m = chunk.match(/^\{(\d+)\}$/);
      if (!m) { para.appendChild(document.createTextNode(chunk)); return; }
      const bi = +m[1], bl = it.blanks[bi];
      const opts = X.shuffle([bl.a].concat(bl.o), X.rng(seed + bi));
      const sel = el('select', { 'aria-label': 'Missing word ' + (bi + 1) }, el('option', { value: '' }, 'Select a word'), opts.map(function (o) { return el('option', { value: o }, o); }));
      selects[bi] = sel;
      para.appendChild(sel);
    });
    ctx.body(el('div', null, el('p', { class: 'ask' }, 'Select the best option for each missing word'), el('div', { class: 'passage' }, para)));
    await next();
    out.blanks = it.blanks.map(function (bl, i) { return { answer: bl.a, given: selects[i] ? selects[i].value : '', ok: !!selects[i] && selects[i].value === bl.a }; });

    // 2. Complete the Passage
    let chosen = null;
    if (!timeUp) {
      where(2);
      const slot = el('span', { class: 'slot' }, ' ');
      const list = optionList(X.shuffle([it.missing.a].concat(it.missing.o), X.rng(seed + 50)), function (v) { chosen = v; slot.textContent = v; });
      ctx.body(split(el('div', { class: 'passage' }, el('p', null, p1), slot, el('p', null, it.part2)),
        [el('p', { class: 'ask' }, 'Select the best sentence to fill in the blank in the passage'), list.node]), true);
      await next();
    }
    out.missing = { answer: it.missing.a, given: chosen, ok: chosen === it.missing.a };

    // 3–4. Highlight the Answer
    for (let h = 0; h < 2; h++) {
      const hq = it.highlights[h];
      let given = '', score = 0;
      if (!timeUp) {
        where(3 + h);
        const hl = highlighter(full);
        ctx.body(split(hl.node, [el('p', { class: 'ask' }, 'Click and drag to highlight the answer to the question below'), el('div', { class: 'prompt' }, hq.q), hl.status]), true);
        await next();
        const r = hl.range();
        if (r) {
          given = hl.words.slice(r[0], r[1] + 1).join(' ');
          const at = full.indexOf(hq.a);
          const s = full.slice(0, at).split(/\s+/).filter(Boolean).length, e = s + hq.a.split(/\s+/).filter(Boolean).length - 1;
          const overlap = Math.max(0, Math.min(e, r[1]) - Math.max(s, r[0]) + 1);
          if (overlap) { const pr = overlap / (r[1] - r[0] + 1), rc = overlap / (e - s + 1); score = 2 * pr * rc / (pr + rc); }
        }
      }
      out.highlights.push({ q: hq.q, answer: hq.a, given: given, score: Math.round(score * 100) / 100 });
    }

    // 5–6. Identify the Idea, Title the Passage
    const two = [['idea', 'Select the idea that is expressed in the passage', 5, 60], ['title', 'Select the best title for the passage', 6, 70]];
    for (let q = 0; q < two.length; q++) {
      const key = two[q][0];
      let pick = null;
      if (!timeUp) {
        where(two[q][2]);
        const list = optionList(X.shuffle([it[key].a].concat(it[key].o), X.rng(seed + two[q][3])), function (v) { pick = v; });
        ctx.body(split(el('div', { class: 'passage' }, el('p', null, full)), [el('p', { class: 'ask' }, two[q][1]), list.node]), true);
        await next();
      }
      out[key] = { answer: it[key].a, given: pick, ok: pick === it[key].a };
    }
    timer.stop();
    ctx.clearTimer();
    return out;
  }

  T.reading = async function (ctx, items) {
    const rows = [];
    for (let i = 0; i < items.length && !ctx.aborted; i++) rows.push(await readingOne(ctx, items[i], i, items.length));
    let got = 0, max = 0; const obs = [];
    rows.forEach(function (r) {
      const b = X.DIFF[r.level];
      r.blanks.forEach(function (x) { max++; if (x.ok) got++; obs.push({ skill: 'R', b: b - 8, x: x.ok ? 1 : 0, c: 0.2 }); });
      ['missing', 'idea', 'title'].forEach(function (k) { max++; if (r[k].ok) got++; obs.push({ skill: 'R', b: b, x: r[k].ok ? 1 : 0, c: 0.25 }); });
      r.highlights.forEach(function (h) { max++; got += h.score; obs.push({ skill: 'R', b: b - 4, x: h.score, c: 0 }); });
    });
    return { type: 'reading', got: got, max: max, rows: rows, obs: obs };
  };

  // ---------- Interactive Listening ----------
  async function listeningOne(ctx, it, si, total) {
    const narrator = it.partner.voice === 'f' ? 'm' : 'f';
    const seed = X.hash(it.id);
    const head = 'Conversation ' + (si + 1) + ' / ' + total + ' · ';
    let timeUp = false, wake = null, busy = false;
    const timer = ctx.startTimer(390, function () { timeUp = true; S.stop(); if (wake) wake(); });
    function next(label, setup) {
      return new Promise(function (res) {
        if (timeUp) return res();
        wake = res;
        const btn = ctx.footer(label, function () { res(); });
        if (setup) setup(btn);
      }).then(function () { wake = null; ctx.footer(null); });
    }
    const out = { id: it.id, kind: it.kind, level: it.level, complete: [], turns: [], summary: '' };

    // Listen and Complete
    ctx.sub(head + 'Listen and Complete');
    const playBtn = el('button', { class: 'play', type: 'button', html: ICON.speaker, 'aria-label': 'Play the scenario' });
    const playScenario = function () {
      if (busy) return;
      busy = true; playBtn.classList.add('on');
      S.speak(it.scenario, { voice: narrator }).then(function () { busy = false; playBtn.classList.remove('on'); });
    };
    playBtn.addEventListener('click', playScenario);
    const inputs = it.complete.map(function () { return el('input', { class: 'input', type: 'text', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false' }); });
    ctx.body(el('div', null,
      el('p', { class: 'ask' }, 'Listen to the scenario and complete the sentences'),
      el('div', { class: 'player' }, playBtn, el('span', { class: 'hint' }, 'You can listen as many times as you want')),
      el('div', { class: 'lc' }, it.complete.map(function (c, i) { return el('label', null, c.pre + ' ', inputs[i], c.post || '.'); }))));
    playScenario();
    await next('Continue');
    S.stop(); busy = false;
    out.complete = it.complete.map(function (c, i) {
      const given = inputs[i].value.trim();
      return { pre: c.pre, answer: c.a, given: given, score: Math.round(X.keyScore(c.keys, c.a, given) * 100) / 100 };
    });

    // Listen and Respond
    const log = el('div', { class: 'chat' });
    const say = function (who, text) { log.appendChild(el('div', { class: 'bub ' + (who ? 'them' : 'me') }, el('small', null, who || 'You'), text)); };
    const listening = function () {
      return el('div', { class: 'rec' }, el('div', { class: 'avatar on', html: ICON.person }), el('div', { class: 'state' }, it.partner.name + ' is speaking…'));
    };
    for (let t = 0; t < it.turns.length; t++) {
      const turn = it.turns[t];
      if (timeUp) { out.turns.push({ partner: turn.partner, answer: turn.a, given: null, ok: false }); continue; }
      ctx.sub(head + 'Listen and Respond ' + (t + 1) + ' / ' + it.turns.length);
      const area = el('div');
      const again = el('button', { class: 'btn sm ghost', type: 'button', onclick: playScenario }, 'Scenario');
      ctx.body(el('div', null,
        el('div', { class: 'row', style: 'justify-content:space-between;margin-bottom:12px' }, el('p', { class: 'ask', style: 'margin:0' }, 'Select the best response'), again),
        log, area));
      if (turn.partner) {
        busy = true; again.disabled = true;
        area.replaceChildren(listening());
        await S.speak(turn.partner, { voice: it.partner.voice });
        busy = false; again.disabled = false;
        if (timeUp) { out.turns.push({ partner: turn.partner, answer: turn.a, given: null, ok: false }); continue; }
      }
      let chosen = null, go = null;
      const list = optionList(X.shuffle([turn.a].concat(turn.o), X.rng(seed + t)), function (v) { chosen = v; if (go) go.disabled = false; });
      area.replaceChildren(list.node);
      await next('Continue', function (btn) { go = btn; btn.disabled = true; });
      S.stop(); busy = false;
      out.turns.push({ partner: turn.partner, answer: turn.a, given: chosen, ok: chosen === turn.a });
      if (!timeUp) { list.reveal(turn.a); await next('Next'); }
      if (turn.partner) say(it.partner.name, turn.partner);
      say(null, turn.a);
    }
    if (!timeUp && it.closing) {
      ctx.sub(head + 'Listen and Respond');
      const area = el('div');
      ctx.body(el('div', null, log, area));
      area.replaceChildren(listening());
      await S.speak(it.closing, { voice: it.partner.voice });
      say(it.partner.name, it.closing);
      area.replaceChildren();
      await next('Continue');
    }
    timer.stop();
    S.stop();

    // Summarize the Conversation
    ctx.sub(head + 'Summarize the Conversation');
    const ta = textArea(5);
    ctx.body(el('div', null, el('p', { class: 'ask' }, 'Summarize the conversation you just had in 75 seconds'), ta.node));
    setTimeout(function () { ta.input.focus(); }, 60);
    const r = await until(ctx, 75, 'Continue');
    out.summary = ta.input.value.trim();
    out.summarySeconds = r.seconds;
    return out;
  }

  T.listening = async function (ctx, items) {
    if (!S.ttsOK) return { type: 'listening', skipped: 'no-tts' };
    const rows = [], open = [];
    for (let i = 0; i < items.length && !ctx.aborted; i++) {
      const it = items[i];
      const r = await listeningOne(ctx, it, i, items.length);
      rows.push(r);
      const dialogue = it.turns.map(function (t) { return (t.partner ? it.partner.name + ': ' + t.partner + '\n' : '') + 'You: ' + t.a; }).join('\n') + (it.closing ? '\n' + it.partner.name + ': ' + it.closing : '');
      open.push({ task: 'summary', id: it.id, prompt: 'Summarize the conversation you just had in 75 seconds.', context: 'Scenario: ' + it.scenario + '\n' + dialogue, response: r.summary, seconds: r.summarySeconds });
    }
    let got = 0, max = 0; const obs = [];
    rows.forEach(function (r) {
      const b = X.DIFF[r.level];
      r.complete.forEach(function (c) { max++; got += c.score; obs.push({ skill: 'L', b: b - 6, x: c.score, c: 0 }); });
      r.turns.forEach(function (t) { max++; if (t.ok) got++; obs.push({ skill: 'L', b: b, x: t.ok ? 1 : 0, c: 0.25 }); });
    });
    return { type: 'listening', got: got, max: max, rows: rows, obs: obs, open: open };
  };

  // ---------- writing ----------
  T.writePhoto = async function (ctx, items) {
    const open = [];
    for (let i = 0; i < items.length && !ctx.aborted; i++) {
      const ph = items[i];
      ctx.sub((i + 1) + ' / ' + items.length);
      const img = el('img', { src: ph.src, alt: '' });
      const ta = textArea(4);
      ta.input.disabled = true;
      ctx.body(el('div', null, el('p', { class: 'ask' }, 'Write a description of the image below for 1 minute'), el('div', { class: 'photo' }, img), ta.node));
      ctx.footer(null);
      if (!(await imageReady(img, 9000))) { X.toast('Фото не загрузилось — задание пропущено'); continue; }
      if (ctx.aborted) break;
      ta.input.disabled = false; ta.input.focus();
      const r = await until(ctx, 60, 'Continue');
      open.push({ task: 'writePhoto', id: ph.id, photo: ph.src, prompt: 'Write a description of the image below for 1 minute.', response: ta.input.value.trim(), seconds: r.seconds });
    }
    return { type: 'writePhoto', open: open };
  };

  async function writeTimed(ctx, ask, question, prepSec, seconds, minutes) {
    const ta = textArea(8);
    const chip = el('span', { class: 'chip phase' }, 'Prepare · ' + prepSec + ' seconds');
    ctx.body(el('div', null, chip, el('p', { class: 'ask' }, ask), el('div', { class: 'prompt' }, question), ta.node));
    ta.input.disabled = true;
    await until(ctx, prepSec, 'Start writing');
    chip.textContent = 'Write · ' + minutes + ' minutes';
    ta.input.disabled = false; ta.input.focus();
    const r = await until(ctx, seconds, 'Continue');
    return { response: ta.input.value.trim(), seconds: r.seconds };
  }

  T.interactiveWriting = async function (ctx, items) {
    const it = items[0];
    ctx.sub('Part 1 / 2');
    const a = await writeTimed(ctx, 'Write about the topic below for 5 minutes', it.q, 30, 300, 5);
    if (ctx.aborted) return { type: 'interactiveWriting', open: [] };
    ctx.sub('Part 2 / 2');
    const ta = textArea(6);
    ctx.body(el('div', null, el('span', { class: 'chip phase' }, 'Write · 3 minutes'),
      el('p', { class: 'ask' }, 'Write a follow-up response for 3 minutes'),
      el('div', { class: 'prompt' }, it.q2, el('div', { class: 'prev' }, el('b', null, it.q), '\n\n' + (a.response || '—'))), ta.node));
    ta.input.focus();
    const r = await until(ctx, 180, 'Continue');
    return { type: 'interactiveWriting', open: [{ task: 'interactiveWriting', id: it.id, prompt: it.q, response: a.response, seconds: a.seconds, prompt2: it.q2, response2: ta.input.value.trim(), seconds2: r.seconds }] };
  };

  T.writingSample = async function (ctx, items) {
    const it = items[0];
    ctx.sub('');
    const a = await writeTimed(ctx, 'Write about the topic below for 5 minutes', it.q, 30, 300, 5);
    return { type: 'writingSample', open: [{ task: 'writingSample', id: it.id, prompt: it.q, response: a.response, seconds: a.seconds }] };
  };

  // ---------- speaking ----------
  // Preparation countdown (optional), then one recorded answer of up to `seconds`.
  async function speakFlow(ctx, host, chip, prepSec, seconds) {
    const state = el('div', { class: 'state' }, 'Record now');
    const live = el('div', { class: 'live-text' });
    const mic = el('button', { class: 'mic', type: 'button', html: ICON.mic, 'aria-label': 'Record now' });
    host.replaceChildren(el('div', { class: 'rec' }, mic, state, live));
    const cap = S.createCapture(function (t) { live.textContent = t; });
    ctx.onCleanup(function () { cap.cancel(); });
    ctx.footer(null);
    if (prepSec) {
      if (chip) chip.textContent = 'Prepare · ' + prepSec + ' seconds';
      await new Promise(function (res) {
        const t = ctx.startTimer(prepSec, res);
        mic.onclick = function () { t.stop(); res(); };
      });
    }
    if (ctx.aborted) return null;
    if (chip) chip.textContent = 'Speak · up to ' + (seconds >= 120 ? Math.round(seconds / 60) + ' minutes' : seconds + ' seconds');
    mic.onclick = null;
    mic.classList.add('live');
    state.textContent = 'Recording…';
    await cap.start();
    // A phone may refuse to start listening without a tap: ask for one, the timer keeps running.
    const watch = setTimeout(function () {
      if (!cap.blocked()) return;
      mic.classList.remove('live');
      state.textContent = 'Tap the microphone to record';
      mic.onclick = function () { mic.onclick = null; mic.classList.add('live'); state.textContent = 'Recording…'; cap.retry(); };
    }, 700);
    await until(ctx, seconds, 'Next');
    clearTimeout(watch);
    mic.classList.remove('live');
    mic.disabled = true;
    state.textContent = 'Saved';
    const r = await cap.stop();
    r.words = X.countWords(r.transcript);
    r.wpm = r.seconds > 3 ? Math.round(r.words / r.seconds * 60) : 0;
    return r;
  }

  function spoken(task, id, prompt, r, extra) {
    const o = { task: task, id: id, prompt: prompt, transcript: r ? r.transcript : '', seconds: r ? r.seconds : 0, words: r ? r.words : 0, wpm: r ? r.wpm : 0, pauses: r ? r.pauses : [], stt: r ? r.stt : false, audio: r ? r.audio : null };
    if (extra) for (const k in extra) o[k] = extra[k];
    return o;
  }

  T.speakPhoto = async function (ctx, items) {
    const ph = items[0];
    ctx.sub('');
    const img = el('img', { src: ph.src, alt: '' });
    const chip = el('span', { class: 'chip phase' }, 'Prepare · 20 seconds');
    const host = el('div');
    ctx.body(el('div', { style: 'display:flex;flex-direction:column;flex:1' }, chip, el('p', { class: 'ask' }, 'Speak about the image below for 90 seconds'), el('div', { class: 'photo' }, img), host));
    ctx.footer(null);
    if (!(await imageReady(img, 9000))) { X.toast('Фото не загрузилось — задание пропущено'); return { type: 'speakPhoto', open: [] }; }
    const r = await speakFlow(ctx, host, chip, 20, 90);
    return { type: 'speakPhoto', open: [spoken('speakPhoto', ph.id, 'Speak about the image below for 90 seconds.', r, { photo: ph.src })] };
  };

  function promptCard(it) {
    return el('div', { class: 'prompt' }, it.q, it.bullets ? el('ul', null, it.bullets.map(function (b) { return el('li', null, b); })) : null);
  }
  function promptText(it) { return it.q + (it.bullets ? '\n- ' + it.bullets.join('\n- ') : ''); }

  T.readSpeak = async function (ctx, items) {
    const it = items[0];
    ctx.sub('');
    const chip = el('span', { class: 'chip phase' });
    const host = el('div');
    ctx.body(el('div', { style: 'display:flex;flex-direction:column;flex:1' }, chip, el('p', { class: 'ask' }, 'Speak about the topic below for 90 seconds'), promptCard(it), host));
    const r = await speakFlow(ctx, host, chip, 20, 90);
    return { type: 'readSpeak', open: [spoken('readSpeak', it.id, promptText(it), r)] };
  };

  T.speakingSample = async function (ctx, items) {
    const it = items[0];
    ctx.sub('');
    const chip = el('span', { class: 'chip phase' });
    const host = el('div');
    ctx.body(el('div', { style: 'display:flex;flex-direction:column;flex:1' }, chip, el('p', { class: 'ask' }, 'Speak about the topic below for 3 minutes'), promptCard(it), host));
    const r = await speakFlow(ctx, host, chip, 30, 180);
    return { type: 'speakingSample', open: [spoken('speakingSample', it.id, it.q, r)] };
  };

  T.interactiveSpeaking = async function (ctx, items) {
    const it = items[0];
    const qs = [];
    it.topics.forEach(function (t, ti) {
      t.qs.forEach(function (q, qi) {
        let lead;
        if (ti === 0 && qi === 0) lead = "I'd like to ask you a few questions about " + t.name + '.';
        else if (qi === 0) lead = 'Thanks for talking to me about ' + it.topics[ti - 1].name + ". Now I'd like to ask you about " + t.name + '.';
        else if (qi === 1) lead = ti ? 'Interesting. I have another question.' : "I see. Here's another question.";
        else lead = ti ? "Okay. I've got one last question." : "Thanks. I've got one more question about this.";
        qs.push({ topic: t.name, q: q, say: lead + ' ' + q });
      });
    });
    const turns = [];
    for (let i = 0; i < qs.length && !ctx.aborted; i++) {
      ctx.sub('Question ' + (i + 1) + ' / ' + qs.length);
      const avatar = el('div', { class: 'avatar on', html: ICON.person });
      const state = el('div', { class: 'state' }, 'Listen to the question');
      const host = el('div');
      ctx.clearTimer();
      ctx.footer(null);
      ctx.body(el('div', { style: 'display:flex;flex-direction:column;flex:1;align-items:center;justify-content:center;gap:14px' }, avatar, state,
        S.ttsOK ? null : el('div', { class: 'prompt' }, qs[i].q), host));
      if (S.ttsOK) await S.speak(qs[i].say, { voice: 'f' }); else await sleep(600);
      if (ctx.aborted) break;
      avatar.classList.remove('on');
      state.textContent = 'Your turn — 35 seconds';
      const r = await speakFlow(ctx, host, null, 0, 35);
      if (!r) break;
      turns.push({ topic: qs[i].topic, q: qs[i].q, transcript: r.transcript, seconds: r.seconds, words: r.words, wpm: r.wpm, pauses: r.pauses, stt: r.stt, audio: r.audio });
    }
    return { type: 'interactiveSpeaking', open: [{ task: 'interactiveSpeaking', id: it.id, prompt: 'A conversation of short spoken questions; 35 seconds per answer.', turns: turns }] };
  };

  window.DETTasks = T;
  window.DETTaskParts = { buildCTest: buildCTest };
})();
