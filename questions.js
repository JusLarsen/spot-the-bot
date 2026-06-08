// Question bank for Spot the Bot — VERIFIED CORPUS.
// Each item: { type:'text', answer:'human'|'bot', body, source, reveal, category }
//   answer  : was this made by a HUMAN or an AI?
//   source  : citation shown after answering — real, web-verified source for human
//             items; "AI-generated in the style of ..." for bot items.
//   reveal  : one-line explanation of the tell.
//
// Built by the corpus workflow: every human quote confirmed by 2/2 independent
// fact-checkers against a real public source; bot items are AI pastiches.
// Balanced 50/50 human:bot OVERALL and WITHIN each category, so no category
// leaks its answer. Counts: bbq 40, business 24, disney 20, speech 16.
// The game shuffles per team at runtime; order here doesn't matter.
export const QUESTIONS = [
  {
    type: "text",
    answer: "human",
    body: "At long last, it's finally time to get cooking. You've gotten to know your smoker and you've sourced or seasoned the best wood you can possibly find.",
    source:
      'Aaron Franklin & Jordan Mackay, Franklin Barbecue: A Meat-Smoking Manifesto (2015), Chapter 6 "The Cook"',
    reveal:
      'The slightly weary "At long last" opener and the personal "you\'ve gotten to know your smoker" reflect a real pitmaster\'s voice walking a reader through hard-won craft.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "Life is too short for bad BBQ!",
    source: 'Danielle "Diva Q" Bennett, Traeger Grills ambassador profile (traeger.com/diva-q)',
    reveal:
      "It's a punchy, slightly cheeky personal motto a real pitmaster would put on merch — not the kind of neutral phrasing a bot invents.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "I tell people I'm living the dream, because I've turned my hobby into a job.",
    source:
      "Matt Pittman, Meat Church BBQ — Traeger Collective profile (traeger.com/collective/matt-pittman)",
    reveal:
      'The self-deprecating "I tell people..." framing and the specific hobby-to-job pivot reflect a real person recounting leaving an IT career, not a generic platitude.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "Didn't have great equipment or great knowledge, but the passion was there. That's never changed.",
    source:
      'Jeremy Yoder (Mad Scientist BBQ), "Barbecue, Beef Ribs & Burnout: A Chat with Jeremy Yoder," Lord Saunders Smokehouse interview',
    reveal:
      "It's a humble origin story — admitting you started with bad gear and no knowledge is the kind of self-deprecating honesty a real person offers, not a polished brag.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "it's all about cooking delicious food and taking pride in everything we cook",
    source: "Malcom Reed, HowToBBQRight / Killer Hogs BBQ",
    reveal:
      'It\'s plain-spoken pitmaster humility — "everything we cook" with that family-business "we" is how a real BBQ guy talks, not a polished brand tagline.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "But the fact that in Texas barbecue, you're taking one of the worst pieces of the animal and converting it into one of the best is a miracle itself.",
    source: "Aaron Franklin, Franklin Barbecue: A Meat-Smoking Manifesto (2015)",
    reveal:
      "The slightly clumsy phrasing and the geeky pride in transforming a cheap, tough cut reflects a real pitmaster's lived obsession rather than a polished aphorism.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "Sure, I was poor. But barbecue has never been a rich man's pleasure. It's always been a culture of thrift.",
    source: "Aaron Franklin, Franklin Barbecue: A Meat-Smoking Manifesto (2015)",
    reveal:
      'The self-deprecating "Sure, I was poor" opener and the offhand class-history aside read like a real person reflecting, not a polished aphorism.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "I think it's key that you buy the best thing that you can afford.",
    source: 'Aaron Franklin, "The Sublime Simplicity of Aaron Franklin," Austin Food Magazine',
    reveal:
      "It's plainspoken, practical kitchen advice with a casual hedge (\"I think it's key\") rather than a polished marketing line.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "You learn from your mistakes and you just keep going and trying to do the best you can.",
    source: "Aaron Franklin, Q&A interview, Austin Food Magazine",
    reveal:
      "It's plainspoken, slightly run-on encouragement about barbecue trial-and-error — the kind of casual, unpolished advice a real pitmaster gives in conversation, not a tidy aphorism.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "A little beef tallow on the cutting board makes for those sexy slices.",
    source:
      "Matt Pittman (Meat Church BBQ), in \"Going to Texas' Meat Church — Matt Pittman's Barbecue School is a Truly Unique Food Experience,\" PaperCity Magazine",
    reveal:
      'The cheeky "sexy slices" phrasing is exactly the kind of offhand, personality-driven pitmaster patter a real person uses, not generic AI prose.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "I am an absolute insatiable learner. I love to learn more than anything in the world.",
    source: 'Danielle "Diva Q" Bennett, exclusive interview with Mashed (2024)',
    reveal:
      'The plain, slightly redundant doubling ("insatiable learner" then "love to learn more than anything") is how people actually emphasize a point when speaking off the cuff, not how a polished slogan reads.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "There is a saying in my industry, you buy the meat, not the sauce.",
    source: 'Danielle "Diva Q" Bennett, exclusive interview with Mashed (2023)',
    reveal:
      'She frames it as an industry saying and immediately riffs on it ("sauce can hide a lot of barbecue sins"), the way a real pitmaster talks shop, not a clean aphorism.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "I've always looked at myself as a student of BBQ, because no matter how long you've been doing it, there's always something else to learn.",
    source: 'Malcom Reed, "About Malcom Reed & HowToBBQRight" (h2qshop.com)',
    reveal:
      'The humble "I\'m still a student even after all these years" framing is a lived-experience sentiment a real pitmaster says, not a generic AI platitude.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "You can't make a fake fire.",
    source: "Aaron Franklin, Tasting Table exclusive interview (2023)",
    reveal:
      "It's a blunt, plainspoken pitmaster's truism — the kind of unhedged real-talk a person says, not a tidy AI line.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "If the temperatures are up and down, it's pretty likely that your firewood is too big, so it's robbing energy from the fire to get to a combustion point.",
    source: "Aaron Franklin, Tasting Table exclusive interview (2023)",
    reveal:
      "It's hands-on pitmaster intuition — diagnosing a swinging temperature by the physics of oversized wood robbing energy to combust — the kind of specific, earned detail a real expert gives.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "The worst thing you can do is overcook it.",
    source: "Aaron Franklin, Tasting Table exclusive interview (2023)",
    reveal:
      "It is plain, practical pitmaster advice — short and direct, the kind of thing a real cook says off the cuff rather than a polished marketing line.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "Like Traeger, I subscribe to the all-natural BBQ philosophy. The hardwood taste and authentic flavors from Traeger's wood fire and wood pellets just can't be beat.",
    source:
      'Matt Pittman (Meat Church BBQ), "Traeger Grills Partners with Meat Church BBQ\'s Matt Pittman to Spread the Gospel of Wood-Fired Cooking," PR Newswire (2018)',
    reveal:
      'It pairs personal brand allegiance ("I subscribe to") with a casual idiom ("just can\'t be beat") in a way that reads like an endorsement quote a real pitmaster gave, not a generic AI line.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "Barbecue feeds your soul because it brings people together.",
    source: 'Danielle "Diva Q" Bennett, Mashed exclusive interview (2024)',
    reveal:
      "It's a heartfelt, slightly cliched personal philosophy a real pitmaster repeats in interviews — earnest and a little worn, not the kind of polished line a bot would invent.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "I do not say I'm lucky. I work too hard to be lucky.",
    source: 'Danielle "Diva Q" Bennett, Mashed exclusive interview (2023)',
    reveal:
      'The slightly blunt, self-assured cadence — "I do not say I\'m lucky" — is the kind of earned, unpolished confidence a real pitmaster uses, not a tidy aphorism.',
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "I'd be setting alarms and waking up every 30 minutes; go put a couple logs on the fire, and eventually, it became a business.",
    source: "Jeremy Yoder (Mad Scientist BBQ), Spectrum News 1 (2025)",
    reveal:
      "The mundane, sleep-deprived detail of setting alarms every 30 minutes to tend a fire is the kind of unglamorous specific that only someone who actually lived it would mention.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "There's no shortcut to a perfect brisket, and honestly, there's no shortcut to anything worth having. Low and slow, let it ride, trust the smoke. Fourteen hours on the Traeger and not a single regret. Because the truth is, the best things in life — like the best bark — only come to those who refuse to rush the process.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Tacks on a tidy life-lesson moral that explicitly equates brisket patience with life patience.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Let me be clear: a great smoke ring isn't luck, it's commitment. Pellets dialed to 225, a clean fire, and the patience to leave that lid closed. If you're peeking, you're not cooking. Set it, trust it, and let the magic happen. Your taste buds will thank you, and so will your weekend.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Over-polished influencer cadence with the canned 'your taste buds will thank you' closer.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Smoked these ribs for six hours and the bark came out absolutely perfect — deeply caramelized, beautifully tender, and bursting with flavor. The Traeger does the heavy lifting so you can focus on what really matters: the people gathered around your table. Good food, good company, good memories. That's the whole point, isn't it?",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Stacks three polished adverb-laden praise phrases then pivots to a generic 'what really matters' sentiment.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Pro tip: temperature is everything. Whether you're running a pork shoulder at 225 or searing a steak at 450, consistency is the secret ingredient no one talks about. Master your heat and you master your craft. And isn't that true of most things worth doing well?",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "'Secret ingredient no one talks about' cliché plus a rhetorical-question life analogy.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Day three of the 30-day smoke challenge and today it's pulled pork. Rubbed it down, let it ride at 225, and pulled it at 203 internal. Juicy, smoky, unforgettable. Remember, friends: great barbecue isn't about perfection, it's about showing up and putting in the work, one cook at a time.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Empty motivational 'showing up and putting in the work' framing grafted onto a cook log.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Nothing beats the smell of hickory in the morning. That first crack of the lid, that ribbon of blue smoke, that quiet moment before the neighborhood wakes up. Cooking on the Traeger taught me to slow down and savor the in-between. Sometimes the journey really is the destination, my friends.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal: "Closes with the threadbare 'journey is the destination' platitude.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Brisket 101: trim it, rub it, smoke it, rest it. Don't overthink it. The Traeger handles the precision so you can handle the fun. At the end of the day, barbecue is just love made visible — a way of saying 'I made this for you' without ever saying a word.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal: "'Love made visible' sentimental flourish reads as AI-generated emotional summary.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Real talk — your smoke ring is a flex, but your patience is the real trophy. Anybody can crank the heat. It takes discipline to let low and slow do its thing. Trust the process, respect the meat, and let time be your co-pilot. Greatness, like good bark, can't be rushed.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Mixed metaphors ('time be your co-pilot') and a forced parallel between greatness and bark.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Smoked wings, three ways, one Traeger. Crispy skin, tender meat, and a glaze that'll make you question every wing you've ever eaten. Whether you're feeding a crowd or just treating yourself, these deliver every single time. Go ahead — your next game day just found its MVP.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal: "Formulaic 'X ways, one Y' headline and the canned 'every single time' guarantee.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Here's what fifteen years of cooking taught me: the fire doesn't lie. You can fake a lot of things, but you can't fake a properly rendered point. So tend your coals, watch your temps, and stay humble. The pit has a way of teaching patience to those willing to learn.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal: "Anthropomorphizes the pit as a humble teacher in a tidy aphoristic wrap-up.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Sunday reset: a cold drink, a warm fire, and a pork butt that's going nowhere fast. There's a kind of therapy in tending a smoker — no notifications, no rush, just you and the rhythm of the cook. Slow down. Breathe. Let the smoke do the talking.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Wellness-influencer 'therapy/breathe/slow down' register feels templated rather than lived.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "The secret to fall-off-the-bone ribs? It's not the rub, it's not the sauce — it's respect for the process. Low temps, steady smoke, and the wisdom to know when to walk away. Barbecue rewards the patient and humbles the proud. Cook accordingly, pitmasters.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Proverb-style antithesis ('rewards the patient and humbles the proud') is an AI rhetorical tic.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Pulled this beauty at 204 and let it rest a full hour — and let me tell you, that rest is where the magic happens. So many folks rush this part. Don't. In barbecue, as in life, the waiting is where everything comes together. Trust me on this one.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal: "Explicit 'in barbecue, as in life' aphorism is a hallmark AI moralizing move.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Cold smoke, warm heart. Today we're doing salmon on the Traeger — delicate, flaky, and kissed with just enough alder to keep it interesting. Cooking for the people you love is the original language, older than words. Fire it up and tell someone you care.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal: "'Original language, older than words' is grandiose, generic AI lyricism.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Let's settle the debate: bark beats sauce, every time. A good crust is earned through hours of low heat and patience you can't buy. Sauce is a guest; bark is the host. Build your foundation right and everything else falls into place — on the grill and off it.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Cutesy 'sauce is a guest, bark is the host' construction plus an 'on the grill and off it' coda.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Three things every pitmaster needs: a reliable thermometer, a sharp knife, and the patience of a saint. Get those right and the Traeger does the rest. Barbecue isn't a sprint, it's a slow dance with smoke and time. Lean in, stay present, and savor it.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Listicle opener and 'slow dance with smoke and time' overwritten metaphor signal generation.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Burnt ends are proof that the best things come from the parts other people throw away. Cube the point, sauce it, smoke it down to candy. There's a little lesson in there about second chances, if you're looking for one. Either way, they disappear off the platter in minutes.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Volunteers a 'little lesson about second chances' nobody asked for — classic tacked-on moral.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Weeknight win: smoked chicken thighs in under an hour on the Traeger. Juicy, flavorful, and endlessly versatile — toss them on a salad, in a taco, or straight off the rack. Cooking well doesn't have to be complicated; it just has to be done with intention.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "'Endlessly versatile' and the polished 'done with intention' closer read as AI marketing copy.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Some nights the smoke ring comes out picture-perfect, and some nights it doesn't — and that's okay. Barbecue, like life, isn't about flawless. It's about showing up, learning the fire, and getting a little better with every cook. Progress over perfection, always.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal: "'Progress over perfection' is a stock motivational slogan dropped in verbatim.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "bot",
    body: "Real pitmasters know: you don't cook the clock, you cook the meat. Probe tender is the only timestamp that matters. Let go of the rush, honor the process, and let that brisket tell you when it's ready. The pit teaches patience to anyone willing to listen.",
    source: "AI-generated in the style of a Traeger pitmaster",
    reveal:
      "Repeats the anthropomorphized 'pit teaches patience' moral, signaling formulaic generation.",
    category: "bbq",
  },
  {
    type: "text",
    answer: "human",
    body: "Discipline equals freedom.",
    source: "Jocko Willink, Extreme Ownership: How U.S. Navy SEALs Lead and Win (2015)",
    reveal:
      "It is a blunt, paradoxical four-word maxim a drill-hardened SEAL would actually bark — not the tidy, hedged phrasing an AI tends to produce.",
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "It's not what you preach, it's what you tolerate.",
    source:
      "Jocko Willink and Leif Babin, Extreme Ownership: How U.S. Navy SEALs Lead and Win (2015)",
    reveal:
      "It's a blunt, real-world leadership maxim of the kind a combat veteran would phrase tersely, not a polished platitude.",
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "There are no bad teams, only bad leaders.",
    source:
      "Jocko Willink and Leif Babin, Extreme Ownership: How U.S. Navy SEALs Lead and Win (2015)",
    reveal:
      "It states a blunt, accountability-shifting principle in plain declarative language — the kind of hard-edged maxim a leadership practitioner coins, not a hedged AI summary.",
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "When setting expectations, no matter what has been said or written, if substandard performance is accepted and no one is held accountable—if there are no consequences—that poor performance becomes the new standard.",
    source:
      "Jocko Willink and Leif Babin, Extreme Ownership: How U.S. Navy SEALs Lead and Win (2015)",
    reveal:
      'It states a hard-won, specific leadership consequence ("poor performance becomes the new standard") rather than a vague motivational platitude—the kind of pointed insight that comes from real command experience.',
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "Good is the enemy of great. And that is one of the key reasons why we have so little that becomes great.",
    source:
      "Jim Collins, Good to Great: Why Some Companies Make the Leap... and Others Don't (2001)",
    reveal:
      "It's the famous opening line of the book — a punchy, paradoxical aphorism a real author crafted as a hook, not generic filler.",
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "Greatness is not a function of circumstance. Greatness, it turns out, is largely a matter of conscious choice, and discipline.",
    source:
      "Jim Collins, Good to Great: Why Some Companies Make the Leap... and Others Don't (2001)",
    reveal:
      'The slightly awkward mid-sentence aside "it turns out" and the comma before "and discipline" are conversational tics a real author writes, not a polished aphorism a machine would generate.',
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "Great vision without great people is irrelevant.",
    source:
      "Jim Collins, Good to Great: Why Some Companies Make the Leap... and Others Don't (2001)",
    reveal:
      'It\'s a blunt, almost contrarian one-liner that flips the comfortable "vision first" cliche on its head — the kind of provocative inversion a real management thinker uses to make a point stick.',
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.",
    source: "Dale Carnegie, How to Win Friends and Influence People (1936)",
    reveal:
      "It captures Carnegie's earnest, slightly preachy self-help cadence — the kind of folksy time-math advice a real person dispenses.",
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "Most people do not listen with the intent to understand; they listen with the intent to reply.",
    source: "Stephen R. Covey, The 7 Habits of Highly Effective People (1989)",
    reveal:
      "It names a specific, relatable human failing in conversation that anyone who has felt unheard immediately recognizes.",
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "People don't buy what you do; they buy why you do it.",
    source: "Simon Sinek, Start with Why: How Great Leaders Inspire Everyone to Take Action (2009)",
    reveal:
      "It's one of those punchy, almost-too-tidy maxims a real person repeats from a business book, slightly misremembering the semicolon as a comma.",
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "When it comes to standards, as a leader, it's not what you preach, it's what you tolerate.",
    source:
      'Jocko Willink & Leif Babin, Extreme Ownership (2015), Ch. 2 "No Bad Teams, Only Bad Leaders"',
    reveal:
      "It draws a hard line between stated values and accepted behavior, the kind of plainspoken accountability a SEAL officer actually lives by.",
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "Good is the enemy of great.",
    source:
      "Jim Collins, Good to Great: Why Some Companies Make the Leap... and Others Don't (2001), opening line",
    reveal:
      "It's a real human's hard-won, deflating observation that comfortable competence is precisely what keeps most things from ever becoming exceptional.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "Leadership isn't about having all the answers. It's about asking the right questions. The most powerful leaders I've worked with understand that influence flows not from authority, but from curiosity. When you trade certainty for genuine inquiry, you unlock the collective intelligence of the people around you.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Leans on the formulaic 'it's not about X, it's about Y' antithesis paired with a hollow 'collective intelligence' payoff.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "In today's fast-paced world, the leaders who thrive aren't the ones moving fastest. They're the ones who know when to pause. Speed without direction is just noise. True momentum comes from the quiet discipline of stillness.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Opens with the telltale 'in today's fast-paced world' filler and resolves into a paradox that says nothing concrete.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "Culture is not what you say on the walls. It's what you tolerate in the hallways. Every unaddressed behavior is a silent endorsement, and every standard you walk past becomes the new standard you accept.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Built on a tidy 'walls vs. hallways' rhetorical symmetry that sounds profound but is empirically untestable.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "Great teams are not built on talent alone. They are built on trust. Talent fills a roster, but trust fills the gaps that no job description can ever capture. At the end of the day, people don't follow titles. They follow people they believe in.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Stacks multiple platitudes and closes with the worn 'at the end of the day' connector typical of AI padding.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "Vision without execution is hallucination. But execution without vision is exhaustion. The art of leadership lives in the delicate balance between dreaming boldly and doing deliberately.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Manufactures a neat rhyming dichotomy ('hallucination/exhaustion') prized for cadence over actual meaning.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "The best feedback isn't a verdict. It's a gift. When we reframe criticism as care, we transform a moment of judgment into a moment of growth. People rise to the level of belief we extend to them.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Relies on euphemistic reframing ('verdict/gift') and an unsupported sweeping claim about human behavior.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "Innovation doesn't happen in comfort zones. It happens at the edges, where uncertainty meets courage. The organizations that win tomorrow are the ones brave enough to be uncomfortable today.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Uses vague spatial metaphors ('edges,' 'comfort zones') and a future-tense promise with zero specifics.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "A leader's most valuable currency is not their expertise. It is their attention. Where you place your focus, you place your priorities. And where you place your priorities, you shape the future of everyone who follows you.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Chains an anaphoric 'where you place X' escalation that mimics insight while making an unfalsifiable claim.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "Resilience is not the absence of failure. It is the presence of meaning. The strongest organizations don't avoid setbacks. They metabolize them, turning every stumble into a story and every story into a lesson.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Defines a concept by negation and deploys the oddly clinical buzzword 'metabolize' for adversity.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "We often mistake busyness for impact. But motion is not progress, and activity is not achievement. The leaders who matter most are not the ones who do more. They are the ones who do what matters.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Self-referential wordplay ('do more / do what matters') signals style-over-substance generation.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "Empowerment is not a program. It's a posture. You cannot delegate ownership while hoarding control. The moment you trust your people with the why, you free them to discover their own how.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "The 'why vs. how' framing and alliterative 'program/posture' pairing are classic AI aphorism scaffolding.",
    category: "business",
  },
  {
    type: "text",
    answer: "bot",
    body: "The most underrated leadership skill in a disruptive era is listening. Not listening to respond, but listening to understand. In a world drowning in opinions, the rarest act of courage is to truly hear another human being.",
    source: "AI-generated in the style of a leadership-book author",
    reveal:
      "Recycles the cliche 'listen to understand, not to respond' and inflates it with grandiose 'rarest act of courage' stakes.",
    category: "business",
  },
  {
    type: "text",
    answer: "human",
    body: "You know, in my defense, your poisons all look alike. You might think about re-labeling some of them.",
    source: "Kronk, The Emperor's New Groove (2000)",
    reveal:
      'The deflecting "in my defense" and the helpfully passive-aggressive suggestion to relabel the poisons is exactly how a real person dodges blame for a screwup.',
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "Or, to save on postage, I'll just poison him with this.",
    source: "Yzma, The Emperor's New Groove (2000)",
    reveal:
      "The absurd cost-benefit logic of weighing postage savings against murder is exactly the kind of deadpan villain joke a real comedy writer crafts.",
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "Memo to me, memo to me: maim you after my meeting.",
    source: "Hades, Hercules (1997)",
    reveal:
      'The self-dictated "memo to me" with alliterative "maim/meeting" is a perfect James Woods improvised flourish — a real comedic riff, not generic villain dialogue.',
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "Oh, wonderful! Bravo, bravissimo! You ejected that tin-plated buffoon with great panache!",
    source: "Victor (gargoyle), The Hunchback of Notre Dame (1996)",
    reveal:
      'The over-the-top theatrical gargoyle gushing in fractured Italian ("bravissimo... great panache") is a specific, character-driven comic voice no one would invent generically.',
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "Knock it off, Hugo! She's a girl, not a mackerel.",
    source: "Laverne (gargoyle), The Hunchback of Notre Dame (1996)",
    reveal:
      'A real human spoke it as an exasperated quip, bonking Hugo on the head — the absurd fish image and the personal scolding "Knock it off" carry a lived-in comic timing.',
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "Can we be real? If my name was Sebastian and I had a cool Jamaican accent, you'd totally help me. You would, you know you would!",
    source: "Tamatoa, Moana (2016)",
    reveal:
      "It's the giant crab Tamatoa breaking the fourth wall in the post-credits scene, jealously name-dropping The Little Mermaid's Sebastian.",
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "Genie, wake up and smell the hummus!",
    source: "Genie, Aladdin (1992)",
    reveal:
      "It's an offhand, self-deprecating aside Robin Williams' Genie mutters to himself, riffing on a real idiom — the kind of throwaway wit a person improvises.",
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "Let me illuminate to you the precarious situation in which you have found yourself. I am the one they call when things go wrong, and things have indeed gone wrong.",
    source: "Cobra Bubbles, Lilo & Stitch (2002)",
    reveal:
      'The wry bureaucratic menace — the deadpan "things have indeed gone wrong" understatement — is exactly the kind of darkly comic threat a screenwriter writes for a character, not the flat phrasing a bot would invent.',
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "Earth is a protected wildlife reserve. Yeah, we've been using it to rebuild the mosquito population which, need I remind you, is an endangered species!",
    source: "Agent Pleakley, Lilo & Stitch (2002)",
    reveal:
      "The bureaucratic absurdity of protecting Earth solely to farm mosquitoes lands as deadpan human comic logic, not generated filler.",
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "Don't listen to that guy. He's trying to lead you down the path of righteousness. I'm gonna lead you down the path that rocks.",
    source: "The Emperor's New Groove (2000)",
    reveal:
      'The line plays off a real verbal beat — the casual "that guy" dismissal and the punchline swapping "righteousness" for "the path that rocks" is comic timing a human writer crafted, not a generic platitude.',
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "Adventure isn't about being brave! It's about choosing to keep going even when your heart is telling you to stop. And that, my friend, is the truest kind of courage there is.",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "Defines its own moral thesis aloud and tidily labels it 'the truest kind of courage,' which real screenwriters let the scene imply.",
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "Oh, don't you worry your little whiskers about the storm! Storms always pass, and when they do, the sky becomes even more beautiful than before. That's just how the world works.",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "Wraps up with a smoothly generalized life-lesson ('that's just how the world works') instead of a character-specific quip.",
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "I may be just a small, slightly rusty robot, but I have learned that friendship is the one thing that cannot rust, fade, or break down. And I will treasure it forever.",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "Spells out its own metaphor and emotional state rather than letting the contrast land through behavior.",
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "You think you can stop me? I am chaos! I am the night! I am the thing your parents warned you about when they told you to eat your vegetables!",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "The villain bravado escalates in a too-neat rule-of-three that resolves into a generic, non-specific punchline.",
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "Listen closely, young one, because what I am about to tell you is very important: the magic was never in the amulet at all. The magic was inside you the entire time.",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "Telegraphs the twist ('what I am about to tell you is very important') and delivers the most predictable reveal verbatim.",
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "Cheese? Cheese?! Did somebody say cheese?! Because if there is one thing in this entire wonderful world that I absolutely cannot resist, it is a delicious wedge of cheese!",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "Over-explains the running gag in full instead of trusting a clipped, perfectly timed beat.",
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "We're lost, we're hungry, and we're being chased by a giant lizard. But you know what? I wouldn't want to be lost, hungry, and chased with anyone else but you.",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "Mechanically repeats the exact list it just gave, a tidy callback no human writer would phrase so symmetrically.",
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "Princess, I have traveled across seven kingdoms and battled a thousand foes, but nothing prepared me for the most difficult challenge of all: telling you how I truly feel.",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "Announces its emotional climax with a formulaic 'nothing prepared me for' template and stock fantasy numbers.",
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "Failure is simply success that hasn't happened yet! So dust yourself off, hold your head up high, and remember that every great hero started exactly where you are now.",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "Strings together three motivational-poster aphorisms with no idiosyncratic voice or comic specificity.",
    category: "disney",
  },
  {
    type: "text",
    answer: "bot",
    body: "I used to think being different made me weird. But now I understand that being different is what makes me special, unique, and wonderfully, perfectly me.",
    source: "AI-generated in the style of an animated-film character",
    reveal:
      "Resolves the arc with a self-narrated affirmation and a piled-on synonym triplet ('special, unique, and wonderfully, perfectly me').",
    category: "disney",
  },
  {
    type: "text",
    answer: "human",
    body: "There are these two young fish swimming along and they happen to meet an older fish swimming the other way, who nods at them and says 'Morning, boys. How's the water?' And the two young fish swim on for a bit, and then eventually one of them looks over at the other and goes 'What the hell is water?'",
    source: 'David Foster Wallace, "This Is Water" commencement address, Kenyon College, 2005',
    reveal:
      'The casual register — "Morning, boys" and "What the hell is water?" — is a spoken-aloud joke, not polished prose, exactly how a person tells a parable from a podium.',
    category: "speech",
  },
  {
    type: "text",
    answer: "human",
    body: "The point of the fish story is merely that the most obvious, important realities are often the ones that are hardest to see and talk about.",
    source: 'David Foster Wallace, "This Is Water" commencement address, Kenyon College (2005)',
    reveal:
      'It admits its own point is "merely" simple, an offhand humility no slogan-writer would add.',
    category: "speech",
  },
  {
    type: "text",
    answer: "human",
    body: "With your college diploma you now have a crushing advantage over 8% of the workforce. I'm talking about dropout losers like Bill Gates, Steve Jobs, and Mark Zuckerberg.",
    source: "Conan O'Brien, commencement address, Dartmouth College (2011)",
    reveal:
      'The deadpan stat-then-punchline rhythm and naming real billionaire dropouts as "losers" is classic live comic timing only a human would land.',
    category: "speech",
  },
  {
    type: "text",
    answer: "human",
    body: "I went from being in the center of the grid to not only off the grid, but underneath the coffee table that the grid sits on, lost in the shag carpeting that is underneath the coffee table supporting the grid.",
    source: "Conan O'Brien, Dartmouth College Commencement Address (2011)",
    reveal:
      'The metaphor keeps piling on absurd nested detail ("the coffee table that the grid sits on... the shag carpeting underneath the coffee table") in a way that builds to a laugh — a real comedian\'s escalating bit, not a clean aphorism.',
    category: "speech",
  },
  {
    type: "text",
    answer: "human",
    body: "If you want to change the world, start off by making your bed.",
    source: "Admiral William H. McRaven, 2014 Commencement Address, University of Texas at Austin",
    reveal:
      "It is plainspoken military advice — small, concrete, almost humble — exactly the kind of homespun discipline a Navy admiral would offer a graduating class.",
    category: "speech",
  },
  {
    type: "text",
    answer: "human",
    body: "If you make your bed every morning you will have accomplished the first task of the day. It will give you a small sense of pride, and it will encourage you to do another task and another and another.",
    source:
      "Admiral William H. McRaven, commencement address, University of Texas at Austin (May 17, 2014)",
    reveal:
      'It is plain, practical advice with a homespun cadence — the repeated "another and another and another" is the kind of rhythmic emphasis a real speaker uses aloud, not a polished written aphorism.',
    category: "speech",
  },
  {
    type: "text",
    answer: "human",
    body: "Death is very likely the single best invention of Life. It is Life's change agent. It clears out the old to make way for the new.",
    source: "Steve Jobs, Commencement Address, Stanford University (2005)",
    reveal:
      "It is a deeply personal, slightly morbid reflection on mortality that a marketing team would never script for a polished brand voice.",
    category: "speech",
  },
  {
    type: "text",
    answer: "human",
    body: "Stay Hungry. Stay Foolish.",
    source: "Steve Jobs, Commencement Address, Stanford University (June 12, 2005)",
    reveal:
      "He's quoting the Whole Earth Catalog's farewell line back to the grads as a personal wish for himself, not minting an original aphorism.",
    category: "speech",
  },
  {
    type: "text",
    answer: "bot",
    body: "Graduates, in the realm of human potential, there exists a quiet truth — one that no syllabus could ever fully capture. You stand today at the intersection of who you were and who you are becoming. Life, you will find, is not a destination but a dance between certainty and surprise, between the plans we make and the paths that find us instead. Remember three things as you go forth: be curious, be courageous, and above all, be kind. The world does not need more people who have all the answers. It needs people who are brave enough to ask better questions — and humble enough to keep listening for them.",
    source: "AI-generated in the style of a commencement speaker",
    reveal:
      "Stacks generic abstractions ('the realm of human potential,' the X-and-Y 'dance,' a tidy rule of three) without a single concrete person, place, or event.",
    category: "speech",
  },
  {
    type: "text",
    answer: "bot",
    body: "When I think about what it means to truly succeed, I keep returning to a single idea — that success is less about what we achieve and more about who we become along the way. In a world that moves faster than ever, it is tempting to measure our worth in titles, in milestones, in the applause of others. But the most meaningful lives are built quietly, in the space between ambition and gratitude. So as you leave this place, I urge you to chase not the spotlight, but the work that makes you feel most alive. Pursue purpose over prestige. Choose growth over comfort. And never, ever forget where you came from.",
    source: "AI-generated in the style of a commencement speaker",
    reveal:
      "Hollow antithesis machine — every sentence is a 'not X but Y' contrast with no anecdote, name, or specific memory anchoring it.",
    category: "speech",
  },
  {
    type: "text",
    answer: "bot",
    body: "There is a beautiful paradox at the heart of this moment. You have spent years learning, and yet the greatest lesson is only beginning — the lesson that you will never stop learning at all. In the realm of the unknown, fear and wonder walk hand in hand, and it is up to you to decide which one leads. I have lived long enough to know that the future belongs not to the certain, but to the curious; not to the loudest, but to the most resilient; not to those who never fall, but to those who rise. Embrace the messiness. Trust the process. The story you are about to write is yours alone.",
    source: "AI-generated in the style of a commencement speaker",
    reveal:
      "Leans on 'beautiful paradox' and a triple parallel 'not X, but Y' cadence while the personal claim ('I have lived long enough') is left totally generic.",
    category: "speech",
  },
  {
    type: "text",
    answer: "bot",
    body: "Today is not an ending — it is a doorway. And like every doorway worth walking through, it asks something of you: the willingness to step forward without knowing exactly what waits on the other side. The diploma in your hand represents knowledge, yes, but knowledge is only the beginning. Wisdom lives in the dance between what we know and what we have the humility to admit we don't. As you move into the next chapter of your lives, carry three companions with you — patience, persistence, and passion. They will not make the road easy. But they will make the journey worthy of the steps you take.",
    source: "AI-generated in the style of a commencement speaker",
    reveal:
      "Relies on the cliché 'doorway' metaphor, an em-dash pivot, a knowing/not-knowing 'dance,' and an alliterative rule of three with zero specifics.",
    category: "speech",
  },
  {
    type: "text",
    answer: "bot",
    body: "Let me share something I have come to believe deeply over the years. The greatest distance any of us will ever travel is not measured in miles — it is the distance between fear and faith, between the comfort of the familiar and the courage to begin again. Each of you carries within you a light that the world has been waiting for. It does not matter whether your path is straight or winding, whether it is celebrated or quiet. What matters is that you walk it with intention, with integrity, and with an open heart. The future is not something that happens to you. It is something you create, one brave decision at a time.",
    source: "AI-generated in the style of a commencement speaker",
    reveal:
      "'A light the world has been waiting for' plus the fear/faith and familiar/courage pairings is pure motivational filler, no grounding detail.",
    category: "speech",
  },
  {
    type: "text",
    answer: "bot",
    body: "As you sit here in your caps and gowns, I want you to consider a question that has guided me through every season of my life. Not 'what do you want to do?' but 'who do you want to be?' Because careers will shift, industries will transform, and the world you graduate into today will look nothing like the world you navigate ten years from now. In the realm of constant change, the only true compass is your character. Hold fast to your values. Stay rooted in your purpose. And remember that the measure of a life is not in the heights we reach, but in the hands we lift along the way.",
    source: "AI-generated in the style of a commencement speaker",
    reveal:
      "'The world will look nothing like ten years from now' is asserted with no example, and it closes on a stock aphorism instead of a real story.",
    category: "speech",
  },
  {
    type: "text",
    answer: "bot",
    body: "I will not stand here and pretend I have figured it all out, because the truth is none of us ever do. Life is not a problem to be solved but a mystery to be lived — a delicate dance between holding on and letting go. You will face setbacks that feel like endings and beginnings disguised as detours. Through it all, let three principles steady you: show up fully, fail forward bravely, and lead with empathy. The people who change the world are rarely the smartest in the room. They are simply the ones who refused to give up, who kept believing, who chose hope when hope was hard.",
    source: "AI-generated in the style of a commencement speaker",
    reveal:
      "Opens with a false humility move, then immediately recites the 'mystery to be lived' dance and a rule of three — the disclaimer is itself a formula.",
    category: "speech",
  },
  {
    type: "text",
    answer: "bot",
    body: "Look around you for a moment. Look at the faces beside you, the people who laughed with you, struggled with you, and grew alongside you. This is what it was all for — not the grades, not the accolades, but the connections that quietly shaped who you have become. As you go out into a world that often rewards speed over depth and noise over meaning, I ask you to be different. Be the person who pauses. Be the one who listens. Be the light in someone else's darkness. The realm of possibility stretches endlessly before you, and the only limits that matter are the ones you choose to believe in.",
    source: "AI-generated in the style of a commencement speaker",
    reveal:
      "Commands the audience to 'look at the faces' but describes no actual face or shared moment, then defaults to 'realm of possibility' boilerplate.",
    category: "speech",
  },
];
