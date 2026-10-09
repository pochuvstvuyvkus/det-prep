// The guide: how the test works, how it is scored and how to answer each task type.
// Facts (timings, counts, scale, comparison table, rules) follow Duolingo's own 2026
// materials; the wording, strategies and examples are written for this trainer.
(function () {
  'use strict';
  const X = window.DET;

  const GENERAL = [
    ['format', 'Что такое DET', `
      <p>Duolingo English Test — онлайн-экзамен по английскому для поступления. Его сдают дома на своём компьютере, без записи и поездки в центр. По данным самого теста, результат принимают более 6 500 учебных заведений.</p>
      <div class="tbl-scroll"><table class="tbl">
        <tr><th>Сколько длится</th><td>Около часа: 5 минут — настройка и проверка личности, 45 минут — задания, 10 минут — письменный и устный образцы</td></tr>
        <tr><th>Сколько стоит</th><td>$70 за одну попытку</td></tr>
        <tr><th>Когда результат</th><td>В течение двух дней</td></tr>
        <tr><th>Сколько действует</th><td>Два года</td></tr>
        <tr><th>Отправка в вузы</th><td>Бесплатно, в любое число вузов</td></tr>
        <tr><th>Кто проверяет</th><td>Ответы оценивает ИИ; запись теста смотрят прокторы — нет ли нарушений</td></tr>
      </table></div>
      <h3>Тест адаптивный</h3>
      <p>В большей части заданий сложность меняется после каждого ответа: ответили верно — следующее труднее, ошиблись — легче. Поэтому число заданий не фиксировано, а балл — это не доля правильных ответов. Трудное задание в середине теста — хороший знак.</p>
      <h3>Назад вернуться нельзя</h3>
      <p>Каждое задание идёт по таймеру. Когда время вышло, ответ отправляется сам. Пропустить задание и вернуться к нему позже нельзя.</p>
      <h3>Что увидит вуз</h3>
      <p>Общий балл, баллы по навыкам, а ещё два последних задания целиком: Writing Sample (текст) и Speaking Sample (видео с вашим ответом).</p>`],

    ['scores', 'Баллы: шкала 10–160', `
      <p>Общий балл — от 10 до 160 с шагом 5. Максимум — 160.</p>
      <p>Вы получаете четыре балла по навыкам, каждый тоже от 10 до 160: <b>Reading</b>, <b>Listening</b>, <b>Writing</b>, <b>Speaking</b>. Общий балл — их среднее, округлённое вверх до числа, которое оканчивается на 0 или 5.</p>
      <div class="ex"><div class="lbl">Пример расчёта</div><p>Listening 90, Speaking 100, Reading 110, Writing 120 → (90 + 100 + 110 + 120) ÷ 4 = <b>105</b>.</p></div>
      <p>Есть ещё четыре сводных балла — каждый равен среднему двух навыков: Literacy (чтение и письмо), Comprehension (чтение и аудирование), Conversation (аудирование и речь), Production (письмо и речь).</p>
      <h3>Сравнение с IELTS, TOEFL и уровнями CEFR</h3>
      <p class="muted">Таблица из Scoring Guide 2026 года. Минимальный балл каждый вуз назначает сам — сверяйтесь со страницей программы.</p>
      <div class="tbl-scroll"><table class="tbl">
        <tr><th>CEFR</th><th class="num">DET</th><th class="num">IELTS</th><th class="num">TOEFL iBT</th></tr>
        <tr><td>C2</td><td class="num">155–160</td><td class="num">8–9</td><td class="num">119–120</td></tr>
        <tr><td>C1</td><td class="num">150</td><td class="num">8</td><td class="num">117–118</td></tr>
        <tr><td>C1</td><td class="num">140–145</td><td class="num">7.5</td><td class="num">109–116</td></tr>
        <tr><td>C1</td><td class="num">130–135</td><td class="num">7</td><td class="num">98–108</td></tr>
        <tr><td>B2</td><td class="num">120–125</td><td class="num">6.5</td><td class="num">87–97</td></tr>
        <tr><td>B2</td><td class="num">105–115</td><td class="num">6</td><td class="num">70–86</td></tr>
        <tr><td>B1 (95) · B2 (100)</td><td class="num">95–100</td><td class="num">5.5</td><td class="num">59–69</td></tr>
        <tr><td>B1</td><td class="num">80–90</td><td class="num">5</td><td class="num">41–58</td></tr>
        <tr><td>B1</td><td class="num">65–75</td><td class="num">4.5</td><td class="num">24–40</td></tr>
        <tr><td>B1</td><td class="num">60</td><td class="num">4</td><td class="num">18–23</td></tr>
        <tr><td>A1–A2</td><td class="num">10–55</td><td class="num">0–4</td><td class="num">0–17</td></tr>
      </table></div>
      <h3>Как оценивается каждое задание</h3>
      <ul>
        <li><b>Верно / неверно</b> — Read and Select, Fill in the Blanks, Read and Complete, почти всё Interactive Reading, выбор реплик в Interactive Listening.</li>
        <li><b>Частичный балл от 0 до 1</b> — Listen and Type, Highlight the Answer, Listen and Complete: чем ближе к правильному ответу, тем выше.</li>
        <li><b>По критериям письма</b> — пересказ диалога, описание фото, Interactive Writing, Writing Sample.</li>
        <li><b>По критериям речи</b> — описание фото вслух, Read Then Speak, Interactive Speaking, Speaking Sample.</li>
      </ul>`],

    ['criteria', 'Как оценивают письмо и речь', `
      <p>Письменные ответы оценивают по четырём критериям, устные — по шести.</p>
      <div class="tbl-scroll"><table class="tbl">
        <tr><th>Критерий</th><th>На что смотрят</th><th>Как поднять</th></tr>
        <tr><td><b>Content</b><br>содержание</td><td>Ответили ли на весь вопрос, по теме ли, развиты ли мысли примерами и деталями</td><td>Отвечайте на каждую часть вопроса. К каждой мысли — причина или пример</td></tr>
        <tr><td><b>Discourse coherence</b><br>связность</td><td>Понятно ли, логичен ли порядок, связаны ли предложения; в письме — есть ли вступление, основная часть и вывод</td><td>Одна мысль — одно предложение или абзац. Связки: however, as a result, for example, on the other hand</td></tr>
        <tr><td><b>Grammar</b><br>грамматика</td><td>Разнообразие конструкций и их правильность; в письме — пунктуация</td><td>Чередуйте простые и сложные предложения: although, which, if, пассив. Проверяйте согласование и времена</td></tr>
        <tr><td><b>Lexis</b><br>словарь</td><td>Широта и точность слов, сочетаемость, формы слов; в письме — орфография</td><td>Не повторяйте одно слово: меняйте на синоним. Вместо good и nice — точное слово</td></tr>
        <tr><td><b>Fluency</b><br>беглость, только речь</td><td>Темп, паузы в естественных местах, остановки и перезапуски</td><td>Говорите ровно. Пауза между мыслями лучше, чем посреди фразы. Не молчите дольше двух секунд</td></tr>
        <tr><td><b>Pronunciation</b><br>произношение, только речь</td><td>Разборчивость, звуки, ударение в слове и фразе, интонация</td><td>Акцент допустим, если вас легко понять. Следите за ударением в длинных словах</td></tr>
      </table></div>
      <h3>Что видно в ответе на разных баллах</h3>
      <div class="tbl-scroll"><table class="tbl">
        <tr><th class="num">Балл</th><th>Содержание и связность</th><th>Грамматика и словарь</th><th>Речь</th></tr>
        <tr><td class="num">60–95</td><td>Простой ответ, мысли не развиты или лишь частично по теме. Связки and, but, because, so</td><td>Present и Past Simple, can, should. Общие слова, повторы. Часть ошибок мешает понять</td><td>Короткие отрезки речи, частые долгие паузы посреди фразы</td></tr>
        <tr><td class="num">100–125</td><td>По теме, главные детали есть. Мысли сгруппированы, есть связки и местоимения-отсылки</td><td>Сложные предложения с although, because, so that, модальные, придаточные, условные. Ошибки обычно не мешают. Слова уместные, но с повторами</td><td>Может говорить долго, но с заминками, повторами и поправками</td></tr>
        <tr><td class="num">130–150</td><td>Ясно и уместно, мысли подкреплены примерами. Вступление, основная часть, вывод</td><td>Пассив, условные, инверсия, сложные предложения — в основном без ошибок. Широкий словарь, устойчивые сочетания, немного идиом</td><td>Ровный темп, короткие паузы в естественных местах</td></tr>
        <tr><td class="num">155–160</td><td>Вопрос раскрыт полностью, ответ сфокусирован, следить очень легко</td><td>Очень широкий набор конструкций, ошибки редки. Точные слова</td><td>Естественная речь, паузы короче двух секунд</td></tr>
      </table></div>
      <h3>За что балл падает сильно</h3>
      <ul>
        <li>Ответ не по теме или заученный текст, не связанный с вопросом.</li>
        <li>Очень короткий ответ: одно-два предложения.</li>
        <li>Повтор одних и тех же слов и фраз.</li>
        <li>В письме — список пунктов вместо связного текста.</li>
      </ul>`]
  ];

  // key, how to answer (html)
  const TASKS = {
    readSelect: `
      <h3>Что происходит</h3>
      <p>На экране по одному появляются слова. На каждое — 5 секунд. Нажимаете Yes, если это настоящее английское слово, и No, если выдуманное. Не успели — ответ засчитан как ошибка. Выдуманные слова нарочно похожи на настоящие.</p>
      <h3>Как отвечать</h3>
      <ul>
        <li>Yes — если знаете слово или точно встречали его раньше.</li>
        <li>No — если видите слово впервые. Не додумывайте значение по знакомому корню.</li>
        <li>Проговорите слово про себя: у выдуманных часто непривычное сочетание букв или «не тот» суффикс.</li>
        <li>Решайте за 2–3 секунды. Пропуск хуже, чем неверная догадка.</li>
      </ul>
      <div class="ex"><div class="lbl">Пример</div>
        <p class="en">harvest → Yes &nbsp;·&nbsp; plendish → No &nbsp;·&nbsp; reluctant → Yes &nbsp;·&nbsp; mertain → No</p>
        <p class="why">plendish похоже на splendid, mertain — на certain. Таких слов нет.</p></div>
      <h3>Как готовиться</h3>
      <p>Читайте тексты на английском и учите академическую лексику. Чем больше слов вы видели, тем увереннее отличаете настоящее от подделки.</p>`,

    fill: `
      <h3>Что происходит</h3>
      <p>Предложение, в котором одно слово не дописано: видна первая половина букв, а на месте остальных — клетки. Нужно дописать слово. На каждое предложение — 20 секунд. Засчитывается только точное написание.</p>
      <h3>Как отвечать</h3>
      <ul>
        <li>Прочитайте предложение целиком и только потом печатайте.</li>
        <li>Ищите подсказку в самом предложении: синоним, противоположность, причину и следствие или устойчивое сочетание.</li>
        <li>Число клеток равно числу недостающих букв — проверяйте по нему длину слова.</li>
        <li>Следите за формой: время глагола, множественное число, окончание -ly у наречия.</li>
      </ul>
      <div class="ex"><div class="lbl">Пример</div>
        <p class="en">She forgot her umbrella, so she got completely <span class="gbx">soa___</span> in the rain.</p>
        <p class="why">Забыла зонт → промокла: soaked. Три клетки — три буквы: k, e, d.</p></div>`,

    complete: `
      <h3>Что происходит</h3>
      <p>Абзац, в котором у части слов нет второй половины. Нужно дописать недостающие буквы. На текст — 3 минуты. Каждое слово оценивается отдельно, написание должно быть точным.</p>
      <ul>
        <li>Заголовок, первое и последнее предложения всегда целые.</li>
        <li>Недописанные слова не стоят рядом.</li>
        <li>Имена собственные и сокращения не бывают недописанными.</li>
      </ul>
      <h3>Как отвечать</h3>
      <ol>
        <li>Сначала за 20–30 секунд прочитайте весь абзац и поймите тему.</li>
        <li>Впишите лёгкие слова: служебные (the, of, and, to, is, that) и очевидные по смыслу.</li>
        <li>Вернитесь к трудным. Грамматика подсказывает форму: после to — глагол, после a или the — существительное или прилагательное.</li>
        <li>В последние 20 секунд перечитайте текст целиком и проверьте окончания.</li>
      </ol>
      <div class="ex"><div class="lbl">Пример</div>
        <p class="en">Anna walks in the park every morning. She usu<span class="gbx">____</span> takes t<span class="gbx">__</span> same pa<span class="gbx">__</span> around t<span class="gbx">__</span> lake. The fresh air helps her wake up.</p>
        <p class="why">usually, the, path, the. Первое и последнее предложения целые и задают тему.</p></div>`,

    dictation: `
      <h3>Что происходит</h3>
      <p>Вы слышите одно предложение — до 20 слов — и печатаете его дословно. Запись можно включить до трёх раз. На ответ — 1 минута. Балл частичный: чем ближе к оригиналу, тем выше. Учитываются слова, орфография и пунктуация.</p>
      <h3>Как отвечать</h3>
      <ol>
        <li>Первое прослушивание — печатайте всё, что успели уловить.</li>
        <li>Второе — заполните пропуски.</li>
        <li>Третье — сверьте слово за словом.</li>
        <li>В оставшееся время проверьте заглавную букву в начале, точку или вопросительный знак в конце, апострофы.</li>
      </ol>
      <p>Чаще всего теряют мелочи: артикли a и the, окончания -s и -ed, предлоги.</p>
      <div class="ex"><div class="lbl">Пример</div>
        <p class="en">Could you tell me where the nearest library is?</p>
        <p class="why">Это вопрос — в конце вопросительный знак. Порядок слов косвенного вопроса: library is, а не is library.</p></div>`,

    reading: `
      <h3>Что происходит</h3>
      <p>Один текст и шесть вопросов к нему, по одному на экране. На всё вместе — 7 или 8 минут: 8, если в первом вопросе много пропусков. За тест бывает 2–3 текста: хотя бы один рассказ и один информационный. Вернуться к предыдущему вопросу нельзя.</p>
      <div class="tbl-scroll"><table class="tbl">
        <tr><th>Вопрос</th><th>Что делать</th><th>Оценка</th></tr>
        <tr><td>1. Complete the Sentences</td><td>Первая половина текста с 3–10 пропусками. Для каждого выбрать слово из списка</td><td>Каждое слово: верно / неверно</td></tr>
        <tr><td>2. Complete the Passage</td><td>Между первой и второй половиной не хватает предложения. Выбрать подходящее</td><td>Верно / неверно</td></tr>
        <tr><td>3–4. Highlight the Answer</td><td>Выделить в тексте фрагмент, который отвечает на вопрос. Таких вопросов два</td><td>Частичный балл</td></tr>
        <tr><td>5. Identify the Idea</td><td>Выбрать главную мысль текста</td><td>Верно / неверно</td></tr>
        <tr><td>6. Title the Passage</td><td>Выбрать лучший заголовок</td><td>Верно / неверно</td></tr>
      </table></div>
      <h3>Как отвечать</h3>
      <ul>
        <li><b>Время.</b> На первый вопрос — до 2,5 минут, на остальные — примерно по минуте. Следите за таймером: вопросы 5 и 6 лёгкие, обидно до них не дойти.</li>
        <li><b>Пропуски.</b> Сначала лёгкие. Проверяйте не только смысл, но и сочетаемость: какое слово обычно стоит рядом с соседним.</li>
        <li><b>Пропущенное предложение.</b> Смотрите на последнюю фразу до пропуска и первую после него. Местоимения (he, this, they) и связки (however, later) должны на что-то ссылаться.</li>
        <li><b>Выделение.</b> Найдите в тексте ключевые слова из вопроса. Выделяйте только сам ответ, без лишних слов: за лишнее балл снижают. Целое предложение выделять не обязательно.</li>
        <li><b>Главная мысль и заголовок.</b> Отбрасывайте варианты «только про одну деталь», «слишком широко» и «этого в тексте нет». Ответ на вопрос 5 подсказывает ответ на вопрос 6.</li>
      </ul>`,

    listening: `
      <h3>Что происходит</h3>
      <p>Разговор в университете: с другим студентом или с преподавателем. За тест таких разговоров 2–3. Каждый состоит из трёх частей подряд.</p>
      <div class="tbl-scroll"><table class="tbl">
        <tr><th>Часть</th><th>Что делать</th><th>Время</th></tr>
        <tr><td>1. Listen and Complete</td><td>Послушать описание ситуации и дописать 3–4 предложения о ней. Слушать можно сколько угодно раз</td><td rowspan="2">6:30 на обе части</td></tr>
        <tr><td>2. Listen and Respond</td><td>5–6 реплик собеседника. Каждая звучит один раз. Выбрать лучший ответ; после выбора показывают правильный</td></tr>
        <tr><td>3. Summarize the Conversation</td><td>Написать краткий пересказ разговора</td><td>1:15</td></tr>
      </table></div>
      <h3>Как отвечать</h3>
      <ul>
        <li><b>Дописать предложения.</b> Пишите коротко и по сути, 2–6 слов. Орфография здесь не важна, важен смысл. Слишком длинный или слишком короткий ответ снижает балл.</li>
        <li><b>Выбрать реплику.</b> Неверные варианты обычно не отвечают на сказанное, противоречат ситуации, звучат слишком официально с другом или слишком фамильярно с преподавателем, добавляют или теряют информацию.</li>
        <li>Если ошиблись — прочитайте правильный ответ: разговор продолжится от него.</li>
        <li>Оставьте 20–30 секунд, чтобы перечитать диалог перед пересказом: на экране пересказа его уже не будет.</li>
        <li><b>Пересказ.</b> Три-четыре полных предложения, без списков: кто говорил и о чём → в чём была проблема или просьба → что обсудили → чем закончилось. Можно писать от первого лица или от третьего. Слова из диалога использовать можно.</li>
      </ul>
      <div class="ex"><div class="lbl">Пример пересказа</div>
        <p class="en">I talked to my classmate Maya about the biology lab I had missed because I was ill. She explained what the group had done and offered to share her notes. We agreed to meet in the library on Thursday so that she could show me how to write the lab report.</p>
        <p class="why">Кто и о чём, проблема, что предложили, чем закончилось — всё в трёх предложениях.</p></div>`,

    writePhoto: `
      <h3>Что происходит</h3>
      <p>На экране фотография. За 1 минуту нужно описать её письменно. Таких заданий три подряд. На фото — люди, животные или предметы в разных ситуациях.</p>
      <h3>Как отвечать</h3>
      <ol>
        <li><b>Общий план</b> — кто или что на фото и где: A young woman is standing in a field.</li>
        <li><b>Детали</b> — действие, одежда, предметы, расположение: in the foreground, in the background, on the left, next to.</li>
        <li><b>Предположение</b> — что происходит или что человек чувствует: seems to, might be, probably, it looks as if.</li>
      </ol>
      <ul>
        <li>Цель — 3–4 полных предложения, 40–60 слов.</li>
        <li>Без длинного вступления вроде This picture shows a situation that… Сразу к делу.</li>
        <li>Не перечисляйте предметы списком — описывайте их.</li>
        <li>Последние 10 секунд — на проверку заглавных букв, точек и орфографии.</li>
      </ul>
      <div class="ex"><div class="lbl">Пример ответа</div>
        <p class="en">A young woman is standing in a golden field at sunset. She is wearing dark sunglasses and a white lace top, and her hair is tied back. Behind her, the field stretches towards a line of trees on the horizon. She seems relaxed, as if she is enjoying a quiet evening in the countryside.</p>
        <p class="why">51 слово: общий план, одежда и детали, фон, предположение. Present Continuous для действий, as if — для догадки.</p></div>`,

    interactiveWriting: `
      <h3>Что происходит</h3>
      <p>Задание из двух частей на одну тему. Сначала 30 секунд на подготовку и 5 минут на первый ответ. Затем появляется второй вопрос на ту же тему — на него 3 минуты, подготовки нет. Пока пишете вторую часть, первый вопрос и ваш ответ остаются на экране.</p>
      <p>Обе части оценивают вместе. Второй ответ должен продолжать тему, а не уходить в сторону и не повторять первый.</p>
      <h3>Как отвечать</h3>
      <ul>
        <li>За 30 секунд набросайте в голове план: позиция, две причины, один пример.</li>
        <li><b>Первая часть, 120–180 слов.</b> Первое предложение — прямой ответ на вопрос. Затем два довода, каждый с объяснением или примером. В конце — вывод одной фразой.</li>
        <li><b>Вторая часть, 70–110 слов.</b> Прямо ответьте на новый вопрос и свяжите с тем, что уже написали: As I mentioned…, Building on this…</li>
        <li>В каждой части оставьте 30 секунд на проверку.</li>
      </ul>
      <div class="ex"><div class="lbl">Пример · часть 1</div>
        <p class="en"><i>Some people believe that cities should limit the number of cars in their centres. Do you agree or disagree?</i></p>
        <p class="en">I strongly agree that city centres should limit car traffic. The main reason is health: exhaust fumes are one of the biggest sources of air pollution, and people who live or work downtown breathe them every day. When my city closed its main street to cars, the air became noticeably cleaner within a few months.</p>
        <p class="en">Another reason is space. Roads and parking take up land that could be used for parks, cafes and cycle lanes. Although some drivers complained at first, the street is now full of people, and local shops say they have more customers than before.</p>
        <p class="en">In short, fewer cars make a city centre healthier and more pleasant, so the limits are worth the inconvenience.</p></div>
      <div class="ex"><div class="lbl">Пример · часть 2</div>
        <p class="en"><i>Think about the people who would be most affected by such limits. How could a city reduce the negative effects on them?</i></p>
        <p class="en">As I mentioned, some people depend on cars more than others. Delivery drivers, for example, could be allowed to enter the centre early in the morning, before the streets get busy. Residents who cannot walk far should receive special permits, and the city could run small electric buses that stop close to their homes. If these exceptions were clearly explained in advance, most people would accept the new rules.</p></div>`,

    speakPhoto: `
      <h3>Что происходит</h3>
      <p>На экране фотография. 20 секунд на подготовку, затем до 90 секунд речи. Попытка одна: перезаписать ответ нельзя. Запись начнётся сама после подготовки, или раньше — по кнопке Record Now.</p>
      <h3>Как отвечать</h3>
      <ul>
        <li>Описывайте так, будто собеседник фото не видит.</li>
        <li>Порядок: общий план → главный человек или предмет → детали по зонам (слева, справа, на заднем плане) → что, по-вашему, происходит → ваше впечатление.</li>
        <li>Говорите всё отведённое время. Закончились детали — добавьте догадки: кто эти люди, что было до и что будет после.</li>
        <li>Не знаете слово — не пропускайте предмет, опишите его другими словами: a thing you use to…</li>
        <li>За 20 секунд подготовки выберите 3–4 ключевых слова.</li>
      </ul>
      <div class="ex"><div class="lbl">Фразы-опоры</div>
        <p class="en">This photo shows… · In the centre, there is… · On the left, I can see… · In the background… · She seems to be… · It looks as if… · I guess this was taken in… · What I find interesting is…</p></div>`,

    readSpeak: `
      <h3>Что происходит</h3>
      <p>На экране вопрос — о вашем опыте или мнении — и несколько пунктов-подсказок. 20 секунд на подготовку, затем до 90 секунд речи. Вопрос остаётся на экране, пока вы говорите.</p>
      <h3>Как отвечать</h3>
      <ul>
        <li>Пункты под вопросом — готовый план. Идите по ним по порядку, примерно по 20 секунд на каждый.</li>
        <li>Давайте конкретику: имена, место, время, что именно случилось.</li>
        <li>Связывайте части: first, after that, as a result, looking back.</li>
        <li>Закончите одной фразой-итогом: That is why…</li>
      </ul>
      <div class="ex"><div class="lbl">Пример начала ответа</div>
        <p class="en"><i>Talk about a teacher who had a strong influence on you.</i></p>
        <p class="en">The teacher who influenced me most was Mr. Petrov, who taught physics when I was fifteen. What made his lessons different was that he never started with a formula. Instead, he showed us an experiment and asked us to explain what we had seen…</p></div>`,

    interactiveSpeaking: `
      <h3>Что происходит</h3>
      <p>Короткая беседа с персонажем: 6–8 вопросов на две темы, по 3–4 на каждую. Вопрос звучит один раз и на экране не показывается. После него идёт таймер — 35 секунд на ответ. Чтобы начать, нужно нажать Record Now. Следующий вопрос зависит от того, что и как вы ответили.</p>
      <h3>Как отвечать</h3>
      <ul>
        <li>Схема ответа: позиция → причина → пример. Это 4–6 предложений — как раз на 30 секунд.</li>
        <li>Начинайте сразу, без долгого вступления: таймер уже идёт.</li>
        <li>Не расслышали вопрос — говорите по теме беседы. Молчание хуже неточного ответа.</li>
        <li>Говорите до конца времени или до законченной мысли. Односложный ответ оценят низко.</li>
      </ul>
      <div class="ex"><div class="lbl">Пример ответа</div>
        <p class="en"><i>What are some advantages of public transport compared with driving a car?</i></p>
        <p class="en">I think the main advantage is cost. A monthly pass is usually much cheaper than paying for fuel, parking and insurance. Another benefit is that you can use the travel time: I usually read or answer messages on the bus, which is impossible when you drive. And of course it is better for the environment, because one bus can replace dozens of cars.</p></div>`,

    writingSample: `
      <h3>Что происходит</h3>
      <p>Вопрос о вашем опыте или мнении. 30 секунд на подготовку и 5 минут на текст. Этот ответ идёт в балл Writing и, кроме того, целиком отправляется в вузы вместе с результатом.</p>
      <h3>Как отвечать</h3>
      <ul>
        <li>Структура та же, что в первой части Interactive Writing: ответ на вопрос → два довода с примерами → вывод.</li>
        <li>Объём — 120–180 слов. Лучше закончить мысль, чем оборвать текст на полуслове.</li>
        <li>Пишите как для приёмной комиссии: без сленга и сокращений вроде gonna.</li>
        <li>Последние 30–40 секунд — на проверку орфографии, времён и пунктуации.</li>
      </ul>`,

    speakingSample: `
      <h3>Что происходит</h3>
      <p>Вопрос на экране. 30 секунд на подготовку и до 3 минут речи. Ответ идёт в балл Speaking, а видео с ним отправляется в вузы.</p>
      <h3>Как отвечать</h3>
      <ul>
        <li>Говорите 2–3 минуты. Ответ в полминуты не покажет ваш уровень.</li>
        <li>План: прямой ответ на вопрос → две-три мысли, к каждой пример из жизни → короткий вывод.</li>
        <li>Закончились мысли — посмотрите на вопрос ещё раз: в нём часто несколько частей.</li>
        <li>Смотрите в экран, а не в сторону: на тесте отведённый взгляд считается нарушением.</li>
      </ul>`
  };

  const AFTER = [
    ['day', 'В день теста', `
      <h3>Что нужно</h3>
      <ul>
        <li>Компьютер с Windows или macOS, фронтальная камера, микрофон и колонки.</li>
        <li>Телефон с камерой — он работает второй камерой: должен видеть вас, экран и клавиатуру.</li>
        <li>Паспорт, водительские права или другое государственное удостоверение личности.</li>
        <li>Тихая, хорошо освещённая комната, в которой вы одни. Стабильный интернет.</li>
      </ul>
      <h3>Правила</h3>
      <ul>
        <li>Наушники запрещены: звук идёт только через колонки. Перед тестом уши проверяют телефоном.</li>
        <li>Не отводите взгляд от экрана. Смотреть на клавиатуру, пока печатаете, можно.</li>
        <li>Телефон — только как вторая камера. Во время теста его нельзя трогать.</li>
        <li>Уберите другие устройства, вторые мониторы, заметки.</li>
        <li>Никто не должен входить в комнату или говорить с вами.</li>
      </ul>
      <p>Если прокторы найдут нарушение, результат не подтвердят. Купить можно не более трёх тестов за 30 дней, а оплаченный нужно пройти в течение 21 дня.</p>`],
    ['how', 'Как устроен тренажёр', `
      <ol>
        <li><b>Проходите вариант.</b> Каждый день — новый; всего их ${X.N}, задания в них не повторяются. Таймеры и порядок — как на тесте.</li>
        <li><b>Сразу видите разбор.</b> Чтение и аудирование сайт проверяет сам и показывает ошибки.</li>
        <li><b>Отправляете ответы.</b> Тексты и расшифровки устных ответов уходят одним файлом на проверку. Их оценивают по критериям теста и показывают, как можно было ответить сильнее.</li>
      </ol>
      <p class="muted">Балл тренажёра — оценка по открытым критериям, а не официальный результат. Произношение по расшифровке оценить нельзя.</p>`]
  ];

  function render(root, focus) {
    const el = X.el;
    const toc = el('nav', { class: 'toc' });
    const body = el('div', { class: 'guide' },
      el('h1', null, 'Гид по тесту'),
      el('p', { class: 'lead' }, 'Как устроен Duolingo English Test, как считается балл и как отвечать на каждое из 13 заданий.'));
    const link = function (id, text) { toc.appendChild(el('a', { href: '#/guide/' + id }, text)); };

    toc.appendChild(el('div', { class: 'grp' }, 'О тесте'));
    GENERAL.forEach(function (g) {
      link(g[0], g[1]);
      body.appendChild(el('section', { id: 'g-' + g[0] }, el('h2', null, g[1]), el('div', { html: g[2] })));
    });

    toc.appendChild(el('div', { class: 'grp' }, 'Задания'));
    X.TYPES.forEach(function (t, i) {
      link(t.key, (i + 1) + '. ' + t.name);
      body.appendChild(el('section', { id: 'g-' + t.key, class: 'task' },
        el('div', { class: 'head' },
          el('div', null, el('h2', null, (i + 1) + '. ' + t.name), el('div', { class: 'ru' }, t.ru)),
          el('a', { class: 'btn sm', href: '#/start/type/' + t.key }, 'Тренировать')),
        el('div', { class: 'meta' },
          el('span', { class: 'chip skill-' + t.skill }, el('i', { class: 'dot' }), X.SKILL[t.skill] + (t.key === 'listening' ? ' + Writing' : '')),
          el('span', { class: 'chip plain' }, t.time),
          el('span', { class: 'chip plain' }, 'в тесте: ' + t.count)),
        el('div', { html: TASKS[t.key] })));
    });

    toc.appendChild(el('div', { class: 'grp' }, 'Дальше'));
    AFTER.forEach(function (g) {
      link(g[0], g[1]);
      body.appendChild(el('section', { id: 'g-' + g[0], class: 'task' }, el('h2', null, g[1]), el('div', { html: g[2] })));
    });

    root.replaceChildren(el('div', { class: 'guide-wrap' }, toc, body));
    if (focus) {
      const target = document.getElementById('g-' + focus);
      if (target) setTimeout(function () { target.scrollIntoView({ block: 'start' }); }, 30);
    } else window.scrollTo(0, 0);
  }

  window.DETGuide = { render: render };
})();
