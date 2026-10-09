window.DET_DATA = window.DET_DATA || {};

window.DET_DATA.prompts = {
  interactiveWriting: [
    { id: "iw01", q: "Describe a skill you learned outside of school that turned out to be useful. How did you learn it, and where have you used it since?", q2: "Now think about people who never get the chance to learn skills like this. What could schools or communities do to make such learning available to everyone?" },
    { id: "iw02", q: "Some people believe that cities should limit the number of cars in their centres. Do you agree or disagree? Give reasons and examples to support your view.", q2: "Think about the people who would be most affected by such limits, for example delivery drivers or residents who cannot walk far. How could a city reduce the negative effects on them?" },
    { id: "iw03", q: "Describe a time when you had to work with someone whose opinions were very different from yours. What happened, and what did you learn from it?", q2: "Why do you think disagreement inside a team can sometimes lead to better results than complete agreement?" },
    { id: "iw04", q: "Many people now get their news mainly from social media rather than from newspapers or television. What are the advantages and disadvantages of this change?", q2: "What responsibilities do readers themselves have when they share news online?" },
    { id: "iw05", q: "Describe a place from your childhood that you remember well. What did it look like, and why has it stayed in your memory?", q2: "How has that place, or the way you feel about it, changed since then?" },
    { id: "iw06", q: "Some universities require all students to take courses outside their main subject, such as art for engineers or science for historians. Is this a good idea? Explain why or why not.", q2: "Which single course outside your own field would you choose to take, and how might it help you in the future?" },
    { id: "iw07", q: "Describe a tradition or celebration that is important in your family or community. What do people do, and why does it matter to them?", q2: "Traditions often change over time. Which parts of this tradition do you think will be different in fifty years, and why?" },
    { id: "iw08", q: "Is it better to have a job you love with a low salary or a job you dislike with a high salary? Explain your choice with reasons and examples.", q2: "How might a person's answer to this question change at different stages of life?" },
    { id: "iw09", q: "Describe a piece of technology you use every day. How does it affect the way you work, study, or communicate?", q2: "Imagine you had to live without it for one month. What would be the hardest part, and what might you gain?" },
    { id: "iw10", q: "Some people say that failure is a better teacher than success. Do you agree? Use an example from your own life or from the life of someone you know.", q2: "How should teachers or parents react when a young person fails at something important?" },
    { id: "iw11", q: "Describe a book, film, or series that changed the way you think about something. What was it about, and what changed for you?", q2: "Why do you think stories can sometimes influence people's opinions more strongly than facts?" },
    { id: "iw12", q: "In many countries, more and more people are moving from small towns to large cities. What problems can this cause, and what benefits can it bring?", q2: "What could be done to make life in small towns more attractive to young people?" }
  ],

  readSpeak: [
    { id: "rs01", q: "Talk about a teacher who had a strong influence on you.", bullets: ["Who was this teacher?", "What did they teach?", "What made their teaching different?", "How did they influence you?"] },
    { id: "rs02", q: "Describe a difficult decision you had to make.", bullets: ["What was the decision?", "What options did you have?", "How did you decide?", "Would you make the same choice again?"] },
    { id: "rs03", q: "Talk about a city or town you would like to visit.", bullets: ["Where is it?", "How did you learn about it?", "What would you do there?", "Why does it attract you?"] },
    { id: "rs04", q: "Describe a hobby or activity that helps you relax.", bullets: ["What is it?", "When did you start doing it?", "How often do you do it?", "Why does it help you?"] },
    { id: "rs05", q: "Talk about a time you helped someone.", bullets: ["Who did you help?", "What was the problem?", "What did you do?", "How did you feel afterwards?"] },
    { id: "rs06", q: "Describe an object that is very important to you.", bullets: ["What is it?", "How did you get it?", "How do you use it?", "Why is it special to you?"] },
    { id: "rs07", q: "Talk about a goal you are working towards.", bullets: ["What is the goal?", "Why did you choose it?", "What have you done so far?", "What is the biggest challenge?"] },
    { id: "rs08", q: "Describe a meal you will never forget.", bullets: ["Where and when was it?", "Who were you with?", "What did you eat?", "Why was it memorable?"] },
    { id: "rs09", q: "Talk about a change you would like to see in your hometown.", bullets: ["What would you change?", "Why is the change needed?", "Who would benefit from it?", "How could it be done?"] },
    { id: "rs10", q: "Describe a time when you learned something from a mistake.", bullets: ["What happened?", "What was the mistake?", "What did you learn?", "How has it changed what you do?"] },
    { id: "rs11", q: "Talk about a person you admire who is not famous.", bullets: ["Who is this person?", "How do you know them?", "What qualities do they have?", "What have you learned from them?"] },
    { id: "rs12", q: "Describe a journey that did not go as planned.", bullets: ["Where were you going?", "What went wrong?", "How did you deal with it?", "What do you remember most?"] }
  ],

  interactiveSpeaking: [
    { id: "is01", topics: [
      { name: "getting around", qs: ["How do you usually get around the place where you live?", "What are some advantages of public transport compared with driving a car?", "How could cities encourage more people to use buses and trains?"] },
      { name: "learning languages", qs: ["Tell me about your experience of learning English.", "What do you find most difficult about learning a new language?", "Do you think technology will make learning languages unnecessary in the future? Why or why not?"] } ] },
    { id: "is02", topics: [
      { name: "cooking and food", qs: ["What is a dish you know how to cook, and how do you make it?", "Why do you think some people prefer eating out to cooking at home?", "How have eating habits in your country changed in recent years?"] },
      { name: "free time", qs: ["What do you usually do at the weekend?", "Do you prefer to plan your free time or to be spontaneous? Why?", "Why is it important for people to have time away from work or study?"] } ] },
    { id: "is03", topics: [
      { name: "music", qs: ["What kind of music do you enjoy listening to?", "Describe a concert or performance you remember.", "How does music affect people's mood or concentration?"] },
      { name: "friendship", qs: ["Tell me about how you met one of your close friends.", "What qualities make someone a good friend?", "Is it harder to make friends as an adult than as a child? Why?"] } ] },
    { id: "is04", topics: [
      { name: "shopping online", qs: ["How often do you buy things online, and what do you usually buy?", "What are some disadvantages of shopping online?", "How do you think shops in city centres will change in the future?"] },
      { name: "weather and seasons", qs: ["What is your favourite season, and why?", "How does the weather affect your daily plans?", "How might a changing climate affect the place where you live?"] } ] },
    { id: "is05", topics: [
      { name: "sport and exercise", qs: ["What sports or kinds of exercise do you do?", "Why do some people find it hard to exercise regularly?", "Should schools make sport compulsory for all students? Why or why not?"] },
      { name: "museums and art", qs: ["Tell me about a museum or gallery you have visited.", "Why do you think some people find museums boring?", "Should museums be free for everyone? Explain your opinion."] } ] },
    { id: "is06", topics: [
      { name: "mobile phones", qs: ["What do you use your phone for most often?", "Describe a situation where using a phone is impolite.", "At what age should children get their first phone, and why?"] },
      { name: "your neighbourhood", qs: ["Describe the neighbourhood where you live.", "What makes a neighbourhood a good place to live?", "How could neighbours help each other more?"] } ] },
    { id: "is07", topics: [
      { name: "travel", qs: ["Tell me about the last trip you took.", "Do you prefer travelling alone or with other people? Why?", "What are some negative effects of tourism on popular places?"] },
      { name: "study habits", qs: ["Where and when do you study best?", "What do you do when you cannot concentrate?", "Is it better to study a little every day or a lot before an exam? Explain."] } ] },
    { id: "is08", topics: [
      { name: "films and series", qs: ["What kind of films or series do you like to watch?", "Describe a film you would recommend to a friend.", "Why do you think streaming has become more popular than going to the cinema?"] },
      { name: "jobs and careers", qs: ["What job would you like to have in the future?", "What skills are most important for that kind of work?", "Is it better to stay in one company for a long time or to change jobs often? Why?"] } ] },
    { id: "is09", topics: [
      { name: "pets and animals", qs: ["Have you ever had a pet, or would you like one?", "What are the responsibilities of owning an animal?", "Should wild animals be kept in zoos? Explain your view."] },
      { name: "money and saving", qs: ["Are you good at saving money? Explain.", "What is something you bought that was really worth the price?", "Should schools teach children how to manage money? Why or why not?"] } ] },
    { id: "is10", topics: [
      { name: "social media", qs: ["Which websites or apps do you use every day?", "How has social media changed the way people communicate?", "What can people do to protect their privacy online?"] },
      { name: "holidays and celebrations", qs: ["What is your favourite holiday of the year?", "How do people in your country celebrate the new year?", "Why do you think celebrations are important for communities?"] } ] },
    { id: "is11", topics: [
      { name: "reading", qs: ["What do you like to read?", "Do you prefer paper books or reading on a screen? Why?", "How can parents encourage children to read more?"] },
      { name: "health and sleep", qs: ["How many hours do you usually sleep, and is it enough?", "What do you do to stay healthy?", "Why do you think many people today feel stressed?"] } ] },
    { id: "is12", topics: [
      { name: "homes", qs: ["Describe the home you live in now.", "Would you rather live in a house or an apartment? Why?", "What will homes be like fifty years from now?"] },
      { name: "volunteering", qs: ["Have you ever done any volunteer work, or would you like to?", "Why do people choose to work without being paid?", "What kind of volunteer projects would be most useful where you live?"] } ] }
  ],

  writingSample: [
    { id: "ws01", q: "Describe a challenge that students in your country often face, and suggest how it could be solved. Give specific details and examples." },
    { id: "ws02", q: "Some people prefer to study alone, while others prefer to study in a group. Which do you prefer, and why? Support your answer with examples from your experience." },
    { id: "ws03", q: "Describe a person who has had a positive influence on your community. What did this person do, and why was it important?" },
    { id: "ws04", q: "Do you agree or disagree with the following statement? Schools should teach practical life skills, such as cooking and managing money, as well as academic subjects. Give reasons for your opinion." },
    { id: "ws05", q: "Describe an invention that you think has changed everyday life the most. Explain how life was different before it." },
    { id: "ws06", q: "Many people now work or study from home. What are the main advantages and disadvantages of this? Use examples to explain your view." },
    { id: "ws07", q: "Describe an experience that taught you something about another culture. What happened, and what did you learn?" },
    { id: "ws08", q: "Is it more important for a leader to be liked or to be respected? Explain your opinion with reasons and examples." },
    { id: "ws09", q: "Describe the place where you feel most productive. What makes it a good place for working or studying?" },
    { id: "ws10", q: "Some people think that children should start learning a foreign language as early as possible. Do you agree? Why or why not?" },
    { id: "ws11", q: "Describe a problem in the natural environment near where you live. What causes it, and what could ordinary people do about it?" },
    { id: "ws12", q: "What does success mean to you? Describe how your idea of success has changed as you have grown older." }
  ],

  speakingSample: [
    { id: "ss01", q: "Describe your hometown or the place where you grew up. What is it known for, and what would you show a visitor first?" },
    { id: "ss02", q: "Do you think people learn more from travelling or from reading books? Explain your opinion with examples." },
    { id: "ss03", q: "Talk about a subject you enjoyed studying at school and explain why it interested you." },
    { id: "ss04", q: "Describe a time when you had to learn something quickly. How did you manage it?" },
    { id: "ss05", q: "Some people think it is important to follow the news every day. Others think it is a waste of time. What is your view?" },
    { id: "ss06", q: "Talk about what you would like to study or do at university and why you chose that field." },
    { id: "ss07", q: "Describe a typical day in your life and say which part of the day you enjoy most." },
    { id: "ss08", q: "What are the qualities of a good teacher? Use examples from your own experience." },
    { id: "ss09", q: "Talk about an important change in your life and how it affected you." },
    { id: "ss10", q: "Is it better to live in a big city or in the countryside? Explain your preference." },
    { id: "ss11", q: "Describe something you are proud of having achieved and explain what it took to achieve it." },
    { id: "ss12", q: "How do you think your life will be different ten years from now?" }
  ]
};

