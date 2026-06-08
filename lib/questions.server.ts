import "server-only";
import type { FullQuestion } from "./types";

// FULL question bank — answer/reveal/source. SERVER ONLY (the "server-only"
// import fails the build if imported into client code, so answers never ship).
export const FULL_QUESTIONS: FullQuestion[] = [
  {
    id: "bbq-1",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "At long last, it's finally time to get cooking. You've gotten to know your smoker and you've sourced or seasoned the best wood you can possibly find.",
    source:
      'Aaron Franklin & Jordan Mackay, Franklin Barbecue: A Meat-Smoking Manifesto (2015), Chapter 6 "The Cook"',
    reveal:
      'The slightly weary "At long last" opener and the personal "you\'ve gotten to know your smoker" reflect a real pitmaster\'s voice walking a reader through hard-won craft.',
  },
  {
    id: "bbq-2",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "Life is too short for bad BBQ!",
    source: 'Danielle "Diva Q" Bennett, Traeger Grills ambassador profile (traeger.com/diva-q)',
    reveal:
      "It's a punchy, slightly cheeky personal motto a real pitmaster would put on merch — not the kind of neutral phrasing a bot invents.",
  },
  {
    id: "bbq-3",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "I tell people I'm living the dream, because I've turned my hobby into a job.",
    source:
      "Matt Pittman, Meat Church BBQ — Traeger Collective profile (traeger.com/collective/matt-pittman)",
    reveal:
      'The self-deprecating "I tell people..." framing and the specific hobby-to-job pivot reflect a real person recounting leaving an IT career, not a generic platitude.',
  },
  {
    id: "bbq-4",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "Didn't have great equipment or great knowledge, but the passion was there. That's never changed.",
    source:
      'Jeremy Yoder (Mad Scientist BBQ), "Barbecue, Beef Ribs & Burnout: A Chat with Jeremy Yoder," Lord Saunders Smokehouse interview',
    reveal:
      "It's a humble origin story — admitting you started with bad gear and no knowledge is the kind of self-deprecating honesty a real person offers, not a polished brag.",
  },
  {
    id: "bbq-5",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "it's all about cooking delicious food and taking pride in everything we cook",
    source: "Malcom Reed, HowToBBQRight / Killer Hogs BBQ",
    reveal:
      'It\'s plain-spoken pitmaster humility — "everything we cook" with that family-business "we" is how a real BBQ guy talks, not a polished brand tagline.',
  },
  {
    id: "bbq-6",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "But the fact that in Texas barbecue, you're taking one of the worst pieces of the animal and converting it into one of the best is a miracle itself.",
    source: "Aaron Franklin, Franklin Barbecue: A Meat-Smoking Manifesto (2015)",
    reveal:
      "The slightly clumsy phrasing and the geeky pride in transforming a cheap, tough cut reflects a real pitmaster's lived obsession rather than a polished aphorism.",
  },
  {
    id: "bbq-7",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "Sure, I was poor. But barbecue has never been a rich man's pleasure. It's always been a culture of thrift.",
    source: "Aaron Franklin, Franklin Barbecue: A Meat-Smoking Manifesto (2015)",
    reveal:
      'The self-deprecating "Sure, I was poor" opener and the offhand class-history aside read like a real person reflecting, not a polished aphorism.',
  },
  {
    id: "bbq-8",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "I think it's key that you buy the best thing that you can afford.",
    source: 'Aaron Franklin, "The Sublime Simplicity of Aaron Franklin," Austin Food Magazine',
    reveal:
      "It's plainspoken, practical kitchen advice with a casual hedge (\"I think it's key\") rather than a polished marketing line.",
  },
  {
    id: "bbq-9",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "You learn from your mistakes and you just keep going and trying to do the best you can.",
    source: "Aaron Franklin, Q&A interview, Austin Food Magazine",
    reveal:
      "It's plainspoken, slightly run-on encouragement about barbecue trial-and-error — the kind of casual, unpolished advice a real pitmaster gives in conversation, not a tidy aphorism.",
  },
  {
    id: "bbq-10",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "A little beef tallow on the cutting board makes for those sexy slices.",
    source:
      "Matt Pittman (Meat Church BBQ), in \"Going to Texas' Meat Church — Matt Pittman's Barbecue School is a Truly Unique Food Experience,\" PaperCity Magazine",
    reveal:
      'The cheeky "sexy slices" phrasing is exactly the kind of offhand, personality-driven pitmaster patter a real person uses, not generic AI prose.',
  },
  {
    id: "bbq-11",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "I am an absolute insatiable learner. I love to learn more than anything in the world.",
    source: 'Danielle "Diva Q" Bennett, exclusive interview with Mashed (2024)',
    reveal:
      'The plain, slightly redundant doubling ("insatiable learner" then "love to learn more than anything") is how people actually emphasize a point when speaking off the cuff, not how a polished slogan reads.',
  },
  {
    id: "bbq-12",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "There is a saying in my industry, you buy the meat, not the sauce.",
    source: 'Danielle "Diva Q" Bennett, exclusive interview with Mashed (2023)',
    reveal:
      'She frames it as an industry saying and immediately riffs on it ("sauce can hide a lot of barbecue sins"), the way a real pitmaster talks shop, not a clean aphorism.',
  },
  {
    id: "bbq-13",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "I've always looked at myself as a student of BBQ, because no matter how long you've been doing it, there's always something else to learn.",
    source: 'Malcom Reed, "About Malcom Reed & HowToBBQRight" (h2qshop.com)',
    reveal:
      'The humble "I\'m still a student even after all these years" framing is a lived-experience sentiment a real pitmaster says, not a generic AI platitude.',
  },
  {
    id: "bbq-14",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "You can't make a fake fire.",
    source: "Aaron Franklin, Tasting Table exclusive interview (2023)",
    reveal:
      "It's a blunt, plainspoken pitmaster's truism — the kind of unhedged real-talk a person says, not a tidy AI line.",
  },
  {
    id: "bbq-15",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "If the temperatures are up and down, it's pretty likely that your firewood is too big, so it's robbing energy from the fire to get to a combustion point.",
    source: "Aaron Franklin, Tasting Table exclusive interview (2023)",
    reveal:
      "It's hands-on pitmaster intuition — diagnosing a swinging temperature by the physics of oversized wood robbing energy to combust — the kind of specific, earned detail a real expert gives.",
  },
  {
    id: "bbq-16",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "The worst thing you can do is overcook it.",
    source: "Aaron Franklin, Tasting Table exclusive interview (2023)",
    reveal:
      "It is plain, practical pitmaster advice — short and direct, the kind of thing a real cook says off the cuff rather than a polished marketing line.",
  },
  {
    id: "bbq-17",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "Like Traeger, I subscribe to the all-natural BBQ philosophy. The hardwood taste and authentic flavors from Traeger's wood fire and wood pellets just can't be beat.",
    source:
      'Matt Pittman (Meat Church BBQ), "Traeger Grills Partners with Meat Church BBQ\'s Matt Pittman to Spread the Gospel of Wood-Fired Cooking," PR Newswire (2018)',
    reveal:
      'It pairs personal brand allegiance ("I subscribe to") with a casual idiom ("just can\'t be beat") in a way that reads like an endorsement quote a real pitmaster gave, not a generic AI line.',
  },
  {
    id: "bbq-18",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "Barbecue feeds your soul because it brings people together.",
    source: 'Danielle "Diva Q" Bennett, Mashed exclusive interview (2024)',
    reveal:
      "It's a heartfelt, slightly cliched personal philosophy a real pitmaster repeats in interviews — earnest and a little worn, not the kind of polished line a bot would invent.",
  },
  {
    id: "bbq-19",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "I do not say I'm lucky. I work too hard to be lucky.",
    source: 'Danielle "Diva Q" Bennett, Mashed exclusive interview (2023)',
    reveal:
      'The slightly blunt, self-assured cadence — "I do not say I\'m lucky" — is the kind of earned, unpolished confidence a real pitmaster uses, not a tidy aphorism.',
  },
  {
    id: "bbq-20",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "I'd be setting alarms and waking up every 30 minutes; go put a couple logs on the fire, and eventually, it became a business.",
    source: "Jeremy Yoder (Mad Scientist BBQ), Spectrum News 1 (2025)",
    reveal:
      "The mundane, sleep-deprived detail of setting alarms every 30 minutes to tend a fire is the kind of unglamorous specific that only someone who actually lived it would mention.",
  },
  {
    id: "bbq-21",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Brisket doesn’t care about your schedule, and that’s the first lesson. Trim it clean, season it honest, and let the smoke do its slow little sermon.",
    source: "AI-generated",
    reveal:
      'AI — "let the smoke do its slow little sermon" dresses a metaphor up as wisdom but names no cut, no wood, no temp; it\'s brisket advice that would fit any pit anywhere.',
  },
  {
    id: "bbq-22",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Smoke rings are pretty, but flavor pays the rent. If your bark has pepper bite, fat shimmer, and that campfire depth, nobody’s asking for a microscope.",
    source: "AI-generated",
    reveal:
      'AI — "flavor pays the rent" sounds folksy, but the bark checklist (pepper bite, fat shimmer, campfire depth) is generic sensory filler with nothing a real cook would name, like a specific rub or wood.',
  },
  {
    id: "bbq-23",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "A pork shoulder is basically a trust exercise wrapped in butcher paper. Somewhere around hour six, it looks like nothing is happening, which means everything is happening.",
    source: "AI-generated",
    reveal:
      'AI — "a pork shoulder is basically a trust exercise" is metaphor-as-definition, then it over-explains itself with the tidy paradox "nothing is happening, which means everything is happening."',
  },
  {
    id: "bbq-24",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Don’t drown good meat in rub until it tastes like a spice cabinet fell down the stairs. Salt, pepper, heat, smoke, and restraint will get you invited back.",
    source: "AI-generated",
    reveal:
      'AI — the concrete list slides into an abstract noun: "salt, pepper, heat, smoke, and restraint" ends on a virtue, not an ingredient, and buttons up with the mechanical reward "get you invited back."',
  },
  {
    id: "bbq-25",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Burgers need confidence, not choreography. Hot grate, cold meat, one good flip, and cheese melted just enough to start looking dangerous.",
    source: "AI-generated",
    reveal:
      'AI — "confidence, not choreography" is a clever contrast carrying no real technique; "cheese melted just enough to start looking dangerous" is mood, not a doneness cue an actual cook would give.',
  },
  {
    id: "bbq-26",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "I like ribs with a little tug, not falling off the bone like they gave up on themselves. Sauce goes on near the end, just enough to shine them up for company.",
    source: "AI-generated",
    reveal:
      'Sneaky — "ribs with a little tug" and saucing "near the end" is genuine pitmaster preference; the only faint tell is the slightly writerly flourish "like they gave up on themselves."',
    sneaky: true,
  },
  {
    id: "bbq-27",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "The secret to good chicken thighs is patience and not poking at them every twelve seconds like a raccoon with a badge. Let the skin render, let the edges crisp, then bring in the glaze.",
    source: "AI-generated",
    reveal:
      'AI — the "raccoon with a badge" simile is a strained showpiece, and "let the skin render, let the edges crisp, then bring in the glaze" gives sequence without a single temp, time, or thigh count.',
  },
  {
    id: "bbq-28",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "I build my fire before I build my menu. Oak for beef, apple for pork, and a little hickory when I want the backyard to smell like it has opinions.",
    source: "AI-generated",
    reveal:
      'Sneaky — "oak for beef, apple for pork, hickory" is real wood-pairing specificity; the only faint tell is the cute personification "smell like it has opinions."',
    sneaky: true,
  },
  {
    id: "bbq-29",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "If you’re looking at your watch, you’re doing it all wrong. Real Texas brisket doesn't care about your schedule, it only cares about the wood, the smoke, and the internal temp. Pull it when it jiggles like Jell-O and let it rest for at least two hours, period.",
    source: "AI-generated",
    reveal:
      'AI — it opens hollow ("doesn\'t care about your schedule") then over-qualifies the obvious, stacking "the wood, the smoke, and the internal temp" plus "jiggles like Jell-O" and a stagey "period" instead of one lived detail.',
  },
  {
    id: "bbq-30",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "That bark right there isn't burnt, it’s pure flavor built up over twelve hours of post oak smoke. The secret is keeping the fire clean and the rub heavy on the coarse black pepper. Slice it thick and let the juice do the talking.",
    source: "AI-generated",
    reveal:
      'AI — "twelve hours of post oak" and "coarse black pepper" sound right, but "let the juice do the talking" is a tidy promotional button that any brisket clip could close on.',
  },
  {
    id: "bbq-31",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Look at that smoke ring definition on these pork ribs. They’ve got just enough bite to come clean off the bone without falling apart into mush. Hit 'em with a light glaze of sweet heat right at the end for that picture-perfect shine.",
    source: "AI-generated",
    reveal:
      'Sneaky — "come clean off the bone without falling apart into mush" is a real doneness call; the one faint tell is the polished marketing phrase "picture-perfect shine" at the end.',
    sneaky: true,
  },
  {
    id: "bbq-32",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Sunday mornings start at 4:00 AM around here, getting the firebox stoked and the ambient temp locked right at 225. There’s something peaceful about watching the smoke roll while the rest of the neighborhood is still asleep. Grab a coffee, it's gonna be a long, beautiful day.",
    source: "AI-generated",
    reveal:
      'AI — "225" and a 4 AM firebox read authentic, yet "something peaceful about watching the smoke roll" and "a long, beautiful day" tilt into greeting-card mood with no actual cook detail.',
  },
  {
    id: "bbq-33",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "A lot of guys overcomplicate the rub, but honestly, kosher salt and cracked pepper are all a good piece of beef needs. Let the quality of the meat and the draft of your offset smoker do the heavy lifting. If the smoke is blue, you’re doing it right.",
    source: "AI-generated",
    reveal:
      'Sneaky — "kosher salt and cracked pepper" on good beef and an "offset smoker" are real; the giveaway-style maxim "if the smoke is blue, you\'re doing it right" is true but packaged a touch too neatly.',
    sneaky: true,
  },
  {
    id: "bbq-34",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "We are officially locked and loaded for the weekend crowd, and these pork shoulders are already looking incredible. The fat cap is rendering down perfectly, basting the meat from the inside out. Get down here before the sold-out sign goes up.",
    source: "AI-generated",
    reveal:
      'AI — "locked and loaded" is promotional LLM diction, and "basting the meat from the inside out" plus "before the sold-out sign goes up" is hype copy, not a cook describing his own pit.',
  },
  {
    id: "bbq-35",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Tinfoil is a crutch, but peach butcher paper is a pitmaster's best friend. It breathes just enough to keep your crust nice and crunchy while holding in those essential juices. Trust the process and don't rush the wrap.",
    source: "AI-generated",
    reveal:
      'AI — "tinfoil is a crutch" and "trust the process" are stock motivational phrasing, and the wrap is over-explained ("breathes just enough") rather than tied to any actual cook or temp.',
  },
  {
    id: "bbq-36",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "You can buy the most expensive rig on the market, but you can’t buy patience. True barbecue is an art form of minor adjustments, feeling the heat, and listening to the sizzle on the deflector plate. Fire up the pits and let’s get to work.",
    source: "AI-generated",
    reveal:
      'AI — "you can buy patience" is a hollow aphorism, and "an art form of minor adjustments, feeling the heat, listening to the sizzle" abstracts real technique into a motivational montage.',
  },
  {
    id: "bbq-37",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "In today's world, barbecue is more than just cooking meat over fire. It is a journey that brings people together and nourishes the soul, one tender bite at a time.",
    source: "AI-generated",
    reveal:
      'AI — pure mechanical uplift: "a journey that brings people together and nourishes the soul, one tender bite at a time" stacks three button phrases and never touches meat, fire, or a real cook.',
  },
  {
    id: "bbq-38",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Great brisket isn't just about heat; it's about patience, respect, and an unwavering devotion to the craft.",
    source: "AI-generated",
    reveal:
      'AI — "patience, respect, and an unwavering devotion to the craft" lists virtues, not technique; it\'s a brisket sentence with zero brisket in it, fitting any craft equally well.',
  },
  {
    id: "bbq-39",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "What separates a good pitmaster from a great one? The answer is simple: an unrelenting commitment to the fire.",
    source: "AI-generated",
    reveal:
      'AI — it\'s a self-answering rhetorical question ("What separates a good pitmaster... The answer is simple") that resolves to the empty abstraction "an unrelenting commitment to the fire."',
  },
  {
    id: "bbq-40",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "At the end of the day, smoking meat is about more than flavor. It's about connection, tradition, and the stories we share around the table.",
    source: "AI-generated",
    reveal:
      'AI — "at the end of the day" opens a hollow uplift button, and "connection, tradition, and the stories we share around the table" names everything except anything specific to smoking meat.',
  },
  {
    id: "business-1",
    type: "text",
    category: "business",
    answer: "human",
    body: "Discipline equals freedom.",
    source: "Jocko Willink, Extreme Ownership: How U.S. Navy SEALs Lead and Win (2015)",
    reveal:
      "It is a blunt, paradoxical four-word maxim a drill-hardened SEAL would actually bark — not the tidy, hedged phrasing an AI tends to produce.",
  },
  {
    id: "business-2",
    type: "text",
    category: "business",
    answer: "human",
    body: "It's not what you preach, it's what you tolerate.",
    source:
      "Jocko Willink and Leif Babin, Extreme Ownership: How U.S. Navy SEALs Lead and Win (2015)",
    reveal:
      "It's a blunt, real-world leadership maxim of the kind a combat veteran would phrase tersely, not a polished platitude.",
  },
  {
    id: "business-3",
    type: "text",
    category: "business",
    answer: "human",
    body: "There are no bad teams, only bad leaders.",
    source:
      "Jocko Willink and Leif Babin, Extreme Ownership: How U.S. Navy SEALs Lead and Win (2015)",
    reveal:
      "It states a blunt, accountability-shifting principle in plain declarative language — the kind of hard-edged maxim a leadership practitioner coins, not a hedged AI summary.",
  },
  {
    id: "business-4",
    type: "text",
    category: "business",
    answer: "human",
    body: "When setting expectations, no matter what has been said or written, if substandard performance is accepted and no one is held accountable—if there are no consequences—that poor performance becomes the new standard.",
    source:
      "Jocko Willink and Leif Babin, Extreme Ownership: How U.S. Navy SEALs Lead and Win (2015)",
    reveal:
      'It states a hard-won, specific leadership consequence ("poor performance becomes the new standard") rather than a vague motivational platitude—the kind of pointed insight that comes from real command experience.',
  },
  {
    id: "business-5",
    type: "text",
    category: "business",
    answer: "human",
    body: "Good is the enemy of great. And that is one of the key reasons why we have so little that becomes great.",
    source:
      "Jim Collins, Good to Great: Why Some Companies Make the Leap... and Others Don't (2001)",
    reveal:
      "It's the famous opening line of the book — a punchy, paradoxical aphorism a real author crafted as a hook, not generic filler.",
  },
  {
    id: "business-6",
    type: "text",
    category: "business",
    answer: "human",
    body: "Greatness is not a function of circumstance. Greatness, it turns out, is largely a matter of conscious choice, and discipline.",
    source:
      "Jim Collins, Good to Great: Why Some Companies Make the Leap... and Others Don't (2001)",
    reveal:
      'The slightly awkward mid-sentence aside "it turns out" and the comma before "and discipline" are conversational tics a real author writes, not a polished aphorism a machine would generate.',
  },
  {
    id: "business-7",
    type: "text",
    category: "business",
    answer: "human",
    body: "Great vision without great people is irrelevant.",
    source:
      "Jim Collins, Good to Great: Why Some Companies Make the Leap... and Others Don't (2001)",
    reveal:
      'It\'s a blunt, almost contrarian one-liner that flips the comfortable "vision first" cliche on its head — the kind of provocative inversion a real management thinker uses to make a point stick.',
  },
  {
    id: "business-8",
    type: "text",
    category: "business",
    answer: "human",
    body: "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.",
    source: "Dale Carnegie, How to Win Friends and Influence People (1936)",
    reveal:
      "It captures Carnegie's earnest, slightly preachy self-help cadence — the kind of folksy time-math advice a real person dispenses.",
  },
  {
    id: "business-9",
    type: "text",
    category: "business",
    answer: "human",
    body: "Most people do not listen with the intent to understand; they listen with the intent to reply.",
    source: "Stephen R. Covey, The 7 Habits of Highly Effective People (1989)",
    reveal:
      "It names a specific, relatable human failing in conversation that anyone who has felt unheard immediately recognizes.",
  },
  {
    id: "business-10",
    type: "text",
    category: "business",
    answer: "human",
    body: "People don't buy what you do; they buy why you do it.",
    source: "Simon Sinek, Start with Why: How Great Leaders Inspire Everyone to Take Action (2009)",
    reveal:
      "It's one of those punchy, almost-too-tidy maxims a real person repeats from a business book, slightly misremembering the semicolon as a comma.",
  },
  {
    id: "business-11",
    type: "text",
    category: "business",
    answer: "human",
    body: "When it comes to standards, as a leader, it's not what you preach, it's what you tolerate.",
    source:
      'Jocko Willink & Leif Babin, Extreme Ownership (2015), Ch. 2 "No Bad Teams, Only Bad Leaders"',
    reveal:
      "It draws a hard line between stated values and accepted behavior, the kind of plainspoken accountability a SEAL officer actually lives by.",
  },
  {
    id: "business-12",
    type: "text",
    category: "business",
    answer: "human",
    body: "Good is the enemy of great.",
    source:
      "Jim Collins, Good to Great: Why Some Companies Make the Leap... and Others Don't (2001), opening line",
    reveal:
      "It's a real human's hard-won, deflating observation that comfortable competence is precisely what keeps most things from ever becoming exceptional.",
  },
  {
    id: "business-13",
    type: "text",
    category: "business",
    answer: "bot",
    body: "True operational scale isn’t about working harder; it’s about decoupling your revenue growth from your headcount. When leaders focus on building repeatable frameworks rather than firefighting daily anomalies, the entire organization aligns. Focus on systems that empower autonomy, not bottlenecks that require permission.",
    source: "AI-generated",
    reveal:
      "AI — consultant diction stacked thick ('decoupling your revenue growth from your headcount,' 'repeatable frameworks,' 'systems that empower autonomy') with no company, number, or situation a real operator would have named.",
  },
  {
    id: "business-14",
    type: "text",
    category: "business",
    answer: "bot",
    body: "The market doesn’t care about your legacy strategy or how successful your previous product launch was. Disruption happens when an organization becomes too comfortable protecting past wins instead of cannibalizing its own business model to innovate. Stay paranoid, stay curious, and keep executing.",
    source: "AI-generated",
    reveal:
      "AI — the mechanical motivational button 'Stay paranoid, stay curious, and keep executing' plus stacked MBA diction ('cannibalizing its own business model,' 'protecting past wins'); a real leader would cite which past win.",
  },
  {
    id: "business-15",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Resilience isn't an innate personality trait; it’s an organizational muscle developed through navigating ambiguity. When milestones are missed, the instinct is often to assign blame, but the highest-performing cultures treat failures as data points for iterative improvement. Turn your post-mortems into launchpads.",
    source: "AI-generated",
    reveal:
      "AI — corporate filler 'navigating ambiguity' and 'data points for iterative improvement,' capped by the tidy imperative button 'Turn your post-mortems into launchpads'; advice generic enough to fit any org.",
  },
  {
    id: "business-16",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Empathy is often dismissed as a soft skill, but it is actually the hardest and most lucrative tool in a modern executive's toolkit. When employees feel genuinely understood and psychologically safe, retention skyrocketing follows naturally. Take care of your people, and they will relentlessly take care of your metrics.",
    source: "AI-generated",
    reveal:
      "AI — HR-deck diction 'psychologically safe' and the hollow promise that retention and metrics follow 'naturally'; the garbled 'retention skyrocketing follows naturally' is a generation artifact no editor would leave.",
  },
  {
    id: "business-17",
    type: "text",
    category: "business",
    answer: "bot",
    body: "True leadership isn't validated by how many decisions you make, but by how many leaders you develop to make them instead. If your department paralyzes the moment you go on vacation, you haven’t built a team, you’ve built a dependency. Step back so your people can step up.",
    source: "AI-generated",
    reveal:
      "AI — the manufactured imperative button 'Step back so your people can step up' and a vacation hypothetical ('the moment you go on vacation') that stands in for any real story; nothing here actually happened.",
  },
  {
    id: "business-18",
    type: "text",
    category: "business",
    answer: "bot",
    body: "We often mistake frantic activity for progress, but velocity without a clear direction is just noise. The best executives I’ve worked with spend more time listening to frontline friction than reviewing high-level slide decks. If you want to fix your culture, start by fixing the small things that drain your team's daily energy.",
    source: "AI-generated",
    reveal:
      "AI — 'The best executives I've worked with' claims firsthand experience but names no one and no moment, and 'frontline friction' versus 'high-level slide decks' is borrowed consultant shorthand, not a remembered scene.",
  },
  {
    id: "business-19",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Good leaders do not remove all friction; they remove the useless friction. Some tension sharpens the work, but bureaucracy just puts a velvet rope around progress.",
    source: "AI-generated",
    reveal:
      "Sneaky — the distinction between useful and useless friction is genuinely sharp; the only faint tell is 'velvet rope around progress,' a decorative flourish that names no actual piece of bureaucracy.",
    sneaky: true,
  },
  {
    id: "business-20",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Your calendar is a confession. It reveals what you reward, what you avoid, and what you are accidentally teaching everyone else to value.",
    source: "AI-generated",
    reveal:
      "Sneaky — 'Your calendar is a confession' is a genuinely arresting line; the faint tell is that nothing follows it down to a single real meeting or recurring block, so it stays universally applicable.",
    sneaky: true,
  },
  {
    id: "business-21",
    type: "text",
    category: "business",
    answer: "bot",
    body: "The mistake many teams make is confusing alignment with agreement. Alignment means we know the decision, the tradeoff, and the owner, even if we would have chosen differently.",
    source: "AI-generated",
    reveal:
      "Sneaky — the alignment-versus-agreement distinction is a real and useful one; the faint tell is the textbook definition that follows ('the decision, the tradeoff, and the owner') with no actual decision anyone ever disagreed on.",
    sneaky: true,
  },
  {
    id: "business-22",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Culture is not what gets printed on the wall; it is what people feel safe saying in the meeting. The real work of leadership is lowering the cost of honesty.",
    source: "AI-generated",
    reveal:
      "Sneaky — 'what people feel safe saying in the meeting' is an honest, human read on culture; the faint tell is the closer that redefines leadership as 'lowering the cost of honesty,' an abstraction that resolves a bit too neatly.",
    sneaky: true,
  },
  {
    id: "business-23",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Trust compounds slowly and spends quickly. Every missed follow-through is a small withdrawal, even when nobody says it out loud.",
    source: "AI-generated",
    reveal:
      "Sneaky — 'every missed follow-through is a small withdrawal, even when nobody says it out loud' rings true; the only faint tell is that no specific broken promise or person ever anchors the metaphor.",
    sneaky: true,
  },
  {
    id: "business-24",
    type: "text",
    category: "business",
    answer: "bot",
    body: "A strategy that cannot survive contact with the frontline is not a strategy, it is office theater. The best leaders keep walking back to the people closest to the work.",
    source: "AI-generated",
    reveal:
      "Sneaky — 'cannot survive contact with the frontline... office theater' has real bite; the faint tell is the generic-superlative closer 'The best leaders keep walking back,' advice with no specific strategy or frontline behind it.",
    sneaky: true,
  },
  {
    id: "disney-1",
    type: "text",
    category: "disney",
    answer: "human",
    body: "You have forgotten who you are and so have forgotten me. Look inside yourself, Simba. You are more than what you have become. You must take your place in the Circle of Life.",
    source: "The Lion King (1994) — Mufasa",
    reveal:
      "Human — a father naming a specific failure ('forgotten who you are'); the emotional logic is peculiar to this relationship, not a generic pep talk.",
  },
  {
    id: "disney-2",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Everything you see exists together in a delicate balance. As king, you need to understand that balance and respect all the creatures, from the crawling ant to the leaping antelope.",
    source: "The Lion King (1994) — Mufasa",
    reveal:
      "Human — grounds the idea in a concrete, specific image (the crawling ant to the leaping antelope) rather than abstraction.",
  },
  {
    id: "disney-3",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Look, over in that house is a kid who thinks you are the greatest, and it's not because you're a Space Ranger, pal. It's because you're a toy. You are his toy.",
    source: "Toy Story (1995) — Woody",
    reveal:
      "Human — 'pal' cuts the sentiment just enough to feel real, and the repeated 'you are his toy' lands as recognition, not a slogan.",
  },
  {
    id: "disney-4",
    type: "text",
    category: "disney",
    answer: "human",
    body: "You are a sad, strange little man, and you have my pity. Farewell.",
    source: "Toy Story (1995) — Buzz Lightyear",
    reveal:
      "Human — chilly, formal dignity that's pitch-perfect for the character; a real comic beat, not a generic insult.",
  },
  {
    id: "disney-5",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Well, you can't never let anything happen to him. Then nothing would ever happen to him. Not much fun for little Harpo.",
    source: "Finding Nemo (2003) — Dory",
    reveal:
      "Human — accidental wisdom from someone who doesn't realize she's being wise, capped by the throwaway joke name 'Harpo.'",
  },
  {
    id: "disney-6",
    type: "text",
    category: "disney",
    answer: "human",
    body: "If he could learn to love another and earn her love in return by the time the last petal fell, then the spell would be broken. If not, he would be doomed to remain a beast for all time.",
    source: "Beauty and the Beast (1991) — prologue narration",
    reveal:
      "Human — a fairy-tale conditional with a specific, ticking image ('by the time the last petal fell').",
  },
  {
    id: "disney-7",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Dishonor! Dishonor on your whole family! Make a note of this: dishonor on you, dishonor on your cow!",
    source: "Mulan (1998) — Mushu",
    reveal:
      "Human — pointed absurdist comedy; the cow has done nothing, which is the joke. AI rarely lands this kind of specific nonsense.",
  },
  {
    id: "disney-8",
    type: "text",
    category: "disney",
    answer: "human",
    body: "The flower that blooms in adversity is the most rare and beautiful of all. You don't meet a girl like that every dynasty.",
    source: "Mulan (1998) — The Emperor",
    reveal:
      "Human — the formal proverb punctured by a dry aside ('every dynasty'); a genuine comic instinct.",
  },
  {
    id: "disney-9",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Some people are worth melting for. Just maybe not right this second.",
    source: "Frozen (2013) — Olaf",
    reveal:
      "Human — warmth immediately walked back by self-preservation; a character meaning two things at once.",
  },
  {
    id: "disney-10",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Not everyone can become a great artist, but a great artist can come from anywhere. It is difficult to imagine more humble origins than those of the genius now cooking at Gusteau's.",
    source: "Ratatouille (2007) — Anton Ego",
    reveal:
      "Human — yes, it opens 'not X, but Y' (a structure AI loves too!) — but it's a real critic's hard-won reversal, naming a specific person and place.",
  },
  {
    id: "disney-11",
    type: "text",
    category: "disney",
    answer: "human",
    body: "You made it! Go! Go save Riley! Take her to the moon for me… okay?",
    source: "Inside Out (2015) — Bing Bong",
    reveal:
      "Human — the tiny, uncertain '…okay?' turns a sacrifice into a small personal request; an ellipsis doing enormous emotional work.",
  },
  {
    id: "disney-12",
    type: "text",
    category: "disney",
    answer: "human",
    body: "It's kind of fun to do the impossible.",
    source: "Walt Disney",
    reveal:
      "Human — short, but the word 'fun' reframes difficulty as play; an offhand real remark, not a committee-written poster.",
  },
  {
    id: "disney-13",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "You see, a heart isn't judged by how much you love, but by how much you are loved by others in return. Even when the shadows grow long and the path ahead seems completely lost, that warmth will always show you the way home. Just take my hand and don't be afraid.",
    source: "AI-generated",
    reveal:
      'AI — "a heart isn\'t judged by how much you love, but by how much you are loved" is sentiment-as-definition, greeting-card comfort that names no character, no moment, no actual danger.',
  },
  {
    id: "disney-14",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "It doesn't matter if you're made of tin, or wood, or fluff and stuffing, because real magic comes from what's beating inside your chest. When you love someone, you give them a piece of yourself that can never be broken or taken away. That's a promise that lasts forever.",
    source: "AI-generated",
    reveal:
      'AI — "real magic comes from what\'s beating inside your chest" is a self-explaining moral, and "a piece of yourself that can never be broken" is generic warmth attached to no story or speaker.',
  },
  {
    id: "disney-15",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "Change can be a little scary at first, kind of like stepping outside into a big, loud thunderstorm without an umbrella. But if we never let the rain fall, the flowers in the valley would never get a chance to grow. I think it’s time for us to see what’s waiting out there.",
    source: "AI-generated",
    reveal:
      'AI — the rain-and-flowers parable explains its own lesson ("if we never let the rain fall, the flowers... would never grow") and names no speaker or situation; pure portable metaphor.',
  },
  {
    id: "disney-16",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "They can take away our crowns, lock us in the highest towers, and banish us to the edge of the map, but they can never steal our dreams. As long as we have each other, we have a spark that can light up the darkest night. Now, let’s go show them what we're made of.",
    source: "AI-generated",
    reveal:
      'AI — "a spark that can light up the darkest night" is mechanical uplift, and the crowns/towers/map imagery stays storybook-generic, naming no actual kingdom, captor, or villain.',
  },
  {
    id: "disney-17",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "The stars up there look so small, but I think they’re actually giant windows looking into all the places we haven't discovered yet. If we fly fast enough, maybe we can find a way right through them. We just have to hold on tight and never look down.",
    source: "AI-generated",
    reveal:
      'AI — "giant windows looking into all the places we haven\'t discovered yet" is over-poetic abstraction stacked on nothing concrete: no ship, no destination, no character, just mood.',
  },
  {
    id: "disney-18",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "Hurrying won't make the winter pass any faster, my little friend, as every single snowflake has its own special time to dance. Sit here by the hearth with me and let the frost paint its pictures on the windowpanes. Spring always knows exactly when to arrive.",
    source: "AI-generated",
    reveal:
      'AI — "Spring always knows exactly when to arrive" is a greeting-card resolution; the snowflake-patience platitude would fit any cozy hearth scene and names nobody.',
  },
  {
    id: "disney-19",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“Home isn’t the door,” the candle said, flickering proudly. “It’s who leaves a light on when you’re late.”",
    source: "AI-generated",
    reveal:
      "AI — fortune-cookie wisdom assigned to an object: a candle delivering the tidy, self-contained life-lesson \"Home isn't the door... It's who leaves a light on.\"",
  },
  {
    id: "disney-20",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“The forest doesn’t give maps to people who already know everything,” the fox said. “It prefers the lost ones. They listen better.”",
    source: "AI-generated",
    reveal:
      "AI — fortune-cookie wisdom from an animal narrator: the fox's \"forest doesn't give maps to people who already know everything\" is a humility proverb tied to no traveler or actual journey.",
  },
  {
    id: "disney-21",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“Your song is still in there,” the whale murmured beneath the silver waves. “It just got buried under everyone else’s noise.”",
    source: "AI-generated",
    reveal:
      'AI — self-help in animal costume: the whale\'s "your song... got buried under everyone else\'s noise" is a find-your-voice platitude, with "silver waves" as decorative filler and no real story.',
  },
  {
    id: "disney-22",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“I’m not small,” said the mouse, adjusting his acorn helmet. “I’m travel-sized for destiny.”",
    source: "AI-generated",
    reveal:
      'Sneaky — "travel-sized for destiny" and the acorn helmet are a genuinely funny, specific character beat; the only faint tell is the neat "I\'m not small... I\'m" reframe.',
    sneaky: true,
  },
  {
    id: "disney-23",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“I tried to be perfect and accidentally became miserable,” said the little prince. “So tomorrow I’m going to be terrible at something and see if the sun still rises.”",
    source: "AI-generated",
    reveal:
      'Sneaky — the dry, specific self-deprecation genuinely lands; the faint tell is that "see if the sun still rises" polishes the joke a shade too cleanly.',
    sneaky: true,
  },
  {
    id: "disney-24",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "Oh, great, another ancient, booby-trapped temple filled with spikes and bugs, because a regular walk in the woods would just be too boring. Don’t touch anything, especially not that giant, shiny ruby that is practically screaming 'grab me' right now. Wait, where did you go?",
    source: "AI-generated",
    reveal:
      'Sneaky — the sarcasm, concrete props (spikes, the shiny ruby "practically screaming \'grab me\'"), and the action-interrupted "Wait, where did you go?" feel real; the only faint tell is the slightly over-tidy setup.',
    sneaky: true,
  },
  {
    id: "speech-1",
    type: "text",
    category: "speech",
    answer: "human",
    body: "There are these two young fish swimming along and they happen to meet an older fish swimming the other way, who nods at them and says 'Morning, boys. How's the water?' And the two young fish swim on for a bit, and then eventually one of them looks over at the other and goes 'What the hell is water?'",
    source: 'David Foster Wallace, "This Is Water" commencement address, Kenyon College, 2005',
    reveal:
      'The casual register — "Morning, boys" and "What the hell is water?" — is a spoken-aloud joke, not polished prose, exactly how a person tells a parable from a podium.',
  },
  {
    id: "speech-2",
    type: "text",
    category: "speech",
    answer: "human",
    body: "The point of the fish story is merely that the most obvious, important realities are often the ones that are hardest to see and talk about.",
    source: 'David Foster Wallace, "This Is Water" commencement address, Kenyon College (2005)',
    reveal:
      'It admits its own point is "merely" simple, an offhand humility no slogan-writer would add.',
  },
  {
    id: "speech-3",
    type: "text",
    category: "speech",
    answer: "human",
    body: "With your college diploma you now have a crushing advantage over 8% of the workforce. I'm talking about dropout losers like Bill Gates, Steve Jobs, and Mark Zuckerberg.",
    source: "Conan O'Brien, commencement address, Dartmouth College (2011)",
    reveal:
      'The deadpan stat-then-punchline rhythm and naming real billionaire dropouts as "losers" is classic live comic timing only a human would land.',
  },
  {
    id: "speech-4",
    type: "text",
    category: "speech",
    answer: "human",
    body: "I went from being in the center of the grid to not only off the grid, but underneath the coffee table that the grid sits on, lost in the shag carpeting that is underneath the coffee table supporting the grid.",
    source: "Conan O'Brien, Dartmouth College Commencement Address (2011)",
    reveal:
      'The metaphor keeps piling on absurd nested detail ("the coffee table that the grid sits on... the shag carpeting underneath the coffee table") in a way that builds to a laugh — a real comedian\'s escalating bit, not a clean aphorism.',
  },
  {
    id: "speech-5",
    type: "text",
    category: "speech",
    answer: "human",
    body: "And, if by chance you have a miserable day, you will come home to a bed that is made — that you made — and a made bed gives you encouragement that tomorrow will be better. If you want to change the world, start off by making your bed.",
    source: "Admiral William H. McRaven, 2014 Commencement Address, University of Texas at Austin",
    reveal:
      "It is plainspoken military advice — small, concrete, almost humble — exactly the kind of homespun discipline a Navy admiral would offer a graduating class.",
  },
  {
    id: "speech-6",
    type: "text",
    category: "speech",
    answer: "human",
    body: "If you make your bed every morning you will have accomplished the first task of the day. It will give you a small sense of pride, and it will encourage you to do another task and another and another.",
    source:
      "Admiral William H. McRaven, commencement address, University of Texas at Austin (May 17, 2014)",
    reveal:
      'It is plain, practical advice with a homespun cadence — the repeated "another and another and another" is the kind of rhythmic emphasis a real speaker uses aloud, not a polished written aphorism.',
  },
  {
    id: "speech-7",
    type: "text",
    category: "speech",
    answer: "human",
    body: "Death is very likely the single best invention of Life. It is Life's change agent. It clears out the old to make way for the new.",
    source: "Steve Jobs, Commencement Address, Stanford University (2005)",
    reveal:
      "It is a deeply personal, slightly morbid reflection on mortality that a marketing team would never script for a polished brand voice.",
  },
  {
    id: "speech-8",
    type: "text",
    category: "speech",
    answer: "human",
    body: "And I have always wished that for myself. And now, as you graduate to begin anew, I wish that for you. Stay Hungry. Stay Foolish.",
    source: "Steve Jobs, Commencement Address, Stanford University (June 12, 2005)",
    reveal:
      "He's quoting the Whole Earth Catalog's farewell line back to the grads as a personal wish for himself, not minting an original aphorism.",
  },
  {
    id: "speech-9",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "As you walk across this stage today, remember that your degree is not a final destination, but rather a key to doors you haven't even envisioned yet. The world doesn't need you to fit into the existing molds; it desperately needs you to shatter them and build something better. Go out there and make kindness your loudest attribute.",
    source: "AI-generated",
    reveal:
      'AI — stacked stock metaphors ("a key to doors you haven\'t even envisioned," "shatter the molds") that name no school, year, or person, resolving into the greeting-card imperative "make kindness your loudest attribute."',
  },
  {
    id: "speech-10",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "We often spend our youth waiting for the perfect moment to start, waiting for a sign that we are finally ready to make our mark. The truth is, perfection is an illusion designed to keep you comfortable in the harbor of safety. Row away from the shore, embrace the storms, and realize you were ready all along.",
    source: "AI-generated",
    reveal:
      'AI — it over-explains its own moral ("perfection is an illusion designed to keep you comfortable") then piles on nautical clichés, ordering you to "row away from the shore" with no real boat, harbor, or memory behind it.',
  },
  {
    id: "speech-11",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Look around this room at the people who supported you, wept with you, and pushed you to reach this milestone. No one achieves greatness in a vacuum, and our success is always a collective tapestry woven by those who believed in us. Carry their belief into the world and become that pillar for someone else.",
    source: "AI-generated",
    reveal:
      'AI — "a collective tapestry woven by those who believed in us" is a stock metaphor pointing at nobody specific; a real speaker would name the mentor or parent, not tell you to "become that pillar for someone else."',
  },
  {
    id: "speech-12",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Do not let the fear of making a mistake paralyze your ambition, because every failure is simply a tuition payment toward your future wisdom. The most extraordinary lives are rarely linear; they are messy, unpredictable, and defined by the moments someone chose to get back up. Write a story worth telling.",
    source: "AI-generated",
    reveal:
      'AI — "every failure is simply a tuition payment toward your future wisdom" is a too-neat manufactured aphorism, and it caps off by commanding you to "write a story worth telling" without telling a single story of its own.',
  },
  {
    id: "speech-13",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Your education has given you a voice, and with that voice comes the profound responsibility to speak for those who are currently unheard. Do not use your talents merely to climb the ladders of corporate success; use them to widen the base so more people can climb with you. True legacy is measured by what you give back.",
    source: "AI-generated",
    reveal:
      'AI — entirely second-person sermon ("widen the base so more people can climb") with zero speaker presence; it asserts "true legacy is measured by what you give back" yet cites no cause, no name, no moment the speaker actually lived.',
  },
  {
    id: "speech-14",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Today marks the end of a chapter, but the pen is now entirely in your hands for the rest of the book. Do not let the cynicism of the world dampen the fierce optimism that brought you to this very moment. Be bold, stay curious, and never apologize for dreaming too big.",
    source: "AI-generated",
    reveal:
      'AI — "the pen is now entirely in your hands for the rest of the book" is a stock metaphor, and the closing trio "be bold, stay curious, and never apologize" is hollow uplift that would fit any graduation anywhere.',
  },
  {
    id: "speech-15",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "You are not here because the path was clear. You are here because you kept walking when the map turned into fog.",
    source: "AI-generated",
    reveal:
      'Sneaky — "you kept walking when the map turned into fog" genuinely lands, but the faint tell is that the fog and the map belong to no real journey: it\'s still pure second-person with no speaker who was actually there.',
    sneaky: true,
  },
  {
    id: "speech-16",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Do not mistake certainty for wisdom. The people who change the world are often the ones willing to ask one more question when everyone else has packed up the chairs.",
    source: "AI-generated",
    reveal:
      'Sneaky — "willing to ask one more question when everyone else has packed up the chairs" is a sharp, near-concrete image, but it stays a general type rather than one remembered person, the last faint sign it\'s composed not recalled.',
    sneaky: true,
  },
  {
    id: "movies-1",
    type: "text",
    category: "movies",
    answer: "human",
    body: "This is our most desperate hour. Help me, Obi-Wan Kenobi. You're my only hope.",
    source: "Star Wars: A New Hope (1977) — Princess Leia",
    reveal:
      "Human — a desperate, name-specific plea in a looping distress recording; the kind of concrete, vulnerable ask only a real character in a specific jam makes.",
  },
  {
    id: "movies-2",
    type: "text",
    category: "movies",
    answer: "human",
    body: "That's no moon. It's a space station.",
    source: "Star Wars: A New Hope (1977) — Obi-Wan Kenobi",
    reveal:
      "Human — two declarative fragments, the second landing harder; the rhythm of dawning horror, not information delivery.",
  },
  {
    id: "movies-3",
    type: "text",
    category: "movies",
    answer: "human",
    body: "I find your lack of faith disturbing.",
    source: "Star Wars: A New Hope (1977) — Darth Vader",
    reveal:
      "Human — villainous understatement; 'disturbing' is almost polite, which makes it scarier than a shout.",
  },
  {
    id: "movies-4",
    type: "text",
    category: "movies",
    answer: "human",
    body: "These aren't the droids you're looking for.",
    source: "Star Wars: A New Hope (1977) — Obi-Wan Kenobi",
    reveal:
      "Human — the casual confidence of a practiced Jedi mind trick reads lived-in and specific, not generic mysticism.",
  },
  {
    id: "movies-5",
    type: "text",
    category: "movies",
    answer: "human",
    body: "No! Try not. Do... or do not. There is no try.",
    source: "The Empire Strikes Back (1980) — Yoda",
    reveal:
      "Human — Yoda's inverted syntax and blunt absolutism are pure character voice; a writer's choice to sound alien and wise at once.",
  },
  {
    id: "movies-6",
    type: "text",
    category: "movies",
    answer: "human",
    body: "No. I am your father.",
    source: "The Empire Strikes Back (1980) — Darth Vader",
    reveal:
      "Human — the real line (not 'Luke, I am your father'): it opens with a flat contradiction, making the reveal land as a gut-punch rebuttal.",
  },
  {
    id: "movies-7",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Never tell me the odds!",
    source: "The Empire Strikes Back (1980) — Han Solo",
    reveal: "Human — pure Han: bravado as philosophy, a man who performs recklessness as identity.",
  },
  {
    id: "movies-8",
    type: "text",
    category: "movies",
    answer: "human",
    body: '"I love you." "I know."',
    source: "The Empire Strikes Back (1980) — Leia & Han Solo",
    reveal:
      "Human — Han's two-word reply was improvised by Harrison Ford; the asymmetry is loaded subtext a person crafts, not generates.",
  },
  {
    id: "movies-9",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Hello there.",
    source: "Star Wars: Revenge of the Sith (2005) — Obi-Wan Kenobi",
    reveal:
      "Human — a cheerful greeting delivered mid-ambush to a war criminal; the comedy is the total mismatch of tone and stakes.",
  },
  {
    id: "movies-10",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Genius, billionaire, playboy, philanthropist.",
    source: "The Avengers (2012) — Tony Stark",
    reveal:
      "Human — four nouns, zero verbs; a self-description as a list, deliberate comic arrogance.",
  },
  {
    id: "movies-11",
    type: "text",
    category: "movies",
    answer: "human",
    body: "That's my secret, Cap. I'm always angry.",
    source: "The Avengers (2012) — Bruce Banner",
    reveal:
      "Human — the quiet delivery of a devastating confession; the calm control is the whole point.",
  },
  {
    id: "movies-12",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Puny god.",
    source: "The Avengers (2012) — Hulk",
    reveal:
      "Human — two words after smashing a god into the floor; brutal comic timing that's a writer's rhythm.",
  },
  {
    id: "movies-13",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Even when I had nothing, I had Bucky.",
    source: "Captain America: The Winter Soldier (2014) — Steve Rogers",
    reveal: "Human — specific, proper-noun grief: not 'a friend' but this person by name.",
  },
  {
    id: "movies-14",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Mr. Stark, I don't feel so good. I don't want to go. I don't want to go, sir. Please. I'm sorry.",
    source: "Avengers: Infinity War (2018) — Peter Parker",
    reveal:
      "Human — stumbling repetition and apologizing; a kid scared of dying who still says sorry.",
  },
  {
    id: "movies-15",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Perfectly balanced, as all things should be.",
    source: "Avengers: Infinity War (2018) — Thanos",
    reveal:
      "Human — a genocidal maniac describing a knife like a proud craftsman; the serenity is what makes him frightening.",
  },
  {
    id: "movies-16",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Part of the journey is the end.",
    source: "Avengers: Endgame (2019) — Tony Stark",
    reveal:
      "Human — yes, it literally uses 'journey' (an AI favorite!) — but it's Tony's hologram to his daughter, accepting mortality with earned, specific grace.",
  },
  {
    id: "movies-17",
    type: "text",
    category: "movies",
    answer: "human",
    body: "And I... am... Iron Man.",
    source: "Avengers: Endgame (2019) — Tony Stark",
    reveal:
      "Human — the deliberate pauses call back his 2008 origin line; it lands 11 years later as both punchline and eulogy.",
  },
  {
    id: "movies-18",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Avengers... assemble.",
    source: "Avengers: Endgame (2019) — Steve Rogers",
    reveal:
      "Human — the most anticipated three words in the MCU, delivered quietly; it earns the moment through restraint, not volume.",
  },
  {
    id: "movies-19",
    type: "text",
    category: "movies",
    answer: "human",
    body: "I'm a mog: half man, half dog. I'm my own best friend!",
    source: "Spaceballs (1987) — Barf",
    reveal:
      "Human — the punchline pivots on 'best friend'; a joke that needs human-culture knowledge of what dogs are to people.",
  },
  {
    id: "movies-20",
    type: "text",
    category: "movies",
    answer: "human",
    body: '"I am your father\'s brother\'s nephew\'s cousin\'s former roommate." "What\'s that make us?" "Absolutely nothing!"',
    source: "Spaceballs (1987) — Dark Helmet & Lone Starr",
    reveal:
      "Human — a bureaucratic labyrinth of family relations arriving at 'nothing'; a joke about Star Wars mythology and anticlimactic reveals at once.",
  },
  {
    id: "movies-21",
    type: "text",
    category: "movies",
    answer: "human",
    body: "What's the matter, Colonel Sandurz? Chicken?!",
    source: "Spaceballs (1987) — Dark Helmet",
    reveal:
      "Human — a schoolyard taunt ('chicken?') from a supervillain in full armor; ridiculous authority, pure Mel Brooks.",
  },
  {
    id: "movies-22",
    type: "text",
    category: "movies",
    answer: "human",
    body: "There's only one man who would dare give me the raspberry: Lone Starr!",
    source: "Spaceballs (1987) — Dark Helmet",
    reveal:
      "Human — taking a Bronx cheer literally as an act of defiance; the specificity of 'dare give me the raspberry' sells the absurdism.",
  },
  {
    id: "movies-23",
    type: "text",
    category: "movies",
    answer: "human",
    body: '"We were told to comb the desert, so we\'re combing it!" "We ain\'t found shit!"',
    source: "Spaceballs (1987) — Colonel Sandurz & a trooper",
    reveal:
      "Human — the idiom 'comb the desert' taken literally, plus profanity for comic deflation; cultural comedy.",
  },
  {
    id: "movies-24",
    type: "text",
    category: "movies",
    answer: "human",
    body: '"What happened to then?" "We passed it." "When?" "Just now."',
    source: "Spaceballs (1987) — Dark Helmet & Colonel Sandurz",
    reveal:
      "Human — a meta comedy loop collapsing 'now' as a moment vs 'now' as a label; linguistic comedy, not information.",
  },
  {
    id: "movies-25",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "In the end, the galaxy will not remember our weapons or our fleets. It will remember whether we chose to stand together when the darkness came.",
    source: "AI-generated",
    reveal:
      'AI — names no galaxy, no enemy, no character: "whether we chose to stand together when the darkness came" is interchangeable grandeur that could close literally any space epic, anchored to no actual scene.',
  },
  {
    id: "movies-26",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "This was never about the throne, the crown, or the kingdom. It was about something far greater: the soul of every world that ever dared to dream.",
    source: "AI-generated",
    reveal:
      'AI — the escalation "never about the throne... It was about something far greater: the soul of every world that ever dared to dream" is pure abstract uplift naming no kingdom, no speaker, no concrete stake.',
  },
  {
    id: "movies-27",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Together we will harness the storm, forge a new dawn, and unleash a power this universe has never witnessed.",
    source: "AI-generated",
    reveal:
      'AI — "harness the storm, forge a new dawn, and unleash a power this universe has never witnessed" is stacked mechanical grandiosity, vague cosmic power with no named threat, place, or actual plan behind it.',
  },
  {
    id: "movies-28",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "You ask what makes a hero. I will tell you: not the strength of the arm, but the courage of the heart that refuses to break.",
    source: "AI-generated",
    reveal:
      'AI — the self-answering setup "You ask what makes a hero. I will tell you" plus a definitional "not the strength of the arm, but the courage of the heart" is a teaching device, not dialogue tied to any moment.',
  },
  {
    id: "movies-29",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "What began as a simple delivery run became a journey across the stars, and ultimately a reckoning with the very meaning of who we are.",
    source: "AI-generated",
    reveal:
      'AI — "a reckoning with the very meaning of who we are" dissolves a concrete delivery run into abstract self-discovery, naming no destination, person, or event a real scene would ground itself in.',
  },
  {
    id: "movies-30",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Victory is not measured in the battles we win, but in the lives we choose to protect along the way.",
    source: "AI-generated",
    reveal:
      'AI — "Victory is not measured in the battles we win, but in the lives we choose to protect" is a tidy definition with no concrete content: no battle, no enemy, no one being protected, just a portable maxim.',
  },
  {
    id: "movies-31",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "I have walked through fire, through shadow, and through the quiet despair that comes when hope itself begins to fade.",
    source: "AI-generated",
    reveal:
      'AI — "through fire, through shadow, and through the quiet despair" piles metaphor on metaphor naming no actual ordeal, place, or foe; it\'s mood without a single specific thing the speaker survived.',
  },
  {
    id: "movies-32",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Surrender now, and I may yet allow you to truly, deeply understand the profound mercy of which I am capable.",
    source: "AI-generated",
    reveal:
      'AI — the over-stuffed intensifiers "truly, deeply understand the profound mercy" are the tell; real menace is specific and lean, while this villain threatens in vague abstractions naming no captive or consequence.',
  },
  {
    id: "movies-33",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Look around you. This is not merely a rebellion. This is the dawn of an age where the oppressed will rise and never again kneel.",
    source: "AI-generated",
    reveal:
      'AI — "the dawn of an age where the oppressed will rise and never again kneel" is hollow manifesto: it names no oppressor, no place, no people, sweeping grandeur that would fit any rebellion anywhere.',
  },
  {
    id: "movies-34",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "The question is not whether we can win, but whether we are willing to become the kind of people who deserve to.",
    source: "AI-generated",
    reveal:
      'AI — "not whether we can win, but whether we are willing to become the kind of people who deserve to" resolves into an abstract moral definition rather than dialogue about an actual fight or enemy.',
  },
  {
    id: "movies-35",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Every great empire begins with a single choice, and today, my friends, we choose to delve into legend.",
    source: "AI-generated",
    reveal:
      'AI — "today, my friends, we choose to delve into legend" is empty ceremony naming no empire, no choice, no people; "delve" especially is generic uplift standing in for an actual decision or stake.',
  },
  {
    id: "movies-36",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "They told me a machine could never love, never grieve, never truly hope. And yet, here I stand, profoundly and irrevocably alive.",
    source: "AI-generated",
    reveal:
      'AI — the piled adverbs "profoundly and irrevocably alive" plus the triple "never love, never grieve, never truly hope" is mechanical abstract uplift, an essay on machine consciousness with no scene around it.',
  },
  {
    id: "movies-37",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Heroes are not born in moments of triumph. They are forged in the silent, unseen battles no one will ever know.",
    source: "AI-generated",
    reveal:
      'AI — "Heroes are not born... They are forged in the silent, unseen battles" is a portable definition of heroism naming no hero, no battle, no enemy; it teaches a concept rather than speaking to anyone.',
  },
  {
    id: "movies-38",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "This power was never meant to be controlled. It was meant to be unleashed, and through it, the cosmos itself reborn.",
    source: "AI-generated",
    reveal:
      'AI — "the cosmos itself reborn" is mechanical cosmic grandiosity; "power... meant to be unleashed" names no source, wielder, or target, pure abstract scale with no specific moment behind it.',
  },
  {
    id: "movies-39",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "What is courage, if not fear that has chosen to stand? And what is sacrifice, if not love made visible in its final, fearless act?",
    source: "AI-generated",
    reveal:
      'AI — two stacked self-answering definitions, "What is courage, if not..." and "what is sacrifice, if not love made visible," are a philosophy lecture, not a line a character says inside an actual scene.',
  },
  {
    id: "movies-40",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "We did not come here to be remembered. We came here to make sure there was someone left to do the remembering.",
    source: "AI-generated",
    reveal:
      'AI — "someone left to do the remembering" is engineered grandeur that names no "here," no enemy, no mission; the clever inversion has no concrete situation underneath it the way a real line would.',
  },
  {
    id: "movies-41",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "So this is how it ends: not with the roar of cannons, but with the whisper of a promise kept.",
    source: "AI-generated",
    reveal:
      'AI — "not with the roar of cannons, but with the whisper of a promise kept" frames a contrast as profundity but names no promise, no who, no actual ending; it\'s abstract closure with no scene.',
  },
  {
    id: "movies-42",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "You really thought a force field would stop me? I helped design half the tech in this building. Buddy, I invented the off switch.",
    source: "AI-generated",
    reveal:
      'Sneaky — genuinely grounded and specific ("I helped design half the tech in this building," "I invented the off switch"); the only faint tell is the slightly too-clean button-line cadence of "the off switch."',
    sneaky: true,
  },
  {
    id: "movies-43",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Cut the blue wire. No — the other blue wire, the one tucked behind the red. We've got maybe ten seconds, so please trust me on this.",
    source: "AI-generated",
    reveal:
      'Sneaky — convincingly concrete with the blue-wire-behind-the-red detail and "maybe ten seconds"; the faintest tell is how neatly the self-correction is staged, just a touch too tidy for real panic.',
    sneaky: true,
  },
  {
    id: "movies-44",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "I counted three guards on the schematic. On the ground there were six. We're going to need a bigger plan.",
    source: "AI-generated",
    reveal:
      'Sneaky — specific and plausible with "three guards on the schematic... six on the ground"; the only soft tell is the engineered three-versus-six symmetry setting up a slightly pat closing line.',
    sneaky: true,
  },
  {
    id: "movies-45",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Whatever happens out there, you don't let go of my hand. No matter what you see, no matter what they tell you. Promise me.",
    source: "AI-generated",
    reveal:
      'Sneaky — emotionally grounded and scene-anchored ("don\'t let go of my hand," "Promise me"); the faint tell is the balanced "no matter what you see, no matter what they tell you" repetition reading a hair too composed.',
    sneaky: true,
  },
  {
    id: "movies-46",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "The ship can take the hit; the hull's rated for worse than this. The question is whether we can.",
    source: "AI-generated",
    reveal:
      'Sneaky — believable and specific with "the hull\'s rated for worse than this"; the only soft tell is the engineered ship-versus-us symmetry in "The question is whether we can," a touch too neat.',
    sneaky: true,
  },
  {
    id: "movies-47",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "He's not answering the radio. Either he's gone dark on purpose, or he's just gone. That's either very good or very bad.",
    source: "AI-generated",
    reveal:
      'Sneaky — naturally grounded with "He\'s not answering the radio" and the real either/or of gone-dark-or-gone; the faint tell is the slightly too-balanced "very good or very bad" button on the binary.',
    sneaky: true,
  },
  {
    id: "movies-48",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Go now, while there's still a gap in their line. Run. Don't look back. And tell them I was smiling.",
    source: "AI-generated",
    reveal:
      'Sneaky — urgent and concrete ("while there\'s still a gap in their line," "Don\'t look back"); the only faint tell is the engineered poignancy of "tell them I was smiling," a hair too composed for the moment.',
    sneaky: true,
  },
];

export const BY_ID: Record<string, FullQuestion> = Object.fromEntries(
  FULL_QUESTIONS.map((q) => [q.id, q]),
);
