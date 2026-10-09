// Speech layer: browser text-to-speech for listening tasks, speech recognition and
// audio recording for speaking tasks. Everything stays in the browser.
(function () {
  'use strict';

  const synth = window.speechSynthesis || null;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  const ua = navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isMobile = isAndroid || isIOS;
  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

  // ---------- text to speech ----------
  let voices = [];
  function loadVoices() {
    voices = synth ? synth.getVoices().filter(function (v) { return /^en[-_]/i.test(v.lang); }) : [];
  }
  if (synth) {
    loadVoices();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', loadVoices);
  }
  // System voice names are localised (a Russian macOS lists "Саманта"), so both spellings are listed.
  const FEMALE = ['Samantha', 'Саманта', 'Ava', 'Allison', 'Susan', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Zira', 'Karen', 'Карен', 'Moira', 'Мойра', 'Tessa', 'Тесса', 'Serena', 'Kate', 'Google UK English Female'];
  const MALE = ['Daniel', 'Дэниэл', 'Alex', 'Aaron', 'Google UK English Male', 'Microsoft Guy', 'Microsoft David', 'Microsoft Ryan', 'Oliver', 'Arthur', 'Gordon', 'Rishi', 'Риши', 'Tom'];
  // Novelty and robotic system voices that must never read a listening task.
  const BAD = /^(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Fred|Junior|Kathy|Ralph|Eddy|Flo|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley|Альберт|Бах|Виолончель|Воббл|Джуниор|Зарвокс|Колокольчик|Кэти|Орган|Плохие новости|Прыг-скок|Пузырьки|Ральф|Суперзвезда|Триноид|Фред|Хорошие новости|Шепот|Шутник)(\s|$)/i;
  function byNames(list) {
    for (let i = 0; i < list.length; i++) {
      const n = list[i].toLowerCase();
      const v = voices.find(function (x) { return x.name.toLowerCase().indexOf(n) === 0; });
      if (v) return v;
    }
    return null;
  }
  function fallback(except) {
    const good = voices.filter(function (v) { return !BAD.test(v.name) && v !== except; });
    const pool = good.length ? good : voices.filter(function (v) { return v !== except; });
    return pool.find(function (v) { return /en[-_]US/i.test(v.lang); }) || pool.find(function (v) { return /en[-_]GB/i.test(v.lang); }) || pool[0] || null;
  }
  function pickVoice(kind) {
    if (!voices.length) loadVoices();
    const f = byNames(FEMALE) || fallback(null);
    if (kind !== 'm') return f;
    return byNames(MALE) || fallback(f) || f;
  }
  // Sentences, without breaking after titles such as "Dr." or "Mrs."
  function sentences(text) {
    const raw = String(text).match(/[^.!?]+[.!?]*\s*/g) || [String(text)];
    const out = [];
    raw.forEach(function (part) {
      if (out.length && /\b(Mr|Mrs|Ms|Dr|Prof|St)\.\s*$/.test(out[out.length - 1])) out[out.length - 1] += part;
      else out.push(part);
    });
    return out;
  }

  let token = 0;
  const keep = []; // Chrome drops utterances that get garbage-collected mid-speech
  function speak(text, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      if (!synth) return resolve(false);
      const mine = ++token;
      synth.cancel();
      const parts = sentences(text);
      const voice = pickVoice(opts.voice);
      let i = 0;
      function next() {
        if (mine !== token) return resolve(false);
        if (i >= parts.length) return resolve(true);
        const part = parts[i++].trim();
        if (!part) return next();
        const u = new SpeechSynthesisUtterance(part);
        if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-US';
        u.rate = opts.rate || 0.95;
        u.pitch = opts.voice === 'm' ? 0.85 : 1;
        let done = false;
        const guard = setTimeout(end, 3000 + part.length * 120);
        function end() { if (done) return; done = true; clearTimeout(guard); next(); }
        u.onend = end; u.onerror = end;
        keep.push(u); if (keep.length > 12) keep.shift();
        synth.speak(u);
      }
      setTimeout(next, 80);
    });
  }
  function stop() { token++; if (synth) synth.cancel(); }
  // Must run inside a tap: some phones only allow speech after a user gesture.
  function unlock() {
    if (!synth) return;
    try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; synth.speak(u); } catch (e) { /* ignore */ }
  }
  function hasVoice() { if (!voices.length) loadVoices(); return voices.length > 0; }

  // ---------- microphone ----------
  function askMic() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.resolve('none');
    return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      stream.getTracks().forEach(function (t) { t.stop(); });
      return 'ok';
    }, function () { return 'denied'; });
  }

  function createListener(onText) {
    let rec = null, active = false, failed = null, endResolve = null;
    const finals = [], pauses = [];
    let lastEvt = 0;
    function text() { return (finals.join(' ') + ' ' + (rec && rec._text || '')).replace(/\s+/g, ' ').trim(); }
    function make() {
      const r = new SR();
      r.lang = 'en-US';
      r.interimResults = true;
      r.continuous = !isAndroid; // Android repeats results in continuous mode
      r._text = '';
      r.onresult = function (e) {
        const now = performance.now();
        if (lastEvt && now - lastEvt > 2000) pauses.push(Math.round((now - lastEvt) / 100) / 10);
        lastEvt = now;
        let t = '';
        for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript + ' ';
        r._text = t.trim();
        if (onText) onText(text());
      };
      r.onerror = function (e) {
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed' || e.error === 'audio-capture') { failed = e.error; active = false; }
      };
      r.onend = function () {
        if (r._text) finals.push(r._text);
        r._text = '';
        if (active) {
          try { rec = make(); rec.start(); } catch (err) { active = false; }
        }
        if (!active && endResolve) { const f = endResolve; endResolve = null; f(); }
      };
      return r;
    }
    return {
      start: function () {
        failed = null; active = true;
        try { rec = make(); rec.start(); return true; } catch (e) { active = false; failed = 'start'; return false; }
      },
      failed: function () { return failed; },
      stop: function () {
        return new Promise(function (resolve) {
          const done = function () { resolve({ text: text(), pauses: pauses.slice(), failed: failed }); };
          if (!active || !rec) return done();
          active = false;
          endResolve = done;
          try { rec.stop(); } catch (e) { /* ignore */ }
          setTimeout(function () { if (endResolve) { endResolve = null; done(); } }, 1800);
        });
      },
      cancel: function () { active = false; try { if (rec) rec.abort(); } catch (e) { /* ignore */ } }
    };
  }

  function createRecorder() {
    let stream = null, mr = null, chunks = [];
    return {
      start: function () {
        return navigator.mediaDevices.getUserMedia({ audio: true }).then(function (s) {
          stream = s; chunks = [];
          mr = new MediaRecorder(s);
          mr.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
          mr.start();
          return true;
        }, function () { return false; });
      },
      stop: function () {
        return new Promise(function (resolve) {
          if (!mr || mr.state === 'inactive') { release(); return resolve(null); }
          mr.onstop = function () {
            release();
            resolve(chunks.length ? URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || 'audio/webm' })) : null);
          };
          try { mr.stop(); } catch (e) { release(); resolve(null); }
        });
      },
      cancel: function () { try { if (mr && mr.state !== 'inactive') mr.stop(); } catch (e) { /* ignore */ } release(); }
    };
    function release() { if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; } }
  }

  // One spoken answer: recognition where the browser has it, plus a recording
  // for playback on computers (phones cannot share the microphone between the two).
  function createCapture(onText) {
    const useSTT = !!SR;
    const useRec = canRecord && (!useSTT || !isMobile);
    const listener = useSTT ? createListener(onText) : null;
    const recorder = useRec ? createRecorder() : null;
    let t0 = 0, running = false;
    return {
      stt: useSTT,
      start: function () {
        t0 = performance.now(); running = true;
        const p = recorder ? recorder.start() : Promise.resolve(true);
        return p.then(function () { return listener ? listener.start() : true; });
      },
      // true when recognition was refused (a phone that wants a tap first)
      blocked: function () { return !!(listener && listener.failed()); },
      retry: function () { return listener ? listener.start() : true; },
      stop: function () {
        const seconds = running ? Math.round((performance.now() - t0) / 100) / 10 : 0;
        running = false;
        return Promise.all([listener ? listener.stop() : null, recorder ? recorder.stop() : null]).then(function (r) {
          return {
            transcript: r[0] ? r[0].text : '',
            pauses: r[0] ? r[0].pauses : [],
            stt: useSTT && !(r[0] && r[0].failed),
            seconds: seconds,
            audio: r[1] || null
          };
        });
      },
      cancel: function () { running = false; if (listener) listener.cancel(); if (recorder) recorder.cancel(); }
    };
  }

  window.DETSpeech = {
    ttsOK: !!synth, sttOK: !!SR, canRecord: canRecord, isMobile: isMobile,
    speak: speak, stop: stop, voiceName: function (k) { const v = pickVoice(k); return v ? v.name : null; }, unlock: unlock, hasVoice: hasVoice, askMic: askMic, createCapture: createCapture
  };
})();