// Photos: Unsplash images served by picsum.photos. Order matters: index i belongs to
// variant (i % 12); rows of 12 are: write 1, write 2, write 3, speak, practice, practice.
(function () {
  const rows = [
    // write 1 — people
    [[1, "A man typing on a laptop at a wooden table, with two phones beside him."],
     [64, "A young woman in sunglasses and a white lace top standing in a field at sunset."],
     [129, "A couple sitting on a wooden bench, looking out at the sea in soft evening light."],
     [177, "A hiker with a backpack standing on a mountain path above a hazy valley."],
     [349, "A man sitting on a wall by the water, looking at a distant city skyline."],
     [660, "A woman in a knitted cardigan holding a burning sparkler."],
     [665, "A man sitting on a stone wall, looking over a town in a valley with mountains behind."],
     [823, "A woman in a red hat taking a photo with a camera, surrounded by green leaves."],
     [832, "A woman reading a newspaper at a table in a dark room."],
     [841, "A swimmer doing front crawl in dark open water."],
     [1011, "A woman paddling a canoe on a calm lake with a forest on the shore."],
     [1012, "A man sitting in tall grass against a wall, reading."]],
    // write 2 — objects and places
    [[85, "A tractor pulling a trailer loaded with hay bales across a harvested field under a cloudy sky."],
     [133, "Two classic cars parked in front of yellow garage doors."],
     [163, "An outdoor cafe table with flowers and blue chairs next to a painted wall."],
     [164, "A canal lined with old houses, with a small boat on the water."],
     [225, "A glass teapot with tea, a small cup and yellow flowers on a table."],
     [364, "A passenger plane parked at an airport gate with service vehicles around it."],
     [376, "Yellow taxis driving along a street between tall buildings."],
     [419, "Two yellow trams on a street in an old town with a church on the hill behind."],
     [437, "A red-brick building on a street corner with a cafe terrace and red umbrellas."],
     [625, "A dining table with white chairs in a bright room with a wooden floor."],
     [670, "A red tram on a wet pedestrian street with people walking beside it."],
     [692, "The main hall of a large railway station full of people, with tall arched windows."]],
    // write 3 — animals
    [[169, "Two brown dogs sniffing the grass."],
     [200, "A long-haired brown highland cow standing on a grassy hill near the sea."],
     [219, "A leopard walking along a dirt road with bushes on both sides."],
     [237, "A black dog lying on a wooden floor, looking up at the camera."],
     [244, "A pelican standing on a wooden post of a pier, with other birds behind it."],
     [593, "A young tiger lying on the ground next to a wire fence."],
     [659, "A husky wearing a harness, looking to the side against a dark background."],
     [718, "A grey wolf walking through a forest."],
     [837, "A white and brown bulldog standing on paving stones, looking down."],
     [1025, "A pug wrapped in a checked blanket sitting on a forest path."],
     [1084, "A group of walruses lying close together on a beach."],
     [699, "A shepherd with a large flock of sheep in a green hilly landscape."]],
    // speak — busy scenes
    [[342, "A woman with a white backpack walking along a busy street with motorbikes and a bus."],
     [348, "A crowded shopping centre with escalators; the people are blurred by movement."],
     [395, "A bartender and customers at the counter of a dimly lit bar with hanging lamps."],
     [453, "A guitarist singing on stage in a spotlight, with a keyboard player behind him."],
     [513, "A man sitting at a table in a bright cafe with hanging lamps, seen from behind."],
     [838, "A woman crouching to hug a small child on a cobbled street with parked cars."],
     [836, "A woman in a hat playing a red electric guitar in a music shop."],
     [1060, "A barista pouring water from a kettle to make filter coffee."],
     [390, "A person jumping beside a pool at sunset while others stand nearby; all are silhouettes."],
     [822, "A woman crouching on a city pavement, holding a small child close."],
     [1001, "A couple walking along a sandy path towards the sea."],
     [839, "A woman riding a bicycle along a road with mountains in the background."]],
    // practice — people
    [[22, "A man walking across a wide, empty road."],
     [91, "A person in a dark coat holding an old twin-lens camera."],
     [550, "A woman seen from behind, looking over a blurred city at dusk."],
     [628, "A woman with long blond hair in a denim shirt holding a camera at her waist."],
     [633, "A woman sitting on the ground in a pine forest."],
     [777, "A woman sitting on a rock by a lake in bright sunlight."],
     [786, "A person in a blue hooded jacket standing in a pine forest, seen from behind."],
     [816, "A hand holding a phone and photographing a sunset over the sea."],
     [821, "A woman standing on a platform while a train rushes past."],
     [856, "A man in a dark blue suit with a pocket square holding a white cup."],
     [883, "A man seen from behind standing by a mountain lake that reflects the clouds."],
     [1082, "Two hands playing a piano."]],
    // practice — objects and places
    [[20, "A desk seen from above with a laptop, notebooks, pencils and a phone."],
     [146, "A red tricycle on the pavement in front of a building."],
     [292, "A red onion, fresh greens and peppercorns on a wooden cutting board."],
     [469, "Two people in a canoe on a misty green lake."],
     [488, "A bowl of colourful salad on a wooden board."],
     [553, "Park benches surrounded by orange autumn leaves."],
     [655, "An old blue camper van with rust marks, parked in front of trees."],
     [674, "Two hands holding a bunch of dark grapes."],
     [686, "People on boats loaded with goods at a floating market."],
     [797, "A person holding a red umbrella at night with blurred lights behind."],
     [820, "A row of empty swings in a playground."],
     [1072, "An old rusty truck standing in a field."]]
  ];
  const photos = [];
  rows.forEach(function (row) {
    row.forEach(function (p) {
      photos.push({ id: "ph" + p[0], src: "https://picsum.photos/id/" + p[0] + "/960/720", about: p[1] });
    });
  });
  window.DET_DATA.photos = photos;
})();
