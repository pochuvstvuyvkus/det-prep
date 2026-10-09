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
        return mode === 'type' ? [a[k % 2], a[2 + (k % 2)]] : a;
      }
      case 'dictation': {
        const a = slice(byLevel(D.dictation), k);
        if (short) return [a[0], a[2], a[4]];
        return mode === 'type' ? a.slice(0, 5) : a;
      }
      case 'reading': {
        const nar = kind(D.reading, 'narrative'), exp = kind(D.reading, 'expository');
        const pair = [nar[k], exp[(k + 4) % N]];
        return (short || mode === 'type') ? [pair[k % 2]] : pair;
      }
      case 'listening': {
        const peer = kind(D.listening, 'peer'), prof = kind(D.listening, 'professor');
        const pair = [peer[k], prof[(k + 4) % N]];
        return (short || mode === 'type') ? [pair[(k + 1) % 2]] : pair;
      }
      case 'writePhoto':
        if (mode === 'type') return [D.photos[48 + k], D.photos[60 + k]];
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
    TYPES: TYPES, TYPE: TYPE, SKILL: SKILL, itemsFor: itemsFor, buildSession: buildSession, variantOfDay: variantOfDay,
    norm: norm, words: words, countWords: countWords, editDistance: editDistance, dictationScore: dictationScore,
    diffHtml: diffHtml, keyScore: keyScore, DIFF: DIFF, estimate: estimate, cefr: cefr, fmtTime: fmtTime, fmtDate: fmtDate
  };
})();
