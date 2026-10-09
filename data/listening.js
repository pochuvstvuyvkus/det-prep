// Interactive Listening item bank: 24 original conversation scenarios.
// il01-il12: two students. il13-il24: student and professor or advisor.
window.DET_DATA = window.DET_DATA || {};
window.DET_DATA.listening = [
  {
    id: "il01",
    kind: "peer",
    level: 2,
    partner: { name: "Maya", role: "classmate", voice: "f" },
    scenario: "You are a first-year student. Last Tuesday you missed your biology lecture because you had a bad cold. The lecture was about how plants make food, and there will be a quiz on it this Friday. You are going to talk to your classmate Maya. You want to borrow her notes and ask what the professor said about the quiz.",
    complete: [
      { pre: "You missed the biology lecture because", post: ".", a: "you had a bad cold", keys: ["cold|sick|ill"] },
      { pre: "The quiz on the lecture will take place", post: ".", a: "this Friday", keys: ["friday"] },
      { pre: "You want to ask Maya if you can", post: ".", a: "borrow her notes", keys: ["notes"] }
    ],
    turns: [
      {
        partner: "Hey! I didn't see you in biology on Tuesday. Is everything okay?",
        a: "I had a bad cold, so I stayed home. I'm much better now.",
        o: [
          "Yes, I thought Tuesday's lecture was really interesting.",
          "She had a cold, so she couldn't come to class.",
          "I'm fine. The quiz on Tuesday was easier than I expected."
        ]
      },
      {
        partner: "Oh no, I'm glad you're feeling better. You missed quite a lot, actually.",
        a: "That's what I was afraid of. Could I borrow your notes?",
        o: [
          "That's good news. I don't need to catch up, then.",
          "I would be most grateful if you could kindly provide your documentation.",
          "Sure, you can borrow my notes any time you like."
        ]
      },
      {
        partner: "Of course. They're in my notebook, but my handwriting is pretty messy. Do you want me to take photos and send them to you?",
        a: "Yes, please. Photos would be perfect, thanks.",
        o: [
          "No problem, I'll send you the photos tonight.",
          "My handwriting is messy too, so I never take notes.",
          "Yes, please send me some photos of the plants."
        ]
      },
      {
        partner: "Great, I'll send them after lunch. Is there anything else you need?",
        a: "Yes. Did the professor say anything about Friday's quiz?",
        o: [
          "No, that's everything. What did the professor say about the quiz?",
          "No, I already know everything about the quiz.",
          "Yes. Can you tell me why you missed the lecture?"
        ]
      },
      {
        partner: "He did. It will have ten short questions, and it's only about Tuesday's lecture.",
        a: "Okay, so I only need to study your notes. That helps a lot.",
        o: [
          "Okay, so I need to study the whole textbook before Friday.",
          "Ten long essays sounds like a lot of work for one quiz.",
          "Good. I'm glad the quiz was cancelled this week."
        ]
      }
    ],
    closing: "Exactly. I'll send you the photos after lunch, and good luck on Friday!",
    summary: "I talked to my classmate Maya after missing Tuesday's biology lecture because of a cold. I asked to borrow her notes, and she offered to send me photos of them after lunch. She also explained that Friday's quiz has ten short questions and only covers that lecture."
  },
  {
    id: "il02",
    kind: "peer",
    level: 2,
    partner: { name: "Daniel", role: "study-group member", voice: "m" },
    scenario: "You are a student in a maths course, and the final exam is next Thursday. You find the chapter on probability very hard. You are going to talk to Daniel, a member of your study group. You want to plan a study session with him this weekend, and you would like to meet in the library because your dorm is too noisy.",
    complete: [
      { pre: "The topic you find very hard is", post: ".", a: "the chapter on probability", keys: ["probability"] },
      { pre: "You want to study with Daniel", post: ".", a: "this weekend", keys: ["weekend"] },
      { pre: "You would like to meet in the library because", post: ".", a: "your dorm is too noisy", keys: ["noisy|noise|loud"] }
    ],
    turns: [
      {
        partner: "",
        a: "Hi Daniel! Do you have a minute to talk about the maths exam?",
        o: [
          "Good afternoon, sir. May I request a brief meeting with you?",
          "Hi Daniel! Did you enjoy the maths exam yesterday?",
          "Hi Daniel! Can you tell me when the history essay is due this week?"
        ]
      },
      {
        partner: "Sure, what's up? Are you worried about it?",
        a: "A little. I really don't understand the probability chapter.",
        o: [
          "Not at all. Probability is the easiest chapter for me.",
          "A little. He really doesn't understand the probability chapter.",
          "No, I just wanted to say hello before class."
        ]
      },
      {
        partner: "Me neither, to be honest. Maybe we could work through it together before the exam.",
        a: "That's just what I was thinking. Are you free this weekend?",
        o: [
          "That's a shame. I hoped you could study with me.",
          "Good idea. Let's do it the day after the exam.",
          "That's great. So you can explain the whole chapter to me."
        ]
      },
      {
        partner: "Saturday afternoon works for me. Where should we meet? Your dorm?",
        a: "My dorm is too noisy. How about the library?",
        o: [
          "Yes, my dorm is nice and quiet on Saturdays.",
          "Saturday afternoon is fine, thanks for asking.",
          "The library is too noisy. Let's use my dorm."
        ]
      },
      {
        partner: "The library is fine. Shall we say two o'clock on the second floor? I'll bring my old practice tests.",
        a: "Two o'clock is fine. I'll bring my notes.",
        o: [
          "Perfect. See you at two o'clock in my dorm.",
          "Thanks, but I've already seen the exam questions.",
          "Great. I will bring your old practice tests too."
        ]
      }
    ],
    closing: "Great. See you on Saturday at two in the library, then!",
    summary: "I talked to Daniel from my study group about our maths exam next Thursday. I told him I don't understand the probability chapter, and he said he finds it hard too. We agreed to study together on Saturday at two o'clock in the library, and he will bring his old practice tests."
  },
  {
    id: "il03",
    kind: "peer",
    level: 2,
    partner: { name: "Priya", role: "roommate", voice: "f" },
    scenario: "You are a new student, and your history report is due tomorrow at nine in the morning. You need to print it, but your printer has run out of ink. Your roommate Priya works part-time at the campus library. You are going to ask her how to print there, how much it costs, and when the library closes tonight.",
    complete: [
      { pre: "Your history report is due", post: ".", a: "tomorrow at nine in the morning", keys: ["tomorrow"] },
      { pre: "You cannot print at home because your printer", post: ".", a: "has run out of ink", keys: ["ink"] },
      { pre: "You are asking Priya because she", post: ".", a: "works part-time at the campus library", keys: ["works", "library"] },
      { pre: "You also want to ask Priya when the library closes and", post: ".", a: "how much printing costs", keys: ["cost|price|pay"] }
    ],
    turns: [
      {
        partner: "You look stressed. Is something wrong?",
        a: "My report is due tomorrow morning, and my printer has no ink.",
        o: [
          "My report is due next month, so I have plenty of time.",
          "Her report is due tomorrow, and her printer has no ink.",
          "Nothing at all. I printed my report an hour ago."
        ]
      },
      {
        partner: "Oh no. Well, you can always print it at the library.",
        a: "That's what I hoped. You work there, so how do I do it?",
        o: [
          "I know. I work there, so I can show you how.",
          "That's what I hoped. Can you come and fix my printer tonight?",
          "No thanks, I'd rather buy the book myself."
        ]
      },
      {
        partner: "It's easy. You log in on any library computer with your student card and send the file to the printer by the front desk.",
        a: "That sounds simple. How much does it cost?",
        o: [
          "That sounds simple. Which computer can I take home?",
          "Great. So I don't need my student card at all.",
          "Thank you for the explanation, madam. It was most informative."
        ]
      },
      {
        partner: "Ten cents a page, and you pay with your student card. Is that okay?",
        a: "That's fine. And when does the library close tonight?",
        o: [
          "Ten dollars a page is far too expensive for me.",
          "That's fine. I'll pay you back in cash next week.",
          "That's fine. And what time does the campus bookshop close tonight?"
        ]
      },
      {
        partner: "It closes at ten tonight, but the printers get busy in the evening. I'd go before eight if I were you.",
        a: "Good tip. I'll go right after dinner, around seven.",
        o: [
          "Good tip. I'll go at about half past ten, then.",
          "Thanks. I'll wait until tomorrow afternoon to print it.",
          "You should go before eight if you want to print."
        ]
      }
    ],
    closing: "Good plan. Take your student card, and tell the desk I sent you if you need help!",
    summary: "I told my roommate Priya that my history report is due tomorrow morning and my printer has no ink. She explained that I can print at the library by logging in with my student card, and that it costs ten cents a page. The library closes at ten, so I will go around seven."
  },
  {
    id: "il04",
    kind: "peer",
    level: 2,
    partner: { name: "Tom", role: "club member", voice: "m" },
    scenario: "You are a second-year student, and you want to join the university hiking club to make new friends. You have never been hiking before, and you do not own any hiking boots. You are going to talk to Tom, a club member, at the student fair. You want to know if beginners are welcome and how much it costs to join.",
    complete: [
      { pre: "You want to join the hiking club in order to", post: ".", a: "make new friends", keys: ["friends"] },
      { pre: "One problem is that you do not own", post: ".", a: "any hiking boots", keys: ["boots"] },
      { pre: "You will talk to Tom at", post: ".", a: "the student fair", keys: ["fair"] }
    ],
    turns: [
      {
        partner: "Hi there! Are you interested in the hiking club?",
        a: "Yes, I am, but I've never been hiking. Are beginners welcome?",
        o: [
          "Yes. I've been hiking for years, so I'd like to lead a trip myself.",
          "No, thanks. I'm looking for the chess club.",
          "Yes, you are. Have you never been hiking before?"
        ]
      },
      {
        partner: "Of course! About half of our members had never hiked before they joined. Our first trip is always an easy one.",
        a: "That's good to hear. Do I need any special equipment?",
        o: [
          "That's a pity. I was hoping beginners could come too.",
          "That's good to hear. I'll bring my own hiking boots, then.",
          "Half of the members left? That doesn't sound very good."
        ]
      },
      {
        partner: "Just good boots, really. But if you don't have any, the club can lend you a pair for free.",
        a: "Great, because I don't have any. How much does it cost to join?",
        o: [
          "Great. I can lend you a pair of mine if you like.",
          "Then I can't join, because boots are too expensive.",
          "So everybody has to buy boots from the club?"
        ]
      },
      {
        partner: "It's fifteen dollars for the whole year, and that covers the bus for every trip.",
        a: "That's cheaper than I expected. When is the first trip?",
        o: [
          "Fifty dollars a trip is a bit too much for me.",
          "So I have to pay for the bus every time?",
          "I will consider your proposal and respond in writing shortly."
        ]
      },
      {
        partner: "It's this Sunday. We meet at the main gate at eight in the morning. You can sign up on this list right now if you want.",
        a: "Sure, I'll sign up now. See you on Sunday at eight.",
        o: [
          "Sure, I'll sign up now. See you on Saturday evening.",
          "I'd love to, but you haven't told me the day yet.",
          "Okay. He can sign up now and come on Sunday."
        ]
      }
    ],
    closing: "Wonderful, welcome to the club! See you on Sunday at eight, and I'll have a pair of boots ready for you.",
    summary: "I talked to Tom from the hiking club at the student fair. I said I had never hiked and had no boots, and he told me beginners are welcome and the club lends boots for free. Joining costs fifteen dollars a year. I signed up for the first trip this Sunday at eight."
  },
  {
    id: "il05",
    kind: "peer",
    level: 3,
    partner: { name: "Elena", role: "lab partner", voice: "f" },
    scenario: "You are a chemistry student, and you and your lab partner, Elena, must hand in a joint lab report on Monday. You are confident with spreadsheets, so you would prefer to do the data analysis and the graphs. However, you work at a coffee shop all day Saturday, so you want to suggest dividing the tasks and checking each other's sections on Sunday evening.",
    complete: [
      { pre: "The joint lab report must be handed in", post: ".", a: "on Monday", keys: ["monday"] },
      { pre: "You would prefer to do", post: " because you are confident with spreadsheets.", a: "the data analysis and the graphs", keys: ["data", "graphs"] },
      { pre: "You cannot work on the report on Saturday because", post: ".", a: "you work at a coffee shop", keys: ["work|job|shift"] }
    ],
    turns: [
      {
        partner: "",
        a: "Hi Elena, can we talk about how to split up the lab report?",
        o: [
          "Hi Elena, I've already handed in the lab report for both of us.",
          "Hey, I've decided that you're writing the whole report.",
          "Dear Elena, I am writing to enquire about our report."
        ]
      },
      {
        partner: "Yes, good idea. It's due on Monday, so we don't have much time. Is there a part you'd rather do?",
        a: "I'm good with spreadsheets, so I could take the data analysis and graphs.",
        o: [
          "I don't mind. Spreadsheets confuse me, though, so anything except the graphs.",
          "Yes, it's due on Monday, so we don't have much time.",
          "You're comfortable with spreadsheets, so I should take the graphs."
        ]
      },
      {
        partner: "That suits me, because I'm better at writing. I'll do the introduction and the discussion. Could we meet on Saturday to put it all together?",
        a: "Sorry, I work all day Saturday. How about Sunday evening?",
        o: [
          "Saturday is perfect. I'm free the whole day.",
          "I'm afraid I work all day Sunday. Is Saturday okay?",
          "I thought you wanted to do the graphs, not the discussion."
        ]
      },
      {
        partner: "Sunday evening is cutting it a bit close, but it should be fine if we both finish our parts before then.",
        a: "Agreed. Let's each finish by Sunday afternoon and then check each other's sections.",
        o: [
          "Agreed. There's no rush, since the deadline is the following Friday.",
          "Then let's just skip the checking and hand it in as it is.",
          "You're right, Sunday is too late. Let's meet on Saturday."
        ]
      },
      {
        partner: "That works. Should we meet in person, or just share the document online?",
        a: "Let's share it online and leave comments for each other.",
        o: [
          "Yes, I think we should definitely do one of those.",
          "Let's meet in person on Saturday at the coffee shop where I work.",
          "She can share it online and leave comments for me."
        ]
      }
    ],
    closing: "Perfect. I'll set up a shared document tonight, and we'll swap sections on Sunday evening.",
    summary: "I talked to my lab partner, Elena, about dividing our chemistry lab report, which is due on Monday. I will do the data analysis and graphs, and she will write the introduction and discussion. Because I work on Saturday, we agreed to finish by Sunday afternoon and check each other's sections online that evening."
  },
  {
    id: "il06",
    kind: "peer",
    level: 3,
    partner: { name: "Marcus", role: "classmate", voice: "m" },
    scenario: "You are an engineering student, and you have to choose one elective before registration closes on Friday. You are trying to decide between a psychology course and a public speaking course. You get very nervous when you give presentations. You are going to ask your classmate Marcus for advice, because he took the public speaking course last year.",
    complete: [
      { pre: "You must choose your elective before", post: ".", a: "registration closes on Friday", keys: ["friday"] },
      { pre: "When you give presentations, you", post: ".", a: "get very nervous", keys: ["nervous|anxious|afraid|scared"] },
      { pre: "You are asking Marcus for advice because he", post: ".", a: "took the public speaking course last year", keys: ["speaking"] }
    ],
    turns: [
      {
        partner: "Hey, have you picked your elective yet? Registration closes on Friday, you know.",
        a: "Not yet. I can't decide between psychology and public speaking.",
        o: [
          "Yes, I registered for both of them last week.",
          "Not yet. Registration doesn't open until next month, though.",
          "Not yet. He can't decide between psychology and public speaking."
        ]
      },
      {
        partner: "Oh, I took public speaking last year. I thought it was one of the most useful courses I've done.",
        a: "Really? I get so nervous presenting that I'm not sure I'd cope.",
        o: [
          "Really? I love presenting, so it would be easy for me.",
          "I'm sorry to hear you didn't get much out of it.",
          "Really? I didn't know you were planning to take it again next year."
        ]
      },
      {
        partner: "Honestly, most of us were nervous at the start. The class is small, and you begin with two-minute talks, so it builds up slowly.",
        a: "That sounds less scary than I imagined. How is it graded?",
        o: [
          "A huge lecture hall full of people is exactly what I'm afraid of.",
          "That sounds less scary. So there are no talks at all?",
          "I appreciate your input and shall evaluate it in due course."
        ]
      },
      {
        partner: "There's no final exam. Your grade comes from four short speeches and a reflection you write after each one.",
        a: "No exam sounds good. Did it make you more confident?",
        o: [
          "A final exam on top of four speeches seems like too much.",
          "So the whole grade depends on one long speech?",
          "That's good, because I prefer exams to speaking in class."
        ]
      },
      {
        partner: "Definitely. I used to hate speaking in seminars, and now I volunteer to present. If presentations are your weak point, I'd take it.",
        a: "You've convinced me. I'll sign up for public speaking before Friday.",
        o: [
          "You've convinced me. I'll sign up for psychology instead.",
          "Thanks. I'll think about it and register sometime next week.",
          "I'm glad you still hate speaking in seminars as much as I do."
        ]
      }
    ],
    closing: "Good choice! Register before Friday, and I'll lend you my old course notes if you like.",
    summary: "I asked my classmate Marcus for advice about choosing an elective before registration closes on Friday. I was unsure about public speaking because presentations make me nervous. He explained that the class is small, starts with short talks, has no final exam and made him more confident, so I decided to sign up for it."
  },
  {
    id: "il07",
    kind: "peer",
    level: 3,
    partner: { name: "Sofia", role: "group member", voice: "f" },
    scenario: "You are preparing a fifteen-minute group presentation for your sociology class next Wednesday. Your group has three members: you, Sofia and Ben. Ben has not answered any messages for a week, and he still has not sent his slides. You are going to talk to Sofia. You would rather speak to Ben in person after tomorrow's seminar than complain to the tutor.",
    complete: [
      { pre: "The group presentation will be given", post: ".", a: "next Wednesday", keys: ["wednesday"] },
      { pre: "For a week, Ben has not", post: ".", a: "answered any messages", keys: ["messages"] },
      { pre: "Ben still needs to send", post: ".", a: "his slides", keys: ["slides"] },
      { pre: "Instead of complaining to the tutor, you would rather speak to Ben", post: ".", a: "in person after tomorrow's seminar", keys: ["seminar"] }
    ],
    turns: [
      {
        partner: "Have you heard anything from Ben? I've messaged him three times this week.",
        a: "Nothing at all. He hasn't sent his slides either.",
        o: [
          "Yes, he sent me his slides this morning.",
          "Nothing at all. She hasn't sent her slides either.",
          "No, but we don't present until next month anyway."
        ]
      },
      {
        partner: "This is getting worrying. We present next Wednesday. Do you think we should tell the tutor?",
        a: "I'd rather not yet. I think we should talk to Ben in person first.",
        o: [
          "Yes, let's report him right away. Talking to him would be pointless.",
          "I'd rather not. The tutor hasn't answered my messages either.",
          "There's no hurry. Next Wednesday is still a long way off."
        ]
      },
      {
        partner: "That seems fair. Maybe something's going on that we don't know about. But when would we even see him?",
        a: "He should be at tomorrow's seminar. Let's catch him afterwards.",
        o: [
          "He never comes to class, so there's no way to see him.",
          "We could try to catch him after the presentation next Wednesday.",
          "You're right. I'll tell the tutor what's going on with him."
        ]
      },
      {
        partner: "Okay. And what if he doesn't show up, or says he can't do his part?",
        a: "Then we split his section between us and let the tutor know.",
        o: [
          "Then we cancel the presentation and hope the tutor doesn't notice.",
          "Then he'll be glad we did his slides for him.",
          "I don't think the tutor will show up to the seminar."
        ]
      },
      {
        partner: "That sounds like a sensible backup. His part is on research methods, which I know fairly well. I could draft those slides just in case.",
        a: "That would be great. I'll finish the conclusion so we're covered either way.",
        o: [
          "That would be great. I didn't know you'd already told the tutor.",
          "Thanks, but research methods is my section, not Ben's.",
          "Good. Then you can present all fifteen minutes on your own."
        ]
      }
    ],
    closing: "Deal. Let's both talk to Ben after the seminar tomorrow, and I'll have a draft of his slides ready in case we need it.",
    summary: "Sofia and I discussed our sociology presentation next Wednesday, because Ben has ignored our messages and has not sent his slides. Instead of going to the tutor, we decided to speak to him after tomorrow's seminar. As a backup, Sofia will draft his slides on research methods, and I will finish the conclusion."
  },
  {
    id: "il08",
    kind: "peer",
    level: 3,
    partner: { name: "Kenji", role: "older student", voice: "m" },
    scenario: "You are thinking about applying for an exchange semester in Spain, and the application deadline is the end of this month. You are worried about two things: whether you can afford it, and whether the courses there will count towards your degree. You are going to talk to Kenji, an older student in your department who spent last spring in Madrid.",
    complete: [
      { pre: "The deadline for the exchange application is", post: ".", a: "the end of this month", keys: ["end", "month"] },
      { pre: "Besides the cost, you are worried about whether the courses will", post: ".", a: "count towards your degree", keys: ["degree"] },
      { pre: "Kenji is an older student who spent last spring", post: ".", a: "in Madrid", keys: ["madrid"] }
    ],
    turns: [
      {
        partner: "",
        a: "Hi Kenji, I heard you did an exchange in Madrid. Could I ask you about it?",
        o: [
          "Hi Kenji, I heard you're going to Madrid next year. Are you getting excited?",
          "Hi Kenji, I've just come back from my exchange in Madrid.",
          "Excuse me, Professor, could you sign my exchange application?"
        ]
      },
      {
        partner: "Sure, I love talking about it! Are you thinking of applying?",
        a: "I am, but I'm not sure I can afford a whole semester abroad.",
        o: [
          "I am, and luckily money isn't something I need to think about.",
          "No, I've already been accepted and paid for everything.",
          "You are, but you're not sure you can afford it."
        ]
      },
      {
        partner: "I had the same worry. But you keep paying your normal tuition here, and there's an exchange grant that covered most of my rent.",
        a: "I didn't know about the grant. How do you apply for it?",
        o: [
          "So I'd have to pay tuition at both universities? That's impossible.",
          "It's a shame there's no financial support for exchange students.",
          "That's helpful. I'm glad the grant covered your tuition here."
        ]
      },
      {
        partner: "It's part of the main application, so you just tick a box and add a short budget plan. What else is on your mind?",
        a: "I'm also worried that the courses won't count towards my degree.",
        o: [
          "Nothing else. That was my only question, so tell me about the courses.",
          "I'm also worried that the grant needs a separate application.",
          "I'm also worried that your courses won't count towards your degree."
        ]
      },
      {
        partner: "That's a real risk if you don't plan ahead. I got my course choices approved by our department coordinator before I left, and every credit transferred.",
        a: "That's reassuring. I'll book a meeting with the coordinator this week.",
        o: [
          "That's reassuring. I'll sort out the approval after I get back.",
          "Oh dear. Losing all your credits must have been frustrating.",
          "So the coordinator in Madrid chooses the courses for you?"
        ]
      }
    ],
    closing: "Good idea. Send me a message afterwards, and I'll show you my budget plan so you can apply before the deadline.",
    summary: "I asked Kenji, an older student who studied in Madrid, about applying for an exchange semester. He told me that I would keep paying normal tuition and could get a grant through the main application. He also advised getting my courses approved in advance, so I will meet the department coordinator this week."
  },
  {
    id: "il09",
    kind: "peer",
    level: 4,
    partner: { name: "Hannah", role: "classmate", voice: "f" },
    scenario: "You have written a draft essay for your media studies seminar, arguing that social media has weakened public debate. The essay is due in five days, and it is currently six hundred words over the limit. You suspect the argument loses focus in the middle section. You asked your classmate Hannah to read it, and you want her honest criticism rather than polite praise.",
    complete: [
      { pre: "Your essay argues that social media has", post: ".", a: "weakened public debate", keys: ["debate"] },
      { pre: "At the moment, the draft is", post: ".", a: "six hundred words over the limit", keys: ["words|long|limit"] },
      { pre: "You suspect that in the middle section the argument", post: ".", a: "loses focus", keys: ["focus"] }
    ],
    turns: [
      {
        partner: "So, I read your draft last night. Do you want the polite version or the honest one?",
        a: "The honest one, please. I'd rather hear it from you than from the marker.",
        o: [
          "The polite one, please. I'm really only looking for encouragement.",
          "The honest one, please. I'd rather hear it from the marker than from you.",
          "Whichever you prefer. I haven't actually started writing it yet."
        ]
      },
      {
        partner: "Fair enough. The opening is genuinely strong, and your position is clear from the first paragraph. But somewhere around page four, I started to lose the thread.",
        a: "I suspected the middle was the weak point. What goes wrong there?",
        o: [
          "That surprises me. I thought the middle section was by far the strongest part.",
          "So the opening is the problem? I can rewrite the first paragraph.",
          "I'm relieved you could follow the argument the whole way through."
        ]
      },
      {
        partner: "You bring in three or four historical examples, and they're interesting, but it isn't obvious how each one supports your claim about public debate. They read more like a list than an argument.",
        a: "So I should either tie each example back to my main claim or drop it?",
        o: [
          "So you think I need three or four more examples to make the point?",
          "Right, so the examples are dull, but at least they're clearly relevant.",
          "I see. Then I should present them as a list so it's easier to read."
        ]
      },
      {
        partner: "Exactly. And honestly, cutting one or two might do you a favour, because I noticed you're well over the word limit.",
        a: "True, I'm about six hundred words over, so that would solve two problems at once.",
        o: [
          "True, I'm about six hundred words under, so I need to add more.",
          "Actually, I'm well within the limit, so length isn't a concern.",
          "True. Cutting the opening would help, since it's the weakest part."
        ]
      },
      {
        partner: "That's how I'd approach it. If you like, I could look at the revised middle section before you submit, as long as I get it a couple of days ahead.",
        a: "I'd appreciate that. I'll send you the new section within two days.",
        o: [
          "I'd appreciate that. I'll send it to you the night before the deadline.",
          "That's kind, but you've already seen the revised section, haven't you?",
          "Sure, I can look at your revised section a couple of days ahead."
        ]
      }
    ],
    closing: "Perfect. Send me the revised section within two days, and I'll read it before you submit.",
    summary: "My classmate Hannah gave me honest feedback on my media studies essay. She said the opening was strong, but the historical examples in the middle did not clearly support my claim. Since I am six hundred words over the limit, I will cut or link the examples and send her the revised section within two days."
  },
  {
    id: "il10",
    kind: "peer",
    level: 4,
    partner: { name: "Omar", role: "friend", voice: "m" },
    scenario: "You are a third-year economics student with two offers for the summer: a paid internship at a consulting firm in another city, and an unpaid research assistantship in your own department. You hope to apply for a doctoral programme eventually, and the firm expects your answer by Friday. You want advice from your friend Omar, who interned at the same firm last summer.",
    complete: [
      { pre: "The internship you have been offered is at", post: " in another city.", a: "a consulting firm", keys: ["consulting"] },
      { pre: "Unlike the internship, the research assistantship is", post: ".", a: "unpaid and in your own department", keys: ["unpaid"] },
      { pre: "In the long term, you hope to", post: ".", a: "apply for a doctoral programme", keys: ["doctoral|phd|doctorate"] },
      { pre: "The firm expects you to", post: ".", a: "give your answer by Friday", keys: ["friday"] }
    ],
    turns: [
      {
        partner: "Congratulations on the offer! You don't look as thrilled as I expected, though. What's holding you back?",
        a: "Thanks. I've also been offered a research assistantship, though, and I can't do both.",
        o: [
          "Thanks. The thing is, I haven't had any other offers, so there's nothing left to decide.",
          "Thanks. Nothing at all, honestly: I accepted it the moment it arrived.",
          "Congratulations to you too. When do you have to give them your answer?"
        ]
      },
      {
        partner: "Ah, I see the dilemma. Well, I can tell you the internship was intense, but I learned a huge amount about working with clients, and the salary certainly didn't hurt.",
        a: "The money is tempting, I admit, since the research position is unpaid.",
        o: [
          "The money isn't really a factor, since both positions pay about the same.",
          "That's a pity. I'd assumed the firm paid its interns something.",
          "It sounds as though you didn't get much out of it, then."
        ]
      },
      {
        partner: "That's a real consideration. But let me ask you something: where do you actually see yourself in five years? In a firm like that, or somewhere else?",
        a: "Ideally in academia. I'm hoping to apply for a doctoral programme.",
        o: [
          "In five years the internship will be long over, I suppose.",
          "Ideally in consulting, which is why research has never appealed to me.",
          "I see you in a firm like that, to be perfectly honest."
        ]
      },
      {
        partner: "Then, to be frank, I'd think hard before taking the internship. Admissions committees tend to care far more about research experience and a strong reference from a professor than about a company name.",
        a: "That's my instinct too. I just worry about getting through the summer with no income.",
        o: [
          "So you're saying the company name matters most to admissions committees?",
          "That settles it. I'll take the internship for the sake of the reference.",
          "I hadn't realised the research post came with such a generous salary."
        ]
      },
      {
        partner: "Have you asked the department whether there's any funding? When I was looking, a few professors had small summer grants for assistants. It might not be much, but it's worth raising before Friday.",
        a: "I hadn't thought of that. I'll ask the professor tomorrow, then answer the firm.",
        o: [
          "I hadn't thought of that. I'll ask the firm whether they offer any research grants.",
          "Good point. I'll raise it with the department once Friday has passed.",
          "Yes, I asked last week, and they told me there's plenty of funding."
        ]
      }
    ],
    closing: "That sounds like a plan. Talk to the professor first, and whatever you decide, let the firm know by Friday.",
    summary: "I asked my friend Omar whether to accept a paid consulting internship or an unpaid research assistantship. He said the internship taught him a lot, but research experience matters more for doctoral applications. Because I was worried about money, he suggested asking the department about summer funding before I answer the firm on Friday."
  },
  {
    id: "il11",
    kind: "peer",
    level: 4,
    partner: { name: "Ingrid", role: "teammate", voice: "f" },
    scenario: "You and your teammate Ingrid are doing a research methods project on students' sleep habits. Ingrid spent the whole weekend writing an online questionnaire with forty questions. You tested it on five friends, and only two of them finished it. You want to persuade her, tactfully, to shorten the questionnaire and to add a few short interviews instead.",
    complete: [
      { pre: "Your research project is about", post: ".", a: "students' sleep habits", keys: ["sleep"] },
      { pre: "Ingrid spent the whole weekend", post: ".", a: "writing an online questionnaire", keys: ["questionnaire"] },
      { pre: "You want to persuade Ingrid to shorten the questionnaire and", post: ".", a: "add a few short interviews", keys: ["interviews"] }
    ],
    turns: [
      {
        partner: "",
        a: "Ingrid, thanks for all your work on the questionnaire. Could we go over a few things?",
        o: [
          "Ingrid, the questionnaire is a disaster. We'll have to start again from scratch.",
          "Ingrid, thanks for the interviews you ran this weekend. They were really useful.",
          "Ingrid, I finished writing our questionnaire this weekend. Would you like to have a look at it?"
        ]
      },
      {
        partner: "Of course. I'll admit I got a bit carried away, but I wanted to make sure we covered everything. What did you notice?",
        a: "I tried it out on five friends, and only two of them made it to the end.",
        o: [
          "I tried it out on five friends, and all of them finished it easily.",
          "Nothing important. I think it's ready to send out to everyone exactly as it is.",
          "You tried it out on five friends, and only two reached the end."
        ]
      },
      {
        partner: "Oh. That's a worse completion rate than I'd have guessed. Do you think it's the length, or are some of the questions confusing?",
        a: "Mostly the length, I think. Forty questions is a lot to ask of busy students.",
        o: [
          "Mostly the length. With only ten questions, people feel it isn't worth starting.",
          "Yes, I agree that it's one of those two things.",
          "The completion rate was actually better than I had expected."
        ]
      },
      {
        partner: "I take the point, but if we cut it down drastically, won't we lose the detail? I'd hate to end up with data that's too thin to say anything meaningful.",
        a: "Fair point. What if we kept the core questions and got the detail from a few interviews?",
        o: [
          "That's a fair concern, so let's add another twenty questions to be on the safe side.",
          "Detail doesn't really matter in a student project like this one, to be honest.",
          "You're right. We'd lose nothing at all by cutting the questionnaire in half."
        ]
      },
      {
        partner: "Hmm, that could actually work: a shorter survey for breadth and interviews for depth. It would even give us something to say in the methodology section. How many interviews were you imagining?",
        a: "Five or six, around ten minutes each. I can run them.",
        o: [
          "I was imagining about forty, each lasting an hour or so.",
          "I'd say the methodology section should be about two pages long.",
          "None, actually. I think the questionnaire alone will give us enough depth."
        ]
      }
    ],
    closing: "Deal. I'll cut the questionnaire down to the core questions by Friday, and you set up the interviews.",
    summary: "I talked to my teammate Ingrid about her forty-question survey for our project on students' sleep habits. I explained that only two of five friends finished it. She worried about losing detail, so I suggested a shorter survey plus a few short interviews. She will trim the questionnaire, and I will run the interviews."
  },
  {
    id: "il12",
    kind: "peer",
    level: 4,
    partner: { name: "Lucas", role: "committee member", voice: "m" },
    scenario: "You and Lucas are on the committee of the university debating society, which is holding its annual guest lecture next Thursday. Yesterday the invited journalist cancelled because of illness, although over a hundred people have already reserved seats. The hall cannot be rebooked this term, so you would prefer to find a replacement speaker from the politics department rather than postpone the event.",
    complete: [
      { pre: "The invited journalist cancelled", post: ".", a: "because of illness", keys: ["ill|sick|unwell"] },
      { pre: "Postponing is difficult because the hall", post: ".", a: "cannot be rebooked this term", keys: ["booked|book|available|reserve"] },
      { pre: "You would prefer to find a replacement speaker from", post: ".", a: "the politics department", keys: ["politics"] }
    ],
    turns: [
      {
        partner: "I take it you've seen the email? Our speaker's pulled out, with barely a week to go.",
        a: "I have. It's bad luck, but nobody can help being ill.",
        o: [
          "I have. It's a relief that the journalist is still able to come.",
          "No, what email? I thought the lecture had already taken place.",
          "I have. Frankly, it serves us right for inviting a politician."
        ]
      },
      {
        partner: "True. The question is what we do now. My first thought was simply to postpone until the journalist has recovered.",
        a: "I'd be reluctant to do that, because the hall can't be rebooked this term.",
        o: [
          "I agree. The hall is free every week, so rebooking will be easy.",
          "I'd be reluctant to do that, because hardly anyone has reserved a seat anyway.",
          "My first thought was the same: close down the society altogether."
        ]
      },
      {
        partner: "Ah, I hadn't checked that. So if we postpone, we're effectively cancelling. What's the alternative, then?",
        a: "We could ask someone from the politics department to step in as a replacement.",
        o: [
          "We could wait and see whether the journalist has recovered by next term.",
          "The alternative, as you say, is to postpone it for a few weeks.",
          "We could ask the journalist to give the lecture next Thursday after all."
        ]
      },
      {
        partner: "That might work, though it's very short notice. And people signed up to hear a journalist, not one of their own lecturers. Won't some of them feel short-changed?",
        a: "Some might, so we should email everyone, explain the change and let them cancel their seats.",
        o: [
          "Probably, which is why we'd better not tell anyone until the night itself.",
          "They signed up to hear a lecturer, so they should be perfectly satisfied.",
          "Short notice shouldn't be a problem, as the lecture is months away."
        ]
      },
      {
        partner: "That seems honest, at least. I know Dr. Varga from my comparative politics module, and she's spoken about press freedom before, so the theme would still fit. Shall I approach her?",
        a: "Please do. If she agrees, I'll draft the email to the audience.",
        o: [
          "Please do. If she refuses, we can announce her as the new speaker anyway.",
          "Please do, although press freedom has nothing to do with journalism.",
          "Yes, I'll approach her, since she taught my comparative politics module."
        ]
      }
    ],
    closing: "Right. I'll speak to Dr. Varga this afternoon, and you prepare the email so it can go out as soon as she confirms.",
    summary: "Lucas and I discussed what to do after the journalist booked for the debating society's guest lecture cancelled because of illness. Since the hall cannot be rebooked this term, we decided not to postpone. Lucas will ask Dr. Varga from the politics department to speak, and I will email everyone who reserved a seat."
  },
  {
    id: "il13",
    kind: "professor",
    level: 2,
    partner: { name: "Professor Reed", role: "professor", voice: "f" },
    scenario: "You are a student in Professor Reed's English literature class. Your essay is due this Friday, but you were in hospital for three days last week with a stomach infection. You have only written half of the essay. You are going to visit her during office hours. You want to ask for one more week, and you have a doctor's note.",
    complete: [
      { pre: "Last week you could not work on your essay because", post: ".", a: "you were in hospital", keys: ["hospital"] },
      { pre: "So far, you have written", post: ".", a: "half of the essay", keys: ["half"] },
      { pre: "You want to ask Professor Reed for", post: ".", a: "one more week", keys: ["week"] }
    ],
    turns: [
      {
        partner: "",
        a: "Good afternoon, Professor Reed. Could we talk about my essay?",
        o: [
          "Hey, what's up? I need more time for the essay, okay?",
          "Good afternoon, Professor Reed. I've come to hand in my finished essay.",
          "Good afternoon, Professor Reed. Could you tell me my exam grade?"
        ]
      },
      {
        partner: "Of course, come in and sit down. What's the problem?",
        a: "I was in hospital for three days last week, so I've fallen behind.",
        o: [
          "There's no problem. I just wanted to say I enjoy your class.",
          "You were in hospital last week, so the essay is late.",
          "I went on holiday last week, so I didn't write anything."
        ]
      },
      {
        partner: "I'm sorry to hear that. I hope you're feeling better. How much of the essay have you written?",
        a: "Thank you, I am. I've written about half of it.",
        o: [
          "Thank you. I've finished it, but I'd like to check it again.",
          "Thank you. The essay is about a nineteenth-century novel.",
          "Thanks. I haven't even chosen a topic yet."
        ]
      },
      {
        partner: "I see. And what would you like me to do?",
        a: "Could I possibly have one more week? I have a doctor's note.",
        o: [
          "Just give me an extra month and stop asking so many questions.",
          "Would it be possible for you to write the second half for me?",
          "Could I have one more week? I don't have a doctor's note, though."
        ]
      },
      {
        partner: "That seems reasonable. Please email me the doctor's note today, and I'll move your deadline to next Friday.",
        a: "Thank you so much. I'll send the note this afternoon.",
        o: [
          "Thank you. I'll send the note after I hand in the essay.",
          "Thank you. So my new deadline is this Friday?",
          "Great. You can email me the note whenever you like."
        ]
      }
    ],
    closing: "Good, your new deadline is next Friday, then. Take care of yourself, and come and see me if you need help with the essay.",
    summary: "I visited Professor Reed in her office hours to ask for an extension on my English literature essay. I explained that I had been in hospital for three days and had only written half of it. She agreed to move the deadline to next Friday, and I promised to email her my doctor's note today."
  },
  {
    id: "il14",
    kind: "professor",
    level: 2,
    partner: { name: "Professor Novak", role: "professor", voice: "m" },
    scenario: "You are taking Professor Novak's introduction to economics course, and the midterm exam is next Monday. You missed the review class yesterday because you had to work at the bookshop. You are going to talk to him after today's lecture. You want to know which chapters are on the exam and whether you can use a calculator.",
    complete: [
      { pre: "The midterm exam will take place", post: ".", a: "next Monday", keys: ["monday"] },
      { pre: "You missed the review class because", post: ".", a: "you had to work at the bookshop", keys: ["work|job|shift"] },
      { pre: "You plan to talk to Professor Novak", post: ".", a: "after today's lecture", keys: ["lecture"] },
      { pre: "Besides the chapters, you want to know whether you can", post: ".", a: "use a calculator", keys: ["calculator"] }
    ],
    turns: [
      {
        partner: "Hello. You look like you have a question for me.",
        a: "Yes, Professor. I missed the review class, so I'd like to ask about the midterm.",
        o: [
          "Yeah, I skipped your class yesterday because it's boring.",
          "Yes, Professor. I enjoyed the review class yesterday very much, so I'd like another one.",
          "Yes, Professor. Could you tell me about the final project?"
        ]
      },
      {
        partner: "I see. Yes, I noticed you weren't there. What would you like to know?",
        a: "Could you tell me which chapters will be on the exam?",
        o: [
          "Could you tell me why you weren't in class yesterday?",
          "I'd like to know when the exam is. Is it in July?",
          "I don't really have any questions. I just came to say hello."
        ]
      },
      {
        partner: "The exam covers chapters one to five. Chapter six is not included, so you don't need to study it.",
        a: "Thank you. And may we use a calculator?",
        o: [
          "So I should start with chapter six, then.",
          "Thank you. And will chapter six be on the exam?",
          "Okay. Five chapters is too many, so I'll study only two."
        ]
      },
      {
        partner: "Yes, a simple calculator is fine, but you cannot use your phone. Is there anything else?",
        a: "Yes, one more thing. Are there any practice questions I could use?",
        o: [
          "Great, then I'll use the calculator on my phone.",
          "No, that's all. What kind of questions are in the exam?",
          "Yes. Can we use a calculator in the exam, Professor?"
        ]
      },
      {
        partner: "Yes. I put a practice test on the course website yesterday. Try it at home, and bring any questions to my office on Thursday.",
        a: "I'll do the practice test tonight and come on Thursday if I get stuck.",
        o: [
          "I'll come on Thursday, and then you can give me the practice test.",
          "I'll do the practice test and come to your office after the exam.",
          "Thanks. I hope you do well on the practice test."
        ]
      }
    ],
    closing: "Good. Remember, it's chapters one to five, and come to my office on Thursday if the practice test gives you trouble.",
    summary: "After the lecture, I asked Professor Novak about next Monday's economics midterm because I had missed the review class. He said the exam covers chapters one to five and that a simple calculator is allowed, but not a phone. He also told me to try the practice test online and visit his office on Thursday with questions."
  },
  {
    id: "il15",
    kind: "professor",
    level: 2,
    partner: { name: "Professor Lin", role: "professor", voice: "f" },
    scenario: "You are a first-year student in Professor Lin's statistics course. You got low marks on your last two homework tasks because you do not understand how to read the graphs. The next homework is due on Wednesday. You are going to visit Professor Lin in her office. You want to ask her for help and find out if there is a free tutor.",
    complete: [
      { pre: "You got low marks because you do not understand", post: ".", a: "how to read the graphs", keys: ["graphs"] },
      { pre: "The next homework is due", post: ".", a: "on Wednesday", keys: ["wednesday"] },
      { pre: "You also want to find out if there is", post: ".", a: "a free tutor", keys: ["tutor"] }
    ],
    turns: [
      {
        partner: "Come in! How can I help you today?",
        a: "Hello, Professor Lin. I'm having trouble with the statistics homework.",
        o: [
          "Hi! I'm here because the homework is way too easy for me.",
          "Hello, Professor Lin. How can I help you today?",
          "Hello, Professor Lin. I'd like to talk about my history essay, if that's okay."
        ]
      },
      {
        partner: "Yes, I saw that your last two marks were quite low. Which part is difficult for you?",
        a: "I don't really understand how to read the graphs.",
        o: [
          "My last two marks were very high, actually.",
          "Nothing is difficult. I just didn't have time to do it.",
          "She doesn't really understand how to read the graphs."
        ]
      },
      {
        partner: "That's a common problem, so don't worry. Let's look at one together. Do you have the last homework with you?",
        a: "Yes, I have it here. Could we look at question three?",
        o: [
          "Yes, I do. I'll bring it to you next week.",
          "No, I don't worry about common problems.",
          "Yes, here it is. But I'd rather not look at it now."
        ]
      },
      {
        partner: "Sure. Look here: the line goes up when sales go up. Always read the names on the two sides of the graph first.",
        a: "Oh, I see. I never looked at the names on the sides before.",
        o: [
          "Oh, I see. So the line goes down when sales go up.",
          "Yes, I know. I always do that first, so that isn't my problem.",
          "Thanks. Is there anything else I can help you with?"
        ]
      },
      {
        partner: "Good, you just need more practice. There's also a free tutor in the maths centre every Tuesday afternoon. Would you like to go?",
        a: "Yes, please. I'll go this Tuesday afternoon.",
        o: [
          "Yes, please. I'll go on Thursday, after I hand in the homework.",
          "No, thank you. I can't pay for a tutor right now.",
          "Yes. I'd like to be a tutor in the maths centre."
        ]
      }
    ],
    closing: "Excellent. Go to the maths centre on Tuesday, and I'm sure your homework on Wednesday will be better.",
    summary: "I went to Professor Lin's office because I got low marks on two statistics homework tasks. I told her I could not read the graphs, so she explained one question and advised me to read the names on the sides first. She also suggested the free tutor on Tuesdays, and I agreed to go."
  },
  {
    id: "il16",
    kind: "professor",
    level: 2,
    partner: { name: "Professor Carter", role: "professor", voice: "m" },
    scenario: "You are a student in Professor Carter's physics course. Your lab group meets on Thursday evenings, but you have just started a new job at a restaurant, and you must work every Thursday evening. You are going to speak to Professor Carter after class. You want to move to the Tuesday morning lab group, which fits your timetable.",
    complete: [
      { pre: "At the moment, your lab group meets", post: ".", a: "on Thursday evenings", keys: ["thursday"] },
      { pre: "You have just started a new job", post: ".", a: "at a restaurant", keys: ["restaurant"] },
      { pre: "You want to move to", post: ".", a: "the Tuesday morning lab group", keys: ["tuesday"] }
    ],
    turns: [
      {
        partner: "",
        a: "Excuse me, Professor Carter. Could I ask you about my lab group?",
        o: [
          "Hey, Carter! I need a new lab group right now.",
          "Excuse me, Professor Carter. Could I ask you about my exam mark?",
          "Excuse me, Professor Carter. I'd like to leave the physics course."
        ]
      },
      {
        partner: "Yes, of course. Is there a problem with your group?",
        a: "The group is fine, but I can't come on Thursday evenings any more.",
        o: [
          "Yes. The other students in my group are very lazy.",
          "The group is fine, and Thursday evenings suit me perfectly.",
          "The group is fine, but he can't come on Thursday evenings."
        ]
      },
      {
        partner: "Oh, why is that? You came to the first three labs.",
        a: "I have a new job, and I work every Thursday evening.",
        o: [
          "I've started a new job, and I work every Tuesday morning.",
          "Because the labs are boring, and I don't like them.",
          "Yes, I came to the first three labs."
        ]
      },
      {
        partner: "I understand. We have two other groups: Tuesday morning and Friday afternoon. Would one of those work for you?",
        a: "Tuesday morning would be perfect. I have no classes then.",
        o: [
          "Thursday evening would be the best time for me.",
          "Neither, I'm afraid. I'm busy every morning this term.",
          "Friday afternoon, please. I work at the restaurant at that time."
        ]
      },
      {
        partner: "Good, there is one free place in that group. You need to fill in a change form on the course website before Friday.",
        a: "Thank you. I'll fill in the form tonight.",
        o: [
          "Thank you. I'll fill in the form next month.",
          "Thank you. Could you fill in the form for me, then?",
          "So there are no free places in the Tuesday group?"
        ]
      }
    ],
    closing: "Great. Once I get the form, I'll add you to the Tuesday morning group, and I'll see you in the lab next week.",
    summary: "I spoke to Professor Carter after class about changing my physics lab group. I explained that my new job means I cannot attend on Thursday evenings any more. He offered Tuesday morning or Friday afternoon, and I chose Tuesday morning. I must fill in a change form on the course website before Friday."
  },
  {
    id: "il17",
    kind: "professor",
    level: 3,
    partner: { name: "Professor Alvarez", role: "professor", voice: "f" },
    scenario: "You are a final-year biology student applying for a master's programme in marine science. The application is due on the fifteenth of March and requires two reference letters. You took two courses with Professor Alvarez and wrote your best research paper for her. You are going to her office to ask whether she would write a letter for you.",
    complete: [
      { pre: "You are applying for a master's programme in", post: ".", a: "marine science", keys: ["marine"] },
      { pre: "The application requires", post: ".", a: "two reference letters", keys: ["letters"] },
      { pre: "For Professor Alvarez, you wrote", post: ".", a: "your best research paper", keys: ["paper"] }
    ],
    turns: [
      {
        partner: "Hello! It's nice to see you again. What brings you to my office?",
        a: "Hello, Professor. I'm applying for a master's in marine science and wanted to ask a favour.",
        o: [
          "Hello, Professor. I've just been accepted, so I came to say goodbye.",
          "Hi there! I need you to write something for me, and fast.",
          "Hello, Professor Alvarez. I'm hoping to take a course with you for the very first time next year."
        ]
      },
      {
        partner: "Marine science? That's wonderful news. How can I help?",
        a: "The application needs two reference letters. Would you be willing to write one?",
        o: [
          "The application needs two reference letters, so I'll write both myself.",
          "I was hoping you could tell me what marine science is.",
          "Would you be willing to check my application for the biology course?"
        ]
      },
      {
        partner: "I'd be glad to. You did excellent work in both of my courses. When is the deadline?",
        a: "It's the fifteenth of March. I hope that's enough time.",
        o: [
          "It was the fifteenth of March, so I'm afraid we've missed it.",
          "Thank you. I really enjoyed both of your courses as well.",
          "I'm not sure. I haven't looked at the application yet."
        ]
      },
      {
        partner: "That should be fine. To write a strong letter, though, I'll need some information from you. Could you send me your CV and a short statement about why you chose this programme?",
        a: "Of course. Shall I also send the research paper I wrote for you?",
        o: [
          "Of course. Could you send me your CV as well?",
          "I'd rather not. I think the letter should be short anyway.",
          "Of course. I'll send them to you as soon as the deadline has passed."
        ]
      },
      {
        partner: "Yes, please do. That paper was impressive, and I'd like to mention it. If I have everything by the end of this week, the letter will be ready well before the deadline.",
        a: "I'll email you everything by Friday. Thank you.",
        o: [
          "I'll email you everything at the end of March. Thank you.",
          "Thank you. I'm glad you don't need anything else from me.",
          "Thanks. It's a pity you can't remember the paper."
        ]
      }
    ],
    closing: "You're very welcome. Send me the documents by Friday, and I'll submit the letter well before the fifteenth of March.",
    summary: "I asked Professor Alvarez to write a reference letter for my application to a master's programme in marine science, which is due on the fifteenth of March. She agreed and asked for my CV, a short statement and my research paper. I promised to email everything by Friday so she can submit the letter in time."
  },
  {
    id: "il18",
    kind: "professor",
    level: 3,
    partner: { name: "Professor Bennett", role: "professor", voice: "m" },
    scenario: "You are a history student, and Professor Bennett has just returned your essay on the Industrial Revolution with a lower grade than you expected. His written comment says that you describe events but do not analyse them. Your next essay is due in three weeks. You are going to his office to ask what he means and how you can improve.",
    complete: [
      { pre: "Your essay was about", post: ".", a: "the Industrial Revolution", keys: ["industrial"] },
      { pre: "The grade you received was", post: ".", a: "lower than you expected", keys: ["lower|low|worse"] },
      { pre: "According to the comment, you", post: " but do not analyse them.", a: "describe events", keys: ["describe"] },
      { pre: "Your next essay is due", post: ".", a: "in three weeks", keys: ["weeks"] }
    ],
    turns: [
      {
        partner: "Come in. I assume you've come about your essay grade?",
        a: "Yes, Professor. I'd like to understand your comment better.",
        o: [
          "Yes, and I think you made a mistake. Change it, please.",
          "Yes, Professor. I was delighted that it was higher than I expected.",
          "No, Professor. I've come about the grade for my essay."
        ]
      },
      {
        partner: "I'm glad you came. Your essay was well organised and full of accurate facts. The trouble is that it mostly told me what happened.",
        a: "Is that what you meant by describing events instead of analysing them?",
        o: [
          "So the main problem was that my facts were wrong?",
          "Thank you. I'm pleased you thought the analysis was so strong.",
          "Is that why you wrote that it was badly organised?"
        ]
      },
      {
        partner: "Exactly. Analysis means explaining why something happened and why it matters. For example, you wrote that factories grew quickly, but you didn't ask why they grew in that region and not elsewhere.",
        a: "I see. So I should ask why, not just list what happened.",
        o: [
          "I see. So I should add more dates and facts about the factories.",
          "But my essay did explain why factories grew in that region.",
          "I see. So analysis means telling the story in the correct order."
        ]
      },
      {
        partner: "That's it. A useful trick is to finish each paragraph with a sentence that begins: This matters because. It forces you to make a point.",
        a: "That's useful. Could I show you an outline of my next essay?",
        o: [
          "I see. So every paragraph should begin with a long list of events.",
          "That seems unnecessary, since I already do that in every paragraph.",
          "Good trick. I'll use it when I rewrite your comment."
        ]
      },
      {
        partner: "Certainly. The next essay is due in three weeks, so bring me an outline by the end of next week, and we'll check that each section has an argument.",
        a: "Thank you, Professor. I'll bring the outline next week.",
        o: [
          "Thank you. I'll bring the outline in a month or so.",
          "Thank you. I'll bring the finished essay tomorrow, then.",
          "Thanks. So you'll write the outline and send it to me?"
        ]
      }
    ],
    closing: "Good, I'll see you next week with your outline. I think your next essay will be much stronger.",
    summary: "I met Professor Bennett to discuss the low grade on my Industrial Revolution essay. He explained that I described events instead of analysing why they happened and why they matter. He suggested ending each paragraph with a sentence explaining its importance. I will bring him an outline of my next essay by the end of next week."
  },
  {
    id: "il19",
    kind: "professor",
    level: 3,
    partner: { name: "Dr. Okafor", role: "academic advisor", voice: "f" },
    scenario: "You are a second-year computer science student, and you are meeting your academic advisor, Dr. Okafor. You have become interested in graphic design and would like to add it as a minor. However, you are worried that the extra courses will delay your graduation. You want to find out how many courses the minor requires and whether you can still finish on time.",
    complete: [
      { pre: "Your main subject is", post: ".", a: "computer science", keys: ["computer"] },
      { pre: "You would like to add a minor in", post: ".", a: "graphic design", keys: ["design"] },
      { pre: "You are worried that the extra courses will delay", post: ".", a: "your graduation", keys: ["graduation"] }
    ],
    turns: [
      {
        partner: "",
        a: "Good morning, Dr. Okafor. I'd like to ask you about adding a minor.",
        o: [
          "Morning! I'm dropping computer science, so sort it out for me.",
          "Good morning, Dr. Okafor. I'd like to ask about changing my advisor.",
          "Good morning, Dr. Okafor. I'm here because I'm about to graduate."
        ]
      },
      {
        partner: "Good morning. A minor is a nice idea. Which subject are you thinking of?",
        a: "Graphic design. I've become really interested in it this year.",
        o: [
          "Computer science. I've become really interested in it.",
          "I haven't thought about a subject at all, to be honest.",
          "Graphic design, although I don't find it interesting."
        ]
      },
      {
        partner: "That combines well with computer science, especially if you want to work on apps or websites. Do you have any concerns about it?",
        a: "Yes. I'm worried that the extra courses might delay my graduation.",
        o: [
          "No, none. Graduating a year late doesn't bother me.",
          "Yes. I'm worried that design can't be combined with computer science.",
          "Yes. You're worried that the courses might delay my graduation."
        ]
      },
      {
        partner: "Let's look at the numbers. The minor requires five courses. One of them, web design, is already on your computer science plan, so it counts twice.",
        a: "So I'd only need four more. Could they fit into two years?",
        o: [
          "So I'd need six extra courses. That sounds impossible.",
          "So web design doesn't count for anything? That's disappointing.",
          "That's good. Then I don't need to take any design courses at all."
        ]
      },
      {
        partner: "Yes, if you take one each semester in place of a free elective. You would still graduate on time. The form to declare a minor is due by the end of this month.",
        a: "That's a relief. I'll fill in the form this week.",
        o: [
          "That's a relief. I'll fill in the form sometime next year.",
          "Oh. So I'd graduate a year late even with the electives?",
          "That's a relief. So I don't need to fill in any forms."
        ]
      }
    ],
    closing: "Good. Bring me the form when it's ready, and I'll sign it so that you can start your first design course next semester.",
    summary: "I met my academic advisor, Dr. Okafor, to ask about adding a minor in graphic design. I was worried it would delay my graduation. She explained that the minor needs five courses, but one already counts, so I can take four in place of electives and finish on time. I will submit the form this week."
  },
  {
    id: "il20",
    kind: "professor",
    level: 3,
    partner: { name: "Professor Hughes", role: "professor", voice: "m" },
    scenario: "You are an engineering student building a small robot for your final project, which you must present in two weeks. The workshop closes at five o'clock, but your classes finish at four, so you have almost no time to use the equipment. You are going to ask Professor Hughes, who runs the workshop, whether you can have access in the evenings.",
    complete: [
      { pre: "For your final project, you are building", post: ".", a: "a small robot", keys: ["robot"] },
      { pre: "You must present the project", post: ".", a: "in two weeks", keys: ["weeks"] },
      { pre: "You want to ask Professor Hughes for access to the workshop", post: ".", a: "in the evenings", keys: ["evening"] }
    ],
    turns: [
      {
        partner: "Hello. You wanted to see me about the workshop?",
        a: "Yes, Professor Hughes. I was hoping to use it in the evenings.",
        o: [
          "Yes. The workshop hours are stupid, and you need to change them.",
          "Yes, Professor Hughes. I'd like to stop using the workshop altogether.",
          "Yes, Professor Hughes. I think the workshop should close earlier."
        ]
      },
      {
        partner: "I see. We don't usually allow that. Why do you need extra time?",
        a: "My classes finish at four, so I only get an hour before it closes.",
        o: [
          "My classes finish at noon, so I'm free all afternoon.",
          "I don't really need it. I've already finished my robot.",
          "I understand. In that case, I'll stop working on the project."
        ]
      },
      {
        partner: "That isn't much time, I agree. How far along is the project, and when do you present?",
        a: "It's about half built, and I present in two weeks.",
        o: [
          "It's going well, thank you for asking.",
          "I haven't started yet, but I don't present until next year.",
          "It's completely finished, and I presented it two weeks ago."
        ]
      },
      {
        partner: "Two weeks is tight. The difficulty is safety: students can't use the machines alone. A technician stays until eight on Tuesdays and Thursdays, though.",
        a: "Could I work on those two evenings while the technician is there?",
        o: [
          "Then I'll come in alone on Monday nights, if that's all right with you.",
          "I don't think safety is very important for a small robot.",
          "Could the technician build the robot for me on those evenings?"
        ]
      },
      {
        partner: "Yes, I think that's a fair solution. I'll add your name to the evening list, but you must sign in with the technician every time and finish by eight.",
        a: "Of course. I'll sign in each time and be out by eight.",
        o: [
          "Of course. I'll sign in on the first evening and stay until ten.",
          "Thank you. So I don't need to tell anyone when I arrive?",
          "Thanks, but nobody is in the workshop on Tuesdays and Thursdays."
        ]
      }
    ],
    closing: "Good, you can start this Tuesday. Remember to sign in with the technician, and good luck with the robot.",
    summary: "I asked Professor Hughes for evening access to the workshop because my classes end at four and I must present my robot in two weeks. He said students cannot work alone for safety reasons, but a technician stays until eight on Tuesdays and Thursdays. He added me to the evening list, and I must sign in."
  },
  {
    id: "il21",
    kind: "professor",
    level: 4,
    partner: { name: "Professor Marchetti", role: "professor", voice: "f" },
    scenario: "You are a final-year sociology student, and you have to submit your thesis proposal in a fortnight. You would like to write about remote work, but you realise the topic is far too broad. You have access to a local software company through your cousin, who is a manager there. You are meeting your supervisor, Professor Marchetti, hoping she can help you narrow your focus.",
    complete: [
      { pre: "You would like to write your thesis about", post: ".", a: "remote work", keys: ["remote"] },
      { pre: "The problem with your topic is that it is", post: ".", a: "far too broad", keys: ["broad|wide|general"] },
      { pre: "You have access to a local software company through", post: ".", a: "your cousin, a manager there", keys: ["cousin"] },
      { pre: "You hope Professor Marchetti can help you", post: ".", a: "narrow your focus", keys: ["narrow|focus|specific"] }
    ],
    turns: [
      {
        partner: "Come in, have a seat. So, the proposal is due in two weeks. Have you settled on a topic?",
        a: "Broadly, yes. I'd like to write about remote work, but I'm aware it needs narrowing down.",
        o: [
          "Yes, entirely. Remote work is already so specific that I can't see any way to refine it.",
          "Not really. I submitted the proposal last week, so I assumed the topic was fixed.",
          "Broadly, yes. You'd like to write about remote work, but it needs narrowing down."
        ]
      },
      {
        partner: "I'm glad you see that yourself. A thesis that tries to cover productivity, mental health and urban planning all at once ends up saying very little about any of them. Is there an angle that particularly interests you?",
        a: "I'm most curious about how working from home affects relationships between colleagues.",
        o: [
          "Honestly, I'd like to cover all of those angles in equal depth.",
          "I agree that a good thesis should say very little about each of them.",
          "Yes, that's exactly why I chose such a narrow topic in the first place."
        ]
      },
      {
        partner: "Workplace relationships: that's promising, and there's a solid body of literature on it. But you'll need to ground it somewhere concrete. Do you have access to any organisation where you could actually collect data?",
        a: "I do, as it happens. My cousin is a manager at a local software company.",
        o: [
          "Unfortunately not. I don't know anyone who works at a company.",
          "I do, as it happens. My cousin is a professor in the sociology department.",
          "There's a solid body of literature, so I shouldn't need any data."
        ]
      },
      {
        partner: "That could be very valuable, though I'd add a note of caution. Because of the family connection, you'll have to think carefully about confidentiality and about whether employees will speak openly to a manager's relative.",
        a: "Fair point. Would anonymous interviews and a consent form address it?",
        o: [
          "I doubt that matters. I'm sure they'd tell my cousin everything anyway.",
          "That's a fair point. I'll ask my cousin to sit in on every interview.",
          "So you'd advise against collecting any data from real organisations?"
        ]
      },
      {
        partner: "Largely, yes, and the ethics committee will want to see both. I'd suggest framing it as a single case study: how one software company's shift to remote work has changed relationships within teams. Could you draft a one-page outline along those lines before the proposal is due?",
        a: "Certainly. I'll draft the outline and send it to you by the end of this week.",
        o: [
          "Certainly. I'll send you the outline a week after the proposal is due.",
          "Certainly, although I'd rather compare twenty companies across several countries.",
          "I'd be grateful if you could draft the outline along those lines."
        ]
      }
    ],
    closing: "Excellent. Send me the outline by Friday, and we'll turn it into a full proposal next week.",
    summary: "I met my supervisor, Professor Marchetti, to narrow down my thesis topic on remote work. I said I was interested in relationships between colleagues and could collect data at my cousin's software company. She warned me about confidentiality and suggested a single case study. I will send her a one-page outline by the end of the week."
  },
  {
    id: "il22",
    kind: "professor",
    level: 4,
    partner: { name: "Professor Lindqvist", role: "professor", voice: "m" },
    scenario: "You are a second-year psychology student. You attended Professor Lindqvist's lecture on memory and ageing and found it fascinating. You have heard that his laboratory occasionally takes on undergraduate volunteers. You have no research experience, but you completed a statistics course with a high grade. You are going to approach him after class to ask whether you could assist with his research.",
    complete: [
      { pre: "Professor Lindqvist's lecture was about", post: ".", a: "memory and ageing", keys: ["memory"] },
      { pre: "You have heard that his laboratory occasionally", post: ".", a: "takes on undergraduate volunteers", keys: ["volunteers"] },
      { pre: "Although you have no research experience, you", post: ".", a: "completed a statistics course with a high grade", keys: ["statistics"] }
    ],
    turns: [
      {
        partner: "",
        a: "Excuse me, Professor Lindqvist. I enjoyed the lecture and wondered if I might ask you something.",
        o: [
          "Hey, Professor, cool lecture! So, when do I start in your lab?",
          "Excuse me, Professor Lindqvist. I'm afraid I found the lecture rather hard to sit through, frankly.",
          "Excuse me, Professor Lindqvist. I missed today's lecture, so could you summarise it for me?"
        ]
      },
      {
        partner: "Thank you, I'm glad you enjoyed it. By all means, go ahead.",
        a: "I've heard your lab sometimes takes on undergraduate volunteers. Might there be an opening?",
        o: [
          "I've heard that your lab never works with undergraduates, which seems rather a shame to me.",
          "I'd like to know whether you would consider volunteering in my laboratory.",
          "Thank you. That's very kind of you to say as well."
        ]
      },
      {
        partner: "We do, from time to time, though I should be upfront: places are limited, and I usually look for students who can contribute something practical. Have you had any research experience?",
        a: "Not yet, I'm afraid, but I did well in statistics and I'm keen to learn.",
        o: [
          "Yes, I've spent several years running experiments in a laboratory.",
          "Not yet, and to be honest, statistics was my weakest subject.",
          "Places are limited, so I imagine experience isn't really required."
        ]
      },
      {
        partner: "Statistics is genuinely useful to us, as it happens. We're currently coding data from interviews with older adults, which is painstaking work rather than glamorous. Would you be prepared to commit around six hours a week to that sort of task?",
        a: "Yes, I could manage six hours a week, and I don't mind careful, repetitive work.",
        o: [
          "I'd prefer something more glamorous, such as designing the experiments myself.",
          "Six hours a term sounds manageable, provided the work isn't too detailed.",
          "Yes, and I'm glad the interviews with teenagers are already finished."
        ]
      },
      {
        partner: "Good. In that case, send me an email with your transcript and a short paragraph about why the project interests you. I'm meeting my doctoral students on Monday, and I'll raise it with them then.",
        a: "I'll send both this evening. Thank you, Professor.",
        o: [
          "I'll send both on Tuesday, once your meeting is over.",
          "Thank you. I'll wait for your email with the transcript, then.",
          "Brilliant. Tell your students I'm starting on Monday."
        ]
      }
    ],
    closing: "You're welcome. Send me the transcript and the paragraph tonight, and I'll let you know after Monday's meeting.",
    summary: "After his lecture on memory and ageing, I asked Professor Lindqvist whether I could volunteer in his lab. I admitted I had no research experience but had done well in statistics. He described the data coding work, which needs six hours a week, and asked me to email my transcript and a paragraph before Monday."
  },
  {
    id: "il23",
    kind: "professor",
    level: 4,
    partner: { name: "Professor Adeyemi", role: "professor", voice: "f" },
    scenario: "You are a third-year linguistics student. Last term you wrote a seminar paper on how bilingual children switch between languages at home. Your lecturer, Professor Adeyemi, praised it, and you are now considering submitting it to an undergraduate research conference. Abstracts are due at the end of the month, but you have never written one, and you are nervous about speaking in front of experts.",
    complete: [
      { pre: "Your seminar paper was about how bilingual children", post: ".", a: "switch between languages at home", keys: ["language"] },
      { pre: "You are considering submitting the paper to", post: ".", a: "an undergraduate research conference", keys: ["conference"] },
      { pre: "You are nervous about", post: ".", a: "speaking in front of experts", keys: ["experts"] }
    ],
    turns: [
      {
        partner: "Hello, come in. Your email mentioned the undergraduate conference. Are you thinking of submitting something?",
        a: "I am, tentatively. I wondered whether my seminar paper might be suitable.",
        o: [
          "I am. In fact, I presented my seminar paper there last year.",
          "Not at all. I only came to ask why you disliked my seminar paper.",
          "I am, tentatively. I wondered whether your seminar paper might be suitable."
        ]
      },
      {
        partner: "I think it would be very suitable. It was one of the strongest papers in the group, and the home-recording data you collected is exactly the kind of original material these conferences like to see.",
        a: "That's encouraging to hear. My difficulty is that I've never written an abstract before.",
        o: [
          "That's a pity. I'd hoped the paper might be good enough to submit.",
          "That's encouraging, since I've written dozens of abstracts already.",
          "I'm surprised, given that the paper contained no original data."
        ]
      },
      {
        partner: "Most people haven't at your stage. An abstract is really just your paper in miniature: the question, how you investigated it, what you found, and why it matters, all in about two hundred and fifty words.",
        a: "So it's four elements in one paragraph. That seems manageable.",
        o: [
          "Two hundred and fifty pages seems rather long for a summary.",
          "So I should leave out the findings and concentrate on the method.",
          "I see. So the abstract ought to be longer than the paper itself."
        ]
      },
      {
        partner: "Precisely. You look hesitant, though. Is something else bothering you about the conference?",
        a: "To be honest, presenting in front of experts makes me anxious.",
        o: [
          "Not really. Speaking in front of experts is something I thoroughly enjoy.",
          "To be honest, I'm anxious that you won't have time to present it.",
          "No, nothing at all, apart from the fact that abstracts aren't required."
        ]
      },
      {
        partner: "That's perfectly natural, but bear in mind that the audience is mostly other students, and the atmosphere is supportive rather than adversarial. If it would help, you could rehearse your talk at our departmental seminar beforehand. First things first, though: could you get me a draft abstract by next Friday?",
        a: "A rehearsal would help enormously. And yes, I'll have a draft to you by next Friday.",
        o: [
          "A rehearsal sounds unnecessary, but I'll send the draft after the deadline.",
          "That's reassuring. An audience made up entirely of hostile experts is just what I need.",
          "Yes, I'd be happy to read your draft abstract by next Friday."
        ]
      }
    ],
    closing: "Wonderful. Send me the draft by next Friday, and we'll arrange a rehearsal at the departmental seminar once you've been accepted.",
    summary: "I asked Professor Adeyemi whether my seminar paper on bilingual children was suitable for an undergraduate research conference. She encouraged me, explained what an abstract should contain, and reassured me about presenting, offering a rehearsal at the departmental seminar. I agreed to send her a draft abstract by next Friday."
  },
  {
    id: "il24",
    kind: "professor",
    level: 4,
    partner: { name: "Professor Kowalski", role: "professor", voice: "m" },
    scenario: "You are a third-year philosophy student who wants to enrol in Professor Kowalski's advanced seminar on ethics and artificial intelligence. The seminar normally requires a logic course that you have not taken, because it clashed with a compulsory module. However, you have studied logic independently and earned a distinction in moral philosophy. You are meeting him to ask whether he would waive the requirement.",
    complete: [
      { pre: "The advanced seminar is about", post: ".", a: "ethics and artificial intelligence", keys: ["ethics"] },
      { pre: "You did not take the logic course because", post: ".", a: "it clashed with a compulsory module", keys: ["clash|conflict|overlap"] },
      { pre: "In moral philosophy, you", post: ".", a: "earned a distinction", keys: ["distinction"] }
    ],
    turns: [
      {
        partner: "Good afternoon. I understand you'd like to join the ethics and artificial intelligence seminar. I notice, however, that you haven't completed the logic prerequisite.",
        a: "That's correct, Professor. It clashed with a compulsory module.",
        o: [
          "That's correct, Professor. I didn't take it because I can't see the point of logic.",
          "I believe there's been a mistake. I passed the logic course last year.",
          "That's correct, but who cares? It's only a prerequisite."
        ]
      },
      {
        partner: "I see. That's unfortunate rather than negligent, at least. Still, the requirement isn't arbitrary: several of the readings rely on formal notation, and students without that grounding have struggled in the past.",
        a: "I appreciate that. I've actually been working through a logic textbook on my own to fill the gap.",
        o: [
          "I appreciate that, but I assume the readings contain no formal notation.",
          "I appreciate that. Fortunately, I've never needed to study any logic.",
          "Then perhaps the seminar should simply drop those readings for everyone."
        ]
      },
      {
        partner: "That shows initiative, though self-study can be hard to assess. Is there anything else in your record that would reassure me you can handle the workload?",
        a: "I earned a distinction in moral philosophy, if that helps.",
        o: [
          "Not really. Moral philosophy was the one course I came close to failing.",
          "I'd rather not discuss my record, if it's all the same to you.",
          "You earned a distinction in moral philosophy, which is reassuring."
        ]
      },
      {
        partner: "A distinction is certainly relevant, since half the seminar is ethics. Here's what I'm prepared to offer: I'll set you a short diagnostic exercise in formal logic, and if you complete it satisfactorily, I'll waive the prerequisite. Does that seem reasonable?",
        a: "Entirely reasonable. When would you need the exercise back?",
        o: [
          "Entirely reasonable. So the exercise will be on moral philosophy?",
          "Not really. A test seems rather insulting, given my grades.",
          "Reasonable, yes. So if I fail it, you'll waive the prerequisite anyway?"
        ]
      },
      {
        partner: "Enrolment closes a week on Friday, so I'd want it by this coming Wednesday. I'll email it to you this afternoon. It shouldn't take more than a couple of hours if your self-study has been thorough.",
        a: "Wednesday is fine. I'll look out for your email and return it in good time.",
        o: [
          "Wednesday is fine. I'll hand it in shortly after enrolment has closed.",
          "Understood. I'll email you the exercise this afternoon so that you can complete it.",
          "A couple of months seems generous, so I'll take my time."
        ]
      }
    ],
    closing: "Very good. Return the exercise by Wednesday, and if it's satisfactory, I'll waive the prerequisite and approve your enrolment before the deadline.",
    summary: "I asked Professor Kowalski to waive the logic prerequisite for his seminar on ethics and artificial intelligence. I explained the course had clashed with a compulsory module, and that I had studied logic independently and earned a distinction in moral philosophy. He agreed to waive it if I complete a diagnostic logic exercise by Wednesday."
  }
];
