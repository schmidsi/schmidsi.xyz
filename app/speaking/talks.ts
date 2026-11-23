// Public talks with a recording. Plain data, colocated with the route like the
// posts are. Newest first: the page renders in array order.
//
// `featured` marks the recordings to watch first. The page exists to be sent
// along with a talk application, and a reviewer watches one or two at most.

export interface Talk {
  title: string;
  kind: 'Talk' | 'Workshop' | 'Panel host' | 'Livestream';
  event: string;
  location?: string;
  // Year of the event, not of the upload (ETHGathering went online months later)
  year: number;
  href: string;
  featured?: boolean;
}

const youtube = (id: string, startSeconds?: number) =>
  `https://www.youtube.com/watch?v=${id}` +
  (startSeconds ? `&t=${startSeconds}s` : '');

export const talks: Talk[] = [
  {
    title: 'Zero to Dapp',
    kind: 'Workshop',
    event: 'Devcon SEA',
    location: 'Bangkok',
    year: 2024,
    // The recording covers the whole room slot, the workshop starts here
    href: youtube('lRo-TBLTgzs', 2166),
    featured: true,
  },
  {
    title: 'ETH Infrastructure Challenges and Solutions',
    kind: 'Panel host',
    event: 'L2con',
    location: 'Brussels',
    year: 2024,
    href: youtube('JfQcPqjpdyc'),
  },
  {
    title: 'Subgraphs as Read-Oriented Rollups',
    kind: 'Talk',
    event: 'EthereumZuri.ch',
    location: 'Zurich',
    year: 2024,
    href: youtube('NJ0nA1jxANo'),
  },
  {
    title:
      'New Use Cases & Benefits Derived from Transforming Subgraphs into Read-Oriented Rollups',
    kind: 'Talk',
    event: 'Blockchain Oracle Summit',
    location: 'Paris',
    year: 2023,
    href: youtube('uFK_jCZvpH4'),
  },
  {
    title: 'Unleash Avalanche Data',
    kind: 'Talk',
    event: 'Avalanche Summit II',
    location: 'Barcelona',
    year: 2023,
    href: youtube('GOKU_CAa-H4'),
  },
  {
    title: "What's Next for The Graph",
    kind: 'Talk',
    event: 'ETHDenver',
    location: 'Denver',
    year: 2023,
    href: youtube('2kHVS9dBaDU'),
    featured: true,
  },
  {
    title: 'Hackathon Starter Kit',
    kind: 'Livestream',
    event: 'Shill Your Stack with Austin Griffith',
    year: 2022,
    href: youtube('zsa0irrs27M'),
  },
  {
    title: "What's Next for The Graph",
    kind: 'Talk',
    event: 'ETHGathering',
    location: 'Barcelona',
    year: 2022,
    href: youtube('1Lkdub8cDU4'),
  },
  {
    title: 'Full Stack Web3 Development with The Graph',
    kind: 'Workshop',
    event: 'ETHSanFrancisco',
    location: 'San Francisco',
    year: 2022,
    href: youtube('obOEMAZ-05s'),
  },
  {
    title: 'Quickstart to Subgraph Development & Querying',
    kind: 'Workshop',
    event: 'ETHMexico',
    location: 'Mexico City',
    year: 2022,
    href: youtube('GcfRcnuJX6I', 107),
  },
  {
    title: 'Building Subgraphs with The Graph',
    kind: 'Workshop',
    event: 'NFTHack',
    location: 'online',
    year: 2022,
    href: youtube('P4krvtdBABI', 39),
  },
  {
    title: 'Exploring the Baseledger Subgraph',
    kind: 'Talk',
    event: 'ETHAtlanta',
    year: 2021,
    href: youtube('qKAfF8uUJ8M'),
  },
  {
    title: 'The Graph Protocol',
    kind: 'Talk',
    event: 'EthEcole at EthCC',
    location: 'Paris',
    year: 2021,
    href: youtube('gxL4Ftsy2Yg'),
  },
  {
    title: 'Front-end Architecture Overview and Melon.js',
    kind: 'Talk',
    event: 'M-1',
    location: 'Zug',
    year: 2019,
    href: youtube('Rc_zldkswfo'),
  },
];

export const featuredTalks = talks.filter((talk) => talk.featured);
export const otherTalks = talks.filter((talk) => !talk.featured);

// "Workshop · Devcon SEA, Bangkok · 2024"
export function talkContext(talk: Talk): string {
  const where = talk.location ? `${talk.event}, ${talk.location}` : talk.event;
  return `${talk.kind} · ${where} · ${talk.year}`;
}
