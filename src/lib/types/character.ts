export interface V20DarkAgesCharacter {
  id: string;
  name: string;
  player?: string;
  chronicle?: string;

  // Core Identity (Dark Ages flavor)
  clan: string;
  generation: number;
  sire?: string;
  road: string;                    // e.g. "Road of Heaven", "Road of Chivalry", "Road of the Beast"
  roadRating: number;
  nature: string;
  demeanor: string;
  concept?: string;
  embraceYear?: number;

  // Attributes (standard 9)
  attributes: {
    physical: {
      strength: number;
      dexterity: number;
      stamina: number;
    };
    social: {
      charisma: number;
      manipulation: number;
      appearance: number;
    };
    mental: {
      perception: number;
      intelligence: number;
      wits: number;
    };
  };

  // Abilities – Dark Ages specific categories
  abilities: {
    talents: Record<string, number>;     // Alertness, Athletics, Brawl, Empathy, Intimidation, Leadership...
    skills: Record<string, number>;      // Archery, Crafts, Melee, Ride, Stealth, Survival...
    knowledges: Record<string, number>;  // Academics, Investigation, Occult, Theology, Law...
  };

  // Disciplines (e.g. Potence, Animalism, Auspex, Presence, etc.)
  disciplines: Record<string, number>;

  // Backgrounds
  backgrounds: Record<string, number>;   // Herd, Retainers, Resources, Domain, etc.

  // Virtues (Dark Ages uses 3)
  virtues: {
    conscienceOrConviction: number;
    selfControlOrInstinct: number;
    courage: number;
  };

  // Core Pools
  willpower: { current: number; max: number };
  bloodPool: { current: number; max: number };

  // Health & Status
  health: string; // "Healthy", "Bruised", "Injured", "Wounded", "Mauled", "Crippled", "Incapacitated"

  // Experience
  experience: number;
  spentExperience: number;

  // Extras
  notes?: string;
  meritsAndFlaws?: Array<{ name: string; points: number; type: 'merit' | 'flaw' }>;
  inventory?: string[];
  createdAt: string;
  updatedAt: string;
}

// Helpful type for dropdowns later
export type ClanName =
  | "Assamite" | "Brujah" | "Cappadocian" | "Gangrel"
  | "Lasombra" | "Malkavian" | "Nosferatu" | "Ravnos"
  | "Salubri" | "Toreador" | "Tremere" | "Tzimisce" | "Ventrue";