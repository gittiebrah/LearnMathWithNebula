
import { Game, GameCategory } from './types';

export const GAMES: Game[] = [
  {
    id: 'nebula-snake',
    title: 'NEBULA SNAKE',
    category: GameCategory.ARCADE,
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Navigate the digital slipstream. Consume data nodes to expand your neural link while avoiding firewall collisions. Full local integration.',
    rating: 4.9,
    tags: ['action', 'classic', 'neon'],
    url: 'internal'
  },
  {
    id: 'neural-math',
    title: 'NEURAL MATH MATRIX',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Calibrate your neural processing unit with high-speed arithmetic. Synchronize addition, subtraction, and multiplication protocols to achieve peak cognitive efficiency.',
    rating: 4.8,
    tags: ['educational', 'math', 'puzzle'],
    url: 'internal'
  },
  {
    id: 'warstrike',
    title: 'WARSTRIKE',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'High-intensity tactical combat. Engage in frontline warfare across neon-drenched battlefields in this advanced military simulation.',
    rating: 4.8,
    tags: ['shooter', 'tactical', 'combat'],
    url: 'https://cloud.onlinegames.io/games/2024/unity3/warstrike/index-og.html'
  },
  {
    id: 'armedforces-io',
    title: 'ARMEDFORCES.IO',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Join the intergalactic peacekeeping force. High-stakes multiplayer skirmishes across diverse planetary terrains in a persistent war zone.',
    rating: 4.7,
    tags: ['multiplayer', 'shooter', 'fps'],
    url: 'https://www.onlinegames.io/games/2021/unity3/armedforces-io/index.html'
  },
  {
    id: 'airplane-racing',
    title: 'AIRPLANE RACING',
    category: GameCategory.DRIVING,
    thumbnail: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Break the sound barrier in high-altitude races. Master advanced aerodynamics and overtake rivals in the ultimate sky-bound competition.',
    rating: 4.6,
    tags: ['racing', 'flight', 'simulator'],
    url: 'https://www.onlinegames.io/games/2022/unity/airplane-racer/index.html'
  },
  {
    id: 'hover-race',
    title: 'HOVER RACE',
    category: GameCategory.DRIVING,
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Pilot high-performance hovercrafts through neon-lit futuristic circuits. Defy gravity and dominate the speedways of the future.',
    rating: 4.7,
    tags: ['racing', 'hover', 'sci-fi'],
    url: 'https://www.onlinegames.io/games/2021/unity3/hover-racer/index.html'
  },
  {
    id: 'escape-tsunami',
    title: 'ESCAPE TSUNAMI FOR BRAINROT',
    category: GameCategory.ARCADE,
    thumbnail: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Outrun the digital data-surge. Navigate through chaotic architectural anomalies to survive the impending neural wipe.',
    rating: 4.5,
    tags: ['survival', 'chaos', 'fast-paced'],
    url: 'https://playgama.com/export/game/escape-tsunami-for-brainrots?clid=p_c5c0931c-086d-4e68-a422-1e46e327c214'
  },
  {
    id: 'art-of-defense',
    title: 'ART OF DEFENSE',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Deploy advanced turret systems and kinetic barriers to protect the last terrestrial outposts from a relentless mechanical swarm.',
    rating: 4.8,
    tags: ['strategy', 'defense', 'tactical'],
    url: 'https://playgama.com/export/game/aod--art-of-defense?clid=p_c5c0931c-086d-4e68-a422-1e46e327c214'
  },
  {
    id: 'mech-shooter',
    title: 'MECH SHOOTER',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Pilot massive bipedal war machines in high-stakes urban warfare. Customize your chassis with plasma cannons to dominate the battlefield.',
    rating: 4.8,
    tags: ['mech', 'action', 'warfare'],
    url: 'https://www.onlinegames.io/games/2022/unity/mech-shooter/index.html'
  },
  {
    id: 'geometry-dash',
    title: 'GEOMETRY DASH',
    category: GameCategory.ARCADE,
    thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Master the rhythm-based navigation protocol. Precise timing is required to synchronize with the neon fractal pulse and avoid structural desync.',
    rating: 4.9,
    tags: ['rhythm', 'precision', 'neon'],
    url: 'https://www.onlinegames.io/games/2023/q2/geometry-dash-freezenova/index.html'
  },
  {
    id: 'super-mini-racing',
    title: 'SUPER MINI RACING',
    category: GameCategory.DRIVING,
    thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Engage in micro-scale velocity trials. Pilot high-torque mini-drones across intricate circuit boards in a race for dominance.',
    rating: 4.6,
    tags: ['racing', 'mini', 'velocity'],
    url: 'https://www.onlinegames.io/games/2022/unity4/super-mini-racing/index.html'
  },
  {
    id: 'nova-craft',
    title: 'NOVA CRAFT',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=400&h=250',
    description: "We're taking you back a billion years to the dawn of creation. Armed with only four basic elements—fire, water, earth, and air. You'll start the Big Bang from scratch. In this alchemy game, combine elements to create new ones and see history unfold. The fate of the universe is in your hands. What will you discover first: War or Peace?",
    rating: 4.7,
    tags: ['alchemy', 'puzzle', 'creation'],
    url: 'https://cloud.onlinegames.io/games/2024/more2/nova-craft/index.html'
  }
];
