
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
    id: 'drift-hunters',
    title: 'DRIFT HUNTERS',
    category: GameCategory.DRIVING,
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Master the physics of friction in a rain-slicked neon metropolis. High-performance racing with advanced drift dynamics.',
    rating: 4.8,
    tags: ['drift', 'racing', 'simulation'],
    url: 'https://www.onlinegames.io/games/2021/unity/drift-hunters/index.html'
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
    id: 'slope',
    title: 'SLOPE PROTOCOL',
    category: GameCategory.ARCADE,
    thumbnail: 'https://images.unsplash.com/photo-1614850523531-9f936a7a507a?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Maintain velocity stability while navigating a disintegrating digital highway. Precision and reflexes are mandatory for survival.',
    rating: 4.7,
    tags: ['speed', 'reflex', 'neon'],
    url: 'https://www.onlinegames.io/games/2021/unity/slope/index.html'
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
    id: 'moto-x3m',
    title: 'MOTO X3M OLYMPUS',
    category: GameCategory.ARCADE,
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Defy gravity on hazardous orbital platforms. Navigate explosive obstacle courses with high-torque motorized rigs.',
    rating: 4.6,
    tags: ['bike', 'stunts', 'physics'],
    url: 'https://www.onlinegames.io/games/2021/unity/moto-x3m/index.html'
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
    id: 'vex-7',
    title: 'VEX 7 SECURITY',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Infiltrate security-hardened facilities. Perform advanced platforming maneuvers to bypass lethal automated defense systems.',
    rating: 4.8,
    tags: ['parkour', 'stealth', 'platformer'],
    url: 'https://www.onlinegames.io/games/2022/html5/vex-7/index.html'
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
    description: "We're taking you back a billion years to the dawn of creation. Armed with only four basic elements—fire, water, earth, and air. You'll start the Big Bang from scratch.",
    rating: 4.7,
    tags: ['alchemy', 'puzzle', 'creation'],
    url: 'https://cloud.onlinegames.io/games/2024/more2/nova-craft/index.html'
  },
  {
    id: '2048-binary',
    title: '2048 BINARY',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Execute the binary fusion protocol. Merge data packets to reach peak system efficiency and achieve the legendary 2048 bit-rate.',
    rating: 4.5,
    tags: ['puzzle', 'logic', 'math'],
    url: 'https://www.onlinegames.io/games/2021/html5/2048/index.html'
  },
  {
    id: 'paper-io-2',
    title: 'PAPER DOMAIN',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Claim territory in a vector-based reality. Expand your digital footprint while defending your neural trail from hostile agents.',
    rating: 4.4,
    tags: ['io', 'territory', 'multiplayer'],
    url: 'https://www.onlinegames.io/games/2021/html5/paper-io-2/index.html'
  },
  {
    id: 'tank-off',
    title: 'TANK OFF: OZONE',
    category: GameCategory.ACTION,
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400&h=250',
    description: 'Heavy armored combat in toxic-ozone environments. Upgrade your chassis and ordinance to dominate the wasteland.',
    rating: 4.7,
    tags: ['tanks', 'combat', 'upgrade'],
    url: 'https://www.onlinegames.io/games/2021/unity/tank-off/index.html'
  }
];
