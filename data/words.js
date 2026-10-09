window.DET_DATA = window.DET_DATA || {};

// Read and Select. real: level = rarity of the word. fake: level = how deceptive the invented word is.
window.DET_DATA.words = {
  real: [
    // ---------- Level 2 (B1) ----------
    { w: "harvest", level: 2 }, { w: "kitchen", level: 2 }, { w: "bridge", level: 2 }, { w: "travel", level: 2 },
    { w: "market", level: 2 }, { w: "pocket", level: 2 }, { w: "weather", level: 2 }, { w: "farmer", level: 2 },
    { w: "mountain", level: 2 }, { w: "picture", level: 2 }, { w: "village", level: 2 }, { w: "holiday", level: 2 },
    { w: "blanket", level: 2 }, { w: "journey", level: 2 }, { w: "quiet", level: 2 }, { w: "bottle", level: 2 },
    { w: "answer", level: 2 }, { w: "forest", level: 2 }, { w: "mirror", level: 2 }, { w: "ticket", level: 2 },
    { w: "candle", level: 2 }, { w: "gentle", level: 2 }, { w: "borrow", level: 2 }, { w: "shoulder", level: 2 },

    // ---------- Level 3 (B2) ----------
    { w: "ancient", level: 3 }, { w: "benefit", level: 3 }, { w: "curious", level: 3 }, { w: "deliver", level: 3 },
    { w: "entire", level: 3 }, { w: "frequent", level: 3 }, { w: "generous", level: 3 }, { w: "hesitate", level: 3 },
    { w: "increase", level: 3 }, { w: "jealous", level: 3 }, { w: "landscape", level: 3 }, { w: "maintain", level: 3 },
    { w: "obvious", level: 3 }, { w: "persuade", level: 3 }, { w: "quantity", level: 3 }, { w: "reliable", level: 3 },
    { w: "schedule", level: 3 }, { w: "temporary", level: 3 }, { w: "valuable", level: 3 }, { w: "wander", level: 3 },
    { w: "abandon", level: 3 }, { w: "courage", level: 3 }, { w: "definite", level: 3 }, { w: "glimpse", level: 3 },

    // ---------- Level 4 (C1) ----------
    { w: "ambiguous", level: 4 }, { w: "coherent", level: 4 }, { w: "deteriorate", level: 4 }, { w: "eloquent", level: 4 },
    { w: "feasible", level: 4 }, { w: "hinder", level: 4 }, { w: "inevitable", level: 4 }, { w: "legitimate", level: 4 },
    { w: "notorious", level: 4 }, { w: "obsolete", level: 4 }, { w: "plausible", level: 4 }, { w: "reluctant", level: 4 },
    { w: "scrutiny", level: 4 }, { w: "tangible", level: 4 }, { w: "unanimous", level: 4 }, { w: "vulnerable", level: 4 },
    { w: "advocate", level: 4 }, { w: "contemplate", level: 4 }, { w: "diminish", level: 4 }, { w: "fluctuate", level: 4 },
    { w: "intricate", level: 4 }, { w: "lucrative", level: 4 }, { w: "negligible", level: 4 }, { w: "resilient", level: 4 },

    // ---------- Level 5 (C2) ----------
    { w: "ephemeral", level: 5 }, { w: "obfuscate", level: 5 }, { w: "perfunctory", level: 5 }, { w: "recalcitrant", level: 5 },
    { w: "sycophant", level: 5 }, { w: "ubiquitous", level: 5 }, { w: "vicissitude", level: 5 }, { w: "abstruse", level: 5 },
    { w: "bellicose", level: 5 }, { w: "capricious", level: 5 }, { w: "deleterious", level: 5 }, { w: "equivocate", level: 5 },
    { w: "fastidious", level: 5 }, { w: "garrulous", level: 5 }, { w: "harangue", level: 5 }, { w: "iconoclast", level: 5 },
    { w: "laconic", level: 5 }, { w: "mendacious", level: 5 }, { w: "obsequious", level: 5 }, { w: "parsimony", level: 5 },
    { w: "quixotic", level: 5 }, { w: "truculent", level: 5 }, { w: "taciturn", level: 5 }, { w: "lugubrious", level: 5 }
  ],
  fake: [
    // ---------- Level 2 (easy to reject) ----------
    { w: "glonder", level: 2 }, { w: "trasket", level: 2 }, { w: "morrip", level: 2 }, { w: "drobbin", level: 2 },
    { w: "tarmel", level: 2 }, { w: "brindow", level: 2 }, { w: "lantick", level: 2 }, { w: "bramick", level: 2 },
    { w: "skittern", level: 2 }, { w: "crendle", level: 2 }, { w: "windrel", level: 2 }, { w: "darple", level: 2 },
    { w: "plazzle", level: 2 }, { w: "clanter", level: 2 }, { w: "brinter", level: 2 }, { w: "tramble", level: 2 },
    { w: "throddle", level: 2 }, { w: "chimber", level: 2 }, { w: "villow", level: 2 }, { w: "weathen", level: 2 },
    { w: "nostle", level: 2 }, { w: "fluddle", level: 2 }, { w: "mirral", level: 2 }, { w: "candow", level: 2 },

    // ---------- Level 3 ----------
    { w: "frintage", level: 3 }, { w: "calbrous", level: 3 }, { w: "pontuous", level: 3 }, { w: "harnible", level: 3 },
    { w: "brastic", level: 3 }, { w: "stralent", level: 3 }, { w: "cravity", level: 3 }, { w: "dolerant", level: 3 },
    { w: "jostive", level: 3 }, { w: "grantical", level: 3 }, { w: "nurtive", level: 3 }, { w: "toberant", level: 3 },
    { w: "lunderous", level: 3 }, { w: "splendic", level: 3 }, { w: "hesident", level: 3 }, { w: "murgent", level: 3 },
    { w: "pragment", level: 3 }, { w: "inquent", level: 3 }, { w: "abrance", level: 3 }, { w: "convade", level: 3 },
    { w: "falorous", level: 3 }, { w: "combrage", level: 3 }, { w: "plentive", level: 3 }, { w: "wistrel", level: 3 },

    // ---------- Level 4 ----------
    { w: "percolent", level: 4 }, { w: "condurate", level: 4 }, { w: "redolate", level: 4 }, { w: "transmend", level: 4 },
    { w: "proficate", level: 4 }, { w: "ambivate", level: 4 }, { w: "contrigent", level: 4 }, { w: "obliverate", level: 4 },
    { w: "conspicate", level: 4 }, { w: "fortuitive", level: 4 }, { w: "requisant", level: 4 }, { w: "distenuate", level: 4 },
    { w: "corrobulate", level: 4 }, { w: "salubrate", level: 4 }, { w: "deliterate", level: 4 }, { w: "tractulent", level: 4 },
    { w: "exhoriate", level: 4 }, { w: "derogent", level: 4 }, { w: "abstinous", level: 4 }, { w: "contumate", level: 4 },
    { w: "transipient", level: 4 }, { w: "convulgent", level: 4 }, { w: "exculpent", level: 4 }, { w: "stipulent", level: 4 },

    // ---------- Level 5 (looks like a real academic word) ----------
    { w: "cognitation", level: 5 }, { w: "demonstrive", level: 5 }, { w: "empirative", level: 5 }, { w: "prevalation", level: 5 },
    { w: "redundative", level: 5 }, { w: "plausitive", level: 5 }, { w: "inferention", level: 5 }, { w: "theoretive", level: 5 },
    { w: "predomitant", level: 5 }, { w: "detrimential", level: 5 }, { w: "prelimitary", level: 5 }, { w: "fluctulate", level: 5 },
    { w: "tentatious", level: 5 }, { w: "lucratious", level: 5 }, { w: "meticulate", level: 5 }, { w: "diligious", level: 5 },
    { w: "ascertive", level: 5 }, { w: "intrinsive", level: 5 }, { w: "ambigulous", level: 5 }, { w: "equivalous", level: 5 },
    { w: "qualitation", level: 5 }, { w: "hypothetive", level: 5 }, { w: "subsidient", level: 5 }, { w: "perennious", level: 5 }
  ]
};
