(function () {
  'use strict';
  const X = window.DET, el = X.el, S = window.DETSpeech, T = window.DETTasks, store = X.store;
  const app = document.getElementById('app');
  let active = null; // running session context

  const STEP_TIME = { // rough minutes per step, for the start screen
    full: { readSelect: 2, fill: 3, complete: 12, dictation: 7, reading: 15, listening: 16, writePhoto: 3, interactiveWriting: 9, speakPhoto: 2, readSpeak: 2, interactiveSpeaking: 5, writingSample: 6, speakingSample: 4 },
    short: { readSelect: 1, fill: 1, complete: 3, dictation: 3, reading: 8, listening: 8, writePhoto: 1, speakPhoto: 2, interactiveSpeaking: 3, writingSample: 6 }
  };

  // ---------- router ----------
  function route() {
    if (active) abort();
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const page = parts[0] || 'home';
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      const on = a.getAttribute('data-nav') === (page === 'start' || page === 'result' ? (page === 'result' ? 'history' : 'practice') : page);
      a.classList.toggle('on', on);
    });
    document.body.classList.remove('running');
    if (page === 'guide') return window.DETGuide.render(app, parts[1]);
    window.scrollTo(0, 0);
    if (page === 'practice') return viewPractice();
    if (page === 'history') return viewHistory();
    if (page === 'result') return viewResult(parts[1]);
    if (page === 'start') return viewStart(parts[1], parts[2]);
    return viewHome();
  }
  window.addEventListener('hashchange', route);

  // ---------- home ----------
  function viewHome() {
    const k = X.variantOfDay();
    const done = store.get('done', {});
    const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const variants = el('div', { class: 'grid variants' });
    for (let i = 0; i < X.N; i++) {
      variants.appendChild(el('button', {
        type: 'button', class: (done[i + 1] ? 'done ' : '') + (i === k ? 'today-v' : ''),
        'aria-label': 'Вариант ' + (i + 1), onclick: function () { location.hash = '#/start/full/' + (i + 1); }
      }, String(i + 1)));
    }
    app.replaceChildren(
      el('section', { class: 'hero' },
        el('div', { class: 'hero-main' },
          el('div', null,
            el('h1', null, 'Тренажёр Duolingo English Test'),
            el('p', null, 'Все типы заданий экзамена с таймерами как на тесте. Письмо и речь разбираются по его критериям.')),
          el('div', { class: 'hero-facts' },
            el('div', null, el('b', null, '13'), el('span', null, 'типов заданий')),
            el('div', null, el('b', null, String(X.N)), el('span', null, 'вариантов без повторов')),
            el('div', null, el('b', null, '10–160'), el('span', null, 'шкала теста')))),
        el('div', { class: 'card today' },
          el('div', null, el('span', { class: 'chip' }, today), el('h2', { style: 'margin-top:12px' }, 'Вариант дня'), el('div', { class: 'num' }, '№' + (k + 1))),
          el('div', { class: 'btns' },
            el('a', { class: 'btn', href: '#/start/full/' + (k + 1) }, 'Полный тест', el('small', null, '60–80 мин')),
            el('a', { class: 'btn soft', href: '#/start/short/' + (k + 1) }, 'Короткий', el('small', null, '25–35 мин'))))),

      el('section', { class: 'sec' }, el('h2', null, 'Все варианты'), variants),

      el('section', { class: 'sec' }, el('h2', null, 'Шкала'),
        el('div', { class: 'card scale' },
          el('p', null, 'Общий балл — среднее четырёх навыков: Reading, Listening, Writing, Speaking.'),
          el('div', { class: 'scale-bar' },
            el('div', { class: 'a' }, el('b', null, '10–55'), el('span', null, 'A1–A2')),
            el('div', { class: 'b1' }, el('b', null, '60–95'), el('span', null, 'B1 · IELTS 4–5.5')),
            el('div', { class: 'b2' }, el('b', null, '100–125'), el('span', null, 'B2 · 5.5–6.5')),
            el('div', { class: 'c1' }, el('b', null, '130–150'), el('span', null, 'C1 · 7–8')),
            el('div', { class: 'c2' }, el('b', null, '155+'), el('span', null, 'C2'))),
          el('div', { class: 'row', style: 'margin-top:16px' }, el('a', { class: 'btn sm ghost', href: '#/guide/scores' }, 'Как считается балл'), el('a', { class: 'btn sm ghost', href: '#/guide/criteria' }, 'Критерии письма и речи')))),

      el('section', { class: 'sec' }, el('h2', null, 'Как это работает'),
        el('div', { class: 'grid steps3' },
          el('div', { class: 'card' }, el('span', { class: 'n' }, '01'), el('b', null, 'Проходите вариант'), el('span', { class: 'muted' }, 'Каждый день новый. Таймеры и порядок заданий — как на тесте.')),
          el('div', { class: 'card' }, el('span', { class: 'n' }, '02'), el('b', null, 'Видите разбор'), el('span', { class: 'muted' }, 'Чтение и аудирование проверяются сразу, с показом ошибок.')),
          el('div', { class: 'card' }, el('span', { class: 'n' }, '03'), el('b', null, 'Отправляете ответы'), el('span', { class: 'muted' }, 'Тексты и устные ответы уходят файлом на проверку по критериям теста.')))),

      el('section', { class: 'sec' }, el('h2', null, 'Задания по типам'), typeGrid())
    );
  }

  function typeGrid() {
    return el('div', { class: 'grid types' }, X.TYPES.map(function (t, i) {
      return el('a', { class: 'type skill-' + t.skill, href: '#/start/type/' + t.key },
        el('span', { class: 'muted', style: 'font-size:13px' }, el('i', { class: 'dot' }), ' ' + X.SKILL[t.skill]),
        el('b', null, (i + 1) + '. ' + t.name),
        el('span', { class: 'ru' }, t.ru),
        el('div', { class: 'row' }, el('span', { class: 'chip plain' }, t.time)));
    }));
  }

  function viewPractice() {
    app.replaceChildren(
      el('div', { class: 'res-head' }, el('h1', null, 'Задания по типам')),
      el('p', { class: 'muted', style: 'margin:8px 0 20px' }, 'Одно задание теста отдельно. При каждом запуске — новые материалы.'),
      typeGrid());
  }

  // ---------- start screen ----------
  function viewStart(mode, arg) {
    let k, type = null;
    if (mode === 'type') {
      type = arg;
      if (!X.TYPE[type]) { location.hash = '#/practice'; return; }
      k = (store.get('ptr', {})[type] || 0) % X.N;
    } else {
      if (mode !== 'full' && mode !== 'short') { location.hash = '#/'; return; }
      k = Math.min(X.N, Math.max(1, parseInt(arg, 10) || 1)) - 1;
    }
    const session = X.buildSession(mode, k, type);
    const needsVoice = session.steps.some(function (s) { return ['speakPhoto', 'readSpeak', 'interactiveSpeaking', 'speakingSample'].indexOf(s.type) >= 0; });
    const needsSound = session.steps.some(function (s) { return ['dictation', 'listening', 'interactiveSpeaking'].indexOf(s.type) >= 0; });

    const name = el('input', { class: 'input', type: 'text', id: 'who', maxlength: 40, autocomplete: 'given-name', value: store.get('name', '') });
    const title = mode === 'type' ? X.TYPE[type].name : 'Вариант ' + (k + 1) + ' · ' + (mode === 'full' ? 'полный' : 'короткий');

    const checks = el('div', { class: 'checks' });
    const soundCheck = el('div', { class: 'check ' + (S.ttsOK ? 'ok' : 'bad') }, el('i'), S.ttsOK ? 'Звук: ' : 'В этом браузере нет синтеза речи — задания на слух будут пропущены',
      S.ttsOK ? el('button', { class: 'btn sm ghost', type: 'button', onclick: function () { S.speak('This is a sound check. Can you hear me clearly?', { voice: 'f' }); } }, 'Проверить') : null);
    const micCheck = el('div', { class: 'check' }, el('i'), 'Микрофон: ');
    const micBtn = el('button', { class: 'btn sm ghost', type: 'button', onclick: function () {
      S.askMic().then(function (r) {
        micCheck.className = 'check ' + (r === 'ok' ? 'ok' : 'bad');
        micBtn.textContent = r === 'ok' ? 'Разрешён' : r === 'denied' ? 'Нет доступа' : 'Не найден';
      });
    } }, 'Разрешить');
    micCheck.appendChild(micBtn);
    const sttCheck = el('div', { class: 'check ' + (S.sttOK ? 'ok' : 'warn') }, el('i'),
      S.sttOK ? 'Распознавание речи работает' : 'Распознавания речи в этом браузере нет — устные ответы нужно будет записать текстом. В Chrome и Safari оно есть.');
    if (needsSound) checks.appendChild(soundCheck);
    if (needsVoice) { checks.appendChild(micCheck); checks.appendChild(sttCheck); }

    const times = STEP_TIME[mode] || {};
    const list = el('div', { class: 'list' }, session.steps.map(function (s) {
      const t = X.TYPE[s.type];
      return el('div', null, el('span', null, t.name), el('span', null, mode === 'type' ? t.time : 'до ' + times[s.type] + ' мин'));
    }));

    app.replaceChildren(el('div', { class: 'pre' },
      el('span', { class: 'chip' }, mode === 'type' ? X.TYPE[type].ru : 'Задания идут подряд, назад вернуться нельзя'),
      el('h1', { style: 'margin-top:12px' }, title),
      list,
      el('div', { class: 'field' }, el('label', { for: 'who' }, 'Имя'), name),
      checks,
      el('div', { class: 'row' },
        el('button', { class: 'btn', type: 'button', onclick: function () {
          store.set('name', name.value.trim());
          session.name = name.value.trim();
          S.unlock();
          run(session, mode, k, type);
        } }, 'Начать'),
        mode === 'type' ? el('a', { class: 'btn ghost', href: '#/guide/' + type }, 'Как отвечать') : null)));
  }

  // ---------- runner ----------
  function abort() {
    if (!active) return;
    active.aborted = true;
    active.cleanup.forEach(function (f) { try { f(); } catch (e) { /* ignore */ } });
    S.stop();
    active = null;
    document.body.classList.remove('running');
  }

  async function run(session, mode, k, type) {
    const nameEl = el('b'), subEl = el('span'), timerEl = el('div', { class: 'run-timer' });
    const progress = el('i'), timeFill = el('i');
    const timeBar = el('div', { class: 'bar time' }, timeFill);
    const bodyEl = el('main', { class: 'run-body' }), footEl = el('footer', { class: 'run-foot' });
    const ctx = {
      aborted: false, cleanup: [],
      name: function (t) { nameEl.textContent = t; },
      sub: function (t) { subEl.textContent = t; },
      body: function (node, wide) { bodyEl.classList.toggle('wide', !!wide); bodyEl.replaceChildren(node); window.scrollTo(0, 0); return node; },
      footer: function (label, onClick) {
        footEl.replaceChildren();
        if (!label) return null;
        const b = el('button', { class: 'btn', type: 'button', onclick: onClick }, label);
        footEl.appendChild(b);
        return b;
      },
      onCleanup: function (f) { ctx.cleanup.push(f); },
      clearTimer: function () { timerEl.textContent = ''; timeFill.style.width = '0'; timerEl.classList.remove('low'); timeBar.classList.remove('low'); },
      startTimer: function (sec, onEnd) {
        const total = sec * 1000, t0 = performance.now();
        let stopped = false, h = null;
        const low = Math.min(10, sec / 3);
        function tick() {
          if (stopped || ctx.aborted) return;
          const left = Math.max(0, total - (performance.now() - t0));
          timerEl.textContent = X.fmtTime(left / 1000);
          timeFill.style.width = (100 - left / total * 100) + '%';
          const isLow = left / 1000 <= low;
          timerEl.classList.toggle('low', isLow); timeBar.classList.toggle('low', isLow);
          if (left <= 0) { stopped = true; if (onEnd) onEnd(); return; }
          h = setTimeout(tick, 100);
        }
        tick();
        const api = { stop: function () { stopped = true; clearTimeout(h); }, elapsed: function () { return (performance.now() - t0) / 1000; } };
        ctx.cleanup.push(api.stop);
        return api;
      }
    };
    active = ctx;
    document.body.classList.add('running');
    app.replaceChildren(el('div', { class: 'run' },
      el('header', { class: 'run-top' },
        el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Выйти', onclick: function () {
          if (window.confirm('Выйти? Ответы этого прохождения не сохранятся.')) { abort(); location.hash = '#/'; }
        } }, '✕'),
        el('div', { class: 'run-title' }, nameEl, subEl), timerEl),
      el('div', { class: 'bars' }, el('div', { class: 'bar' }, progress), timeBar),
      bodyEl, footEl));

    // warm up the photos so the timers of photo tasks start without a wait
    session.steps.forEach(function (s) {
      if (s.type === 'writePhoto' || s.type === 'speakPhoto') s.items.forEach(function (p) { if (p) { const im = new Image(); im.src = p.src; } });
    });

    session.startedAt = new Date().toISOString();
    const results = [];
    for (let i = 0; i < session.steps.length; i++) {
      const step = session.steps[i], t = X.TYPE[step.type];
      progress.style.width = (i / session.steps.length * 100) + '%';
      ctx.name(t.name); ctx.sub(''); ctx.clearTimer();
      if (session.steps.length > 1) {
        await new Promise(function (res) {
          ctx.body(el('div', { class: 'interlude' },
            el('span', { class: 'k' }, 'Задание ' + (i + 1) + ' из ' + session.steps.length),
            el('h2', null, t.name),
            el('p', { class: 'muted' }, t.ru),
            el('div', { class: 'facts' }, el('span', { class: 'chip skill-' + t.skill }, el('i', { class: 'dot' }), X.SKILL[t.skill]), el('span', { class: 'chip plain' }, t.time))));
          ctx.footer('Начать', res);
        });
        if (ctx.aborted) return;
      }
      const r = await T[step.type](ctx, step.items);
      if (ctx.aborted) return;
      results.push(r);
    }
    progress.style.width = '100%';
    ctx.clearTimer(); ctx.name('Готово'); ctx.sub('');
    await review(ctx, results);
    if (ctx.aborted) return;

    // save
    session.finishedAt = new Date().toISOString();
    const rec = {
      id: session.id, name: session.name || '', mode: session.mode, variant: session.variant,
      startedAt: session.startedAt, finishedAt: session.finishedAt, results: results.map(strip)
    };
    const all = store.get('sessions', []);
    all.unshift(rec);
    store.set('sessions', all.slice(0, 20));
    if (mode === 'type') { const p = store.get('ptr', {}); p[type] = (p[type] || 0) + 1; store.set('ptr', p); }
    else { const d = store.get('done', {}); d[k + 1] = true; store.set('done', d); }
    active = null;
    document.body.classList.remove('running');
    location.hash = '#/result/' + rec.id;
  }

  function strip(r) {
    const o = JSON.parse(JSON.stringify(r, function (key, v) { return key === 'audio' || key === 'obs' ? undefined : v; }));
    o.obs = r.obs || [];
    return o;
  }

  // Spoken answers: let the test taker fix what the recogniser misheard.
  function review(ctx, results) {
    const spoken = [];
    results.forEach(function (r) {
      (r.open || []).forEach(function (o) {
        if (o.turns) o.turns.forEach(function (t) { spoken.push({ o: t, prompt: t.q }); });
        else if ('transcript' in o) spoken.push({ o: o, prompt: o.prompt });
      });
    });
    if (!spoken.length) return Promise.resolve();
    return new Promise(function (res) {
      const fields = spoken.map(function (s) {
        const ta = el('textarea', { class: 'ta', rows: 4, placeholder: 'Запишите, что вы сказали', spellcheck: 'false' });
        ta.value = s.o.transcript || '';
        return { s: s, ta: ta, node: el('div', { class: 'card', style: 'display:grid;gap:10px' },
          el('div', { class: 'muted en', style: 'white-space:pre-wrap' }, s.prompt),
          s.o.audio ? el('audio', { controls: true, src: s.o.audio, style: 'width:100%' }) : null,
          ta) };
      });
      ctx.body(el('div', { style: 'display:grid;gap:12px' },
        el('h2', { style: 'font:700 22px/1.2 var(--display)' }, 'Расшифровка устных ответов'),
        el('p', { class: 'muted' }, 'Исправьте слова, которые распознались неверно. Сам ответ не меняйте.'),
        fields.map(function (f) { return f.node; })));
      ctx.footer('Готово', function () {
        fields.forEach(function (f) {
          const v = f.ta.value.trim();
          if (v !== (f.s.o.transcript || '')) { f.s.o.edited = true; f.s.o.transcript = v; f.s.o.words = X.countWords(v); if (f.s.o.seconds > 3) f.s.o.wpm = Math.round(f.s.o.words / f.s.o.seconds * 60); }
        });
        res();
      });
    });
  }

  // replaceChildren would print "null" for skipped sections
  function mount() { app.replaceChildren.apply(app, Array.prototype.filter.call(arguments, Boolean)); }

  // ---------- results ----------
  function findSession(id) { return store.get('sessions', []).find(function (s) { return s.id === id; }); }

  function estimates(rec) {
    const obs = { R: [], L: [] };
    rec.results.forEach(function (r) { (r.obs || []).forEach(function (o) { obs[o.skill].push(o); }); });
    return { R: X.estimate(obs.R), L: X.estimate(obs.L) };
  }

  function buildExport(rec) {
    const est = estimates(rec);
    const auto = [], open = [];
    rec.results.forEach(function (r) {
      if (r.skipped) { auto.push({ task: r.type, skipped: r.skipped }); return; }
      if (r.max) {
        const a = { task: r.type, got: Math.round(r.got * 100) / 100, max: r.max, mistakes: [] };
        if (r.type === 'readSelect') r.rows.forEach(function (x) { if (!x.ok) a.mistakes.push({ word: x.w, real: x.real, answered: x.ans == null ? 'no answer' : x.ans ? 'yes' : 'no' }); });
        if (r.type === 'fill') r.rows.forEach(function (x) { if (!x.ok) a.mistakes.push({ sentence: x.s, expected: x.answer, given: x.given }); });
        if (r.type === 'complete') r.rows.forEach(function (x) { x.blanks.forEach(function (b) { if (!b.ok) a.mistakes.push({ text: x.id, expected: b.answer, given: b.given }); }); });
        if (r.type === 'dictation') r.rows.forEach(function (x) { if (x.score < 1) a.mistakes.push({ expected: x.ref, given: x.given, score: Math.round(x.score * 100) / 100 }); });
        if (r.type === 'reading') r.rows.forEach(function (x) {
          x.blanks.forEach(function (b) { if (!b.ok) a.mistakes.push({ passage: x.id, q: 'word', expected: b.answer, given: b.given }); });
          ['missing', 'idea', 'title'].forEach(function (key) { if (!x[key].ok) a.mistakes.push({ passage: x.id, q: key, expected: x[key].answer, given: x[key].given }); });
          x.highlights.forEach(function (h) { if (h.score < 1) a.mistakes.push({ passage: x.id, q: h.q, expected: h.answer, given: h.given, score: h.score }); });
        });
        if (r.type === 'listening') r.rows.forEach(function (x) {
          x.complete.forEach(function (c) { if (c.score < 1) a.mistakes.push({ scenario: x.id, q: c.pre + ' …', expected: c.answer, given: c.given, score: c.score }); });
          x.turns.forEach(function (t) { if (!t.ok) a.mistakes.push({ scenario: x.id, heard: t.partner, expected: t.answer, given: t.given }); });
        });
        auto.push(a);
      }
      (r.open || []).forEach(function (o) { open.push(o); });
    });
    return {
      app: 'det-prep', v: 1, id: rec.id, name: rec.name, variant: rec.variant, mode: rec.mode,
      startedAt: rec.startedAt, finishedAt: rec.finishedAt, device: navigator.userAgent,
      estimate: { reading: est.R, listening: est.L, note: 'rough, from auto-scored items only' },
      auto: auto, open: open
    };
  }

  function fileName(rec) {
    const d = new Date(rec.finishedAt);
    const p = function (n) { return String(n).padStart(2, '0'); };
    const who = (rec.name || 'answers').toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-|-$/g, '') || 'answers';
    const what = rec.mode.indexOf('type:') === 0 ? rec.mode.slice(5) : 'v' + rec.variant + '-' + rec.mode;
    return 'det-' + who + '-' + what + '-' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes()) + '.txt';
  }

  function sendBlock(rec) {
    const json = JSON.stringify(buildExport(rec), null, 1);
    const name = fileName(rec);
    const file = function () { return new File([json], name, { type: 'text/plain' }); };
    const canShare = !!(navigator.canShare && navigator.share && (function () { try { return navigator.canShare({ files: [file()] }); } catch (e) { return false; } })());
    return el('div', { class: 'card send' },
      el('h3', null, 'Отправить ответы на проверку'),
      el('p', { class: 'muted', style: 'margin-top:6px' }, 'Файл с ответами передайте тому, кто дал вам ссылку. Письмо и речь оценят по критериям теста.'),
      el('div', { class: 'row' },
        canShare ? el('button', { class: 'btn', type: 'button', onclick: function () { navigator.share({ files: [file()], title: name }).catch(function () {}); } }, 'Поделиться файлом') : null,
        el('button', { class: 'btn' + (canShare ? ' ghost' : ''), type: 'button', onclick: function () {
          const a = el('a', { href: URL.createObjectURL(new Blob([json], { type: 'text/plain' })), download: name });
          document.body.appendChild(a); a.click(); a.remove();
          X.toast('Файл сохранён: ' + name);
        } }, 'Скачать файл'),
        el('button', { class: 'btn ghost', type: 'button', onclick: function () {
          const ok = function () { X.toast('Ответы скопированы'); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json).then(ok, function () { X.toast('Не удалось скопировать — скачайте файл'); });
          else X.toast('Не удалось скопировать — скачайте файл');
        } }, 'Скопировать текстом')));
  }

  function acc(title, right, inner, open) {
    return el('details', { class: 'acc', open: open || null }, el('summary', null, el('b', null, title), right), el('div', { class: 'in' }, inner));
  }
  function pct(r) { return r.max ? Math.round(r.got / r.max * 100) : 0; }
  function meter(r) {
    return el('span', { class: 'row', style: 'gap:10px;flex-wrap:nowrap' }, el('span', { class: 'muted', style: 'font-size:14px;white-space:nowrap' }, (Math.round(r.got * 10) / 10) + ' / ' + r.max),
      el('span', { class: 'meter' }, el('i', { style: 'width:' + pct(r) + '%' })));
  }
  function rv(q, html) { return el('div', { class: 'rv' }, q ? el('div', { class: 'q' }, q) : null, el('div', { class: 'en', html: html })); }
  function mark(given, answer, ok) {
    if (ok) return '<ins>' + X.esc(answer) + '</ins>';
    return (given ? '<del>' + X.esc(given) + '</del> ' : '<del>—</del> ') + '<ins>' + X.esc(answer) + '</ins>';
  }

  function autoReview(r) {
    const out = [];
    if (r.type === 'readSelect') {
      out.push(el('div', { class: 'wordgrid' }, r.rows.map(function (x) {
        return el('span', { class: 'chip ' + (x.ok ? 'ok' : 'bad'), title: x.real ? 'настоящее слово' : 'выдуманное' }, x.w + ' · ' + (x.real ? 'Yes' : 'No'));
      })));
      out.push(el('p', { class: 'hint' }, 'Рядом со словом — правильный ответ. Красные — ваши ошибки и пропуски.'));
    }
    if (r.type === 'fill') r.rows.forEach(function (x) {
      const m = x.s.match(/^(.*)\{([^}]+)\}(.*)$/);
      out.push(rv(null, X.esc(m[1]) + mark(x.given, x.answer, x.ok) + X.esc(m[3])));
    });
    if (r.type === 'complete') r.rows.forEach(function (x) {
      const item = X.D.complete.find(function (c) { return c.id === x.id; });
      let bi = 0;
      const html = window.DETTaskParts.buildCTest(item.text).map(function (p) {
        if (p.t !== 'gap') return X.esc(p.s);
        const b = x.blanks[bi++];
        return mark(b.given, b.answer, b.ok);
      }).join('');
      out.push(rv(x.title, html));
    });
    if (r.type === 'dictation') r.rows.forEach(function (x) { out.push(rv(Math.round(x.score * 100) + '%', X.diffHtml(x.ref, x.given))); });
    if (r.type === 'reading') r.rows.forEach(function (x, i) {
      out.push(el('div', { class: 'q', style: 'font-weight:600;margin-top:4px' }, 'Passage ' + (i + 1)));
      out.push(rv('Complete the Sentences', x.blanks.map(function (b) { return mark(b.given, b.answer, b.ok); }).join(' · ')));
      out.push(rv('Complete the Passage', mark(x.missing.given, x.missing.answer, x.missing.ok)));
      x.highlights.forEach(function (h) { out.push(rv(h.q + ' — ' + Math.round(h.score * 100) + '%', mark(h.given, h.answer, h.score >= 0.99))); });
      out.push(rv('Identify the Idea', mark(x.idea.given, x.idea.answer, x.idea.ok)));
      out.push(rv('Title the Passage', mark(x.title.given, x.title.answer, x.title.ok)));
    });
    if (r.type === 'listening') r.rows.forEach(function (x, i) {
      const item = X.D.listening.find(function (c) { return c.id === x.id; });
      out.push(el('div', { class: 'q', style: 'font-weight:600;margin-top:4px' }, 'Conversation ' + (i + 1)));
      if (item) out.push(rv('Scenario', X.esc(item.scenario)));
      x.complete.forEach(function (c) { out.push(rv(c.pre + ' …', mark(c.given, c.answer, c.score >= 0.99))); });
      x.turns.forEach(function (t) { out.push(rv(t.partner || 'You start the conversation', mark(t.given, t.answer, t.ok))); });
    });
    return out;
  }

  function openReview(o) {
    const out = [];
    const txt = function (s) { return X.esc(s || '—').replace(/\n/g, '<br>'); };
    const note = function (x) {
      const bits = [];
      if (x.seconds) bits.push(Math.round(x.seconds) + ' сек');
      const w = x.words != null ? x.words : X.countWords(x.response || '');
      bits.push(w + ' слов');
      if (x.wpm) bits.push(x.wpm + ' слов/мин');
      return bits.join(' · ');
    };
    if (o.photo) out.push(el('div', { class: 'rv' }, el('img', { src: o.photo, alt: '', loading: 'lazy' }), el('div', { class: 'en', html: txt(o.response != null ? o.response : o.transcript) }), el('div', { class: 'q', style: 'margin-top:6px' }, note(o))));
    else if (o.turns) o.turns.forEach(function (t) { out.push(rv(t.q + ' — ' + note(t), txt(t.transcript))); });
    else {
      out.push(rv(o.prompt + ' — ' + note(o), txt(o.response != null ? o.response : o.transcript)));
      if (o.prompt2) out.push(rv(o.prompt2 + ' — ' + note({ seconds: o.seconds2, response: o.response2 }), txt(o.response2)));
    }
    return out;
  }

  const OPEN_NAME = { summary: 'Summarize the Conversation' };

  function viewResult(id) {
    const rec = findSession(id);
    if (!rec) { app.replaceChildren(el('div', { class: 'empty' }, 'Результат не найден на этом устройстве.')); return; }
    const est = estimates(rec);
    const title = rec.mode.indexOf('type:') === 0 ? X.TYPE[rec.mode.slice(5)].name : 'Вариант ' + rec.variant + ' · ' + (rec.mode === 'full' ? 'полный' : 'короткий');
    const autos = rec.results.filter(function (r) { return r.max; });
    const opens = [];
    rec.results.forEach(function (r) { (r.open || []).forEach(function (o) { opens.push(o); }); });
    const skipped = rec.results.filter(function (r) { return r.skipped; });

    const estCard = function (skill, v, has) {
      return el('div', { class: 'card skill-' + skill },
        el('div', { class: 'k' }, el('i', { class: 'dot' }), X.SKILL[skill]),
        v != null ? el('div', { class: 'v' }, '≈ ' + v, el('span', { class: 'muted', style: 'font:500 14px var(--font);margin-left:8px' }, X.cefr(v)))
          : el('div', { class: 'v wait' }, has ? 'после проверки ответов' : 'нет заданий'));
    };
    const hasW = opens.some(function (o) { return 'response' in o; }), hasS = opens.some(function (o) { return o.turns || 'transcript' in o; });

    const isType = rec.mode.indexOf('type:') === 0;
    mount(
      el('div', { class: 'res-head' },
        el('div', null, el('span', { class: 'chip plain' }, X.fmtDate(rec.finishedAt) + (rec.name ? ' · ' + rec.name : '')), el('h1', { style: 'margin-top:10px' }, title)),
        el('a', { class: 'btn ghost sm', href: '#/' }, 'На главную')),
      isType ? null : el('div', { class: 'grid est' }, estCard('R', est.R, false), estCard('L', est.L, false), estCard('W', null, hasW), estCard('S', null, hasS)),
      (!isType && (est.R != null || est.L != null)) ? el('p', { class: 'hint', style: 'margin-top:10px' }, 'Reading и Listening — предварительная оценка по автоматически проверенным заданиям, не официальный балл.') : null,
      opens.length ? el('section', { class: 'sec' }, sendBlock(rec)) : null,
      skipped.length ? el('p', { class: 'hint', style: 'margin-top:14px' }, 'Пропущено из-за отсутствия синтеза речи: ' + skipped.map(function (r) { return X.TYPE[r.type].name; }).join(', ')) : null,
      autos.length ? el('section', { class: 'sec' }, el('h2', null, 'Разбор'), autos.map(function (r, i) { return acc(X.TYPE[r.type].name, meter(r), autoReview(r), autos.length === 1 && i === 0); })) : null,
      opens.length ? el('section', { class: 'sec' }, el('h2', null, 'Ответы на проверку'), opens.map(function (o) {
        return acc(OPEN_NAME[o.task] || X.TYPE[o.task].name, el('span', { class: 'chip plain' }, 'ждёт проверки'), openReview(o), opens.length === 1);
      })) : null
    );
  }

  function viewHistory() {
    const all = store.get('sessions', []);
    if (!all.length) {
      app.replaceChildren(el('div', { class: 'res-head' }, el('h1', null, 'Результаты')),
        el('div', { class: 'empty' }, el('p', null, 'Пройденных вариантов пока нет.'), el('a', { class: 'btn', href: '#/', style: 'margin-top:16px' }, 'К вариантам')));
      return;
    }
    app.replaceChildren(el('div', { class: 'res-head' }, el('h1', null, 'Результаты')),
      el('p', { class: 'muted', style: 'margin:8px 0 20px' }, 'Хранятся только на этом устройстве.'),
      el('div', { class: 'hist' }, all.map(function (rec) {
        const est = estimates(rec);
        const title = rec.mode.indexOf('type:') === 0 ? X.TYPE[rec.mode.slice(5)].name : 'Вариант ' + rec.variant + ' · ' + (rec.mode === 'full' ? 'полный' : 'короткий');
        const tags = [];
        if (rec.mode.indexOf('type:') !== 0) {
          if (est.R != null) tags.push('R ≈ ' + est.R);
          if (est.L != null) tags.push('L ≈ ' + est.L);
        }
        return el('a', { href: '#/result/' + rec.id },
          el('span', null, el('b', null, title), el('span', { class: 'muted', style: 'display:block;font-size:13.5px' }, X.fmtDate(rec.finishedAt))),
          el('span', { class: 'row', style: 'gap:6px' }, tags.map(function (t) { return el('span', { class: 'chip plain' }, t); })));
      })));
  }

  window.DETApp = { exportOf: function (id) { const r = findSession(id); return r ? buildExport(r) : null; } };
  route();
})();
