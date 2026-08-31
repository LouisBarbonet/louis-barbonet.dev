export type Lang = 'en' | 'fr';

export interface LogEntry {
  when: string;
  datetime: string;
  org: string;
  pillLabel: string;
  pillTone: 'active' | 'progress' | 'done';
  role: string;
}

export interface Copy {
  nav: {
    brand: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    sub: string;
    cta: string;
  };
  intro: {
    quotes: string[];
    skip: string;
  };
  about: {
    p1: string;
    p2: string;
    offdutyLabel: string;
    offdutyLine: string;
    chips: { key: string; label: string }[];
  };
  projects: {
    heading: string;
    tag: string;
    coffee: {
      name: string;
      desc: string;
      liveSite: string;
      repository: string;
      stackLabel: string;
      stack: string[];
      deployLabel: string;
      deploy: string[];
      infraLabel: string;
      infra: string[];
      infraNote: string;
    };
    museum: {
      teamLine: string;
      name: string;
      desc: string;
      privateFlag: string;
      stackLabel: string;
      stack: string[];
      modelsLabel: string;
      models: string[];
      resultLabel: string;
      resultStat: string;
      resultNote: string;
      flipStat: string;
      flipTag: string;
      flipHint: string;
    };
  };
  experience: {
    heading: string;
    tag: string;
    entries: LogEntry[];
  };
  dock: {
    self: string;
    idle: string;
    engaged: string;
    sections: Record<'about' | 'projects' | 'experience', string>;
  };
  footer: {
    eyebrow: string;
    headline: string;
    sub: string;
    reachOut: string;
    copyright: string;
    navAbout: string;
    navProjects: string;
    navExperience: string;
  };
  toast: {
    accessGranted: string;
    emailCopied: string;
  };
}

const en: Copy = {
  nav: { brand: 'L. Barbonet' },
  hero: {
    eyebrow: 'Software Developer · Montréal',
    name: 'Louis\nBarbonet',
    sub: 'Full-stack developer at SRAM. Formerly at Evident Scientific, building aerospace inspection software. Completing an MSc in AI at Université Laval.',
    cta: 'Reach Out',
  },
  intro: {
    quotes: [
      'Compiling personality.',
      "Fetching dependencies you didn't ask for.",
      'Linking against your patience.',
      'Zero errors, several warnings.',
    ],
    skip: 'Click to skip',
  },
  about: {
    p1: 'I build production software professionally at SRAM, and previously spent a summer at Evident Scientific writing frontend code for mission-critical aerospace and wind-energy inspection tools.',
    p2: "I'm currently completing a Master's in Computer Science at Université Laval, focused on AI and machine learning. My coursework and current projects both sit in that space, alongside the systems work below.",
    offdutyLabel: 'Off the clock',
    offdutyLine:
      'Training for a half-marathon, playing soccer and volleyball with friends, losing steadily at ping-pong, and always up for board games.',
    chips: [
      { key: 'run', label: 'Half-Marathon' },
      { key: 'soccer', label: 'Soccer' },
      { key: 'volley', label: 'Volleyball' },
      { key: 'pp', label: 'Ping-Pong (hehe)' },
      { key: 'board', label: 'Board Games' },
    ],
  },
  projects: {
    heading: 'Projects',
    tag: 'Case studies, not screenshots only',
    coffee: {
      name: 'CoffeeExplorer',
      desc: 'A shared coffee-shop discovery and ratings log, built for daily use and deployed to a self-managed Oracle Cloud instance with an automated pipeline on every push to main.',
      liveSite: 'Live Site',
      repository: 'Repository',
      stackLabel: 'Stack',
      stack: ['TypeScript', 'NestJS + Prisma', 'React'],
      deployLabel: 'Deployment',
      deploy: ['Docker (dev + prod)', 'GitHub Actions', 'GHCR images'],
      infraLabel: 'Infrastructure',
      infra: ['Oracle Cloud VM', 'Nginx reverse proxy', 'TLS'],
      infraNote: 'Same free-tier setup this site will run on.',
    },
    museum: {
      teamLine: 'Team "You’re Absolutely Right!" · COMP6721 · Summer 2026',
      name: 'Museum Scene Classifier',
      desc: 'A two-phase computer vision project classifying museum photography as indoor or outdoor: classical machine learning first, then a custom CNN and a fine-tuned ResNet-18, trained on 12,340 MIT Places museum images.',
      privateFlag: 'Private repository · team of 3',
      stackLabel: 'Stack',
      stack: ['PyTorch', 'Scikit-learn', 'OpenCV'],
      modelsLabel: 'Models compared',
      models: ['Gradient Boosting', 'Custom CNN (VGG-style)', 'ResNet-18 (fine-tuned)'],
      resultLabel: 'Best result',
      resultStat: '98.3%',
      resultNote:
        'Test accuracy, fine-tuned ResNet-18. +7.6 points over the best classical model (Gradient Boosting, 90.7%).',
      flipStat: '26/1,500',
      flipTag: 'Misclassified',
      flipHint: 'Hover the number →',
    },
  },
  experience: {
    heading: 'Experience & Education',
    tag: 'Reverse chronological',
    entries: [
      {
        when: '2022 — Now',
        datetime: '2022',
        org: 'SRAM',
        pillLabel: 'Active',
        pillTone: 'active',
        role: "Software / Web Developer. Modernized a legacy codebase, shipped 2FA across the company's web applications, contributed to a site relaunch.",
      },
      {
        when: 'May — Aug 2025',
        datetime: '2025-05',
        org: 'Evident Scientific (Wabtec)',
        pillLabel: 'Complete',
        pillTone: 'done',
        role: 'Frontend Web Developer Intern. Mission-critical NDT software for aerospace and wind-energy testing, packaged with Electron for embedded deployment.',
      },
      {
        when: '2027 (expected)',
        datetime: '2027',
        org: 'Université Laval',
        pillLabel: 'In Progress',
        pillTone: 'progress',
        role: 'MSc, Computer Science. Focused on AI and machine learning, symbolic AI, and natural language processing.',
      },
      {
        when: '2025',
        datetime: '2025',
        org: 'Université Laval',
        pillLabel: 'Complete',
        pillTone: 'done',
        role: 'BSc, Computer Science, minor in Information Security.',
      },
      {
        when: '2021',
        datetime: '2021',
        org: 'Cégep du Vieux-Montréal',
        pillLabel: 'Complete',
        pillTone: 'done',
        role: "Completed a DEC in Computer Science. Founded the college's cybersecurity club. Competed at the NorthSec CTF.",
      },
    ],
  },
  dock: {
    self: 'Self-portrait (placeholder)',
    idle: 'Idle',
    engaged: 'Engaged',
    sections: { about: 'About', projects: 'Projects', experience: 'Experience' },
  },
  footer: {
    eyebrow: 'Open to Opportunities',
    headline: "Let's Talk",
    sub: "The fastest way to reach me is by email or LinkedIn. I'll get back to you fast!",
    reachOut: 'Reach Out',
    copyright: '© 2026 Louis Barbonet',
    navAbout: 'About',
    navProjects: 'Projects',
    navExperience: 'Experience',
  },
  toast: {
    accessGranted: 'Access granted.',
    emailCopied: 'Email copied.',
  },
};

