// Random two-word BBQ team-name generator. Used by the Join screen for the
// "🎲" button and as the fallback when someone joins without typing a name.

const FIRST = [
  "Smoky",
  "Charred",
  "Sizzlin",
  "Saucy",
  "Flamin",
  "Hickory",
  "Mesquite",
  "Smokin",
  "Spicy",
  "Tangy",
  "Crispy",
  "Juicy",
  "Burnt",
  "Glazed",
  "Sticky",
  "Peppered",
  "Blazin",
  "Fired",
  "Low-n-Slow",
  "Brined",
];

const SECOND = [
  "Brisket",
  "Ribs",
  "Embers",
  "Pitmasters",
  "Smokers",
  "Coals",
  "Hogs",
  "Racks",
  "Flames",
  "Drumsticks",
  "Pellets",
  "Chops",
  "Wings",
  "Bark",
  "Rubs",
  "Grillers",
  "Butts",
  "Brisketeers",
  "Pits",
  "Snouts",
];

/** A random two-word BBQ team name, e.g. "Smoky Brisketeers". rng injectable for tests. */
export function randomTeamName(rand: () => number = Math.random): string {
  const a = FIRST[Math.floor(rand() * FIRST.length)];
  const b = SECOND[Math.floor(rand() * SECOND.length)];
  return `${a} ${b}`;
}
