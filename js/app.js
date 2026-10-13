(function () {
  'use strict';
  const X = window.DET, el = X.el, S = window.DETSpeech, T = window.DETTasks, store = X.store;
  const app = document.getElementById('app');
  let active = null; // running session context

  const STEP_TIME = { // upper bound in minutes per step, for the start screen
    full: { readSelect: 2, fill: 3, complete: 12, dictation: 7, reading: 8, listening: 8, writePhoto: 3, interactiveWriting: 9, speakPhoto: 2, readSpeak: 2, interactiveSpeaking: 5, writingSample: 6, speakingSample: 4 },
    short: { readSelect: 1, fill: 1, complete: 3, dictation: 3, reading: 8, listening: 8, writePhoto: 1, speakPhoto: 2, interactiveSpeaking: 3, writingSample: 6 }
  };

  // replaceChildren would print "null" for skipped sections
  function mount() { app.replaceChildren.apply(app, Array.prototype.filter.call(arguments, Boolean)); }
  function blob(color, size, pos) { return el('i', { class: 'blob', style: 'background:' + color + ';width:' + size + 'px;height:' + size + 'px;' + pos }); }

  // ---------- router ----------
  function route() {
    if (active) abort();
    document.querySelectorAll('.modal').forEach(function (m) { m.remove(); });
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const page = parts[0] || 'home';
    const tab = page === 'start' ? 'practice' : page === 'result' ? 'history' : page;
    document.querySelectorAll('[data-nav]').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-nav') === tab); });
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
  function heroArt() {
    const tile = function (cls, x, y, c, cd, icon, rot) {
      return '<g class="float ' + cls + '"><g transform="rotate(' + rot + ' ' + (x + 42) + ' ' + (y + 42) + ')">' +
        '<rect x="' + x + '" y="' + (y + 8) + '" width="84" height="84" rx="24" fill="' + cd + '"/>' +
        '<rect x="' + x + '" y="' + y + '" width="84" height="84" rx="24" fill="' + c + '"/>' +
        '<g transform="translate(' + (x + 18) + ' ' + (y + 18) + ') scale(2)" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + icon + '</g></g></g>';
    };
    const inner = function (key) { return X.ICON[key].replace(/^<svg[^>]*>|<\/svg>$/g, ''); };
    const arc = function (color, angle) {
      return '<circle cx="230" cy="204" r="86" fill="none" stroke="' + color + '" stroke-width="24" stroke-linecap="round" stroke-dasharray="94 446.35" transform="rotate(' + angle + ' 230 204)"/>';
    };
    const html =
      '<svg viewBox="0 0 460 410" role="img" aria-label="Шкала теста до 160 баллов и четыре навыка">' +
      '<path d="M92 84c54-50 152-66 224-30 64 32 106 96 98 164-8 72-62 128-134 142-72 14-150-8-196-60C36 246 40 132 92 84z" fill="#e2f9d2"/>' +
      '<circle cx="54" cy="92" r="11" fill="#ffc933"/>' +
      '<circle cx="418" cy="330" r="15" fill="#8fd8ff"/>' +
      '<rect x="398" y="52" width="24" height="24" rx="7" fill="#ff7fb5" transform="rotate(18 410 64)"/>' +
      '<path d="M28 318q13-13 26 0t26 0" stroke="#b98bff" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M372 384q11-11 22 0t22 0" stroke="#ffc933" stroke-width="6" fill="none" stroke-linecap="round"/>' +
      '<path class="spin" d="M338 22l6 15 15 6-15 6-6 15-6-15-15-6 15-6z" fill="#ffc933"/>' +
      '<path class="spin b" d="M150 30l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#8fd8ff"/>' +
      '<path class="spin c" d="M236 364l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="#ff9a2e"/>' +
      '<circle cx="230" cy="212" r="112" fill="#d5efc2"/>' +
      '<circle cx="230" cy="204" r="112" fill="#fff"/>' +
      '<circle cx="230" cy="204" r="86" fill="none" stroke="#eef0f5" stroke-width="24"/>' +
      arc('#1fb1f7', -80) + arc('#b98bff', 10) + arc('#ff7fb5', 100) + arc('#ff9a2e', 190) +
      '<text x="230" y="216" text-anchor="middle" font-size="68" font-weight="900" fill="#3d3d4a" style="font-family:inherit;letter-spacing:-2px">160</text>' +
      '<text x="230" y="244" text-anchor="middle" font-size="15" font-weight="800" fill="#b3b3bd" style="font-family:inherit;letter-spacing:1.5px">МАКСИМУМ</text>' +
      tile('', 24, 70, '#1fb1f7', '#1790cf', inner('reading'), -10) +
      tile('b', 352, 110, '#b98bff', '#9566e0', inner('dictation'), 9) +
      tile('c', 36, 268, '#ff9a2e', '#e07c0a', inner('interactiveWriting'), 8) +
      tile('d', 340, 262, '#ff7fb5', '#e0588f', inner('mic'), -8) +
      '</svg>';
    return el('div', { class: 'hero-art', html: html });
  }

  function viewHome() {
    const k = X.variantOfDay();
    const done = store.get('done', {});
    const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const path = el('div', { class: 'path' });
    for (let i = 0; i < X.N; i++) {
      const isDone = !!done[i + 1];
      path.appendChild(el('button', {
        type: 'button', class: 'node' + (isDone ? ' done' : '') + (i === k ? ' today' : ''),
        'aria-label': 'Вариант ' + (i + 1) + (isDone ? ', пройден' : '') + (i === k ? ', сегодня' : ''),
        onclick: function () { location.hash = '#/start/full/' + (i + 1); }
      }, i === k ? el('span', { class: 'tip' }, 'Сегодня') : null,
        isDone && i !== k ? el('span', { html: X.ICON.check }) : String(i + 1)));
    }
    mount(
      draftCard(),
      el('section', { class: 'hero' },
        el('div', null,
          el('span', { class: 'kicker' }, el('i'), 'Вариант дня № ' + (k + 1) + ' · ' + today),
          el('h1', null, 'Готовься к Duolingo English Test ', el('em', null, 'как на экзамене')),
          el('ul', { class: 'ticks' },
            el('li', null, 'Все 13 типов заданий с настоящими таймерами'),
            el('li', null, 'Каждый день новый вариант — задания не повторяются'),
            el('li', null, 'Письмо и речь разбираются по критериям теста')),
          el('div', { class: 'cta' },
            el('a', { class: 'btn', href: '#/start/full/' + (k + 1) }, 'Полный тест', el('small', null, '50–70 минут')),
            el('a', { class: 'btn ghost', href: '#/start/short/' + (k + 1) }, 'Короткий', el('small', null, '25–35 минут')))),
        heroArt()),

      el('section', { class: 'sec' },
        el('h2', null, 'Путь из ' + X.N + ' вариантов'),
        el('p', { class: 'sub' }, 'Выбери любой — в каждом свои задания.'),
        path,
        el('div', { class: 'legend' },
          el('span', null, el('i', { style: 'background:var(--green)' }), 'сегодня'),
          el('span', null, el('i', { style: 'background:var(--yellow)' }), 'пройден'),
          el('span', null, el('i', { style: 'background:#fff;box-shadow:0 0 0 2px var(--line) inset' }), 'впереди'))),

      el('section', { class: 'sec' },
        el('h2', null, 'Шкала теста'),
        el('p', { class: 'sub' }, 'Общий балл — среднее четырёх навыков: Reading, Listening, Writing, Speaking.'),
        el('div', { class: 'scale-bar' },
          el('div', { class: 'a' }, el('b', null, '10–55'), el('span', null, 'A1–A2')),
          el('div', { class: 'c-blue' }, el('b', null, '60–95'), el('span', null, 'B1 · IELTS 4–5.5')),
          el('div', { class: 'c-green' }, el('b', null, '100–125'), el('span', null, 'B2 · IELTS 5.5–6.5')),
          el('div', { class: 'c-violet' }, el('b', null, '130–150'), el('span', null, 'C1 · IELTS 7–8')),
          el('div', { class: 'c-pink' }, el('b', null, '155+'), el('span', null, 'C2'))),
        el('div', { class: 'row', style: 'margin-top:20px' },
          el('a', { class: 'btn sm ghost', href: '#/guide/scores' }, 'Как считается балл'),
          el('a', { class: 'btn sm ghost', href: '#/guide/criteria' }, 'Критерии письма и речи'))),

      el('section', { class: 'sec' },
        el('h2', null, 'Как это работает'),
        el('div', { class: 'grid steps3', style: 'margin-top:18px' },
          el('div', { class: 'card c-green' }, X.ico('list'), el('b', null, '1. Проходишь вариант'), el('span', { class: 't' }, 'Таймеры и порядок заданий — как на настоящем тесте.')),
          el('div', { class: 'card c-blue' }, X.ico('chart'), el('b', null, '2. Видишь разбор'), el('span', { class: 't' }, 'Чтение и аудирование проверяются сразу, с показом ошибок.')),
          el('div', { class: 'card c-orange' }, X.ico('plane'), el('b', null, '3. Отправляешь ответы'), el('span', { class: 't' }, 'Тексты и устные ответы уходят файлом на проверку по критериям теста.')))),

      el('section', { class: 'sec' },
        el('h2', null, 'Задания по типам'),
        el('p', { class: 'sub' }, 'Любое задание теста отдельно.'),
        typeGrid())
    );
  }

  function typeGrid() {
    return el('div', { class: 'grid types' }, X.TYPES.map(function (t, i) {
      return el('a', { class: 'type c-' + t.skill, href: '#/start/type/' + t.key },
        el('div', { class: 'hd' }, X.ico(t.key), el('div', null, el('small', null, X.SKILL[t.skill]), el('b', null, t.name))),
        el('span', { class: 'ru' }, t.ru),
        el('span', { class: 'chip plain' }, t.time));
    }));
  }

  function viewPractice() {
    mount(
      el('div', { class: 'res-head' }, el('h1', null, 'Задания по типам')),
      el('p', { class: 'muted', style: 'margin:10px 0 24px;font-size:18px' }, 'Одно задание теста отдельно. При каждом запуске — новые материалы.'),
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
    const has = function (list) { return session.steps.some(function (s) { return list.indexOf(s.type) >= 0; }); };
    const needsVoice = has(['speakPhoto', 'readSpeak', 'interactiveSpeaking', 'speakingSample']);
    const needsSound = has(['dictation', 'listening', 'interactiveSpeaking']);

    const name = el('input', { class: 'input', type: 'text', id: 'who', maxlength: 40, autocomplete: 'given-name', value: store.get('name', '') });
    const title = mode === 'type' ? X.TYPE[type].name : 'Вариант ' + (k + 1) + ' · ' + (mode === 'full' ? 'полный' : 'короткий');

    const checks = el('div', { class: 'checks' });
    const soundCheck = el('div', { class: 'check ' + (S.audioOK ? 'ok' : 'bad') }, el('i'), S.audioOK ? 'Звук' : 'В этом браузере нет звука — задания на слух будут пропущены',
      S.audioOK ? el('button', { class: 'btn sm ghost', type: 'button', onclick: function () { S.say('check', 'This is a sound check. Can you hear me clearly?', { voice: 'f' }); } }, 'Проверить') : null);
    const micCheck = el('div', { class: 'check' }, el('i'), 'Микрофон');
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
      return el('div', { class: 'c-' + t.skill }, X.ico(s.type, 'sm'), el('span', null, t.name), el('span', null, mode === 'type' ? t.time : 'до ' + times[s.type] + ' мин'));
    }));

    mount(el('div', { class: 'pre' },
      el('span', { class: 'chip c-yellow' }, mode === 'type' ? X.TYPE[type].ru : 'Задания идут подряд, назад вернуться нельзя'),
      el('h1', null, title),
      list,
      el('div', { class: 'field' }, el('label', { for: 'who' }, 'Имя'), name),
      checks,
      el('div', { class: 'row' },
        el('button', { class: 'btn', type: 'button', style: 'min-width:200px', onclick: function () {
          store.set('name', name.value.trim());
          session.name = name.value.trim();
          S.unlock();
          finalizeDraft();
          run(session, mode, k, type);
        } }, 'Начать'),
        mode === 'type' ? el('a', { class: 'btn ghost', href: '#/guide/' + type }, 'Как отвечать') : null)));
  }

  // ---------- unfinished test ----------
  // Every completed task is saved at once, so a closed tab or a break loses nothing but the task in progress.
  function saveDraft(session, mode, k, results, next) {
    store.set('draft', {
      id: session.id, mode: mode, k: k, variant: session.variant, name: session.name || '', startedAt: session.startedAt,
      next: next, total: session.steps.length, results: results.map(strip), savedAt: new Date().toISOString()
    });
  }
  function getDraft() {
    const d = store.get('draft', null);
    return d && d.results && d.results.length && d.next < d.total ? d : null;
  }
  // Turns the unfinished test into a normal result with what was answered.
  function finalizeDraft() {
    const d = getDraft();
    store.set('draft', null);
    if (!d) return null;
    const rec = { id: d.id, name: d.name, mode: d.mode, variant: d.variant, startedAt: d.startedAt, finishedAt: d.savedAt, results: d.results, partial: { done: d.next, total: d.total } };
    const all = store.get('sessions', []);
    all.unshift(rec);
    store.set('sessions', all.slice(0, 20));
    return rec;
  }
  function resumeDraft() {
    const d = getDraft();
    if (!d) return;
    S.unlock();
    run(X.buildSession(d.mode, d.k, null), d.mode, d.k, null, d);
  }
  function draftCard() {
    const d = getDraft();
    if (!d) return null;
    return el('div', { class: 'card resume' },
      el('div', { class: 'c-yellow' }, X.ico('clock', 'lg')),
      el('div', null,
        el('h3', null, 'Незаконченный тест'),
        el('p', null, 'Вариант ' + d.variant + ' · ' + (d.mode === 'full' ? 'полный' : 'короткий') + ' — пройдено ' + d.next + ' из ' + d.total + ' заданий'),
        el('div', { class: 'row' },
          el('button', { class: 'btn', type: 'button', onclick: resumeDraft }, 'Продолжить'),
          el('button', { class: 'btn ghost', type: 'button', onclick: function () { const rec = finalizeDraft(); if (rec) location.hash = '#/result/' + rec.id; } }, 'Показать ответы'),
          el('button', { class: 'btn ghost', type: 'button', onclick: function () { X.ask({ title: 'Удалить незаконченный тест?', text: 'Ответы из него пропадут.', yes: 'Удалить', no: 'Оставить' }).then(function (yes) { if (yes) { store.set('draft', null); route(); } }); } }, 'Удалить'))));
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

  async function run(session, mode, k, type, draft) {
    const nameEl = el('b'), subEl = el('span');
    const timeText = el('span');
    const timerEl = el('div', { class: 'run-timer off' }, el('span', { html: X.ICON.clock, style: 'display:flex' }), timeText);
    const progress = el('i'), timeFill = el('i');
    const timeBar = el('div', { class: 'tbar' }, timeFill);
    const bodyEl = el('main', { class: 'run-body' });
    const fbTitle = el('b'), fbText = el('span'), fbMark = el('div', { class: 'mk' });
    const fb = el('div', { class: 'fb' }, fbMark, el('div', null, fbTitle, fbText));
    const inner = el('div', { class: 'inner' });
    const footEl = el('footer', { class: 'run-foot none' }, inner);
    const ctx = {
      aborted: false, cleanup: [],
      name: function (t) { nameEl.textContent = t; },
      sub: function (t) { subEl.textContent = t; },
      body: function (node, wide) { bodyEl.classList.toggle('wide', !!wide); bodyEl.replaceChildren(node); window.scrollTo(0, 0); return node; },
      footer: function (label, onClick) {
        inner.replaceChildren();
        footEl.className = 'run-foot' + (label ? '' : ' none');
        if (!label) return null;
        const b = el('button', { class: 'btn', type: 'button', onclick: onClick }, label);
        inner.appendChild(fb);
        inner.appendChild(b);
        return b;
      },
      // Colours the footer after an answer, the way the test shows right and wrong replies.
      feedback: function (ok, title, text) {
        footEl.classList.add(ok ? 'ok' : 'bad');
        fbMark.innerHTML = ok ? X.ICON.check : X.ICON.cross;
        fbTitle.textContent = title; fbText.textContent = text || '';
      },
      onCleanup: function (f) { ctx.cleanup.push(f); },
      clearTimer: function () { timerEl.classList.add('off'); timerEl.classList.remove('low'); timeBar.classList.remove('low'); timeFill.style.width = '0'; },
      startTimer: function (sec, onEnd) {
        const total = sec * 1000, t0 = performance.now();
        let stopped = false, h = null;
        const low = Math.min(10, sec / 3);
        timerEl.classList.remove('off');
        function tick() {
          if (stopped || ctx.aborted) return;
          const left = Math.max(0, total - (performance.now() - t0));
          timeText.textContent = X.fmtTime(left / 1000);
          timeFill.style.width = (left / total * 100) + '%';
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
        el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Выйти', html: X.ICON.cross, onclick: function () {
          const multi = session.steps.length > 1;
          X.ask({
            title: multi ? 'Выйти из теста?' : 'Выйти из задания?',
            text: multi ? 'Пройденные задания сохранены — продолжить можно с главной.' : 'Ответ на это задание не сохранится.'
          }).then(function (yes) {
            if (!yes || ctx.aborted) return;
            abort();
            if (location.hash === '#/' || location.hash === '') route(); else location.hash = '#/';
          });
        } }),
        el('div', { class: 'pbar' }, progress), timerEl),
      el('div', { class: 'run-meta' }, nameEl, subEl),
      timeBar, bodyEl, footEl));

    // warm up the photos so the timers of photo tasks start without a wait
    session.steps.forEach(function (s) {
      if (s.type === 'writePhoto' || s.type === 'speakPhoto') s.items.forEach(function (p) { if (p) { const im = new Image(); im.src = p.src; } });
    });

    const results = draft ? draft.results.slice() : [];
    if (draft) { session.id = draft.id; session.name = draft.name; session.startedAt = draft.startedAt; }
    else session.startedAt = new Date().toISOString();
    const n = session.steps.length;
    for (let i = draft ? draft.next : 0; i < n; i++) {
      const step = session.steps[i], t = X.TYPE[step.type];
      progress.style.width = (i / n * 100) + '%';
      ctx.name(n > 1 ? 'Задание ' + (i + 1) + ' из ' + n : t.name); ctx.sub(''); ctx.clearTimer();
      if (n > 1) {
        await new Promise(function (res) {
          ctx.body(el('div', { class: 'interlude c-' + t.skill },
            blob('var(--cs)', 260, 'left:50%;top:50%;transform:translate(-50%,-62%)'),
            X.ico(step.type, 'lg'),
            el('span', { class: 'k' }, X.SKILL[t.skill]),
            el('h2', null, t.name),
            el('p', null, t.ru),
            el('div', { class: 'facts' }, el('span', { class: 'chip plain' }, t.time))));
          ctx.footer('Начать', res);
        });
        if (ctx.aborted) return;
      }
      ctx.name(t.name);
      const r = await T[step.type](ctx, step.items);
      if (ctx.aborted) return;
      results.push(r);
      if (n > 1) saveDraft(session, mode, k, results, i + 1);
    }
    progress.style.width = '100%';
    ctx.clearTimer(); ctx.name('Готово'); ctx.sub('');
    await review(ctx, results);
    if (ctx.aborted) return;

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
    store.set('draft', null);
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
        const ta = el('textarea', { class: 'ta', rows: 4, placeholder: 'Запишите, что вы сказали', spellcheck: 'false', style: 'min-height:110px' });
        ta.value = s.o.transcript || '';
        return { s: s, ta: ta, node: el('div', { class: 'card rev-card' },
          el('div', { class: 'p' }, s.prompt),
          s.o.audio ? el('audio', { controls: true, src: s.o.audio, style: 'width:100%' }) : null,
          ta) };
      });
      ctx.body(el('div', { style: 'display:grid;gap:14px' },
        el('p', { class: 'ask', style: 'margin:0' }, 'Расшифровка устных ответов'),
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
      app: 'det-prep', v: 1, id: rec.id, name: rec.name, variant: rec.variant, mode: rec.mode, partial: rec.partial || null,
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
    return el('div', { class: 'card send c-green' },
      X.ico('plane', 'lg'),
      el('div', null,
        el('h3', null, 'Отправь ответы на проверку'),
        el('p', null, 'Передай файл тому, кто дал тебе ссылку. Письмо и речь оценят по критериям теста.'),
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
          } }, 'Скопировать текстом'))));
  }

  function acc(key, title, right, inner, open) {
    const t = X.TYPE[key];
    return el('details', { class: 'acc c-' + (t ? t.skill : 'W'), open: open || null },
      el('summary', null, el('span', { class: 'l' }, X.ico(key, 'sm'), el('b', null, title)), right), el('div', { class: 'in' }, inner));
  }
  function pct(r) { return r.max ? Math.round(r.got / r.max * 100) : 0; }
  function meter(r) {
    return el('span', { class: 'row', style: 'gap:10px;flex-wrap:nowrap' }, el('span', { class: 'muted', style: 'font-weight:800;font-size:15px;white-space:nowrap' }, (Math.round(r.got * 10) / 10) + ' / ' + r.max),
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
      out.push(el('p', { class: 'hint' }, 'Рядом со словом — правильный ответ. Красные — ошибки и пропуски.'));
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
      out.push(el('div', { class: 'q', style: 'font-weight:900;margin-top:4px' }, 'Passage ' + (i + 1)));
      out.push(rv('Complete the Sentences', x.blanks.map(function (b) { return mark(b.given, b.answer, b.ok); }).join(' · ')));
      out.push(rv('Complete the Passage', mark(x.missing.given, x.missing.answer, x.missing.ok)));
      x.highlights.forEach(function (h) { out.push(rv(h.q + ' — ' + Math.round(h.score * 100) + '%', mark(h.given, h.answer, h.score >= 0.99))); });
      out.push(rv('Identify the Idea', mark(x.idea.given, x.idea.answer, x.idea.ok)));
      out.push(rv('Title the Passage', mark(x.title.given, x.title.answer, x.title.ok)));
    });
    if (r.type === 'listening') r.rows.forEach(function (x, i) {
      const item = X.D.listening.find(function (c) { return c.id === x.id; });
      out.push(el('div', { class: 'q', style: 'font-weight:900;margin-top:4px' }, 'Conversation ' + (i + 1)));
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
    if (o.photo) out.push(el('div', { class: 'rv' }, el('img', { src: o.photo, alt: '', loading: 'lazy' }), el('div', { class: 'en', html: txt(o.response != null ? o.response : o.transcript) }), el('div', { class: 'q', style: 'margin:8px 0 0' }, note(o))));
    else if (o.turns) o.turns.forEach(function (t) { out.push(rv(t.q + ' — ' + note(t), txt(t.transcript))); });
    else {
      out.push(rv(o.prompt + ' — ' + note(o), txt(o.response != null ? o.response : o.transcript)));
      if (o.prompt2) out.push(rv(o.prompt2 + ' — ' + note({ seconds: o.seconds2, response: o.response2 }), txt(o.response2)));
    }
    return out;
  }

  const OPEN_NAME = { summary: 'Summarize the Conversation' };
  const OPEN_ICON = { summary: 'listening' };

  function sessionTitle(rec) {
    if (rec.mode.indexOf('type:') === 0) return X.TYPE[rec.mode.slice(5)].name;
    return 'Вариант ' + rec.variant + ' · ' + (rec.mode === 'full' ? 'полный' : 'короткий') + (rec.partial ? ' · не закончен' : '');
  }

  function viewResult(id) {
    const rec = findSession(id);
    if (!rec) { mount(el('div', { class: 'empty' }, 'Результат не найден на этом устройстве.', el('a', { class: 'btn', href: '#/' }, 'На главную'))); return; }
    const est = estimates(rec);
    const isType = rec.mode.indexOf('type:') === 0;
    const autos = rec.results.filter(function (r) { return r.max; });
    const opens = [];
    rec.results.forEach(function (r) { (r.open || []).forEach(function (o) { opens.push(o); }); });
    const skipped = rec.results.filter(function (r) { return r.skipped; });

    const estCard = function (skill, v, has) {
      return el('div', { class: 'card c-' + skill },
        el('div', { class: 'k' }, X.SKILL[skill]),
        v != null ? el('div', { class: 'v' }, '≈ ' + v, el('small', null, X.cefr(v)))
          : el('div', { class: 'v wait' }, has ? 'после проверки ответов' : 'нет заданий'));
    };
    const hasW = opens.some(function (o) { return 'response' in o; }), hasS = opens.some(function (o) { return o.turns || 'transcript' in o; });

    mount(
      el('div', { class: 'res-head' },
        el('div', null, el('div', { class: 'row' }, el('span', { class: 'chip plain' }, X.fmtDate(rec.finishedAt) + (rec.name ? ' · ' + rec.name : '')),
          rec.partial ? el('span', { class: 'chip c-yellow' }, 'пройдено ' + rec.partial.done + ' из ' + rec.partial.total + ' заданий') : null), el('h1', { style: 'margin-top:12px' }, sessionTitle(rec))),
        el('a', { class: 'btn ghost sm', href: '#/' }, 'На главную')),
      isType ? null : el('div', { class: 'grid est' }, estCard('R', est.R, false), estCard('L', est.L, false), estCard('W', null, hasW), estCard('S', null, hasS)),
      (!isType && (est.R != null || est.L != null)) ? el('p', { class: 'hint', style: 'margin-top:12px' }, 'Reading и Listening — предварительная оценка по автоматически проверенным заданиям, не официальный балл.') : null,
      opens.length ? el('section', { class: 'sec', style: 'margin-top:28px' }, sendBlock(rec)) : null,
      skipped.length ? el('p', { class: 'hint', style: 'margin-top:14px' }, 'Пропущено — в браузере нет звука: ' + skipped.map(function (r) { return X.TYPE[r.type].name; }).join(', ')) : null,
      autos.length ? el('section', { class: 'sec', style: 'margin-top:40px' }, el('h2', { style: 'margin-bottom:18px' }, 'Разбор'), autos.map(function (r, i) { return acc(r.type, X.TYPE[r.type].name, meter(r), autoReview(r), autos.length === 1 && i === 0); })) : null,
      opens.length ? el('section', { class: 'sec', style: 'margin-top:40px' }, el('h2', { style: 'margin-bottom:18px' }, 'Ответы на проверку'), opens.map(function (o) {
        return acc(OPEN_ICON[o.task] || o.task, OPEN_NAME[o.task] || X.TYPE[o.task].name, el('span', { class: 'chip c-yellow' }, 'ждёт проверки'), openReview(o), opens.length === 1);
      })) : null
    );
  }

  function viewHistory() {
    const all = store.get('sessions', []);
    if (!all.length) {
      mount(el('div', { class: 'res-head' }, el('h1', null, 'Результаты')),
        el('div', { class: 'empty c-blue' }, X.ico('chart', 'lg'), el('p', { style: 'font-size:19px' }, 'Пройденных вариантов пока нет.'), el('a', { class: 'btn', href: '#/' }, 'К вариантам')));
      return;
    }
    mount(el('div', { class: 'res-head' }, el('h1', null, 'Результаты')),
      el('p', { class: 'muted', style: 'margin:10px 0 22px' }, 'Хранятся только на этом устройстве.'),
      el('div', { class: 'hist' }, all.map(function (rec) {
        const est = estimates(rec);
        const isType = rec.mode.indexOf('type:') === 0;
        const tags = [];
        if (!isType) {
          if (est.R != null) tags.push(el('span', { class: 'chip c-R' }, 'R ≈ ' + est.R));
          if (est.L != null) tags.push(el('span', { class: 'chip c-L' }, 'L ≈ ' + est.L));
        }
        const t = isType ? X.TYPE[rec.mode.slice(5)] : null;
        return el('a', { href: '#/result/' + rec.id, class: 'c-' + (t ? t.skill : 'green') },
          el('span', { class: 'row', style: 'gap:12px;flex-wrap:nowrap' }, X.ico(t ? t.key : 'list', 'sm'),
            el('span', null, el('b', null, sessionTitle(rec)), el('span', { class: 'muted', style: 'display:block;font-size:14px' }, X.fmtDate(rec.finishedAt)))),
          el('span', { class: 'row', style: 'gap:6px' }, tags));
      })));
  }

  window.DETApp = { exportOf: function (id) { const r = findSession(id); return r ? buildExport(r) : null; } };
  route();
})();
