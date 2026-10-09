window.DET_DATA = window.DET_DATA || {};
window.DET_DATA.reading = [
  {
    id: "ir01",
    kind: "narrative",
    level: 2,
    part1: "Mina left the library later than usual on Friday evening. She ran to the bus stop, {0} the last bus was already driving away. It was cold, and her phone had no {1}, so she could not {2} her parents. She sat down on the bench and tried to think {3} a plan. Walking home would {4} more than two hours. Then a small white van stopped {5} her, and the driver opened the window.",
    blanks: [
      { a: "but", o: ["so", "or", "if", "unless"] },
      { a: "battery", o: ["ticket", "pocket", "bottle", "window"] },
      { a: "call", o: ["say", "speak", "talk", "listen"] },
      { a: "of", o: ["at", "to", "by", "from"] },
      { a: "take", o: ["spend", "pass", "keep", "make"] },
      { a: "beside", o: ["between", "among", "during", "through"] }
    ],
    missing: {
      a: "It was the baker from her street, Mr. Adler, who was on his way home from work.",
      o: [
        "It was a police officer, who asked her why she was sitting alone in the dark.",
        "She had seen the baker from her street on the same bus earlier that morning.",
        "Her father was driving it, because he had been looking for her for an hour."
      ]
    },
    part2: "He recognized Mina at once because she bought rolls in his shop every Saturday. He offered to drive her home, and she gladly agreed. The van smelled of fresh bread, and the baker told funny stories about his customers all the way. When they arrived, her mother thanked him again and again. The next morning, Mina went to the bakery with a box of chocolates. Mr. Adler laughed and gave her a warm roll in return.",
    highlights: [
      { q: "Why was Mina unable to phone her parents?", a: "her phone had no battery" },
      { q: "How did the baker know who Mina was?", a: "she bought rolls in his shop every Saturday" }
    ],
    idea: {
      a: "A girl who missed the last bus was driven home by a kind neighbor and later thanked him.",
      o: [
        "A girl's phone stopped working on a cold evening, so she could not call her parents for help.",
        "A girl decided never to stay late at the library again after a frightening walk home in the dark.",
        "A baker was annoyed that he had to drive a neighbor's daughter home after a long day at work."
      ]
    },
    title: { a: "A Lucky Ride Home", o: ["The Best Bakery in Town", "A Phone Without a Battery", "Public Transport in Small Towns"] }
  },
  {
    id: "ir02",
    kind: "narrative",
    level: 2,
    part1: "Leo wanted to make a cake for his grandmother's seventieth birthday. He had {0} baked anything before, but he found a simple {1} in an old cookbook. He mixed the flour, eggs and sugar carefully and put the cake {2} the oven. Then he went to his room to {3} her present. He {4} about the time. When he finally came back to the kitchen, there was a strong {5} of smoke, and the cake was completely black.",
    blanks: [
      { a: "never", o: ["ever", "always", "already", "often"] },
      { a: "recipe", o: ["receipt", "menu", "bill", "ticket"] },
      { a: "into", o: ["among", "along", "across", "between"] },
      { a: "wrap", o: ["fold", "roll", "dress", "bend"] },
      { a: "forgot", o: ["missed", "lost", "left", "failed"] },
      { a: "smell", o: ["sound", "sight", "touch", "noise"] }
    ],
    missing: {
      a: "Leo felt terrible, but his older sister Ana told him that they still had two hours.",
      o: [
        "Leo was proud of the cake and carried it straight to his grandmother's room.",
        "His grandmother came into the kitchen and offered to bake a new one herself.",
        "Ana had already bought a cake from the shop, so they did not need another one."
      ]
    },
    part2: "Together they cleaned the kitchen and started again. This time, Ana set a timer on her phone, and Leo stayed next to the oven. The second cake came out golden and soft. They covered it with cream and strawberries and wrote the number seventy on top. When their grandmother saw it that evening, she smiled and asked who had made it. Leo said that he and Ana had done it as a team.",
    highlights: [
      { q: "Where did Leo find the instructions for the cake?", a: "in an old cookbook" },
      { q: "What did Ana do so that the second cake would not burn?", a: "set a timer on her phone" }
    ],
    idea: {
      a: "After burning his first cake, a boy managed to bake a birthday cake with his sister's help.",
      o: [
        "A boy left a cake in the oven for too long while he was wrapping a present.",
        "A grandmother taught her two grandchildren how to bake her favorite strawberry cake.",
        "A boy learned that baking is too difficult and that it is better to buy a cake."
      ]
    },
    title: { a: "A Birthday Cake, Baked Twice", o: ["Grandmother's Secret Cake Recipe", "The Smell of Smoke", "Why Children Should Learn Cooking"] }
  },
  {
    id: "ir03",
    kind: "narrative",
    level: 2,
    part1: "One rainy afternoon, Tomas {0} a quiet noise outside his front door. When he opened it, he saw a small brown dog shaking {1} cold. The dog was thin and wet, and it wore a red {2} without a name on it. Tomas gave it some water and {3} it with an old towel. He wanted to {4} the dog, but his father shook his head. Somebody was {5} looking for it and feeling very worried.",
    blanks: [
      { a: "heard", o: ["listened", "sounded", "looked", "watched"] },
      { a: "with", o: ["by", "at", "on", "to"] },
      { a: "collar", o: ["sleeve", "pocket", "handle", "corner"] },
      { a: "dried", o: ["dropped", "drank", "drew", "drove"] },
      { a: "keep", o: ["stay", "remain", "continue", "belong"] },
      { a: "probably", o: ["hardly", "nearly", "rarely", "exactly"] }
    ],
    missing: {
      a: "So the next morning, they took a photo of the dog and put notices on the trees in their street.",
      o: [
        "So his father finally agreed that the dog could stay with them, and they bought it a new bed.",
        "Luckily, the owner's name and address were written clearly on the dog's red collar.",
        "The old woman had already told them the day before that her little dog was missing."
      ]
    },
    part2: "Two days passed, and nobody called. Tomas secretly hoped that the phone would stay silent. On the third evening, however, an old woman rang the doorbell. She had seen one of the notices near the park. The dog ran to her and jumped up happily, so Tomas knew that it was hers. He felt sad, but the woman understood. She invited him to visit every weekend and take the dog for a walk.",
    highlights: [
      { q: "What did Tomas use to get the dog dry?", a: "with an old towel" },
      { q: "What showed Tomas that the dog belonged to the woman?", a: "The dog ran to her and jumped up happily" }
    ],
    idea: {
      a: "A boy helped a lost dog return to its owner, although he wanted to keep it.",
      o: [
        "A boy and his father put notices about a lost dog on the trees in their street.",
        "A boy persuaded his father to let him keep a dog that nobody else wanted.",
        "An old woman gave her dog to a boy because she could no longer look after it."
      ]
    },
    title: { a: "A Lost Dog Finds Its Owner", o: ["A Rainy Afternoon at Home", "How to Train a Puppy", "Why Pets Need Collars"] }
  },
  {
    id: "ir04",
    kind: "narrative",
    level: 2,
    part1: "Sara started her first job at a busy cafe near the station. She was {0} because she had never worked as a waitress before. In the first hour, she mixed {1} two orders and brought tea to a man {2} had asked for coffee. Later, she {3} a glass, and it broke on the floor with a {4} crash. Everyone in the cafe {5} to look at her. Sara's face went red, and she wanted to run {6}.",
    blanks: [
      { a: "nervous", o: ["proud", "bored", "lazy", "polite"] },
      { a: "up", o: ["out", "off", "over", "down"] },
      { a: "who", o: ["which", "whose", "whom", "what"] },
      { a: "dropped", o: ["fell", "slipped", "sank", "rose"] },
      { a: "loud", o: ["tall", "wide", "bright", "sweet"] },
      { a: "turned", o: ["returned", "changed", "exchanged", "replaced"] },
      { a: "away", o: ["apart", "aside", "along", "across"] }
    ],
    missing: {
      a: "But the owner, Mrs. Lin, calmly helped her sweep up the pieces and told her a story.",
      o: [
        "The owner, Mrs. Lin, told her angrily that she would have to pay for the glass.",
        "So Sara took off her apron, left the cafe and never went back there again.",
        "The man who had asked for coffee was the owner of the cafe, Mr. Lin."
      ]
    },
    part2: "On her own first day, many years ago, Mrs. Lin had spilled a whole bowl of soup on a customer's coat. She had cried in the kitchen, but she had come back the next day. Sara laughed, and her hands stopped shaking. For the rest of the afternoon, she wrote every order down twice and carried only one plate at a time. By closing time, she had not made another mistake, and one customer even left her a tip.",
    highlights: [
      { q: "What mistake did Sara make with a drink?", a: "brought tea to a man who had asked for coffee" },
      { q: "What accident had Mrs. Lin had when she was new?", a: "spilled a whole bowl of soup on a customer's coat" }
    ],
    idea: {
      a: "A new waitress had a difficult first day, but her employer's kindness helped her to do better.",
      o: [
        "A new waitress broke a glass, and everyone in the cafe turned to look at her.",
        "A new waitress decided to look for a different job after her first day at a cafe.",
        "A cafe owner lost several customers because her new waitress made too many mistakes."
      ]
    },
    title: { a: "A Hard First Day at Work", o: ["A Bowl of Spilled Soup", "How to Open a Cafe", "The Life of a Cafe Owner"] }
  },
  {
    id: "ir05",
    kind: "narrative",
    level: 3,
    part1: "Elena had climbed the ridge above the village dozens of times, so she did not {0} to check the {1} that morning. By noon, {2}, a thick fog had rolled in from the valley and swallowed the path. She could {3} make out her own boots, let alone the painted marks on the rocks. Rather than panic, she remembered her grandfather's {4} to stay put {5} she lost her way. She sat down behind a boulder, pulled on her jacket and waited.",
    blanks: [
      { a: "bother", o: ["disturb", "worry", "annoy", "mind"] },
      { a: "forecast", o: ["climate", "season", "landscape", "atmosphere"] },
      { a: "however", o: ["therefore", "moreover", "otherwise", "likewise"] },
      { a: "barely", o: ["merely", "nearly", "fairly", "clearly"] },
      { a: "advice", o: ["opinion", "excuse", "refusal", "ambition"] },
      { a: "whenever", o: ["whatever", "whoever", "whichever", "however"] }
    ],
    missing: {
      a: "Almost two hours later, she heard the faint ringing of a bell somewhere below her.",
      o: [
        "When the fog lifted a few minutes later, she could see the whole valley again.",
        "She decided to keep walking downhill until she found the painted marks again.",
        "Her grandfather soon arrived with a lamp and a rope to take her home."
      ]
    },
    part2: "It belonged to a goat, and behind the goat came a shepherd who knew every stone on the mountain. He was not surprised to find a walker there, since the fog caught somebody nearly every autumn. Following the sound of his animals, the two of them reached the village before dark. Elena thanked him and offered to pay, but he refused. Instead, he made her promise never to set out again without telling someone where she was going.",
    highlights: [
      { q: "What had Elena's grandfather told her to do if she got lost?", a: "to stay put whenever she lost her way" },
      { q: "Why was the shepherd not surprised to meet Elena?", a: "the fog caught somebody nearly every autumn" }
    ],
    idea: {
      a: "An overconfident hiker lost in fog stayed where she was until a shepherd guided her down safely.",
      o: [
        "A hiker could not see the painted marks on the rocks because of a thick fog.",
        "A hiker used her knowledge of the mountain to find her own way back to the village.",
        "A shepherd who had lost his goats in the fog was rescued by an experienced hiker."
      ]
    },
    title: { a: "Rescued from the Mountain Fog", o: ["A Shepherd's Daily Routine", "Painted Marks on the Rocks", "Choosing Boots for Long Walks"] }
  },
  {
    id: "ir06",
    kind: "narrative",
    level: 3,
    part1: "Daniel had practiced the same concerto for eight months before his {0} at the music academy. On the day itself, he walked onto the stage with {1} hands and began to play in front of five silent judges. Halfway {2} the slow movement, a string on his violin {3} with a sharp crack. For a moment, he stood frozen, {4} that his chances had vanished. There was no {5} instrument backstage, and the rules did not {6} a second attempt.",
    blanks: [
      { a: "audition", o: ["applause", "orchestra", "composer", "melody"] },
      { a: "steady", o: ["constant", "regular", "permanent", "level"] },
      { a: "through", o: ["across", "along", "between", "among"] },
      { a: "snapped", o: ["melted", "leaked", "faded", "wilted"] },
      { a: "convinced", o: ["determined", "delighted", "relieved", "informed"] },
      { a: "spare", o: ["scarce", "sparse", "vacant", "brief"] },
      { a: "allow", o: ["let", "agree", "obey", "behave"] }
    ],
    missing: {
      a: "Then he remembered that the remaining three strings could still carry most of the melody.",
      o: [
        "One of the judges kindly handed him another violin so that he could start again.",
        "He bowed politely, apologized to the judges and walked off the stage in silence.",
        "Fortunately, he had replaced all four strings with new ones the night before."
      ]
    },
    part2: "He lifted the bow and continued, shifting his fingers to positions he had never used in that piece. A few notes came out thin and uncertain, yet he reached the final bar without stopping. The judges said nothing as he left. Three weeks later, a letter arrived offering him a place. One judge had added a note by hand: many applicants could play the concerto perfectly, but few could keep going when everything went wrong.",
    highlights: [
      { q: "What happened to Daniel's instrument during the slow movement?", a: "a string on his violin snapped with a sharp crack" },
      { q: "According to the handwritten note, what could only a few applicants do?", a: "keep going when everything went wrong" }
    ],
    idea: {
      a: "A violinist won a place at an academy by finishing his audition despite a broken string.",
      o: [
        "A violinist's string snapped with a sharp crack halfway through the slow movement of a concerto.",
        "A violinist was allowed to repeat his audition after his instrument had been repaired backstage.",
        "A violinist failed his audition because he had not practiced his concerto enough."
      ]
    },
    title: { a: "An Audition on Three Strings", o: ["How Violins Are Made", "Eight Months of Practice", "The Strictest Judges in Music"] }
  },
  {
    id: "ir07",
    kind: "narrative",
    level: 3,
    part1: "While sorting through a box of second-hand books at a street market, Priya {0} a yellowed envelope tucked between the pages of an atlas. It was sealed and stamped {1} had obviously never been mailed. The address, written in {2} blue ink, {3} to a house only a few streets away from her own. Priya hesitated, wondering {4} she had any right to {5}. In the end, {6} got the better of her, and she bought the atlas for a few coins.",
    blanks: [
      { a: "noticed", o: ["glanced", "stared", "peered", "gazed"] },
      { a: "but", o: ["so", "or", "since", "unless"] },
      { a: "faded", o: ["fainted", "failed", "fallen", "folded"] },
      { a: "belonged", o: ["owned", "included", "contained", "possessed"] },
      { a: "whether", o: ["unless", "although", "whereas", "despite"] },
      { a: "interfere", o: ["interpret", "interview", "interact", "inherit"] },
      { a: "curiosity", o: ["courtesy", "currency", "cruelty", "charity"] }
    ],
    missing: {
      a: "That same evening, she walked to the address and knocked on a green front door.",
      o: [
        "She tore the envelope open at once and read the letter on her way home.",
        "The seller refused to let her take the atlas, so she left the market without it.",
        "The next day, she mailed the envelope to the address without adding a note."
      ]
    },
    part2: "An elderly man opened it and stared at the envelope for a long time before taking it. The handwriting was his late wife's. Decades earlier, before they were married, she had written to him after a quarrel and then, apparently, changed her mind. He had sold her books after the funeral without ever looking inside them. He did not open the letter in front of Priya, but he asked her to come back for tea the following week.",
    highlights: [
      { q: "Where exactly was the envelope when Priya found it?", a: "between the pages of an atlas" },
      { q: "Why had the man never found the letter himself?", a: "He had sold her books after the funeral without ever looking inside them" }
    ],
    idea: {
      a: "A woman found an old unsent letter in a used book and delivered it herself.",
      o: [
        "A woman bought an old atlas for a few coins from a box at a street market.",
        "A woman read a stranger's private letter and learned a secret about her own family.",
        "An elderly man was angry that a stranger had interfered in his private family affairs."
      ]
    },
    title: { a: "A Letter Delivered Decades Late", o: ["Bargains at the Street Market", "The History of the Postal Service", "An Atlas of Faraway Places"] }
  },
  {
    id: "ir08",
    kind: "narrative",
    level: 3,
    part1: "The lights in the apartment building went out just after eight on a winter evening. At first, Marco {0} that a fuse had {1} in his own apartment, but the corridor was equally dark. One by one, doors opened, and neighbors who had barely {2} a greeting in years stepped out {3} candles and phones. Someone reported that the whole {4} had lost power and that repairs might take {5} morning. Nobody seemed {6} to go back inside and sit alone in the dark.",
    blanks: [
      { a: "assumed", o: ["pretended", "promised", "demanded", "regretted"] },
      { a: "blown", o: ["flown", "thrown", "grown", "shown"] },
      { a: "exchanged", o: ["replaced", "converted", "switched", "transferred"] },
      { a: "holding", o: ["containing", "including", "involving", "supporting"] },
      { a: "district", o: ["distance", "direction", "discount", "dimension"] },
      { a: "until", o: ["since", "during", "while", "among"] },
      { a: "willing", o: ["capable", "fond", "aware", "guilty"] }
    ],
    missing: {
      a: "So the woman from the third floor suggested that they share their food before it spoiled.",
      o: [
        "Since the power returned a few minutes later, everyone quickly went back to their own apartments.",
        "Marco locked his door, lit a candle and spent the rest of the evening reading alone.",
        "The woman from the third floor complained that the noise in the corridor was keeping her awake."
      ]
    },
    part2: "Within half an hour, a long table had been set up in the entrance hall. People carried down bread, cold chicken, cheese and a cake that someone had baked that afternoon. A retired teacher played old songs on a guitar, and the children chased each other between the candles. When the lights finally flickered on at midnight, there was a groan of disappointment rather than a cheer. Before going upstairs, the neighbors agreed to hold another dinner the next month.",
    highlights: [
      { q: "What did Marco first believe had caused the darkness?", a: "a fuse had blown in his own apartment" },
      { q: "How did people react when the electricity came back?", a: "there was a groan of disappointment rather than a cheer" }
    ],
    idea: {
      a: "A power cut unexpectedly brought distant neighbors together for an evening they wanted to repeat.",
      o: [
        "A whole district lost its electricity on a winter evening, and repairs took several hours.",
        "Neighbors worked together to repair the electrical system of their apartment building.",
        "A power cut caused arguments among neighbors who had never liked one another."
      ]
    },
    title: { a: "The Night the Lights Went Out", o: ["How to Prepare for a Power Cut", "A Retired Teacher's Guitar", "Living Alone in a Big City"] }
  },
  {
    id: "ir09",
    kind: "narrative",
    level: 4,
    part1: "As the only interpreter in the room, Ingrid was {0} to being invisible, a voice that carried other people's intentions without possessing any of her own. That afternoon, however, the negotiations between the shipping firm and its {1} partners had reached a {2} stage. The visiting director made a remark that was, in his own language, a {3} proverb about patience. {4} literally, it would sound like a veiled {5} of dishonesty. Ingrid had perhaps two seconds in which to decide how {6} she ought to be.",
    blanks: [
      { a: "accustomed", o: ["familiar", "acquainted", "inclined", "entitled"] },
      { a: "prospective", o: ["retrospective", "protective", "conclusive", "predictive"] },
      { a: "delicate", o: ["tender", "faint", "frail", "slender"] },
      { a: "harmless", o: ["helpless", "careless", "restless", "breathless"] },
      { a: "Rendered", o: ["Surrendered", "Reminded", "Retained", "Resolved"] },
      { a: "accusation", o: ["acquisition", "accumulation", "appreciation", "acceleration"] },
      { a: "faithful", o: ["grateful", "hopeful", "graceful", "fruitful"] }
    ],
    missing: {
      a: "She chose a neutral paraphrase, and the conversation moved on without anyone noticing the substitution.",
      o: [
        "She translated the proverb word for word, and the partners walked out of the meeting in anger.",
        "She asked the director to repeat his remark, which gave everyone time to laugh at the misunderstanding.",
        "The director noticed her hesitation and immediately explained the proverb to his partners himself."
      ]
    },
    part2: "Yet the decision troubled her for the rest of the day. Her training had insisted that an interpreter's loyalty lies with the words actually spoken, not with the outcome the speakers might prefer. By smoothing the phrase, she had arguably protected the deal, but she had also made a judgment that was not hers to make. That evening, she told the director what she had done. To her surprise, he thanked her and admitted that he should have chosen his words more carefully.",
    highlights: [
      { q: "What would the director's proverb have sounded like in a word-for-word translation?", a: "a veiled accusation of dishonesty" },
      { q: "According to Ingrid's training, where does an interpreter's loyalty lie?", a: "with the words actually spoken" }
    ],
    idea: {
      a: "An interpreter softened a risky remark to save a negotiation and then doubted whether she had been right.",
      o: [
        "An interpreter had only two seconds to translate a proverb about patience during a business meeting.",
        "An interpreter lost her position after a director discovered that she had deliberately altered his words.",
        "An interpreter concluded that literal accuracy never matters as long as a business deal is protected."
      ]
    },
    title: { a: "An Interpreter's Split-Second Dilemma", o: ["Proverbs About Patience Worldwide", "How Shipping Firms Find Partners", "The Rise of Machine Translation"] }
  },
  {
    id: "ir10",
    kind: "narrative",
    level: 4,
    part1: "On his final night as keeper, Halvard climbed the spiral staircase more slowly than he needed to, letting his hand trail along the cold iron rail. For thirty-one years he had {0} the lamp, and tomorrow engineers would arrive to {1} a mechanism that required no human attention {2}. He did not {3} the change; he had always known that sentiment was a poor argument {4} efficiency. What unsettled him was the {5} that his {6} had mattered far less than he had allowed himself to believe.",
    blanks: [
      { a: "tended", o: ["attended", "intended", "pretended", "extended"] },
      { a: "install", o: ["instill", "insist", "inspire", "inhabit"] },
      { a: "whatsoever", o: ["whichever", "whenever", "wherever", "moreover"] },
      { a: "resent", o: ["resemble", "consent", "resign", "reside"] },
      { a: "against", o: ["towards", "beneath", "upon", "among"] },
      { a: "suspicion", o: ["superstition", "suspension", "supervision", "succession"] },
      { a: "vigilance", o: ["violence", "vacancy", "variance", "vengeance"] }
    ],
    missing: {
      a: "After all, no ship had come close to the rocks in more than a decade.",
      o: [
        "Only last winter, his light had saved a fishing boat from being wrecked on the rocks.",
        "The engineers had already removed the old lamp and carried it down to their boat.",
        "He was therefore delighted that a machine would finally free him from such tedious work."
      ]
    },
    part2: "Modern vessels navigated by satellite, and their captains probably glanced at his beam out of habit rather than need. Still, he cleaned the glass and polished the lens as carefully as he had on his first evening, when an older keeper had watched him with folded arms. Perhaps the work had never been justified by the ships at all. Perhaps it had been justified by the doing of it, night after night, properly. At dawn, he put out the light himself.",
    highlights: [
      { q: "How long had Halvard looked after the light?", a: "For thirty-one years he had tended the lamp" },
      { q: "Why did captains of modern ships probably still look at the beam?", a: "out of habit rather than need" }
    ],
    idea: {
      a: "A departing lighthouse keeper doubted the value of his work yet found meaning in doing it well.",
      o: [
        "A lighthouse keeper cleaned the glass and polished the lens on the night before engineers arrived.",
        "A lighthouse keeper persuaded a team of engineers that an automatic mechanism could not replace him.",
        "A lighthouse keeper bitterly opposed the modernization that was about to cost him his position."
      ]
    },
    title: { a: "The Keeper's Last Watch", o: ["Satellite Navigation at Sea", "A Shipwreck on the Rocks", "Building a Modern Lighthouse"] }
  },
  {
    id: "ir11",
    kind: "narrative",
    level: 4,
    part1: "Three weeks after her paper appeared in a {0} journal, Dr. Amara Nwosu was repeating a routine calculation {1} she noticed that two columns of data had been transposed. The error was hers alone, and it was not {2}: once corrected, the effect she had reported shrank to almost nothing. No reviewer had {3} it, and it was {4} that nobody ever would. Her department was about to decide on her {5}, largely on the {6} of that very publication.",
    blanks: [
      { a: "respected", o: ["respective", "respectful", "suspected", "inspected"] },
      { a: "when", o: ["while", "since", "unless", "whereas"] },
      { a: "trivial", o: ["crucial", "vital", "grave", "severe"] },
      { a: "caught", o: ["captured", "grabbed", "seized", "trapped"] },
      { a: "conceivable", o: ["considerable", "comparable", "compatible", "compulsory"] },
      { a: "promotion", o: ["proportion", "provision", "projection", "production"] },
      { a: "strength", o: ["force", "power", "depth", "length"] }
    ],
    missing: {
      a: "She spent a sleepless night weighing her career against her conscience before writing to the editor.",
      o: [
        "She decided to say nothing, reasoning that the mistake would probably never be discovered.",
        "A reviewer wrote to the editor about the mistake before she had a chance to respond.",
        "Fortunately, the corrected figures made the effect she had reported even stronger than before."
      ]
    },
    part2: "The journal published a correction within the month, and Amara informed the promotion committee herself. The decision was postponed for a year, which stung more than she had anticipated. What she had not foreseen was the response from colleagues elsewhere. Several wrote to say that her candor had increased their confidence in her other work. One senior researcher invited her to collaborate, remarking that he could teach anyone statistics but could not teach them to admit when they were wrong.",
    highlights: [
      { q: "What happened to the reported effect once the mistake was fixed?", a: "shrank to almost nothing" },
      { q: "What did other researchers say her honesty had done?", a: "increased their confidence in her other work" }
    ],
    idea: {
      a: "A researcher who corrected her own published error paid a price but gained the respect of her peers.",
      o: [
        "A researcher discovered that two columns of data in her published paper had been accidentally transposed.",
        "A researcher was dismissed from her department after a journal exposed a serious flaw in her statistics.",
        "A researcher learned that admitting a mistake in public permanently destroys a promising scientific career."
      ]
    },
    title: { a: "The Cost and Reward of Honesty", o: ["How Journals Review Papers", "A Lesson in Basic Statistics", "Promotion Rules at Universities"] }
  },
  {
    id: "ir12",
    kind: "narrative",
    level: 4,
    part1: "Every Sunday, the old grandmaster {0} the same stone table in the park, defeating a procession of amateurs with an indifference that {1} on boredom. Decades of tournament play had taught him to {2} nearly every plan an opponent could {3}. So when a girl of about eleven sat down opposite him, he {4} looked up from the board. Her opening was unorthodox, even clumsy, and he responded with the automatic moves of a man {5} mind was {6}.",
    blanks: [
      { a: "occupied", o: ["inhabited", "employed", "resided", "dwelled"] },
      { a: "bordered", o: ["boarded", "landed", "knocked", "insisted"] },
      { a: "anticipate", o: ["participate", "hesitate", "cooperate", "speculate"] },
      { a: "devise", o: ["divide", "deprive", "deceive", "descend"] },
      { a: "scarcely", o: ["sparsely", "severely", "largely", "eagerly"] },
      { a: "whose", o: ["whom", "which", "who", "that"] },
      { a: "elsewhere", o: ["otherwise", "somewhat", "anyhow", "likewise"] }
    ],
    missing: {
      a: "By the twentieth move, he realized with a jolt that his queen was trapped.",
      o: [
        "Within ten moves, he had captured her queen and was already thinking about lunch.",
        "She soon grew bored, pushed the pieces aside and wandered off toward the playground.",
        "Her father, a well-known coach, stood behind her and whispered each move into her ear."
      ]
    },
    part2: "What had looked like clumsiness was a line of play he had simply never encountered, because no trained player would have risked it. He fought on for another hour and salvaged a draw, his first in that park in years. The girl shook his hand solemnly and asked whether he would be there the following Sunday. He found, somewhat to his own astonishment, that he was already looking forward to it. Certainty, he reflected, had made him a strong player but a lazy one.",
    highlights: [
      { q: "What had decades of tournaments taught the grandmaster to do?", a: "to anticipate nearly every plan an opponent could devise" },
      { q: "Why was the girl's line of play unfamiliar to the grandmaster?", a: "no trained player would have risked it" }
    ],
    idea: {
      a: "An overconfident chess master was nearly beaten by a child and rediscovered his interest in the game.",
      o: [
        "A chess master played against a procession of amateurs at the same stone table every Sunday.",
        "A chess master agreed to prepare a talented young girl for a series of international tournaments.",
        "A chess master easily defeated a child and confirmed that experience always beats originality in chess."
      ]
    },
    title: { a: "The Grandmaster Meets His Match", o: ["Famous Openings in Chess History", "Sunday Activities in the Park", "How Children Learn Board Games"] }
  },
  {
    id: "ir13",
    kind: "expository",
    level: 2,
    part1: "Honey is made by bees, and the process begins in flowers. A worker bee visits many flowers and {0} a sweet liquid {1} nectar. She carries it back to the hive in a special stomach. There, she passes the nectar to other bees, which chew it {2} some time. At this stage, the nectar still contains too {3} water. If the bees {4} it like this, it would soon go {5}.",
    blanks: [
      { a: "collects", o: ["connects", "corrects", "completes", "compares"] },
      { a: "called", o: ["said", "told", "spoken", "asked"] },
      { a: "for", o: ["since", "during", "while", "until"] },
      { a: "much", o: ["many", "few", "several", "lot"] },
      { a: "stored", o: ["started", "stayed", "stood", "studied"] },
      { a: "bad", o: ["ill", "sick", "poor", "weak"] }
    ],
    missing: {
      a: "To solve this problem, the bees dry the nectar by moving their wings very fast.",
      o: [
        "For this reason, the bees add more water to the nectar before they put it away.",
        "The bees then fly back to the flowers and return the nectar to them.",
        "In winter, the bees leave the hive and look for flowers in warmer places."
      ]
    },
    part2: "After this drying, the liquid becomes thick and sticky, and we can finally call it honey. The bees keep it in small wax rooms called cells and close each one with a wax lid. Honey stored in this way stays good for a very long time. It is the food that keeps the bees alive in winter, when there are no flowers. People have collected honey from bees for thousands of years, long before sugar was common.",
    highlights: [
      { q: "Why can't the bees put the nectar away immediately?", a: "the nectar still contains too much water" },
      { q: "When is honey especially important for the bees?", a: "in winter, when there are no flowers" }
    ],
    idea: {
      a: "Bees turn nectar from flowers into honey by drying it and keep it as food for the winter.",
      o: [
        "Worker bees carry nectar from the flowers back to the hive in a special stomach.",
        "Bees are in danger today because people take too much honey from their hives.",
        "Honey is a kind of nectar that bees collect from flowers and keep without changing it."
      ]
    },
    title: { a: "How Bees Make Honey", o: ["Why Flowers Need Bees", "The Sugar Industry Today", "Dangerous Insects of the World"] }
  },
  {
    id: "ir14",
    kind: "expository",
    level: 2,
    part1: "Many people think that sleep is simply a time when {0} happens, but this is not true. {1} we sleep, the body repairs {2} and saves energy for the next day. The brain is busy too. It sorts the information we collected {3} the day and stores the important parts as {4}. This is why students who sleep well before an exam often remember more {5} students who study all night.",
    blanks: [
      { a: "nothing", o: ["nobody", "nowhere", "anything", "none"] },
      { a: "While", o: ["Unless", "Although", "Whether", "Until"] },
      { a: "itself", o: ["himself", "themselves", "ourselves", "yourself"] },
      { a: "during", o: ["while", "among", "between", "since"] },
      { a: "memories", o: ["members", "moments", "messages", "meanings"] },
      { a: "than", o: ["then", "that", "as", "from"] }
    ],
    missing: {
      a: "Sleeping too little, on the other hand, quickly causes problems for both body and mind.",
      o: [
        "For this reason, doctors advise students to study all night before important exams.",
        "Sleeping too little, however, has no clear effect on how people feel the next day.",
        "Animals, on the other hand, are able to live without any sleep at all."
      ]
    },
    part2: "After only one bad night, most people feel tired and find it difficult to concentrate. They may also become angry or sad more easily. If the lack of sleep continues for weeks, the body gets weaker and catches illnesses more often. Doctors say that most adults need between seven and nine hours of sleep each night, and teenagers need even more. Going to bed at the same time every evening is one simple way to sleep better.",
    highlights: [
      { q: "What does the brain do with important information while we sleep?", a: "stores the important parts as memories" },
      { q: "How much sleep do most adults need?", a: "between seven and nine hours of sleep each night" }
    ],
    idea: {
      a: "Sleep is an active and necessary process that keeps both the body and the mind healthy.",
      o: [
        "Teenagers need more hours of sleep each night than most adults do, according to doctors.",
        "People today sleep much less than they did a hundred years ago, mainly because of screens.",
        "Sleep is a quiet time when the body and the brain stop working completely."
      ]
    },
    title: { a: "Why We Need Sleep", o: ["How to Pass an Exam", "Dreams and Their Meanings", "Common Illnesses in Winter"] }
  },
  {
    id: "ir15",
    kind: "expository",
    level: 2,
    part1: "The first bicycles looked very {0} from the ones we ride today. In 1817, a German inventor {1} a wooden machine with two wheels but no pedals. The rider sat on it and pushed {2} the ground with {3} feet. About fifty years later, pedals were {4} to the front wheel. These early bicycles were heavy, and their wheels were {5} of wood and iron. Riding them on stone streets was {6} uncomfortable that people called them boneshakers.",
    blanks: [
      { a: "different", o: ["difficult", "similar", "familiar", "equal"] },
      { a: "built", o: ["grew", "wrote", "taught", "caught"] },
      { a: "against", o: ["among", "during", "between", "without"] },
      { a: "both", o: ["each", "every", "either", "another"] },
      { a: "added", o: ["counted", "increased", "summed", "raised"] },
      { a: "made", o: ["done", "grown", "taken", "given"] },
      { a: "so", o: ["such", "too", "very", "enough"] }
    ],
    missing: {
      a: "In the 1870s, designers tried to make bicycles faster by giving them a huge front wheel.",
      o: [
        "In the 1870s, the first bicycles with engines appeared on the streets of big cities.",
        "Because of this, people stopped riding bicycles completely until the next century.",
        "Before that, designers had already given the safety bicycle two wheels of similar size."
      ]
    },
    part2: "This idea worked, but it created a new danger. The rider sat high above the ground, and falling off could cause serious injuries. The solution arrived in 1885 with the so-called safety bicycle. It had two wheels of similar size and a chain that turned the back wheel. A few years later, tires filled with air made the ride much softer. Since then, the basic shape of the bicycle has hardly changed.",
    highlights: [
      { q: "How did the rider make the machine of 1817 move?", a: "pushed against the ground with both feet" },
      { q: "What made cycling more comfortable a few years after 1885?", a: "tires filled with air" }
    ],
    idea: {
      a: "In the nineteenth century, the bicycle changed step by step from a wooden machine into its modern form.",
      o: [
        "Early bicycles had heavy wheels of wood and iron, so riding them on stone streets was uncomfortable.",
        "Bicycles became less popular after cars were invented at the end of the nineteenth century.",
        "The bicycle has kept exactly the same design since a German inventor built it in 1817."
      ]
    },
    title: { a: "How the Bicycle Got Its Shape", o: ["Famous German Inventors", "Road Safety for Cyclists", "The Invention of the Wheel"] }
  },
  {
    id: "ir16",
    kind: "expository",
    level: 2,
    part1: "In summer, the leaves of most trees are green. The color {0} from a substance called chlorophyll, {1} helps the tree use sunlight to make its food. Leaves also {2} yellow and orange colors, but in summer we cannot see them {3} there is so much green. In autumn, the days become {4} and the weather {5} colder. The tree receives less light, so it slowly stops {6} chlorophyll.",
    blanks: [
      { a: "comes", o: ["goes", "becomes", "brings", "takes"] },
      { a: "which", o: ["who", "what", "where", "whose"] },
      { a: "contain", o: ["consist", "belong", "depend", "happen"] },
      { a: "because", o: ["although", "unless", "until", "whether"] },
      { a: "shorter", o: ["longer", "taller", "thinner", "smaller"] },
      { a: "gets", o: ["makes", "does", "has", "puts"] },
      { a: "producing", o: ["protecting", "promising", "preventing", "pronouncing"] }
    ],
    missing: {
      a: "As the green disappears, the yellow and orange colors that were hidden all summer finally appear.",
      o: [
        "As the green disappears, the leaves immediately turn brown and fall from the tree.",
        "In spring, the tree grows new leaves that are yellow and orange at first.",
        "For this reason, the tree makes more chlorophyll in autumn than in summer."
      ]
    },
    part2: "Red leaves have a different explanation. On sunny autumn days, the leaves still make sugar, but cold nights keep it inside them. This sugar is turned into a new red color. That is why the brightest reds follow a period of warm days and cool nights. In the end, the leaves dry out and fall to the ground. Without leaves, the tree loses less water and can rest through the winter until spring returns.",
    highlights: [
      { q: "What is the job of chlorophyll?", a: "helps the tree use sunlight to make its food" },
      { q: "What kind of weather produces the brightest red leaves?", a: "a period of warm days and cool nights" }
    ],
    idea: {
      a: "Leaves change color in autumn because the green substance disappears and other colors appear or are made.",
      o: [
        "Chlorophyll is the substance that gives the leaves of most trees their green color in summer.",
        "Trees in warm countries never lose their leaves because they get enough light all year.",
        "Leaves turn yellow and red in autumn because the tree produces more chlorophyll in cold weather."
      ]
    },
    title: { a: "Why Leaves Change Color in Autumn", o: ["How Trees Survive the Summer Heat", "The Four Seasons of the Year", "Why Sugar Tastes Sweet"] }
  },
  {
    id: "ir17",
    kind: "expository",
    level: 3,
    part1: "Anyone who has left a city on a summer evening may have noticed the air growing cooler as buildings give {0} to fields. This difference is not {1}. Urban areas are often several degrees warmer than the {2} countryside, a phenomenon {3} as the urban heat island. The main cause {4} in the materials from which cities are built. Asphalt and concrete {5} large amounts of solar energy during the day and release it {6} after sunset.",
    blanks: [
      { a: "way", o: ["path", "road", "route", "track"] },
      { a: "imaginary", o: ["imaginative", "voluntary", "literary", "military"] },
      { a: "surrounding", o: ["surprising", "surviving", "suffering", "supporting"] },
      { a: "known", o: ["called", "said", "told", "thought"] },
      { a: "lies", o: ["lays", "puts", "sets", "places"] },
      { a: "absorb", o: ["reflect", "resist", "reject", "adopt"] },
      { a: "gradually", o: ["gratefully", "generously", "deliberately", "accidentally"] }
    ],
    missing: {
      a: "Vegetation, by contrast, cools its surroundings by providing shade and releasing water vapor into the air.",
      o: [
        "Vegetation, by contrast, absorbs even more heat than asphalt and makes nearby streets warmer.",
        "As a result, city centers are usually cooler at night than the villages around them.",
        "Planners have already solved the problem by removing parks from most large cities."
      ]
    },
    part2: "Because cities have replaced so many plants with hard surfaces, they lose much of this natural cooling. Engines, factories and air conditioners add further heat, while tall buildings block the wind that might carry it away. The consequences are serious: electricity demand rises, and heat waves become more dangerous for elderly residents. Planners are therefore planting trees, creating parks and covering roofs with vegetation or reflective paint. Such measures cannot remove the effect entirely, but they can reduce it noticeably.",
    highlights: [
      { q: "Where does the main cause of the urban heat island lie?", a: "in the materials from which cities are built" },
      { q: "How do tall buildings add to the problem?", a: "block the wind that might carry it away" }
    ],
    idea: {
      a: "Cities are hotter than the countryside because of their materials and lack of plants, but planning can help.",
      o: [
        "Asphalt and concrete absorb solar energy during the day and release it gradually after sunset.",
        "Urban heat islands are the principal cause of the rising temperatures recorded across the whole planet.",
        "Planting trees and painting roofs can completely eliminate the heat difference between cities and fields."
      ]
    },
    title: { a: "Why Cities Are Hotter Than the Countryside", o: ["The Growing Cost of Electricity", "How Concrete Is Manufactured", "Designing Parks for Elderly Residents"] }
  },
  {
    id: "ir18",
    kind: "expository",
    level: 3,
    part1: "Before the middle of the fifteenth century, nearly every book in Europe had to be copied {0} hand. A single volume could occupy a scribe for months, which made books so {1} that only churches, universities and wealthy families could {2} them. Copying also introduced mistakes, {3} tired scribes {4} lines or misread words. {5} printing with movable type had already been invented in East Asia, it was a German goldsmith who, around 1450, {6} metal type with a press.",
    blanks: [
      { a: "by", o: ["with", "of", "at", "on"] },
      { a: "costly", o: ["worthy", "generous", "profitable", "thrifty"] },
      { a: "afford", o: ["spend", "cost", "charge", "owe"] },
      { a: "since", o: ["although", "unless", "whereas", "until"] },
      { a: "skipped", o: ["slipped", "escaped", "hopped", "leaped"] },
      { a: "Although", o: ["Because", "Unless", "Until", "Whether"] },
      { a: "combined", o: ["compared", "competed", "complained", "consisted"] }
    ],
    missing: {
      a: "With this method, a workshop could produce hundreds of identical copies far faster than any scribe.",
      o: [
        "This method, however, proved slower and far more expensive than copying books by hand.",
        "By that time, presses were already operating in almost every city on the continent.",
        "Scribes welcomed the machine because it allowed them to copy each page more carefully."
      ]
    },
    part2: "The effects spread rapidly. Within fifty years, presses were operating in cities across the continent, and prices fell as supply grew. As books became affordable, more people had a reason to learn to read. New ideas now traveled faster than authorities could control them, which helped religious reformers and, later, scientists to reach wide audiences. Printing even shaped languages themselves, because printers had to choose one spelling among many local variants. Few inventions have altered the way knowledge is shared so profoundly.",
    highlights: [
      { q: "Why did hand-copied books contain errors?", a: "tired scribes skipped lines or misread words" },
      { q: "Why did printing influence the way languages were spelled?", a: "printers had to choose one spelling among many local variants" }
    ],
    idea: {
      a: "The printing press made books cheap and plentiful, which transformed literacy, the spread of ideas and even language.",
      o: [
        "Before printing, a scribe could spend months copying a single volume by hand, often with mistakes.",
        "The printing press was quickly banned by authorities who feared the spread of new ideas.",
        "Printing made books far more accurate but kept them much too expensive for ordinary people to buy."
      ]
    },
    title: { a: "How Printing Changed Europe", o: ["The Daily Life of Medieval Scribes", "Great Inventions of East Asia", "Learning to Spell Correctly"] }
  },
  {
    id: "ir19",
    kind: "expository",
    level: 3,
    part1: "Students preparing for an exam often read their notes again and again the night before, a {0} commonly known as cramming. Research on memory {1} that this approach is far less {2} than it feels. In the late nineteenth century, a German psychologist {3} how quickly he forgot lists of {4} syllables. He found that forgetting is rapid {5} first and then slows down. Material that is reviewed just as it begins to fade, however, is {6} considerably longer.",
    blanks: [
      { a: "habit", o: ["hobby", "talent", "fashion", "career"] },
      { a: "suggests", o: ["advises", "offers", "recommends", "persuades"] },
      { a: "effective", o: ["affective", "defective", "objective", "excessive"] },
      { a: "measured", o: ["weighed", "counted", "priced", "scaled"] },
      { a: "meaningless", o: ["careless", "homeless", "sleepless", "fearless"] },
      { a: "at", o: ["in", "on", "by", "for"] },
      { a: "retained", o: ["restrained", "detained", "obtained", "entertained"] }
    ],
    missing: {
      a: "This discovery explains why spreading study sessions over several days works better than one long session.",
      o: [
        "This discovery explains why one long study session works better than several short ones.",
        "He therefore concluded that people cannot remember anything for more than a few days.",
        "Modern students, however, no longer need to memorize any information for their exams."
      ]
    },
    part2: "Each time learners return to the material after a gap, they must make an effort to recall it, and that effort strengthens the memory. For the same reason, testing yourself is more useful than simply rereading a page, which creates only a comfortable sense of familiarity. Cramming can still produce a decent grade the next morning. The knowledge gained that way, however, tends to vanish within weeks, leaving students to learn everything again before the following exam.",
    highlights: [
      { q: "What did the psychologist discover about the speed of forgetting?", a: "forgetting is rapid at first and then slows down" },
      { q: "What does simply rereading a page create?", a: "only a comfortable sense of familiarity" }
    ],
    idea: {
      a: "Reviewing material at intervals and testing yourself leads to more lasting learning than cramming.",
      o: [
        "A nineteenth-century psychologist measured how quickly he forgot lists of syllables.",
        "Students who cram the night before an exam usually receive the lowest grades in the class.",
        "Rereading notes many times in one evening is the most reliable way to remember them for years."
      ]
    },
    title: { a: "Why Spaced Study Beats Cramming", o: ["How to Take Better Notes", "The Structure of the Human Brain", "Reducing Stress Before Exams"] }
  },
  {
    id: "ir20",
    kind: "expository",
    level: 3,
    part1: "Coral reefs {0} colorful underwater gardens, {1} they are built by animals rather than plants. Each reef {2} of countless tiny creatures called polyps, which produce hard limestone skeletons around their {3} bodies. When polyps die, new ones {4} on top of the old skeletons, so the structure grows slowly over thousands of years. Although reefs cover only a tiny {5} of the ocean floor, they provide {6} for roughly a quarter of all marine species.",
    blanks: [
      { a: "resemble", o: ["remind", "assemble", "seem", "appear"] },
      { a: "yet", o: ["so", "since", "unless", "or"] },
      { a: "consists", o: ["contains", "includes", "combines", "involves"] },
      { a: "soft", o: ["mild", "gentle", "loose", "calm"] },
      { a: "settle", o: ["resolve", "arrange", "decide", "establish"] },
      { a: "fraction", o: ["friction", "fiction", "faction", "fracture"] },
      { a: "shelter", o: ["shadow", "shell", "shelf", "shore"] }
    ],
    missing: {
      a: "Corals owe much of this success to microscopic algae that live inside their tissues.",
      o: [
        "Corals owe much of this success to the cold, dark water in which they prefer to grow.",
        "For this reason, most reefs contain very few kinds of fish or other animals.",
        "Scientists once believed that algae were dangerous parasites that slowly killed every reef."
      ]
    },
    part2: "The algae use sunlight to make food, which they share with their hosts, and they also give corals their brilliant colors. This partnership is fragile, however. If the water becomes too warm, stressed corals expel the algae and turn white, a process known as bleaching. A bleached coral is not yet dead, but it may starve unless cooler conditions return in time. Because reefs also protect coastlines from powerful waves, their decline would harm people as well as fish.",
    highlights: [
      { q: "How much of the sea's life finds a home in coral reefs?", a: "roughly a quarter of all marine species" },
      { q: "What happens to corals when the water becomes too warm?", a: "stressed corals expel the algae and turn white" }
    ],
    idea: {
      a: "Coral reefs are rich ecosystems built by animals that depend on algae and are threatened by warm water.",
      o: [
        "Coral polyps produce hard limestone skeletons around their soft bodies, and new polyps settle on old ones.",
        "Most of the world's coral reefs have already disappeared because of fishing and mass tourism.",
        "Coral reefs are underwater plants that grow quickly and are not affected by changes in temperature."
      ]
    },
    title: { a: "The Fragile World of Coral Reefs", o: ["Why the Oceans Are Getting Warmer", "Protecting Coastlines from Storms", "Microscopic Algae in Fresh Water"] }
  },
  {
    id: "ir21",
    kind: "expository",
    level: 4,
    part1: "It seems {0} that a country able to produce every good more efficiently than its neighbors would have nothing to {1} from trading with them. Yet one of the most {2} insights in economics holds {3} the opposite. The principle of comparative advantage, {4} in the early nineteenth century, states that what matters is not absolute efficiency {5} opportunity cost: the value of whatever must be {6} in order to produce something else.",
    blanks: [
      { a: "intuitive", o: ["intensive", "inventive", "intrusive", "inclusive"] },
      { a: "gain", o: ["grant", "grasp", "raise", "reach"] },
      { a: "enduring", o: ["endangered", "enclosed", "endowed", "engaged"] },
      { a: "precisely", o: ["preciously", "previously", "presently", "preferably"] },
      { a: "formulated", o: ["formatted", "fortified", "fermented", "forwarded"] },
      { a: "but", o: ["and", "or", "nor", "than"] },
      { a: "forgone", o: ["forgiven", "forgotten", "forbidden", "forecast"] }
    ],
    missing: {
      a: "Consider a skilled surgeon who also happens to type faster than her own secretary.",
      o: [
        "Consider a skilled surgeon who has never learned to type and must hire a secretary.",
        "This is why efficient countries have always refused to import goods from abroad.",
        "The secretary, by contrast, is better than the surgeon at both typing and operating."
      ]
    },
    part2: "Every hour she spends typing is an hour not spent operating, so the true cost of her typing is enormous. It is rational for her to leave the paperwork to the secretary, even though she would do it faster. The same logic applies to nations. A country gains by specializing in the goods it produces at the lowest opportunity cost and importing the rest, and its less efficient partner benefits too. Trade, on this view, is not a contest with a single winner.",
    highlights: [
      { q: "How does the passage define opportunity cost?", a: "the value of whatever must be forgone in order to produce something else" },
      { q: "In which goods should a country specialize?", a: "the goods it produces at the lowest opportunity cost" }
    ],
    idea: {
      a: "Comparative advantage shows that trade benefits even the most efficient producers, because opportunity cost is what counts.",
      o: [
        "A surgeon who types quickly should nevertheless leave all of her paperwork to a slower secretary.",
        "Countries that specialize in only a few goods inevitably become dependent on their wealthier neighbors.",
        "A country that produces everything more efficiently than its neighbors gains nothing from trade."
      ]
    },
    title: { a: "Why Even the Efficient Should Trade", o: ["The Working Day of a Surgeon", "A History of Nineteenth-Century Economics", "How Tariffs Protect Local Industry"] }
  },
  {
    id: "ir22",
    kind: "expository",
    level: 4,
    part1: "Of the roughly seven thousand languages spoken today, linguists {0} that up to half may fall silent before the end of this century. A language {1} vanishes because its speakers perish; far more often, it is gradually {2}. Parents who {3} their mother tongue with poverty or discrimination may decide to {4} their children in a dominant language that {5} schooling and employment. Within two or three generations, the ancestral language {6} only in the memories of the elderly.",
    blanks: [
      { a: "estimate", o: ["esteem", "evaluate", "appreciate", "measure"] },
      { a: "rarely", o: ["usually", "merely", "nearly", "mostly"] },
      { a: "abandoned", o: ["abused", "absolved", "abbreviated", "abducted"] },
      { a: "associate", o: ["assemble", "assign", "assist", "assume"] },
      { a: "raise", o: ["rise", "grow", "lift", "arise"] },
      { a: "promises", o: ["pretends", "persuades", "prevents", "proposes"] },
      { a: "survives", o: ["revives", "deprives", "derives", "arrives"] }
    ],
    missing: {
      a: "When such a language disappears, far more than a set of words is lost.",
      o: [
        "When such a language disappears, little is lost apart from a few old words.",
        "Fortunately, every endangered language has by now been fully recorded in dictionaries.",
        "The elderly therefore refuse to teach these dominant languages to their grandchildren."
      ]
    },
    part2: "Each language encodes a distinctive way of classifying the world, along with detailed knowledge of local plants, animals and landscapes, much of which has never been written down. Its stories, songs and jokes can seldom be fully translated. Decline is not always irreversible, however. Hebrew, once used mainly for prayer and study, is again spoken as an everyday language by millions, and Maori has been strengthened by preschools in which children are immersed in it. Such efforts demand time, funding and, above all, the commitment of the community itself.",
    highlights: [
      { q: "Where does the ancestral language remain after two or three generations?", a: "only in the memories of the elderly" },
      { q: "What has helped to strengthen Maori?", a: "preschools in which children are immersed in it" }
    ],
    idea: {
      a: "Languages are vanishing as speakers adopt dominant ones, and unique knowledge is lost, though revival is possible.",
      o: [
        "Hebrew, once used mainly for prayer and study, is again spoken as an everyday language by millions.",
        "Governments are chiefly responsible for language loss because they forbid minority languages in all schools.",
        "Languages disappear mainly because their speakers die out, and nothing can ever reverse the process."
      ]
    },
    title: { a: "When Languages Fall Silent", o: ["Learning Hebrew as an Adult", "The Origins of Human Speech", "Why Translation Is an Art"] }
  },
  {
    id: "ir23",
    kind: "expository",
    level: 4,
    part1: "The introduction of antibiotics in the mid-twentieth century {0} medicine, turning once-fatal infections into minor inconveniences. That triumph, however, contained the {1} of a serious problem. Whenever a population of bacteria is {2} to an antibiotic, the most {3} cells die, {4} any that happen to carry a protective mutation survive and multiply. Bacteria can even pass such genes directly to neighboring cells. Each course of treatment therefore {5} a selective pressure in {6} of resistant strains.",
    blanks: [
      { a: "transformed", o: ["transferred", "transmitted", "transported", "translated"] },
      { a: "seeds", o: ["weeds", "grains", "crops", "leaves"] },
      { a: "exposed", o: ["imposed", "proposed", "composed", "supposed"] },
      { a: "susceptible", o: ["suspicious", "superstitious", "sustainable", "substantial"] },
      { a: "while", o: ["unless", "because", "until", "once"] },
      { a: "exerts", o: ["exits", "excels", "expels", "exempts"] },
      { a: "favor", o: ["flavor", "honor", "charge", "search"] }
    ],
    missing: {
      a: "Human behavior has greatly accelerated a process that would otherwise unfold slowly.",
      o: [
        "Human behavior, fortunately, has slowed this process almost to a complete stop.",
        "For this reason, doctors no longer prescribe antibiotics for any kind of infection.",
        "Viruses, by contrast, are easily destroyed by even the weakest antibiotics."
      ]
    },
    part2: "Antibiotics are frequently prescribed for viral illnesses such as colds, against which they are useless, and in some countries they can be bought without any prescription. Enormous quantities are also given to farm animals, sometimes simply to promote growth. Meanwhile, the development of new drugs has slowed, partly because medicines taken for only a few days generate modest profits. Unless prescribing habits change and research is better rewarded, common operations could again become as hazardous as they were a century ago.",
    highlights: [
      { q: "Which bacterial cells survive when a population meets an antibiotic?", a: "any that happen to carry a protective mutation" },
      { q: "Why has the development of new antibiotics slowed?", a: "medicines taken for only a few days generate modest profits" }
    ],
    idea: {
      a: "Antibiotic resistance is a natural process that careless human use has turned into a serious medical threat.",
      o: [
        "Antibiotics are useless against viral illnesses such as colds but are often prescribed for them anyway.",
        "Scientists have recently developed a new class of drugs to which bacteria are unable to adapt.",
        "Resistance arises because antibiotics gradually weaken the human body's own natural defenses against infection."
      ]
    },
    title: { a: "How Antibiotics Lose Their Power", o: ["The Discovery of the First Vaccine", "Keeping Farm Animals Healthy", "Why Colds Spread in Winter"] }
  },
  {
    id: "ir24",
    kind: "expository",
    level: 4,
    part1: "Medieval European painters were not primarily {0} with depicting space as the eye {1} it. Figures were frequently sized {2} to their spiritual importance {3} than their distance from the viewer, and backgrounds were often flat fields of gold. In early fifteenth-century Florence, this {4} was overturned. An architect demonstrated that parallel lines receding from the observer appear to {5} at a single point on the horizon, and a fellow scholar later set out the rules in a {6}.",
    blanks: [
      { a: "concerned", o: ["interested", "worried", "devoted", "dedicated"] },
      { a: "perceives", o: ["deceives", "persists", "permits", "pursues"] },
      { a: "according", o: ["depending", "regarding", "concerning", "considering"] },
      { a: "rather", o: ["other", "sooner", "later", "further"] },
      { a: "convention", o: ["convenience", "conversion", "conversation", "confession"] },
      { a: "converge", o: ["convert", "converse", "conserve", "consent"] },
      { a: "treatise", o: ["treaty", "treatment", "treasure", "treasury"] }
    ],
    missing: {
      a: "Painters who mastered the technique could make a flat wall look like an open window.",
      o: [
        "Painters, however, ignored the discovery and kept their flat gold backgrounds for centuries.",
        "By then, most artists had already abandoned perspective in favor of several viewpoints.",
        "The technique made distant figures appear larger than those standing close to the viewer."
      ]
    },
    part2: "The illusion of depth they achieved astonished contemporaries, and for the next four centuries perspective was regarded as the foundation of serious painting in the West. Yet it is a system of representation, not a neutral record of reality: it assumes a motionless viewer looking with one eye from a fixed position. Toward the end of the nineteenth century, artists began to question that assumption, and some eventually showed objects from several angles at once. Perspective had become one option among many rather than an unbreakable law.",
    highlights: [
      { q: "How did medieval painters often decide the size of a figure?", a: "according to their spiritual importance" },
      { q: "What kind of viewer does perspective take for granted?", a: "a motionless viewer looking with one eye from a fixed position" }
    ],
    idea: {
      a: "Linear perspective, devised in Renaissance Florence, long dominated Western painting but is only one convention for depicting space.",
      o: [
        "Medieval painters often sized figures by importance and placed them against flat backgrounds of gold.",
        "Linear perspective was first developed by painters in East Asia and later copied in Florence.",
        "Perspective is a neutral record of reality that no serious artist has ever thought to question."
      ]
    },
    title: { a: "The Rise and Limits of Perspective", o: ["Gold in Medieval Church Art", "The Architecture of Florence", "How Human Eyes Detect Color"] }
  }
];