const fr: Copy = {
  nav: { brand: 'L. Barbonet' },
  hero: {
    eyebrow: 'Développeur logiciel · Montréal',
    name: 'Louis\nBarbonet',
    sub: "Développeur full-stack au SRAM. Auparavant chez Evident Scientific, sur des logiciels d'inspection aérospatiale. Termine une maîtrise en IA à l'Université Laval.",
    cta: 'Me Contacter',
  },
  intro: {
    quotes: [
      'Compilation du karma.',
      "Le café n'est toujours pas un port ouvert.",
      'Résolution des dépendances émotionnelles.',
      'Aucune erreur, ce qui est louche.',
    ],
    skip: 'Cliquez pour passer',
  },
  about: {
    p1: "Je construis des logiciels en production au SRAM, et j'ai passé un été chez Evident Scientific à développer le frontend d'outils d'inspection critiques pour l'aérospatiale et l'énergie éolienne.",
    p2: "Je termine actuellement une maîtrise en informatique à l'Université Laval, axée sur l'IA et l'apprentissage automatique. Mes cours et mes projets actuels s'inscrivent dans ce domaine, en plus des systèmes présentés ci-dessous.",
    offdutyLabel: 'En dehors du travail',
    offdutyLine:
      'Entraînement pour un semi-marathon, soccer et volleyball entre amis, une défaite constante au ping-pong, et toujours partant pour les jeux de société.',
    chips: [
      { key: 'run', label: 'Semi-marathon' },
      { key: 'soccer', label: 'Soccer' },
      { key: 'volley', label: 'Volleyball' },
      { key: 'pp', label: 'Ping-pong (hehe)' },
      { key: 'board', label: 'Jeux de société' },
    ],
  },
  projects: {
    heading: 'Projets',
    tag: "Études de cas, pas seulement des captures",
    coffee: {
      name: 'CoffeeExplorer',
      desc: "Un carnet de découverte et de notation de cafés à usage partagé, déployé sur une instance Oracle Cloud autogérée avec un pipeline automatisé à chaque envoi sur main.",
      liveSite: 'Site en direct',
      repository: 'Dépôt',
      stackLabel: 'Pile technique',
      stack: ['TypeScript', 'NestJS + Prisma', 'React'],
      deployLabel: 'Déploiement',
      deploy: ['Docker (dev + prod)', 'GitHub Actions', 'Images GHCR'],
      infraLabel: 'Infrastructure',
      infra: ['VM Oracle Cloud', 'Proxy inverse Nginx', 'TLS'],
      infraNote: 'La même offre gratuite qui hébergera ce site.',
    },
    museum: {
      teamLine: 'Équipe « You’re Absolutely Right! » · COMP6721 · Été 2026',
      name: 'Museum Scene Classifier',
      desc: "Un projet de vision par ordinateur en deux phases, classifiant des photos de musées comme intérieures ou extérieures : apprentissage automatique classique d'abord, puis un CNN personnalisé et un ResNet-18 affiné, entraînés sur 12 340 images du jeu de données MIT Places.",
      privateFlag: 'Équipe de 3 · Dépôt privé',
      stackLabel: 'Pile technique',
      stack: ['PyTorch', 'Scikit-learn', 'OpenCV'],
      modelsLabel: 'Modèles comparés',
      models: ['Gradient Boosting', 'CNN personnalisé (style VGG)', 'ResNet-18 (affiné)'],
      resultLabel: 'Meilleur résultat',
      resultStat: '98,3 %',
      resultNote:
        "Précision en test, ResNet-18 affiné. +7,6 points par rapport au meilleur modèle classique (Gradient Boosting, 90,7 %).",
      flipStat: '26/1 500',
      flipTag: 'Mal classées',
      flipHint: 'Survolez le chiffre →',
    },
  },
  experience: {
    heading: 'Expérience et formation',
    tag: 'Ordre antéchronologique',
    entries: [
      {
        when: "2022 — Aujourd'hui",
        datetime: '2022',
        org: 'SRAM',
        pillLabel: 'Actif',
        pillTone: 'active',
        role: "Développeur logiciel / web. Modernisation d'une base de code existante, déploiement du 2FA sur les applications web de l'entreprise, contribution à une refonte du site.",
      },
      {
        when: 'Mai — Août 2025',
        datetime: '2025-05',
        org: 'Evident Scientific (Wabtec)',
        pillLabel: 'Terminé',
        pillTone: 'done',
        role: "Stagiaire, développement frontend. Logiciel d'inspection critique pour l'aérospatiale et l'énergie éolienne, empaqueté avec Electron pour un déploiement embarqué.",
      },
      {
        when: '2027 (prévu)',
        datetime: '2027',
        org: 'Université Laval',
        pillLabel: 'En cours',
        pillTone: 'progress',
        role: "Maîtrise en informatique. Axée sur l'IA et l'apprentissage automatique, l'IA symbolique et le traitement du langage naturel.",
      },
      {
        when: '2025',
        datetime: '2025',
        org: 'Université Laval',
        pillLabel: 'Terminé',
        pillTone: 'done',
        role: 'Baccalauréat en informatique, mineure en sécurité de l’information.',
      },
      {
        when: '2021',
        datetime: '2021',
        org: 'Cégep du Vieux-Montréal',
        pillLabel: 'Terminé',
        pillTone: 'done',
        role: "DEC en informatique complété. Fondateur du club de cybersécurité du collège. Participation au CTF NorthSec.",
      },
    ],
  },
  dock: {
    self: 'Autoportrait (provisoire)',
    idle: 'Inactif',
    engaged: 'Actif',
    sections: { about: 'À propos', projects: 'Projets', experience: 'Expérience' },
  },
  footer: {
    eyebrow: 'Ouvert aux opportunités',
    headline: 'Restons en contact',
    sub: "Le plus rapide pour me joindre, c'est par courriel ou sur LinkedIn.",
    reachOut: 'Me Contacter',
    copyright: '© 2026 Louis Barbonet',
    navAbout: 'À propos',
    navProjects: 'Projets',
    navExperience: 'Expérience',
  },
  toast: {
    accessGranted: 'Accès accordé.',
    emailCopied: 'Courriel copié.',
  },
};

export const copy: Record<Lang, Copy> = { en, fr };

export const CONTACT_EMAIL = 'louis.barbonet@gmail.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/louis-barbonet-31328a296';
export const GITHUB_COFFEE_URL = 'https://github.com/LouisBarbonet/CoffeeExplorer';
export const COFFEE_LIVE_URL = 'https://coffeeexplorer.cc/';
