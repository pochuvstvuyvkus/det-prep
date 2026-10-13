(function () {
  'use strict';

  const D = window.DET_DATA || {};
  const N = 12; // number of non-repeating variants in the bank

  // ---------- DOM helpers ----------
  function el(tag, attrs) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        const v = attrs[k];
        if (v == null || v === false) continue;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? '' : v);
      }
    }
    for (let i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }
  function append(node, child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) child.forEach(function (c) { append(node, c); });
    else node.appendChild(child.nodeType ? child : document.createTextNode(String(child)));
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  let toastTimer;
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('on'); }, 2600);
  }

  // ---------- storage ----------
  const store = {
    get: function (k, d) {
      try { const v = localStorage.getItem('det.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('det.' + k, JSON.stringify(v)); } catch (e) { /* private mode */ }
    }
  };

  // ---------- random ----------
  function rng(seed) {
    let a = (seed >>> 0) + 0x6D2B79F5;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rand) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  // ---------- task types ----------
  const TYPES = [
    { key: 'readSelect', name: 'Read and Select', ru: 'Настоящее слово или выдуманное', skill: 'R', time: '5 сек на слово', count: '15–18 слов' },
    { key: 'fill', name: 'Fill in the Blanks', ru: 'Допишите слово в предложении', skill: 'R', time: '20 сек', count: '6–9' },
    { key: 'complete', name: 'Read and Complete', ru: 'Допишите половинки слов в тексте', skill: 'R', time: '3 мин', count: '3–6 текстов' },
    { key: 'dictation', name: 'Listen and Type', ru: 'Запишите предложение на слух', skill: 'L', time: '1 мин', count: '6–9' },
    { key: 'reading', name: 'Interactive Reading', ru: 'Шесть вопросов к одному тексту', skill: 'R', time: '7–8 мин', count: '2–3 текста' },
    { key: 'listening', name: 'Interactive Listening', ru: 'Диалог на слух и пересказ', skill: 'L', time: '6:30 + 1:15', count: '2–3 диалога' },
    { key: 'writePhoto', name: 'Write About the Photo', ru: 'Опишите фото письменно', skill: 'W', time: '1 мин', count: '3 фото' },
    { key: 'interactiveWriting', name: 'Interactive Writing', ru: 'Текст и продолжение по теме', skill: 'W', time: '5 + 3 мин', count: '1' },
    { key: 'speakPhoto', name: 'Speak About the Photo', ru: 'Опишите фото устно', skill: 'S', time: '90 сек', count: '1' },
    { key: 'readSpeak', name: 'Read, Then Speak', ru: 'Устный ответ по вопросу с планом', skill: 'S', time: '90 сек', count: '1' },
    { key: 'interactiveSpeaking', name: 'Interactive Speaking', ru: 'Устная беседа из коротких вопросов', skill: 'S', time: '35 сек на ответ', count: '6–8 вопросов' },
    { key: 'writingSample', name: 'Writing Sample', ru: 'Письменный образец для вуза', skill: 'W', time: '5 мин', count: '1' },
    { key: 'speakingSample', name: 'Speaking Sample', ru: 'Устный образец для вуза', skill: 'S', time: '3 мин', count: '1' }
  ];
  const TYPE = {};
  TYPES.forEach(function (t) { TYPE[t.key] = t; });
  const SKILL = { R: 'Reading', L: 'Listening', W: 'Writing', S: 'Speaking' };


  // ---------- icons ----------
  const svg = function (inner) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + inner + '</svg>'; };
  const ICON = {
    readSelect: svg('<path d="M3.5 8.5l3 3 5-6"/><path d="M14 14l6 6M20 14l-6 6"/>'),
    fill: svg('<path d="M4 7h16M4 12h5M4 17h12"/><rect x="11.5" y="9.75" width="8.5" height="4.5" rx="1.5"/>'),
    complete: svg('<path d="M4 6h16M4 10.5h6M13 10.5h2.5M18.5 10.5H20M4 15h2.5M9.5 15h3M15.5 15H20M4 19.5h9"/>'),
    dictation: svg('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4.5" height="7" rx="2"/><rect x="16.5" y="13" width="4.5" height="7" rx="2"/>'),
    reading: svg('<path d="M12 6.5C10 5 7.4 4.5 4 4.5v13c3.4 0 6 .5 8 2 2-1.5 4.6-2 8-2v-13c-3.4 0-6 .5-8 2z"/><path d="M12 6.5v13"/>'),
    listening: svg('<path d="M4 5h16v11h-9.5L6.5 20v-4H4z"/><path d="M9 9.5V12M12 8.5V13M15 9.5V12"/>'),
    writePhoto: svg('<rect x="3" y="4" width="14" height="11.5" rx="2.5"/><path d="M3.5 13L7 9.5l3 3 2-2 4.5 4.5"/><path d="M13.5 20.5l1-3 5-5 2 2-5 5z"/>'),
    interactiveWriting: svg('<path d="M4 20l1-4.2L16.3 4.5a2.1 2.1 0 0 1 3 3L8 19z"/><path d="M14 7l3 3M13 20h7"/>'),
    speakPhoto: svg('<rect x="3" y="4" width="13" height="11" rx="2.5"/><path d="M3.5 12.5L7 9l3 3 1.5-1.5"/><rect x="16" y="11" width="4" height="6.5" rx="2"/><path d="M14 16a4 4 0 0 0 8 0M18 20v1.5"/>'),
    readSpeak: svg('<path d="M4 6h9M4 10.5h7M4 15h4.5"/><rect x="15" y="8" width="4.5" height="8" rx="2.25"/><path d="M12.7 14.5a4.55 4.55 0 0 0 9.1 0M17.25 19v2"/>'),
    interactiveSpeaking: svg('<path d="M3 4.5h11v8H8.5l-3 3v-3H3z"/><path d="M17.5 9.5H21v8h-2v3l-3-3h-5v-2"/>'),
    writingSample: svg('<path d="M6 3h8.5L19 7.5V21H6z"/><path d="M14.5 3v4.5H19M9.5 12.5h6M9.5 16.5h6"/>'),
    speakingSample: svg('<rect x="3" y="6.5" width="12" height="11" rx="2.5"/><path d="M15 10.5l6-3v9l-6-3z"/>'),
    mic: svg('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/>'),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7"/>'),
    cross: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    clock: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    plane: svg('<path d="M21 3L3 10.5l7 2.5 2.5 7z"/><path d="M21 3L10 13"/>'),
    list: svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>'),
    chart: svg('<path d="M5 20V11M12 20V4M19 20v-6"/>')
  };
  function ico(key, cls) { return el('span', { class: 'ico ' + (cls || ''), html: ICON[key] || ICON.list }); }

  // ---------- variants ----------
  function byLevel(arr) {
    return arr.map(function (x, i) { return [x, i]; })
      .sort(function (a, b) { return (a[0].level - b[0].level) || (a[1] - b[1]); })
      .map(function (p) { return p[0]; });
  }
  function slice(arr, k) { return arr.filter(function (_, i) { return i % N === k; }); }
  function kind(arr, k) { return arr.filter(function (x) { return x.kind === k; }); }

  // Items of one task type for variant k (0-based). mode: 'full' | 'short' | 'type'
  function itemsFor(type, k, mode) {
    const P = D.prompts || {};
    const short = mode === 'short';
    k = ((k % N) + N) % N;
    switch (type) {
      case 'readSelect': {
        let real = slice(byLevel(D.words.real), k).map(function (x) { return { w: x.w, real: true, level: x.level }; });
        let fake = slice(byLevel(D.words.fake), k).map(function (x) { return { w: x.w, real: false, level: x.level }; });
        if (short) { real = real.filter(function (_, i) { return i % 2 === 0; }); fake = fake.filter(function (_, i) { return i % 2 === 1; }); }
        return shuffle(real.concat(fake), rng(k * 97 + 5));
      }
      case 'fill': {
        const a = slice(byLevel(D.fill), k);
        return short ? [a[0], a[2], a[4]] : a;
      }
      case 'complete': {
        const a = slice(byLevel(D.complete), k);
        if (short) return [a[1]];
        return mode === 'type' ? [a[(k % 2) * 2]] : a;
      }
      case 'dictation': {
        const a = slice(byLevel(D.dictation), k);
        if (short) return [a[0], a[2], a[4]];
        return mode === 'type' ? a.slice(0, 5) : a;
      }
      case 'reading': {
        const nar = kind(D.reading, 'narrative'), exp = kind(D.reading, 'expository');
        const pair = [nar[k], exp[(k + 4) % N]];
        return [pair[(k + (mode === 'type' ? 1 : 0)) % 2]];
      }
      case 'listening': {
        const peer = kind(D.listening, 'peer'), prof = kind(D.listening, 'professor');
        const pair = [peer[k], prof[(k + 4) % N]];
        return [pair[(k + (mode === 'type' ? 0 : 1)) % 2]];
      }
      case 'writePhoto':
        if (mode === 'type') return [D.photos[48 + k]];
        return short ? [D.photos[k]] : [D.photos[k], D.photos[12 + k], D.photos[24 + k]];
      case 'speakPhoto':
        return [mode === 'type' ? D.photos[48 + ((k + 6) % N)] : D.photos[36 + k]];
      case 'interactiveWriting': return [P.interactiveWriting[k]];
      case 'readSpeak': return [P.readSpeak[k]];
      case 'interactiveSpeaking': {
        const it = P.interactiveSpeaking[k];
        return [short ? { id: it.id, topics: [it.topics[0]] } : it];
      }
      case 'writingSample': return [P.writingSample[k]];
      case 'speakingSample': return [P.speakingSample[k]];
    }
    return [];
  }

  // Interactive Speaking: what the examiner says on each turn, and the name of its recording.
  function speakingTurns(it) {
    const out = [];
    it.topics.forEach(function (t, ti) {
      t.qs.forEach(function (q, qi) {
        let lead;
        if (ti === 0 && qi === 0) lead = "I'd like to ask you a few questions about " + t.name + '.';
        else if (qi === 0) lead = 'Thanks for talking to me about ' + it.topics[ti - 1].name + ". Now I'd like to ask you about " + t.name + '.';
        else if (qi === 1) lead = ti ? 'Interesting. I have another question.' : "I see. Here's another question.";
        else lead = ti ? "Okay. I've got one last question." : "Thanks. I've got one more question about this.";
        out.push({ topic: t.name, q: q, say: lead + ' ' + q, clip: it.id + '-q' + (ti * 3 + qi + 1) });
      });
    });
    return out;
  }

  const FULL = TYPES.map(function (t) { return t.key; });
  const SHORT = ['readSelect', 'fill', 'complete', 'dictation', 'reading', 'listening', 'writePhoto', 'speakPhoto', 'interactiveSpeaking', 'writingSample'];

  function buildSession(mode, k, type) {
    const keys = mode === 'full' ? FULL : mode === 'short' ? SHORT : [type];
    return {
      id: Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36),
      mode: mode === 'type' ? 'type:' + type : mode,
      variant: k + 1,
      steps: keys.map(function (key) { return { type: key, items: itemsFor(key, k, mode) }; })
    };
  }

  // Day-of-year rotation: a new variant every calendar day.
  function variantOfDay() {
    const now = new Date();
    const days = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(2026, 0, 1)) / 86400000);
    return ((days % N) + N) % N;
  }

  // ---------- text scoring ----------
  function norm(s) {
    return String(s || '').toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function words(s) { const n = norm(s); return n ? n.split(' ') : []; }
  function countWords(s) { return (String(s || '').trim().match(/\S+/g) || []).length; }
  function editDistance(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = new Array(n + 1), cur = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      cur[0] = i;
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      const t = prev; prev = cur; cur = t;
    }
    return prev[n];
  }
  // Listen and Type: closeness to the original sentence, word by word.
  function dictationScore(ref, given) {
    const r = words(ref), g = words(given);
    if (!g.length) return 0;
    let s = Math.max(0, 1 - editDistance(r, g) / r.length);
    if (s === 1 && ref.trim() !== String(given).trim().replace(/\s+/g, ' ')) s = 0.95; // capitals or punctuation differ
    return s;
  }
  // Word-level diff for the review screen: returns html with <ins>/<del>.
  function diffHtml(ref, given) {
    const a = String(ref).trim().split(/\s+/), b = String(given || '').trim().split(/\s+/).filter(Boolean);
    const m = a.length, n = b.length;
    const eq = function (x, y) { return norm(x) === norm(y); };
    const dp = [];
    for (let i = 0; i <= m; i++) { dp.push(new Array(n + 1).fill(0)); }
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = eq(a[i], b[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    let i = 0, j = 0; const out = [];
    while (i < m && j < n) {
      if (eq(a[i], b[j])) { out.push(a[i] === b[j] ? esc(b[j]) : '<del>' + esc(b[j]) + '</del> <ins>' + esc(a[i]) + '</ins>'); i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push('<ins>' + esc(a[i]) + '</ins>'); i++; }
      else { out.push('<del>' + esc(b[j]) + '</del>'); j++; }
    }
    while (i < m) out.push('<ins>' + esc(a[i++]) + '</ins>');
    while (j < n) out.push('<del>' + esc(b[j++]) + '</del>');
    return out.join(' ');
  }
  // Listen and Complete: the idea must be there; spelling does not matter.
  // A key may list alternatives ("ill|sick"); a typed word matches by stem or with a small typo.
  function keyScore(keys, answer, given) {
    const g = words(given);
    if (!g.length) return 0;
    let hit = 0;
    keys.forEach(function (k) {
      const ok = k.split('|').some(function (alt) {
        const kw = norm(alt);
        const tol = kw.length > 6 ? 2 : kw.length > 3 ? 1 : 0;
        return g.some(function (w) { return (kw.length >= 3 && w.indexOf(kw) === 0) || editDistance(kw.split(''), w.split('')) <= tol; });
      });
      if (ok) hit++;
    });
    let s = hit / keys.length;
    if (g.length > words(answer).length * 3 + 4) s *= 0.5; // far too much text
    return s;
  }

  // ---------- level estimate from auto-scored items ----------
  const DIFF = { 1: 50, 2: 80, 3: 112, 4: 140, 5: 158 };
  // obs: [{ b: difficulty on the 10–160 scale, x: credit 0..1, c: chance of guessing }]
  function estimate(obs) {
    if (!obs || obs.length < 5) return null;
    let best = 10, bestLL = -Infinity;
    for (let t = 10; t <= 160; t += 5) {
      let ll = -Math.pow((t - 100) / 60, 2) / 2;
      for (let i = 0; i < obs.length; i++) {
        const o = obs[i];
        const p0 = 1 / (1 + Math.exp(-(t - o.b) / 16));
        const p = Math.min(0.995, Math.max(0.005, o.c + (1 - o.c) * p0));
        ll += o.x * Math.log(p) + (1 - o.x) * Math.log(1 - p);
      }
      if (ll > bestLL) { bestLL = ll; best = t; }
    }
    return best;
  }
  function cefr(score) {
    if (score == null) return '';
    return score >= 155 ? 'C2' : score >= 130 ? 'C1' : score >= 100 ? 'B2' : score >= 60 ? 'B1' : 'A1–A2';
  }

  function fmtTime(sec) {
    sec = Math.max(0, Math.ceil(sec));
    return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
  }
  function fmtDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }) + ', ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  window.DET = {
    D: D, N: N, el: el, esc: esc, toast: toast, store: store, rng: rng, shuffle: shuffle, hash: hash,
    TYPES: TYPES, TYPE: TYPE, SKILL: SKILL, ICON: ICON, ico: ico, itemsFor: itemsFor, buildSession: buildSession, speakingTurns: speakingTurns, variantOfDay: variantOfDay,
    norm: norm, words: words, countWords: countWords, editDistance: editDistance, dictationScore: dictationScore,
    diffHtml: diffHtml, keyScore: keyScore, DIFF: DIFF, estimate: estimate, cefr: cefr, fmtTime: fmtTime, fmtDate: fmtDate
  };
})();
