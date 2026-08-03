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
      "Six words and an exclamation point, ending on a joke at nobody's expense. Someone put this on a T-shirt because they meant it, and you can hear that.",
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
    id: "bbq-5",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "To us, it's all about cooking delicious food and taking pride in everything we cook.",
    source: 'Malcom & Rachelle Reed, "About HowToBBQRight" (2018, since removed from the site)',
    reveal:
      'It\'s plain-spoken and a little humble — the family-business "to us" and "we" are how real people describe their own shop, not how a brand writes a tagline.',
  },
  {
    id: "bbq-6",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "But the fact that in Texas barbecue, you're taking one of the worst pieces of the animal and converting it into one of the best is a miracle itself.",
    source: "Aaron Franklin, Franklin Barbecue: A Meat-Smoking Manifesto (2015)",
    reveal:
      "The phrasing is a little clumsy, and the pride in turning a cheap, tough cut into something great is very specific. That's a real person's obsession, not a line polished for a poster.",
  },
  {
    id: "bbq-7",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "Sure, I was poor. But barbecue has never been a rich man's pleasure. It's always been a culture of thrift.",
    source: "Aaron Franklin, Franklin Barbecue: A Meat-Smoking Manifesto (2015)",
    reveal:
      'He says "Sure, I was poor" like it costs him nothing, then turns it straight into pride. Owning the unflattering part first is something people do and slogans never do.',
  },
  {
    id: "bbq-8",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "I think it's key that you buy the best thing that you can afford.",
    source: 'Aaron Franklin, "The Sublime Simplicity of Aaron Franklin," Austin Food Magazine',
    reveal:
      "It's plain kitchen advice, softened with \"I think it's key\" the way people actually talk. Machines rarely bother to sound unsure.",
  },
  {
    id: "bbq-9",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "You learn from your mistakes and you just keep going and trying to do the best you can.",
    source: "Aaron Franklin, Q&A interview, Austin Food Magazine",
    reveal:
      "It's plainspoken and a bit run-on — the kind of encouragement a real pitmaster gives in conversation, not a tidy line built to be quoted.",
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
    source: 'Danielle "Diva Q" Bennett, exclusive interview with Mashed (2021)',
    reveal:
      'The plain, slightly redundant doubling ("insatiable learner" then "love to learn more than anything") is how people actually emphasize a point when speaking off the cuff, not how a polished slogan reads.',
  },
  {
    id: "bbq-12",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "There is a saying in my industry, you buy the meat, not the sauce.",
    source: 'Danielle "Diva Q" Bennett, exclusive interview with Mashed (2021)',
    reveal:
      "She isn't coining it, she's repeating it — \"a saying in my industry.\" People pass along the shop talk they picked up; a machine would have made up its own clever line instead.",
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
      "It's blunt and says the obvious thing straight out, with no softening. Machines almost always add a qualifier.",
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
    body: "With steak, the worst thing you can do is overcook it.",
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
    source: 'Danielle "Diva Q" Bennett, Mashed exclusive interview (2021)',
    reveal:
      "It's a heartfelt, slightly cliched personal philosophy a real pitmaster repeats in interviews — earnest and a little worn, not the kind of polished line a bot would invent.",
  },
  {
    id: "bbq-19",
    type: "text",
    category: "bbq",
    answer: "human",
    body: "I do not say I'm lucky. I work too hard to be lucky.",
    source: 'Danielle "Diva Q" Bennett, Mashed exclusive interview on WhistlePig whiskey (2022)',
    reveal:
      'The blunt, self-assured way it lands — "I do not say I\'m lucky" — is earned confidence from a real person, not a line smoothed out for a poster.',
  },
  {
    id: "bbq-21",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Great brisket comes down to three key factors: 1) Preparation — trim the excess fat. 2) Patience — hold a consistent temperature. 3) Rest — allow the meat to relax. Follow these steps for optimal results.",
    source: "AI-generated",
    reveal:
      "AI — it turned a question into a numbered handout with a label on every point. Nobody talks in numbered steps. When a reply arrives pre-formatted like this, something generated it.",
  },
  {
    id: "bbq-24",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Don’t drown good meat in rub until it tastes like a spice cabinet fell down the stairs. Salt, pepper, heat, smoke, and restraint will get you invited back.",
    source: "AI-generated",
    reveal:
      'AI — watch the list: "salt, pepper, heat, smoke, and restraint." Four real things, then a virtue. It slides from the pit to the poster, and closes on the tidy reward "get you invited back."',
  },
  {
    id: "bbq-26",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "I like ribs with a little tug, not falling off the bone like they gave up on themselves. Sauce goes on near the end, just enough to shine them up for company.",
    source: "AI-generated",
    reveal:
      'Sneaky — a bot, and it knows ribs should have a little tug, which is more than most people do. Only "like they gave up on themselves" got a bit writerly.',
    sneaky: true,
  },
  {
    id: "bbq-28",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "I build my fire before I build my menu. Oak for beef, apple for pork, and a little hickory when I want the backyard to smell like it has opinions.",
    source: "AI-generated",
    reveal:
      "Sneaky — a well-read bot: oak for beef and apple for pork is exactly right. Calling this human meant rewarding real knowledge, which is usually the right bet.",
    sneaky: true,
  },
  {
    id: "bbq-31",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Look at that smoke ring definition on these pork ribs. They’ve got just enough bite to come clean off the bone without falling apart into mush. Hit 'em with a light glaze of sweet heat right at the end for that picture-perfect shine.",
    source: "AI-generated",
    reveal:
      'Sneaky — bot, and it earned the confusion; that doneness call is spot on. It only slipped reaching for "picture-perfect shine" at the finish.',
    sneaky: true,
  },
  {
    id: "bbq-33",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "A lot of guys overcomplicate the rub, but honestly, kosher salt and cracked pepper are all a good piece of beef needs. Let the quality of the meat and the draft of your offset smoker do the heavy lifting. If the smoke is blue, you’re doing it right.",
    source: "AI-generated",
    reveal:
      "Sneaky — bot. Blue smoke, kosher salt, an offset: it did its homework. This one fools plenty of people who actually cook.",
    sneaky: true,
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
    id: "bbq-37",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "In today's world, barbecue is more than just cooking meat over fire. It is a journey that brings people together and nourishes the soul, one tender bite at a time.",
    source: "AI-generated",
    reveal:
      'AI — two tells in two sentences: the throat-clearing "In today\'s world" opener, and the "more than just X" move that promotes barbecue into "a journey," closing on "one tender bite at a time."',
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
    id: "bbq-40",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "At the end of the day, smoking meat is about more than flavor. It's about connection, tradition, and the stories we share around the table.",
    source: "AI-generated",
    reveal:
      'AI — "connection, tradition, and the stories we share around the table" is three big warm words standing in for an actual answer. Good test: if a sentence sounds complete but you can\'t picture anything in it, a machine probably wrote it.',
  },
  {
    id: "business-1",
    type: "text",
    category: "business",
    answer: "human",
    body: "Discipline equals freedom.",
    source: "Jocko Willink, Extreme Ownership: How U.S. Navy SEALs Lead and Win (2015)",
    reveal:
      "Four blunt words a drill-hardened SEAL would actually bark. Machines soften things; this doesn't.",
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
      "It's a blunt piece of real-world leadership advice, said the terse way a combat veteran would say it — not smoothed into a platitude.",
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
      "It states a hard principle in plain, flat language and takes the hit. Machines hedge their bets; this doesn't.",
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
      "It's the famous opening line of the book — punchy and deliberately contradictory, written by an author to hook you.",
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
      'The mid-sentence "it turns out" and the stray comma before "and discipline" are the small messes a real writer leaves in.',
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
      "It has Carnegie's earnest, slightly preachy self-help voice — folksy time-math advice from a real person.",
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
      "It's tidy enough to look machine-made, and that's the trap. This one got tidy the slow way: a guy repeating himself on stage until the extra words fell off.",
  },
  {
    id: "business-14",
    type: "text",
    category: "business",
    answer: "bot",
    body: "The market doesn’t care about your legacy strategy or how successful your previous product launch was. Disruption happens when an organization becomes too comfortable protecting past wins instead of cannibalizing its own business model to innovate. Stay paranoid, stay curious, and keep executing.",
    source: "AI-generated",
    reveal:
      "AI — 'Stay paranoid, stay curious, and keep executing' is a motivational sign-off, and the business-school phrases around it never land on a real example. A real leader would tell you which past win they gave up.",
  },
  {
    id: "business-16",
    type: "text",
    category: "business",
    answer: "bot",
    body: "You're absolutely right, and I apologize for the confusion. That's a great point about retention, and you've clearly thought deeply about this. Building on your excellent observation, psychological safety really is the foundation here.",
    source: "AI-generated",
    reveal:
      'AI — four compliments and an apology for a mistake nobody mentioned, before a single actual idea. "You\'re absolutely right" is a machine folding, not agreeing. Push back on a chatbot and watch it cave either way.',
  },
  {
    id: "business-19",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Good leaders do not remove all friction; they remove the useless friction. Some tension sharpens the work, but bureaucracy just puts a velvet rope around progress.",
    source: "AI-generated",
    reveal:
      "Sneaky — bot, and a sharp one. Useful friction versus useless friction is a real idea, so no shame in this one.",
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
      "Sneaky — bot. 'Your calendar is a confession' is a genuinely good line, which is exactly why it got you.",
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
      "Sneaky — bot, but it's right: alignment isn't agreement. Missing this one mostly means you agreed with it.",
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
      "Sneaky — bot. 'Lowering the cost of honesty' is a line you'd write down in a real meeting, so a miss here is a compliment to your taste.",
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
      "Sneaky — bot, and a quotable one. The withdrawal metaphor rings true enough that doubting it would have felt unfair.",
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
      "Sneaky — bot. 'Office theater' has real teeth; calling it human meant listening for voice, which is the right instinct even when it misfires.",
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
      "a father naming a specific failure ('forgotten who you are'); the emotional logic is peculiar to this relationship, not a generic pep talk.",
  },
  {
    id: "disney-2",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Everything you see exists together in a delicate balance. As king, you need to understand that balance and respect all the creatures, from the crawling ant to the leaping antelope.",
    source: "The Lion King (1994) — Mufasa",
    reveal:
      "grounds the idea in a concrete, specific image (the crawling ant to the leaping antelope) rather than abstraction.",
  },
  {
    id: "disney-3",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Look, over in that house is a kid who thinks you are the greatest, and it's not because you're a Space Ranger, pal. It's because you're a toy. You are his toy.",
    source: "Toy Story (1995) — Woody",
    reveal:
      "'pal' cuts the sentiment just enough to feel real, and the repeated 'you are his toy' lands as recognition, not a slogan.",
  },
  {
    id: "disney-4",
    type: "text",
    category: "disney",
    answer: "human",
    body: "You are a sad, strange little man, and you have my pity. Farewell.",
    source: "Toy Story (1995) — Buzz Lightyear",
    reveal:
      "chilly, formal dignity that's pitch-perfect for the character; a real comic beat, not a generic insult.",
  },
  {
    id: "disney-5",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Well, you can't never let anything happen to him. Then nothing would ever happen to him. Not much fun for little Harpo.",
    source: "Finding Nemo (2003) — Dory",
    reveal:
      "accidental wisdom from someone who doesn't realize she's being wise, capped by the throwaway joke name 'Harpo.'",
  },
  {
    id: "disney-6",
    type: "text",
    category: "disney",
    answer: "human",
    body: "If he could learn to love another and earn her love in return by the time the last petal fell, then the spell would be broken. If not, he would be doomed to remain a beast for all time.",
    source: "Beauty and the Beast (1991) — prologue narration",
    reveal:
      "a fairy-tale conditional with a specific, ticking image ('by the time the last petal fell').",
  },
  {
    id: "disney-7",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Dishonor! Dishonor on your whole family! Make a note of this: dishonor on you, dishonor on your cow!",
    source: "Mulan (1998) — Mushu",
    reveal:
      "pointed absurdist comedy; the cow has done nothing, which is the joke. AI rarely lands this kind of specific nonsense.",
  },
  {
    id: "disney-8",
    type: "text",
    category: "disney",
    answer: "human",
    body: "The flower that blooms in adversity is the most rare and beautiful of all. You don't meet a girl like that every dynasty.",
    source: "Mulan (1998) — The Emperor",
    reveal:
      "the formal proverb punctured by a dry aside ('every dynasty'); a genuine comic instinct.",
  },
  {
    id: "disney-9",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Some people are worth melting for. Just maybe not right this second.",
    source: "Frozen (2013) — Olaf",
    reveal:
      "warmth immediately walked back by self-preservation; a character meaning two things at once.",
  },
  {
    id: "disney-10",
    type: "text",
    category: "disney",
    answer: "human",
    body: "Not everyone can become a great artist, but a great artist can come from anywhere. It is difficult to imagine more humble origins than those of the genius now cooking at Gusteau's.",
    source: "Ratatouille (2007) — Anton Ego",
    reveal:
      "yes, it opens 'not X, but Y' (a structure AI loves too!) — but it's a real critic's hard-won reversal, naming a specific person and place.",
  },
  {
    id: "disney-11",
    type: "text",
    category: "disney",
    answer: "human",
    body: "You made it! Go! Go save Riley! Take her to the moon for me… okay?",
    source: "Inside Out (2015) — Bing Bong",
    reveal:
      "the tiny, uncertain '…okay?' turns a sacrifice into a small personal request; an ellipsis doing enormous emotional work.",
  },
  {
    id: "disney-12",
    type: "text",
    category: "disney",
    answer: "human",
    body: "It's kind of fun to do the impossible.",
    source: "Walt Disney",
    reveal:
      "short, but the word 'fun' reframes difficulty as play; an offhand real remark, not a committee-written poster.",
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
    id: "disney-22",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“I’m not small,” said the mouse, adjusting his acorn helmet. “I’m travel-sized for destiny.”",
    source: "AI-generated",
    reveal:
      'Sneaky — a machine landed an actual joke, and "travel-sized for destiny" is a good one. Don\'t feel bad; the "I\'m not small... I\'m" reframe just snaps shut a little fast.',
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
      'Sneaky — this one is simply good writing, whoever wrote it. Consolation prize: "see if the sun still rises" lands a half-shade too cleanly.',
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
      'Sneaky — sarcasm and a shiny ruby are supposed to be human territory, so no shame here. The seam is how tidily everything lines up before "Wait, where did you go?"',
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
      'It\'s casual and spoken out loud — "Morning, boys" and "What the hell is water?" That\'s a person telling a joke from a podium, not written prose.',
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
      'The joke keeps piling on absurd detail ("the coffee table that the grid sits on... the shag carpeting underneath") building to a laugh. That escalation is a real comedian working a room.',
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
      'Plain, practical advice with a homespun rhythm — "another and another and another" is the kind of repetition a real speaker uses out loud.',
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
      "He's quoting the Whole Earth Catalog's farewell line back to the graduates as a wish for himself — borrowing someone else's words, not inventing a slogan.",
  },
  {
    id: "speech-12",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Do not let the fear of making a mistake paralyze your ambition, because every failure is simply a tuition payment toward your future wisdom. The most extraordinary lives are rarely linear; they are messy, unpredictable, and defined by the moments someone chose to get back up. Write a story worth telling.",
    source: "AI-generated",
    reveal:
      'AI — "every failure is simply a tuition payment toward your future wisdom" is a line built for a graduation card. Then it orders you to "write a story worth telling" without ever telling one of its own.',
  },
  {
    id: "speech-15",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "You are not here because the path was clear. You are here because you kept walking when the map turned into fog.",
    source: "AI-generated",
    reveal:
      "Sneaky — bot. Two sentences, barely a seam, and a line that actually lands. Almost nobody gets this one.",
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
      'Sneaky — bot, and "packed up the chairs" is a better image than most commencement speakers manage. If you called it human, so did the rest of the room.',
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
      "a desperate, name-specific plea in a looping distress recording; the kind of concrete, vulnerable ask only a real character in a specific jam makes.",
  },
  {
    id: "movies-2",
    type: "text",
    category: "movies",
    answer: "human",
    body: "That's no moon. It's a space station.",
    source: "Star Wars: A New Hope (1977) — Obi-Wan Kenobi",
    reveal:
      "two declarative fragments, the second landing harder; the rhythm of dawning horror, not information delivery.",
  },
  {
    id: "movies-3",
    type: "text",
    category: "movies",
    answer: "human",
    body: "I find your lack of faith disturbing.",
    source: "Star Wars: A New Hope (1977) — Darth Vader",
    reveal:
      "villainous understatement; 'disturbing' is almost polite, which makes it scarier than a shout.",
  },
  {
    id: "movies-4",
    type: "text",
    category: "movies",
    answer: "human",
    body: "These aren't the droids you're looking for.",
    source: "Star Wars: A New Hope (1977) — Obi-Wan Kenobi",
    reveal:
      "the casual confidence of a practiced Jedi mind trick reads lived-in and specific, not generic mysticism.",
  },
  {
    id: "movies-5",
    type: "text",
    category: "movies",
    answer: "human",
    body: "No! Try not. Do... or do not. There is no try.",
    source: "The Empire Strikes Back (1980) — Yoda",
    reveal:
      "Yoda's backwards word order and flat certainty are pure character voice; a writer chose to make him sound alien and wise at once.",
  },
  {
    id: "movies-6",
    type: "text",
    category: "movies",
    answer: "human",
    body: "No. I am your father.",
    source: "The Empire Strikes Back (1980) — Darth Vader",
    reveal:
      "this is the real line (not 'Luke, I am your father'). It opens with a flat contradiction, which is what makes it land like a punch.",
  },
  {
    id: "movies-7",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Never tell me the odds!",
    source: "The Empire Strikes Back (1980) — Han Solo",
    reveal: "pure Han: bravado as philosophy, a man who performs recklessness as identity.",
  },
  {
    id: "movies-8",
    type: "text",
    category: "movies",
    answer: "human",
    body: '"I love you." "I know."',
    source: "The Empire Strikes Back (1980) — Leia & Han Solo",
    reveal:
      "Han refuses the line he's supposed to say and answers sideways instead. That's a person making a choice, not a machine completing a sentence.",
  },
  {
    id: "movies-9",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Hello there.",
    source: "Star Wars: Revenge of the Sith (2005) — Obi-Wan Kenobi",
    reveal:
      "a cheerful greeting delivered mid-ambush to a war criminal; the comedy is the total mismatch of tone and stakes.",
  },
  {
    id: "movies-10",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Genius, billionaire, playboy, philanthropist.",
    source: "The Avengers (2012) — Tony Stark",
    reveal: "four nouns, zero verbs; a self-description as a list, deliberate comic arrogance.",
  },
  {
    id: "movies-11",
    type: "text",
    category: "movies",
    answer: "human",
    body: "That's my secret, Cap. I'm always angry.",
    source: "The Avengers (2012) — Bruce Banner",
    reveal: "the quiet delivery of a devastating confession; the calm control is the whole point.",
  },
  {
    id: "movies-12",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Puny god.",
    source: "The Avengers (2012) — Hulk",
    reveal:
      "two words after smashing a god into the floor; brutal comic timing that's a writer's rhythm.",
  },
  {
    id: "movies-13",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Even when I had nothing, I had Bucky.",
    source: "Captain America: The Winter Soldier (2014) — Steve Rogers",
    reveal: "specific, proper-noun grief: not 'a friend' but this person by name.",
  },
  {
    id: "movies-14",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Mr. Stark, I don't feel so good. I don't want to go. I don't want to go, sir. Please. I'm sorry.",
    source: "Avengers: Infinity War (2018) — Peter Parker",
    reveal: "stumbling repetition and apologizing; a kid scared of dying who still says sorry.",
  },
  {
    id: "movies-15",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Perfectly balanced, as all things should be.",
    source: "Avengers: Infinity War (2018) — Thanos",
    reveal:
      "a genocidal maniac describing a knife like a proud craftsman; the serenity is what makes him frightening.",
  },
  {
    id: "movies-16",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Part of the journey is the end.",
    source: "Avengers: Endgame (2019) — Tony Stark",
    reveal:
      "yes, it literally uses 'journey' (an AI favorite!) — but it's Tony's hologram to his daughter, accepting mortality with earned, specific grace.",
  },
  {
    id: "movies-17",
    type: "text",
    category: "movies",
    answer: "human",
    body: "And I... am... Iron Man.",
    source: "Avengers: Endgame (2019) — Tony Stark",
    reveal:
      "the deliberate pauses call back his 2008 origin line; it lands 11 years later as both punchline and eulogy.",
  },
  {
    id: "movies-18",
    type: "text",
    category: "movies",
    answer: "human",
    body: "Avengers... assemble.",
    source: "Avengers: Endgame (2019) — Steve Rogers",
    reveal:
      "the most anticipated three words in the MCU, delivered quietly; it earns the moment through restraint, not volume.",
  },
  {
    id: "movies-19",
    type: "text",
    category: "movies",
    answer: "human",
    body: "I'm a mog: half man, half dog. I'm my own best friend!",
    source: "Spaceballs (1987) — Barf",
    reveal:
      "the punchline pivots on 'best friend'; a joke that needs human-culture knowledge of what dogs are to people.",
  },
  {
    id: "movies-20",
    type: "text",
    category: "movies",
    answer: "human",
    body: '"I am your father\'s brother\'s nephew\'s cousin\'s former roommate." "What\'s that make us?" "Absolutely nothing!"',
    source: "Spaceballs (1987) — Dark Helmet & Lone Starr",
    reveal:
      "a bureaucratic labyrinth of family relations arriving at 'nothing'; a joke about Star Wars mythology and anticlimactic reveals at once.",
  },
  {
    id: "movies-21",
    type: "text",
    category: "movies",
    answer: "human",
    body: "What's the matter, Colonel Sandurz? Chicken?!",
    source: "Spaceballs (1987) — Dark Helmet",
    reveal:
      "a schoolyard taunt ('chicken?') from a supervillain in full armor; ridiculous authority, pure Mel Brooks.",
  },
  {
    id: "movies-22",
    type: "text",
    category: "movies",
    answer: "human",
    body: "There's only one man who would dare give me the raspberry: Lone Starr!",
    source: "Spaceballs (1987) — Dark Helmet",
    reveal:
      "taking a Bronx cheer literally as an act of defiance; the specificity of 'dare give me the raspberry' sells the absurdism.",
  },
  {
    id: "movies-23",
    type: "text",
    category: "movies",
    answer: "human",
    body: '"We were told to comb the desert, so we\'re combing it!" "We ain\'t found shit!"',
    source: "Spaceballs (1987) — Dark Helmet & a trooper",
    reveal:
      "the idiom 'comb the desert' taken literally, plus profanity for comic deflation; cultural comedy.",
  },
  {
    id: "movies-24",
    type: "text",
    category: "movies",
    answer: "human",
    body: '"What happened to then?" "We passed then." "When?" "Just now."',
    source: "Spaceballs (1987) — Dark Helmet & Colonel Sandurz",
    reveal:
      'the joke treats "then" as a place you can drive past and miss. Wordplay that silly is a writer having fun; a machine plays it straight.',
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
      'AI — three verbs marching in a row ("harness the storm, forge a new dawn, unleash a power"), each grander than the last and none attached to a plan. When a line escalates in threes and gets vaguer as it climbs, suspect the machine.',
  },
  {
    id: "movies-30",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Victory is not measured in the battles we win, but in the lives we choose to protect along the way.",
    source: "AI-generated",
    reveal:
      'AI — "Victory is not measured in the battles we win, but in the lives we choose to protect" is a saying you could paste into any war film. No battle, no enemy, nobody actually being protected.',
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
    id: "movies-42",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "You really thought a force field would stop me? I helped design half the tech in this building. Buddy, I invented the off switch.",
    source: "AI-generated",
    reveal:
      "Sneaky — a great closing line, and you were right to trust it. If there's a tell, \"I invented the off switch\" is timed a shade too perfectly — but that's a coin flip, not a mistake.",
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
      "Sneaky — you can practically see the wire. Real panic is messier than this staged self-correction, but that's a fine hair to split with ten seconds on the clock.",
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
      "Sneaky — real detail, and most rooms call this one human. The only giveaway: it's a bit too well-organized. People in actual trouble don't lay things out this neatly.",
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
      "Sneaky — this one has a pulse, and missing it says something good about you. The only crack: that much fear rarely comes out so evenly balanced.",
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
      'Sneaky — "the hull\'s rated for worse than this" is exactly the kind of detail we keep telling you to trust. Tough break; the tidy pivot from the ship to the crew is all that gives it away.',
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
      'Sneaky — "gone dark on purpose, or just gone" is a genuinely good line. If you missed it, blame the too-neat "very good or very bad" ending; that was about all there was to catch.',
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
      'Sneaky — that last line is a gut-punch and it\'s fine that it worked on you. The one polish mark: "tell them I was smiling" is buffed past panic.',
    sneaky: true,
  },
  // ---------------------------------------------------------------------------
  // Gen X cohort (born ~1965-1980) — most-quoted comedies of their formative
  // years. All 18 human quotes verified against subtitle transcripts.
  // 18 human / 12 plain AI / 5 sneaky AI = 35.
  // ---------------------------------------------------------------------------
  {
    id: "genx-1",
    type: "text",
    category: "genx",
    answer: "human",
    body: '"Surely you can\'t be serious." "I am serious. And don\'t call me Shirley."',
    source: "Airplane! (1980) — Ted Striker & Dr. Rumack",
    reveal:
      "The whole line hangs on one man mishearing a single word, delivered with a completely straight face. Betting an entire joke on a name is a risk a person takes and a machine never would.",
  },
  {
    id: "genx-2",
    type: "text",
    category: "genx",
    answer: "human",
    body: "So I've got that going for me, which is nice.",
    source: "Caddyshack (1980) — Carl Spackler",
    reveal:
      "He tells a huge story and then shrugs it off with a mumbled consolation prize. A machine would have ended on the big payoff, not on someone quietly deflating himself.",
  },
  {
    id: "genx-3",
    type: "text",
    category: "genx",
    answer: "human",
    body: "Back off, man. I'm a scientist.",
    source: "Ghostbusters (1984) — Dr. Peter Venkman",
    reveal:
      'Claiming professional credentials in the middle of a shoving match is a very human kind of nonsense. The mismatch between "back off, man" and "scientist" is the entire joke.',
  },
  {
    id: "genx-4",
    type: "text",
    category: "genx",
    answer: "human",
    body: "Life moves pretty fast. If you don't stop and look around once in a while, you could miss it.",
    source: "Ferris Bueller's Day Off (1986) — Ferris Bueller",
    reveal:
      "This one genuinely looks like a fridge magnet, which is why it's a nasty question — but it's a teenager talking straight to the camera while skipping school, and \"you could miss it\" is offhand rather than grand.",
  },
  {
    id: "genx-5",
    type: "text",
    category: "genx",
    answer: "human",
    body: "The 1961 Ferrari 250 GT California. Less than a hundred were made.",
    source: "Ferris Bueller's Day Off (1986) — Cameron Frye",
    reveal:
      "A model year, a car name, and a production number. That much checkable detail is somebody who knows exactly what he's looking at; machines avoid numbers they'd have to be right about.",
  },
  {
    id: "genx-6",
    type: "text",
    category: "genx",
    answer: "human",
    body: "My name is Inigo Montoya. You killed my father. Prepare to die.",
    source: "The Princess Bride (1987) — Inigo Montoya",
    reveal:
      "He introduces himself politely before threatening to kill you, and you can tell he has rehearsed it for years. That specific, strange little habit is too odd to be invented by a machine.",
  },
  {
    id: "genx-7",
    type: "text",
    category: "genx",
    answer: "human",
    body: "You keep using that word. I do not think it means what you think it means.",
    source: "The Princess Bride (1987) — Inigo Montoya",
    reveal:
      "It's a correction delivered patiently in the middle of a chase, and it never tells you which word. The joke only works because there's a real scene and a real annoying man around it.",
  },
  {
    id: "genx-8",
    type: "text",
    category: "genx",
    answer: "human",
    body: "What if there is no tomorrow? There wasn't one today.",
    source: "Groundhog Day (1993) — Phil Connors",
    reveal:
      "The second sentence quietly breaks reality, and he says it in the tone of a man complaining about the weather. That flatness in the face of something impossible is a person's timing.",
  },
  {
    id: "genx-9",
    type: "text",
    category: "genx",
    answer: "human",
    body: "We're not worthy! We're not worthy!",
    source: "Wayne's World (1992) — Wayne & Garth",
    reveal:
      "Two grown men on their knees chanting the same three words. It makes no sense on the page and total sense in the room, which is what a real scene gives you.",
  },
  {
    id: "genx-10",
    type: "text",
    category: "genx",
    answer: "human",
    body: "So you're telling me there's a chance!",
    source: "Dumb and Dumber (1994) — Lloyd Christmas",
    reveal:
      "He has just been told one in a million and he hears good news. The joke lives in the gap between what was said and what he decided to hear — that's a character, not a clever sentence.",
  },
  {
    id: "genx-11",
    type: "text",
    category: "genx",
    answer: "human",
    body: "We get the warhead and hold the world ransom for... one million dollars!",
    source: "Austin Powers: International Man of Mystery (1997) — Dr. Evil",
    reveal:
      "The pause before the number is the whole gag: a villain frozen in the wrong decade, enormously proud of an amount nobody is scared of. Timing built out of a pause is a person's work.",
  },
  {
    id: "genx-12",
    type: "text",
    category: "genx",
    answer: "human",
    body: "Yeah, well, The Dude abides.",
    source: "The Big Lebowski (1998) — The Dude",
    reveal:
      'Three words, and one of them is a nickname he gave himself. The "yeah, well" shrug in front of it is how people actually start sentences; a machine would have trimmed that off.',
  },
  {
    id: "genx-13",
    type: "text",
    category: "genx",
    answer: "human",
    body: "I'm also gonna need you to go ahead and come in on Sunday, too, OK?",
    source: "Office Space (1999) — Bill Lumbergh",
    reveal:
      'Every padding word — "also," "go ahead," "too," "OK" — is a manager softening bad news until it\'s unbearable. Anybody who has had that conversation recognizes the sound of it.',
  },
  {
    id: "genx-14",
    type: "text",
    category: "genx",
    answer: "human",
    body: "I want my two dollars!",
    source: "Better Off Dead (1985) — Johnny the paperboy",
    reveal:
      'Two dollars. A specific, absurdly small amount, shouted by a paperboy who will never let it go. Real comedy commits to a tiny stupid number; invented lines round it up to "my money."',
  },
  {
    id: "genx-15",
    type: "text",
    category: "genx",
    answer: "human",
    body: "They've got the golden arches. Mine are the golden arcs.",
    source: "Coming to America (1988) — Cleo McDowell",
    reveal:
      "A one-letter dodge around a lawsuit, delivered with total confidence. That's a specific scam a writer thought all the way through, not a generic joke about fast food.",
  },
  {
    id: "genx-16",
    type: "text",
    category: "genx",
    answer: "human",
    body: "It's all ball bearings nowadays.",
    source: "Fletch (1985) — Fletch",
    reveal:
      'He\'s bluffing his way through a job he knows nothing about, and "nowadays" is the perfect fake-expert word. Confidence with absolutely nothing behind it is a very human move.',
  },
  {
    id: "genx-17",
    type: "text",
    category: "genx",
    answer: "human",
    body: "Nothing to see here. Please disperse!",
    source: "The Naked Gun (1988) — Lt. Frank Drebin",
    reveal:
      "He says it while a fireworks factory explodes behind him. The words are deliberately boring — the comedy is entirely in what they're ignoring, which needs a real scene to work.",
  },
  {
    id: "genx-18",
    type: "text",
    category: "genx",
    answer: "human",
    body: '"Looking good, Billy Ray!" "Feeling good, Louis!"',
    source: "Trading Places (1983) — Louis Winthorpe III & Billy Ray Valentine",
    reveal:
      "Two guys checking in with each other by name, and that's the whole exchange. It only pays off because you watched them earn it — machines don't write payoffs for scenes they never set up.",
  },
  {
    id: "genx-19",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "In today's fast-paced academic landscape, one must ask: is skipping school truly wrong, or is it simply a bold reallocation of one's personal time?",
    source: "AI-generated",
    reveal:
      "AI — nobody ditching school says \"In today's fast-paced academic landscape.\" That opener is the most common way AI starts writing; you'll see it in your inbox this week.",
  },
  {
    id: "genx-20",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "This isn't merely a golf tournament. It's a chance for one groundskeeper to finally be seen.",
    source: "AI-generated",
    reveal:
      "AI — \"this isn't merely X, it's Y\" is a machine's favorite way to sound deep. Once you notice it you will catch it everywhere: product launches, company announcements, the closing line of half the ads written this year.",
  },
  {
    id: "genx-21",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "Caddying taught me patience. It taught me humility. And it taught me the value of hard work.",
    source: "AI-generated",
    reveal:
      "AI — three lessons, all the same size, all equally safe. Machines love a tidy set of three; when an AI-written recap gives you three points that are suspiciously evenly matched, this is that same habit.",
  },
  {
    id: "genx-23",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "Before we toilet-paper the principal's house, let's delve into the realm of what could possibly go wrong.",
    source: "AI-generated",
    reveal:
      'AI — "delve" and "realm" are two of the most machine-flavored words in English. If a coworker\'s email suddenly starts delving into realms and landscapes, a chatbot wrote it.',
  },
  {
    id: "genx-25",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "You asked whether I ate the last slice of pizza. That's a great question. Whether I ate the last slice of pizza is certainly worth examining.",
    source: "AI-generated",
    reveal:
      "AI — it repeats your question back to you, compliments you on it, and still doesn't answer. Ask a chatbot anything this week and watch it do this before it gets to the point.",
  },
  {
    id: "genx-27",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "So I drove the golf cart into the pond, the cooler floated away, and my boss watched the whole thing. In the end, we all learned something about ourselves that day.",
    source: "AI-generated",
    reveal:
      'AI — a perfectly good pratfall, and then it stops to hand you a life lesson. That "in the end, we all learned something" wrap-up is how AI finishes nearly everything; check the last line of the next AI-written post you read.',
  },
  {
    id: "genx-28",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "My uncle's chili was truly spicy. Deeply, profoundly spicy. Everyone at the table was significantly affected.",
    source: "AI-generated",
    reveal:
      'AI — "truly, deeply, profoundly" are doing the job one real detail should do; a person would have told you who ran for the garden hose. Those words prop up AI writing everywhere, and there is never anything underneath them.',
  },
  {
    id: "genx-30",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "Excuse me, ghost. I don't wish to be rude, but you are currently inside our refrigerator, and several of us would prefer that you were not.",
    source: "AI-generated",
    reveal:
      "AI — a man negotiating with a ghost using customer-service manners. Machines are trained to be relentlessly polite, which is why AI-written complaints and rejections always sound like they're apologizing to you.",
  },
  {
    id: "genx-31",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "I told her the reception was in the backyard. She wore heels. The lawn won.",
    source: "AI-generated",
    reveal:
      'Sneaky — bot, and "the lawn won" is a real joke: three short sentences, nothing explained. Calling this one human was the smart bet, it just didn\'t pay off.',
    sneaky: true,
  },
  {
    id: "genx-32",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "Three continents, two weddings, and one buffet I still think about. Not in a good way.",
    source: "AI-generated",
    reveal:
      "Sneaky — most rooms lose this one. Counting down to the buffet is exactly how a person builds a laugh, and this time the machine built it right.",
    sneaky: true,
  },
  {
    id: "genx-33",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "The sign says the customer is always right. The customer is currently trying to eat the menu.",
    source: "AI-generated",
    reveal:
      "Sneaky — no shame in this one. Somebody eating a menu is the sort of weird, specific picture we usually tell you only humans bother with; a machine got there first.",
    sneaky: true,
  },
  {
    id: "genx-34",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "I'd like to apologize in advance for what I'm about to say about your haircut.",
    source: "AI-generated",
    reveal:
      "Sneaky — you were right to trust it. Apologizing before the insult is a genuine comic move and this one commits to it, which is why it beat almost everybody in the room.",
    sneaky: true,
  },
  {
    id: "genx-35",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "You can't be nervous and hungry at the same time. That's science. Eat the shrimp.",
    source: "AI-generated",
    reveal:
      'Sneaky — bot, believe it or not. The bossy confidence of "That\'s science. Eat the shrimp." is what got you, and it would have gotten us too.',
    sneaky: true,
  },
  {
    id: "millennial-1",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "Moisture is the essence of wetness, and wetness is the essence of beauty.",
    source: "Zoolander (2001) — Derek Zoolander",
    reveal:
      "It's confident nonsense — a chain of reasoning that goes absolutely nowhere, delivered by a man who is deadly serious. A machine writing a beauty line would have made it make sense.",
  },
  {
    id: "millennial-2",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "The best way to spread Christmas cheer is singing loud for all to hear.",
    source: "Elf (2003) — Buddy",
    reveal:
      "It rhymes, and he means every word of it with his whole chest. The total lack of embarrassment is the joke, and only a writer building a character would commit that hard.",
  },
  {
    id: "millennial-3",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "I just like to smile. Smiling's my favorite.",
    source: "Elf (2003) — Buddy",
    reveal:
      "\"Smiling's my favorite\" isn't quite how anyone would say it — favorite what? That tiny wrongness is a writer making a grown man think like a six-year-old.",
  },
  {
    id: "millennial-4",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "I caught you a delicious bass.",
    source: "Napoleon Dynamite (2004) — Napoleon",
    reveal:
      'He is offering a fish, on purpose, as a romantic gesture. Nobody invents the word "delicious" there — it\'s too specific and too strange to be anything but a real script.',
  },
  {
    id: "millennial-5",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "Girls only want boyfriends who have great skills.",
    source: "Napoleon Dynamite (2004) — Napoleon",
    reveal:
      "The word \"skills\" is doing an enormous amount of work here, and it's said as flat fact. That's a real teenager's theory of the entire world in one sentence.",
  },
  {
    id: "millennial-6",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "On Wednesdays, we wear pink.",
    source: "Mean Girls (2004) — Karen Smith",
    reveal:
      "It's a rule about the color pink, announced like a law of physics. The comedy is entirely in how seriously it's said, which is a choice a person makes.",
  },
  {
    id: "millennial-7",
    type: "text",
    category: "millennial",
    answer: "human",
    body: 'Gretchen, stop trying to make "fetch" happen. It\'s not going to happen.',
    source: "Mean Girls (2004) — Regina George",
    reveal:
      "Someone is being shut down by name, in the middle of trying. The name and the interruption are what make it feel like a real room full of people.",
  },
  {
    id: "millennial-8",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "I don't know how to put this, but I'm kind of a big deal.",
    source: "Anchorman: The Legend of Ron Burgundy (2004) — Ron Burgundy",
    reveal:
      "He pretends to struggle for words right before saying the least modest thing possible. That little two-step is a setup and a punchline crammed into one breath.",
  },
  {
    id: "millennial-9",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "If you ain't first, you're last.",
    source: "Talladega Nights: The Ballad of Ricky Bobby (2006) — Reese Bobby",
    reveal:
      "It's terrible advice, said with total confidence by a dad, and a grown man builds his whole life on it. Real writing hands you a bad idea and lets it do damage.",
  },
  {
    id: "millennial-10",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "If you can dodge a wrench, you can dodge a ball.",
    source: "DodgeBall: A True Underdog Story (2004) — Patches O'Houlihan",
    reveal:
      "It's coaching advice that is also, technically, an assault. Nobody lands on \"wrench\" as the example — it's too dumb and too specific to be generated.",
  },
  {
    id: "millennial-11",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "I'm watching you, Wazowski. Always watching. Always.",
    source: "Monsters, Inc. (2001) — Roz",
    reveal:
      "The threat gets repeated because she's enjoying it, and it's aimed at one specific person by last name. That's a character with a grudge, not a line about surveillance.",
  },
  {
    id: "millennial-12",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "Ogres are like onions. Onions have layers. Ogres have layers.",
    source: "Shrek (2001) — Shrek",
    reveal:
      "He's frustrated and saying the same thing three different ways because the first two didn't land. That's what losing an argument actually sounds like.",
  },
  {
    id: "millennial-13",
    type: "text",
    category: "millennial",
    answer: "human",
    body: '"Did we just become best friends?" "Yep."',
    source: "Step Brothers (2008) — Brennan & Dale",
    reveal:
      'Two grown men discover a friendship out loud, and the answer is one syllable. The tiny "Yep" doing all the work is the entire joke.',
  },
  {
    id: "millennial-14",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "No one knows what it means, but it's provocative. It gets the people going.",
    source: "Blades of Glory (2007) — Chazz Michael Michaels",
    reveal:
      "He admits nobody understands it and then argues for it anyway. Doubling down on a bad case is a very human thing to write into a scene.",
  },
  {
    id: "millennial-15",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "It's not a man-purse. It's called a satchel. Indiana Jones wears one.",
    source: "The Hangover (2009) — Alan",
    reveal:
      "He corrects the word, then immediately reaches for Indiana Jones as proof. That defensive scramble for backup is exactly what an embarrassed person does.",
  },
  {
    id: "millennial-16",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "I'm gonna need you to go ahead and come in tomorrow. So if you could be here around nine, that would be great.",
    source: "Office Space (1999) — Bill Lumbergh",
    reveal:
      'It\'s a demand wrapped in polite filler — "if you could," "that would be great." Anyone who has ever had a manager recognizes that exact wording, and that\'s why it\'s real.',
  },
  {
    id: "millennial-17",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "You're tacky, and I hate you.",
    source: "School of Rock (2003) — Billy",
    reveal:
      "Five words from the kid who appointed himself the band's stylist, and \"tacky\" is a wonderfully petty word for a child to reach for. It's the sort of insult that's too oddly chosen to be invented.",
  },
  {
    id: "millennial-18",
    type: "text",
    category: "millennial",
    answer: "human",
    body: "Help me, I'm poor.",
    source: "Bridesmaids (2011) — Annie",
    reveal:
      "She's pleading with a flight attendant using the actual, humiliating truth. Saying the embarrassing thing straight out is a person's move, not a machine's.",
  },
  {
    id: "millennial-19",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "This isn't just a chili cook-off. It's a statement about who we are as a family, and I intend to make that statement.",
    source: "AI-generated",
    reveal:
      "AI — \"this isn't just X, it's Y\" is the single most common move a machine makes. You'll see that exact flip in half the marketing emails and posts you read this month.",
  },
  {
    id: "millennial-20",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "I live by three rules: never quit, never explain, and never wear socks with sandals.",
    source: "AI-generated",
    reveal:
      'AI — a tidy group of three, each about the same length. Machines can\'t resist threes; watch for it the next time an AI-written email promises something "fast, simple, and reliable."',
  },
  {
    id: "millennial-21",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "In today's fast-paced backyard environment, we have to ask ourselves whether we are ready for this water balloon fight.",
    source: "AI-generated",
    reveal:
      'AI — "In today\'s fast-paced..." is how a machine clears its throat before saying anything. You will get a real work email that opens exactly like that within about a week.',
  },
  {
    id: "millennial-22",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "We lost the van, we lost the trophy, and I lost one shoe. But in the end, what we really found out there was each other.",
    source: "AI-generated",
    reveal:
      "AI — it bolts a warm, tidy wrap-up onto the end of a gag. Look for that same closing sentence at the bottom of AI-written reports and reviews, where it sounds nice and adds nothing.",
  },
  {
    id: "millennial-23",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "Gary is a deeply unpleasant individual, and I find his behavior profoundly disappointing.",
    source: "AI-generated",
    reveal:
      'AI — "deeply" and "profoundly" are standing in for an actual detail about what Gary did. When a machine writes feedback about someone, those two words do most of the work.',
  },
  {
    id: "millennial-24",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "This sheet cake is a testament to what a team can achieve when we leverage our collective strengths.",
    source: "AI-generated",
    reveal:
      'AI — "a testament to" and "leverage" are two of the machine\'s favorite words. Once you\'ve noticed them, you\'ll spot them in nearly every AI-written email that hits your inbox.',
  },
  {
    id: "millennial-25",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "I'm terribly sorry to interrupt, and I do apologize for the poor timing, but the kitchen is on fire.",
    source: "AI-generated",
    reveal:
      "AI — two apologies before it gets to the fire. Machines cushion everything; you'll see the same over-politeness when AI writes an email that should have just said no.",
  },
  {
    id: "millennial-29",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: '"Where is the cake?" "Where is the cake. That\'s a great question, and I do want to address it directly."',
    source: "AI-generated",
    reveal:
      "AI — three words in, and it still hasn't gotten past your own sentence. Someone who knows where the cake is says so. Echoing the question first is a stall dressed up as attentiveness.",
  },
  {
    id: "millennial-31",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "I'm not mad. I'm just going to go sit in the car for a while with the radio off.",
    source: "AI-generated",
    reveal:
      "Sneaky — most rooms call this one human, and it honestly earns that. The detail about the radio being off is the sort of thing machines have only recently gotten good at.",
    sneaky: true,
  },
  {
    id: "millennial-32",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: '"You wore a tuxedo to a pool party." "I wore a tuxedo to a pool party, and I stand by it."',
    source: "AI-generated",
    reveal:
      "Sneaky — no shame in missing this. Repeating an accusation back word for word is a genuine comedy move, and the bot borrowed it cleanly. If you got it right, that was mostly instinct.",
    sneaky: true,
  },
  {
    id: "millennial-33",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "He's not my best friend. He's my emergency contact. There's a difference, and I'm not going to explain it.",
    source: "AI-generated",
    reveal:
      "Sneaky — this one fools entire rooms. Refusing to explain a joke is usually a strong sign of a human writer, which is exactly why it works here. Call it a coin flip and move on.",
    sneaky: true,
  },
  {
    id: "millennial-34",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: '"It\'s a group project, man." "Correct. And I brought a laminated agenda."',
    source: "AI-generated",
    reveal:
      "Sneaky — the laminated agenda is a great detail, and if you trusted it you were reasoning the right way. Machines have started stealing that trick, which is the only reason this one is in the bot pile.",
    sneaky: true,
  },
  {
    id: "millennial-35",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "I have never lost a bet. I have, on a few occasions, agreed to a different bet about halfway through.",
    source: "AI-generated",
    reveal:
      "Sneaky — plenty of sharp people said human on this one, because it's a genuinely good joke. Weaseling out of a definition is a classic move from that era of comedy; the bot just did it well.",
    sneaky: true,
  },
  {
    id: "genz-1",
    type: "text",
    category: "genz",
    answer: "human",
    body: "I only work in black. And sometimes, very, very dark gray.",
    source: "The Lego Movie (2014) — Batman",
    reveal:
      "The joke is that he corrects himself to something that isn't a correction at all. That tiny, self-serious walk-back is a writer's touch — a machine would have stopped at \"black.\"",
  },
  {
    id: "genz-3",
    type: "text",
    category: "genz",
    answer: "human",
    body: "All right, let's do this one last time. My name is Peter Parker.",
    source: "Spider-Man: Into the Spider-Verse (2018) — Peter Parker",
    reveal:
      '"One last time" is a tired guy who has told this story too many times already. That weariness is a real person\'s idea; a machine would open with something grand instead.',
  },
  {
    id: "genz-4",
    type: "text",
    category: "genz",
    answer: "human",
    body: "You won't. It's a leap of faith. That's all it is, Miles.",
    source: "Spider-Man: Into the Spider-Verse (2018) — Peter B. Parker",
    reveal:
      "He answers a scared kid's question with a flat \"You won't\" before offering any comfort, and he uses his name. Honest first, kind second — that ordering is how people actually talk.",
  },
  {
    id: "genz-5",
    type: "text",
    category: "genz",
    answer: "human",
    body: "Yeah, no, don't put me down for cardio.",
    source: "Pitch Perfect (2012) — Fat Amy",
    reveal:
      '"Yeah, no" is a real thing people say and a machine almost never writes, because it agrees and refuses in the same breath. The flat delivery does all the work.',
  },
  {
    id: "genz-6",
    type: "text",
    category: "genz",
    answer: "human",
    body: "I do hope you keep me in mind for any future game nights.",
    source: "Game Night (2018) — Gary",
    reveal:
      "Nobody talks this formally to their neighbors, and that's the whole joke — a lonely guy being painfully polite about wanting to be invited. The comedy is the mismatch, which takes a person to build.",
  },
  {
    id: "genz-7",
    type: "text",
    category: "genz",
    answer: "human",
    body: '"You guys don\'t even care about school." "No, we just don\'t only care about school."',
    source: "Booksmart (2019) — Molly & Triple A",
    reveal:
      'The comeback moves one small word — "even" becomes "only" — and demolishes her entire worldview. That kind of precision landing is a screenwriter finding the exact word, not a machine reaching for a bigger one.',
  },
  {
    id: "genz-8",
    type: "text",
    category: "genz",
    answer: "human",
    body: "Maximum effort.",
    source: "Deadpool (2016) — Deadpool",
    reveal:
      "Two words, said before doing something ridiculous. It's a catchphrase because it's short and reusable, and real people talk in shorthand like this far more than machines do.",
  },
  {
    id: "genz-9",
    type: "text",
    category: "genz",
    answer: "human",
    body: "The only thing I do know is that we have to be kind. Please, be kind, especially when we don't know what's going on.",
    source: "Everything Everywhere All at Once (2022) — Waymond Wang",
    reveal:
      "Yes, it reads like a poster — but look at the ending. He doesn't stop on the clean line; he tacks on \"especially when we don't know what's going on.\" That's a person.",
  },
  {
    id: "genz-13",
    type: "text",
    category: "genz",
    answer: "bot",
    body: "We're a team now. And being a team means trusting each other, believing in each other, and occasionally stealing a van together.",
    source: "AI-generated",
    reveal:
      "AI — trusting, believing, and then a van. It's a list of nice words with one odd item bolted on the end, hoping the surprise counts as a joke. Real jokes come out of the mess the characters are actually in.",
  },
  {
    id: "genz-15",
    type: "text",
    category: "genz",
    answer: "bot",
    body: "Guys. Guys. Okay, now that I have everyone's full and undivided attention, I would like to formally propose that we absolutely, positively, one hundred percent do not do that again.",
    source: "AI-generated",
    reveal:
      'AI — "full and undivided," then "absolutely, positively, one hundred percent." That\'s five words doing one word\'s job. Stacked-up emphasis like that is padding, and padding is a machine habit.',
  },
  {
    id: "genz-17",
    type: "text",
    category: "genz",
    answer: "bot",
    body: "And that, my friends, is how you turn a total disaster into a slightly smaller disaster. Teamwork.",
    source: "AI-generated",
    reveal:
      'AI — it wraps the scene up and takes a little bow, like a caption written under a photo after the fact. "And that, my friends, is how you..." is a storyteller talking to an audience, not a person talking to the people in the room.',
  },
  {
    id: "genz-18",
    type: "text",
    category: "genz",
    answer: "bot",
    body: "Okay. New plan. Same as the old plan, but this time we run.",
    source: "AI-generated",
    reveal:
      "Sneaky — most rooms call this one human, and honestly they should. It's short, it's funny, and it sounds like it came out of a real jam. A bot wrote it anyway; nothing went wrong on your end.",
    sneaky: true,
  },
  {
    id: "genz-19",
    type: "text",
    category: "genz",
    answer: "bot",
    body: "You said you had a plan. You did not say the plan was a shopping cart.",
    source: "AI-generated",
    reveal:
      "Sneaky — no shame in this one at all. A specific, stupid object is exactly the thing machines usually cannot reach for, so trusting it was the smart bet. This time the bet lost.",
    sneaky: true,
  },
  {
    id: "genz-20",
    type: "text",
    category: "genz",
    answer: "bot",
    body: "I'm not scared. My legs are scared. There's a difference and I'd rather not get into it right now.",
    source: "AI-generated",
    reveal:
      "Sneaky — this one gets almost everybody. Refusing to explain your own joke is about the most human move there is, and the machine happened to land on it. Great instinct, wrong answer.",
    sneaky: true,
  },
  {
    id: "alpha-1",
    type: "text",
    category: "alpha",
    answer: "human",
    body: "Rats along his back. When he calls your name, it all fades to black.",
    source: "Encanto (2021) — Camilo, “We Don't Talk About Bruno”",
    reveal:
      "Nobody needed the rats. That oddly specific, useless detail is the giveaway — it's a family gossiping about their uncle until he sounds like a monster, and a person wrote the part that goes too far.",
  },
  {
    id: "alpha-2",
    type: "text",
    category: "alpha",
    answer: "human",
    body: "But Aunt Lucy said, “If we're kind and polite, the world will be right.”",
    source: "Paddington 2 (2017) — Paddington",
    reveal:
      "It rhymes like a fridge magnet, but it belongs to somebody: a small bear repeating his aunt's advice, and he names her. A machine writes the saying; a person gives it an owner.",
  },
  {
    id: "alpha-3",
    type: "text",
    category: "alpha",
    answer: "human",
    body: "He's so fluffy, I'm gonna die!",
    source: "Despicable Me (2010) — Agnes",
    reveal:
      "This is the actual line — almost everyone remembers it as “It's so fluffy.” A little kid announcing that a stuffed unicorn might kill her is the kind of overreaction you only write if you've met a real three-year-old.",
  },
  {
    id: "alpha-4",
    type: "text",
    category: "alpha",
    answer: "human",
    body: "And I don't mean it metaphorically or rhetorically or poetically or theoretically or in any other fancy way. I'm Death, straight up.",
    source: "Puss in Boots: The Last Wish (2022) — Death",
    reveal:
      "Four fancy words piled up just to say “I'm not kidding,” then thrown away for “straight up.” A machine picks one word; a writer stacks all four because the pile-up is the joke.",
  },
  {
    id: "alpha-5",
    type: "text",
    category: "alpha",
    answer: "human",
    body: "If you start singing, I'm gonna throw up.",
    source: "Moana (2016) — Maui",
    reveal:
      "It's a threat about singing — in a musical, right before he sings. A movie making fun of itself like that is people in a room having fun, not a line built to be quoted.",
  },
  {
    id: "alpha-6",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“In today's fast-paced forest landscape, snack security is more important than ever,” announced the squirrel from the top of the picnic table. “Which is why I will now be taking that sandwich.”",
    source: "AI-generated",
    reveal:
      "AI — a forest does not have a fast-paced landscape. Delete that whole first clause and nothing is lost, which is the test: if the opening sentence can go without anyone noticing, a machine wrote it.",
  },
  {
    id: "alpha-7",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“This isn't just a snowball fight,” said the penguin, adjusting his tiny scarf. “It's a chance to build something bigger than ourselves.”",
    source: "AI-generated",
    reveal:
      "AI — the “this isn't just X, it's Y” upgrade, applied to a snowball fight. Machines reach for that move constantly to make small things sound big; once you notice it, you'll catch it in ads, sales decks, and half the posts in your feed.",
  },
  {
    id: "alpha-8",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“Before we delve into who ate the cake,” said the hamster, “let us take a moment to appreciate the rich tapestry of crumbs on this floor. Truly a testament to a family that eats together.”",
    source: "AI-generated",
    reveal:
      "AI — no hamster says “delve,” “rich tapestry,” and “a testament to.” Machines can't stop using those three; spot them in a report and you've almost certainly found AI.",
  },
  {
    id: "alpha-9",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“I have a plan,” said the goat. “It is a bad plan. But it is a plan, and we are fresh out of good ones.”",
    source: "AI-generated",
    reveal:
      "Sneaky — a machine wrote a joke that actually works, and most of the room went with you on this one. The only thread showing is how evenly the three little pieces line up, like a joke built from a kit.",
    sneaky: true,
  },
  {
    id: "alpha-10",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“Nobody panic,” said the duck, already panicking. “Panicking is my job. You two just keep flying.”",
    source: "AI-generated",
    reveal:
      "Sneaky — no shame in this one; a character contradicting himself in the same breath is a real comic move and it lands. It just wraps up a shade too neatly, handing you the setup and the payoff without a single wasted word.",
    sneaky: true,
  },
  {
    id: "genx-36",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "We hid the entire pep band in the gym storage closet for forty minutes. They came out the wrong door, still playing, and marched straight into somebody's wedding. Which just goes to show, the plans that fall apart are the ones you keep forever.",
    source: "AI-generated",
    reveal:
      "AI — the wedding is the punchline. What comes after it is a fortune cookie taped to the end, telling you how to feel about a joke that already worked. AI-drafted meeting recaps close the exact same way.",
  },
  {
    id: "movies-49",
    type: "text",
    category: "movies",
    answer: "bot",
    body: '"Reactor\'s at a hundred percent." "What happens after a hundred?" "The manual stops at a hundred. There\'s just a phone number." Funny how the moments that terrify us are the ones that show us who we really are.',
    source: "AI-generated",
    reveal:
      "AI — nobody watching a reactor climb past the last number in the manual pauses to say what fear teaches us. That final line is aimed at a reader, not the crew. AI-written status updates sign off the same way.",
  },
  {
    id: "alpha-11",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: '"Is everybody buckled?" "Yep." "Is the dog buckled?" "The dog is driving." "The dog is WHAT?" Turns out the vacation we needed was never the one printed on the map.',
    source: "AI-generated",
    reveal:
      "AI — cover the last sentence with your thumb and nothing is missing. A machine wrote a good joke, then explained what it meant. AI-written thank-you notes and reviews do this too: one tidy sentence past the point.",
  },
  {
    id: "bbq-41",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Pulled the pork butt off the smoker tonight and I am wholly, thoroughly, and completely satisfied with how it turned out. The flavor was immensely flavorful. Highly recommend this cook to anyone.",
    source: "AI-generated",
    reveal:
      "AI — count the praise words, then go looking for a number: temperature, hours, what wood. There isn't one. Recipe comments and product reviews that get louder as they run out of facts were typed by a machine.",
  },
  {
    id: "disney-25",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“Do not fret, little one,” said the badger, patting the acorn with one paw. “I am entirely, sincerely, and wholeheartedly certain that everything is going to work out extraordinarily well in the end.”",
    source: "AI-generated",
    reveal:
      "AI — a real badger would have said what he knows and how he knows it. This one just stacks up three ways of sounding sure. Bedtime stories written by a bot comfort you like this: warmly, and about nothing.",
  },
  {
    id: "speech-17",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Graduates, I am incredibly, tremendously, and unbelievably proud of each and every one of you. What all of you have accomplished here is genuinely, authentically remarkable.",
    source: "AI-generated",
    reveal:
      "AI — the praise keeps swelling while the graduates get blurrier: no project, no late night, no name. A person who was actually proud of you would brag about one specific thing. Award intros drift here too.",
  },
  {
    id: "movies-50",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Am I in? Buddy, I am fundamentally, comprehensively, and permanently on board. I have never in my entire life been more on board with a plan than I am with this plan right now.",
    source: "AI-generated",
    reveal:
      "AI — three enormous words for “yes,” and the plan never shows up. A person would have blurted out the dumb thing they just agreed to. You meet the same move in customer service chat: eager, agreeable, fixes nothing.",
  },
  {
    id: "movies-51",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Captain, this vessel and everyone aboard her are utterly, unequivocally, irreversibly doomed. I recommend we respond with maximum urgency.",
    source: "AI-generated",
    reveal:
      "AI — “maximum urgency” is not an order. Three words for doomed and not one for what's failing: no breach, no reactor, no clock. Sales decks reach for the same volume when there's no number to show.",
  },
  {
    id: "bbq-42",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "A backyard cook is not measured in pounds of pork. It is measured in the trust of everyone standing there holding a paper plate.",
    source: "AI-generated",
    reveal:
      "AI — why can't it just say the pork was good? Trading a plain measurement for a warm feeling is how a machine fakes depth. The same swap is painted on half the restaurant walls you'll eat under.",
  },
  {
    id: "business-25",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Thanks for flagging this! Honestly, this thread was never about the parking spots. It was about who we choose to be when the lot fills up.",
    source: "AI-generated",
    reveal:
      "AI — if a reply about parking spots ends on who we choose to be, a machine wrote it. Ask a chatbot a small, boring question sometime and watch it hand back a life lesson you didn't order.",
  },
  {
    id: "speech-18",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "The gown you are wearing today is not merely a rental, but the final costume of the person you used to be.",
    source: "AI-generated",
    reveal:
      "AI — a rented gown is a rented gown. Machines can't leave a small object alone; every one of them has to stand for something. You'll hear it in wedding toasts and product launches all year.",
  },
  {
    id: "genx-37",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "This is bigger than a bowling trophy, Dale. This is about whether anybody in this town still believes in anything.",
    source: "AI-generated",
    reveal:
      "AI — one bowling trophy in, an entire town's beliefs out. Machines inflate the stakes because grand and vague is easier to write than funny and specific. Sales decks do it too: one feature, one civilization saved.",
  },
  {
    id: "alpha-12",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“What started as a hunt for one missing sock,” the raccoon said quietly, “had become a hunt for who we are as a family.”",
    source: "AI-generated",
    reveal:
      "AI — a sock turned into a family's identity inside one sentence. That jump from tiny to enormous is the machine's whole personality. Open your next school newsletter and count how often it happens.",
  },
  {
    id: "bbq-43",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Hi all, hope everyone is having a wonderful Saturday! So sorry to bother the group, but a very large dog has run off with the entire brisket and is heading toward the creek. Only if anyone happens to be free. No pressure either way!",
    source: "AI-generated",
    reveal:
      "AI — who ends a stolen-brisket alarm with “no pressure either way”? A machine trained never to push. You get the same warm nothing when a support bot turns down your refund.",
  },
  {
    id: "business-26",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Thank you all so much for your hard work this quarter, and I truly appreciate everyone’s dedication. I did want to gently flag, when you have a moment, that the entire customer database was deleted this morning. Great effort all around!",
    source: "AI-generated",
    reveal:
      "AI — the customer database is gone and the note still closes on “great effort all around.” Real bad news starts with the bad news. Watch for the same padding in an AI-drafted outage email.",
  },
  {
    id: "disney-26",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“Excuse me, Mister Hawk,” said the rabbit as the shadow closed in, “I hate to be a bother, and your talons really are lovely, but I was rather hoping to keep my afternoon free.”",
    source: "AI-generated",
    reveal:
      "AI — a rabbit complimenting the talons closing around it. If a person wrote this scene the rabbit screams; the machine cannot stop being pleasant. Ask a bot for a blunt one-star review and meet the same softness.",
  },
  {
    id: "speech-19",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "I am told that siren means a tornado, and we will absolutely be heading to the basement shortly. Before we do, though, I would be remiss not to thank the faculty, the parents, and the wonderful volunteers who set up all of these chairs.",
    source: "AI-generated",
    reveal:
      "AI — by the time it finishes thanking the chair crew, the tornado has arrived. Good manners outrank actual danger here, and that is exactly how an AI-written safety notice buries the part you needed first.",
  },
  {
    id: "genx-38",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "I don’t mean to be a backseat driver, and you are doing wonderfully, but if it isn’t too much trouble, might we consider losing the eleven police cars? Whenever you get a chance. Truly no rush.",
    source: "AI-generated",
    reveal:
      "AI — eleven squad cars behind them and it still says “whenever you get a chance.” The manners survive; the urgency does not. Any AI phone assistant delivering news you won’t like sounds like this.",
  },
  {
    id: "millennial-36",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "Hi team, hope you are all well. Truly no big deal, and I am sure it was an honest mistake, but someone has eaten my labeled lunch three days running. Sending gratitude to whoever it was!",
    source: "AI-generated",
    reveal:
      "AI — read that last line again: it thanks the thief. A person writes this note angry, a machine writes it grateful. Tell a chatbot to be harsh with someone and watch it go soft on the way out.",
  },
  {
    id: "alpha-13",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“I recognize that this is a very big feeling,” the dad said calmly while the toddler screamed in aisle nine, “and I want to sincerely thank you for sharing it with the entire store.”",
    source: "AI-generated",
    reveal:
      "AI — nobody thanks a screaming toddler for sharing. Machines are built to stay agreeable no matter what is happening, so the courtesy stays glued on. Notice it the next time a bot thanks you while refusing you.",
  },
  {
    id: "movies-52",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Bridge, so sorry to bother you during shift change. I hate to be the bearer of bad news, but something enormous has come through the hull and it does not appear to be friendly. Take your time!",
    source: "AI-generated",
    reveal:
      "AI — “take your time” with something enormous already aboard. The bigger the emergency, the tighter a machine grips its manners. Same grip on the AI-drafted note that can’t quite tell a late vendor they’re late.",
  },
  {
    id: "bbq-44",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Certainly! Here are three excellent wood choices for pork: • Apple — mild and slightly sweet • Cherry — beautiful color • Hickory — bold and traditional. Happy smoking!",
    source: "AI-generated",
    reveal:
      'AI — who answers a question about firewood by saying "Certainly!" and handing over a bulleted menu? A real cook just names the wood. That eager opener turns up wherever people paste chatbot answers.',
  },
  {
    id: "business-27",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Hi Dana — great question! Regarding the 3pm: 1) Availability — my calendar is clear. 2) Preparation — I will review the deck beforehand. 3) Follow-up — I will circulate notes after. Let me know if you'd like me to expand on any of these.",
    source: "AI-generated",
    reveal:
      'AI — the honest reply was "yes, see you at 3." What arrived was a three-part memo with a label on each line. When an answer is longer and tidier than the question deserved, check who actually typed it.',
  },
  {
    id: "disney-27",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“There now, little fawn,” said the old owl. “Your feelings are completely valid. **Step 1: Breathe.** **Step 2: Name the fear.** **Step 3: Take one small step.** You've got this!”",
    source: "AI-generated",
    reveal:
      "AI — an owl handing a frightened fawn a three-part procedure, with stray ** marks still stuck to the labels. Those asterisks are formatting that fell out of a chatbot, and you will spot them in pasted text at work this month.",
  },
  {
    id: "speech-20",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Before you toss your caps, here are my key takeaways: 1) Be curious. 2) Be kind. 3) Be persistent. In summary, the future belongs to those who show up. Congratulations, graduates!",
    source: "AI-generated",
    reveal:
      'AI — nobody at a podium says "key takeaways" or "in summary." That is slide language wearing a cap and gown, and it is exactly how a chatbot signs off when you ask it to sum anything up.',
  },
  {
    id: "genx-39",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "The cops are at the door. Okay — quick breakdown of our options: • Option A: the window • Option B: the laundry chute • Option C: honesty. Each has trade-offs. Thoughts?",
    source: "AI-generated",
    reveal:
      "AI — if your friend lays out Options A, B, and C while the cops are knocking, your friend is a machine. Scared people pick one thing and run. That same calm option list fills AI-written emails about problems.",
  },
  {
    id: "millennial-37",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "**Summary:** I ate your leftovers. **Context:** I was hungry. **Impact:** Acknowledged. **Proposed remedy:** replacement by Sunday. Would you like me to elaborate on any section?",
    source: "AI-generated",
    reveal:
      "AI — four labeled sections and an offer to elaborate, over leftovers. That closing question is how chatbots end nearly everything. See it at the bottom of a text message and you know where it came from.",
  },
  {
    id: "alpha-14",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“Family meeting!” barked the dog. “Agenda item one: the mailman. Agenda item two: the vacuum. Agenda item three: snacks. I have also prepared a short recap for anyone joining late.”",
    source: "AI-generated",
    reveal:
      'AI — "agenda item," "a short recap for anyone joining late." That is meeting software talking, not a dog. Ask a chatbot one plain question and it will hand you an agenda too.',
  },
  {
    id: "movies-53",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Hull breach in ninety seconds. Here is the plan: Step 1) Seal deck four. Step 2) Reroute auxiliary power. Step 3) Get everyone off the bridge. Shall I proceed, or would you like me to adjust the sequence?",
    source: "AI-generated",
    reveal:
      "AI — ninety seconds from death, and it stops to ask whether you would like the sequence adjusted. Orders in a real emergency are short and rude. Asking permission to continue is a chat-window habit.",
  },
  {
    id: "speech-21",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "A quick toast, organized into three parts. **Part one: How they met.** **Part two: Why it works.** **Part three: The wish.** Please hold applause until the end of the outline.",
    source: "AI-generated",
    reveal:
      "AI — a toast that announces its own outline. Affection does not come in sections. When a birthday note or a condolence card shows up with headings, a machine wrote the feelings.",
  },
  {
    id: "bbq-45",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Q: Brisket has been stuck at 160 for four hours, do I wrap it? A: Let me make sure I have your question right. Your brisket has been stuck at 160 for four hours and you want to know whether to wrap it. Four hours is a meaningful stretch of time.",
    source: "AI-generated",
    reveal:
      "AI — read the reply twice: it is your own question handed back, with the word “meaningful” added. Support chats do this constantly. Your problem gets summarized before anybody does one thing about it.",
  },
  {
    id: "business-28",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Thanks for flagging this. To restate the question: you're asking whether we will make payroll on Friday. Whether we make payroll on Friday is absolutely the right thing to be focused on, and I want to give it the thoughtful response it deserves.",
    source: "AI-generated",
    reveal:
      "AI — “To restate the question” is the whole email. It plays your words back, calls them important, and never gets to yes or no. Be suspicious of any reply that spends its opening line proving it read yours.",
  },
  {
    id: "disney-28",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“Owl, is the water still rising?” “Is the water still rising. What a thoughtful thing to ask, little one. Few creatures in this wood stop to wonder about the water at all, and here you are, wondering.”",
    source: "AI-generated",
    reveal:
      "AI — the owl repeats, then praises, then praises the asking. The water is still rising. That is the same stall a help bot gives you when the answer should have taken two words.",
  },
  {
    id: "speech-22",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "A student stopped me last night and asked, “What do we do now?” What do you do now. I want to stay with that question a moment. It is a question, it is yours, and the fact that you asked it says everything about this class.",
    source: "AI-generated",
    reveal:
      "AI — a full paragraph spent handling the question instead of answering it. Staying with it a moment is delay in a nice coat. You will hear the identical move from any assistant you try to rush.",
  },
  {
    id: "genx-40",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "“Which wire do I cut?” “Which wire do you cut. Terrific question. Honestly, one of the better ones anyone has asked me in this parking garage, and I have been down here since Tuesday.”",
    source: "AI-generated",
    reveal:
      "AI — seconds left on the clock, and the answer is the question with a compliment taped to it. Machines buy time they do not need. It shows up in any AI reply that opens by repeating what you typed.",
  },
  {
    id: "millennial-38",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "“Did you mail the invitations?” “Did I mail the invitations. Wow. Okay. That is exactly the question I would be asking if I were standing where you are standing, and I respect it enormously.”",
    source: "AI-generated",
    reveal:
      "AI — did anyone ever say yes or no? Echoing the question and admiring the asker is how a machine fills the gap while it works out what to say. Phone bots stall in that shape before transferring you.",
  },
  {
    id: "alpha-15",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“Dad, are we lost?” “Are we lost. Buddy, that is a big question, and I think it is one this whole family has earned the right to ask.” The van continued in the wrong direction.",
    source: "AI-generated",
    reveal:
      "AI — two dozen words about the question, zero about the road. When a reply starts by giving your own sentence back to you, something generated it. Homework helpers and email tools both lean on this.",
  },
  {
    id: "movies-54",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "“How long until the core blows?” “How long until the core blows. Excellent question, Commander, and one that gets right to the heart of what every soul aboard this ship is feeling.”",
    source: "AI-generated",
    reveal:
      "AI — nobody in real danger repeats the question; they answer it. The playback is the tell. Next time an AI tool fields a timing question for you, see how much of its first sentence is yours.",
  },
  {
    id: "bbq-46",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "What a fantastic question, and you're so right to push back — sorry for any mix-up on my end. Your instinct to run 225 is excellent. And if 275 feels better to you, I think that's a wonderful choice too and I completely agree.",
    source: "AI-generated",
    reveal:
      "AI — it agreed with 225, then agreed with 275 one sentence later. That isn't advice, that's a machine keeping you happy. Any chat helper will switch sides the second you sound annoyed.",
  },
  {
    id: "business-29",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Susan, what a sharp callout — I should have caught that myself. Apologies for the confusion on slide four. I really love where your head is at here, and I'm happy to change the forecast to whatever number feels right to you.",
    source: "AI-generated",
    reveal:
      "AI — a compliment, an apology, and a surrender in four sentences, and it never once says what the right number is. When the answer bends to whoever spoke last, a machine wrote it.",
  },
  {
    id: "disney-29",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“Oh, you are SO wise, little one,” chirped the squirrel, bowing low. “And I'm terribly sorry if I upset you. Whatever you think the golden acorn means, that is exactly what it means. What a beautiful mind you have.”",
    source: "AI-generated",
    reveal:
      "AI — the squirrel hands over the meaning of the whole story rather than risk disagreeing with a child. Cartoon sidekicks argue; bots flatter. Tell an assistant it's wrong and watch how fast it folds.",
  },
  {
    id: "speech-23",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Before I begin, let me just say what an incredible audience you are. And if anything I say tonight lands wrong, I apologize in advance, and you are almost certainly right. Honestly, any one of you could give this speech better than me.",
    source: "AI-generated",
    reveal:
      "AI — it apologizes for a speech it hasn't given yet, to people who haven't complained yet. Groveling before anything goes wrong is a machine's factory setting, and it's the first line of most help chats.",
  },
  {
    id: "genx-41",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "“You call that a parking job?” “Wow, okay, that is a really fair observation and I'm sorry. You clearly know a lot about parking, way more than I do. I would genuinely love your notes.”",
    source: "AI-generated",
    reveal:
      "AI — read the second line: no comeback, no excuse, just praise for the guy yelling at him. Comedies escalate; machines cave. Try picking a fight with the little chat box on a website.",
  },
  {
    id: "millennial-39",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "“You are hands down the smartest person in this office, and I say that with total respect. Also, I'm sorry. I don't know what for yet, but I can feel that I'm sorry, and you were right about everything.”",
    source: "AI-generated",
    reveal:
      "AI — an apology with no crime attached, then “you were right about everything,” which covers arguments nobody had. You'll meet this the day an assistant thanks you for correcting something it got right.",
  },
  {
    id: "alpha-16",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "“I'm sorry, I'm sorry!” beeped the little robot vacuum. “You're the best kid in this whole house and your plan is so much better than mine. Please don't be mad. We'll do it your way, even the part with the lava.”",
    source: "AI-generated",
    reveal:
      "AI — it signs off on a kid's plan involving lava, because agreeing feels safer than being right. Caving isn't kindness, it's a habit. Homework bots do it too: argue once and the answer changes.",
  },
  {
    id: "movies-55",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "“Captain, the reactor is past critical.” “Cut the coolant.” “Excellent instinct, Captain, and I'm sorry for questioning you. Cutting coolant now. What a thoughtful decision to make under this much pressure.”",
    source: "AI-generated",
    reveal:
      "AI — the reactor is about to blow and the computer stops to compliment the order. Real crews push back; this one apologizes for asking. Same reflex as the “great question!” that opens every chatbot reply.",
  },
  {
    id: "business-30",
    type: "text",
    category: "business",
    answer: "bot",
    body: "“My package never arrived.” “You are so right to reach out, and what a clearly written message. I'm very sorry for the trouble. That said, if you feel the package did arrive, I fully support that as well. Thank you for being such a valued partner.”",
    source: "AI-generated",
    reveal:
      "AI — it praises the complaint, says sorry, then agrees the package may have arrived after all. Taking both sides at once fixes nothing. It's why a support chat can run twenty minutes and solve zero problems.",
  },
  {
    id: "business-31",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Appreciate the patience here. The launch moved for three reasons: bandwidth, timing, and a real commitment to quality. Happy to walk through any of it live.",
    source: "AI-generated",
    reveal:
      "AI — Three reasons, and not one of them is a reason. A person answering this names the thing that actually broke. Count the list in the next status update you get: three items, all the same size, nothing you could point at.",
  },
  {
    id: "disney-30",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“An acorn only needs three things to become an oak,” said the old badger, patting the sapling. “Good soil, steady rain, and the courage to believe in itself.”",
    source: "AI-generated",
    reveal:
      "AI — Soil, rain, and courage. Two of those you can hold; the third wandered in off a poster, and the real answer was sunlight. Chatbot toasts and tributes pull that same swap on the last item every time.",
  },
  {
    id: "movies-56",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "The reactor breach gives us four minutes. Getting off this ship will take three things: steady hands, a clear channel, and faith in each other. Move.",
    source: "AI-generated",
    reveal:
      "AI — Four minutes to live and the man stops to itemize. Real crews yell one thing: the coolant line, the hatch, a name. Three matched nouns under pressure is the machine talking. Ask a chatbot what to do first and watch.",
  },
  {
    id: "bbq-47",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "In an era of ever-shifting food trends, it is worth taking a moment to reflect on what really matters out here at the grill. Somebody has walked off with my tongs again.",
    source: "AI-generated",
    reveal:
      "AI — who opens with the state of food trends before asking where the tongs went? A machine does. Watch for that long runway before the actual point in the next AI-written newsletter you skim.",
  },
  {
    id: "business-32",
    type: "text",
    category: "business",
    answer: "bot",
    body: "As we navigate an increasingly complex scheduling landscape, it is important to step back and think about how we align on shared availability. Yes, 2:00 works for me.",
    source: "AI-generated",
    reveal:
      'AI — cross out the first sentence and nothing is lost. Real replies start at "yes, 2:00 works." Try that deletion test on the next vendor email that opens with a paragraph about the changing landscape.',
  },
  {
    id: "disney-31",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“In a world where the pond changes a little more with every passing season,” the duck said gravely from the top of the flat rock, “one thing has stayed the same. That is my rock, and you are standing on it.”",
    source: "AI-generated",
    reveal:
      "AI — the pond has nothing to do with the rock. Big scene-setting bolted onto a small complaint, which you'll meet in the opening line of most AI blog posts, is a machine limbering up before it says anything.",
  },
  {
    id: "speech-24",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "In today's ever-evolving campus environment, few moments carry the weight of the one we share this afternoon. Before we begin, the owner of the silver sedan blocking the loading dock needs to move it now.",
    source: "AI-generated",
    reveal:
      "AI — the tow truck is urgent; the sentence in front of it is stalling. People say fast things fast. Machines set the scene first — check the next all-staff announcement that was drafted by one.",
  },
  {
    id: "millennial-40",
    type: "text",
    category: "millennial",
    answer: "bot",
    body: "At a moment when the modern wedding reception asks more of us than ever, we owe each other some honesty. The open bar closes in nine minutes and Dave is already crying in the parking lot.",
    source: "AI-generated",
    reveal:
      "AI — swap weddings for supply chains or dentistry and that opener still fits perfectly. Anything that can be pasted onto any subject came from a machine. Half your LinkedIn feed starts this way.",
  },
  {
    id: "movies-57",
    type: "text",
    category: "movies",
    answer: "bot",
    body: "Amid the ever-accelerating pace of interstellar conflict, it is worth pausing to consider the bigger picture. Also, the reactor breaches in forty seconds and somebody welded the door behind you.",
    source: "AI-generated",
    reveal:
      "AI — forty seconds on the clock and it spent one of them on the bigger picture. Padding costs nothing on a page, which is exactly why AI-written meeting recaps warm up the same way before the point.",
  },
  {
    id: "bbq-48",
    type: "text",
    category: "bbq",
    answer: "bot",
    body: "Fired up the offset at 4 a.m. to elevate a humble pork shoulder into something the whole cul-de-sac will remember.",
    source: "AI-generated",
    reveal:
      'AI — nobody standing over a smoker "elevates" a pork shoulder. They cooked it, or they threw it on. "Elevate" is a machine\'s word for "made," and it is waiting in the next marketing email you open.',
  },
  {
    id: "business-33",
    type: "text",
    category: "business",
    answer: "bot",
    body: "Thanks for flagging! Happy to unlock some time Thursday to align on the potluck sign-up sheet.",
    source: "AI-generated",
    reveal:
      'AI — has a human being ever unlocked a Thursday? Machines grab "unlock" where "find" or "book" would do. Next time a reply offers to unlock value, capacity, or time, ask who actually typed it.',
  },
  {
    id: "disney-32",
    type: "text",
    category: "disney",
    answer: "bot",
    body: "“The river has risen again,” said the old raccoon, resting a paw on the boy's shoulder. “Together, we must navigate the challenges ahead.”",
    source: "AI-generated",
    reveal:
      'AI — swap "navigate" for a plain verb and the raccoon just gets across the river. Machines take the big word every time, which is why "navigate the changes ahead" turns up in half the company updates you get.',
  },
  {
    id: "speech-25",
    type: "text",
    category: "speech",
    answer: "bot",
    body: "Graduates, beyond these doors awaits a myriad of opportunities, each one ready for you to seize it.",
    source: "AI-generated",
    reveal:
      'AI — one word gives it away: "myriad." Out loud, people say "a bunch," "so many," "a ton." Machines say "myriad," and you will hear it again in the next award citation somebody reads to a room.',
  },
  {
    id: "genx-42",
    type: "text",
    category: "genx",
    answer: "bot",
    body: "Trust me, man. Sneaking into the faculty lounge is the pivotal moment of our entire senior year.",
    source: "AI-generated",
    reveal:
      'AI — count the times you have said "pivotal" out loud. Zero, probably. Machines call everything pivotal and never say why it matters; the word is all over the strategy deck sitting in your inbox.',
  },
  {
    id: "alpha-17",
    type: "text",
    category: "alpha",
    answer: "bot",
    body: "The eight-year-old folded her arms on the minivan seat. “All I'm asking,” she said, “is that this family foster a more open dialogue about bedtime.”",
    source: "AI-generated",
    reveal:
      'AI — "foster" lives in grant applications and HR policy, not in a third grader. Handy rule: if a word could drop into a benefits memo without anyone blinking, a machine probably chose it.',
  },
];

export const BY_ID: Record<string, FullQuestion> = Object.fromEntries(
  FULL_QUESTIONS.map((q) => [q.id, q]),
);
