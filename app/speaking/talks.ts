// Public talks with a recording. Plain data, colocated with the route like the
// posts are. Newest first: the page renders in array order. Within a year the
// order is approximate. Interviews and podcasts are listed at the end, the
// page shows them in their own section.
//
// `featured` marks the recordings to watch first. The page exists to be sent
// along with a talk application, and a reviewer watches one or two at most.

// Co-speakers, panelists or hosts. Linked to X, or to LinkedIn without X
export interface Person {
  name: string;
  href: string;
}

export interface Talk {
  title: string;
  kind:
    | 'Talk'
    | 'Workshop'
    | 'Panel'
    | 'Panel host'
    | 'Livestream'
    | 'Interview'
    | 'Podcast';
  event: string;
  location?: string;
  // Year of the event, not of the upload (ETHGathering went online months later)
  year: number;
  href: string;
  featured?: boolean;
  // For entries without a video: what the talk was about, shown on its page
  description?: string;
  // Shown after the year when the link is not a plain recording
  note?: string;
  // Others on stage or in the recording, shown in the grey line
  with?: Person[];
}

const x = (name: string, handle: string): Person => ({
  name,
  href: `https://x.com/${handle}`,
});
const linkedin = (name: string, slug: string): Person => ({
  name,
  href: `https://www.linkedin.com/in/${slug}`,
});

const people = {
  abena: x('Abena Asante', 'abena_eth'),
  rob: x('Rob Stupay', 'ryestew'),
  kevin: x('Kevin Jones', 'CryptoMastery_'),
  solange: x('Solange Gueiros', 'solangegueiros'),
  sophia: x('Sophia Dew', 'sophiadew'),
  austin: x('Austin Griffith', 'austingriffith'),
};

const youtube = (id: string, startSeconds?: number) =>
  `https://www.youtube.com/watch?v=${id}` +
  (startSeconds ? `&t=${startSeconds}s` : '');

export const talks: Talk[] = [
  {
    title: 'The Trust Layer in the Agentic Stack: ERC-8004',
    kind: 'Panel host',
    event: 'Agentic Zero',
    location: 'Buenos Aires',
    year: 2025,
    href: youtube('FWT9AVaN9NU'),
    featured: true,
    with: [
      x('Marco De Rossi', 'marco_derossi'),
      x('Sumeet Chougule', '_sumeetc'),
      x('Davide Crapis', 'DavideCrapis'),
      x('Quintus Kilbourn', '0xQuintus'),
    ],
  },
  {
    title: 'ENS - Identity in Your Apps',
    kind: 'Talk',
    event: 'ETHGlobal New Delhi',
    year: 2025,
    href: youtube('FGH_SEQXB1g'),
    with: [
      x('Nischal Sharma', 'nischalsh11'),
      x('Harpeet Singh', 'HAPPYS1NGH'),
    ],
  },
  {
    title: 'Under the Hood: Naming, Identity & Interoperability',
    kind: 'Workshop',
    event: 'ETHAccra',
    location: 'online',
    year: 2025,
    href: youtube('9-NM7M6NKWk'),
    with: [people.abena],
  },
  {
    title: 'ZeroToDapp at EthCC Cannes',
    kind: 'Workshop',
    event: 'EthCC[8]',
    location: 'Cannes',
    year: 2025,
    href: youtube('9pr7q9SQQ2k'),
    with: [
      people.rob,
      people.abena,
      people.kevin,
      people.solange,
      people.sophia,
    ],
  },
  {
    title: 'Zero to Dapp',
    kind: 'Workshop',
    event: 'Devcon SEA',
    location: 'Bangkok',
    year: 2024,
    // The recording covers the whole room slot, the workshop starts here
    href: youtube('lRo-TBLTgzs', 2166),
    with: [people.rob, people.abena],
    featured: true,
  },
  {
    title: 'Oracles Panel',
    kind: 'Panel host',
    event: 'Datapalooza',
    location: 'Bangkok',
    year: 2024,
    href: youtube('RTIQ_K9sQX0'),
    with: [
      x('Matt Gurbiel', 'mattgurbiel'),
      x('Niklas Kunkel', 'nomos_paradox'),
    ],
  },
  {
    title: 'ETH Infrastructure Challenges and Solutions',
    kind: 'Panel host',
    event: 'L2con',
    location: 'Brussels',
    year: 2024,
    href: youtube('JfQcPqjpdyc'),
    with: [
      x('Dillon Hanson', 'dillonhanson12'),
      linkedin('Giacomo Barbieri', 'giacomobarbieri94'),
      linkedin('Rose Li', 'rose-li-44326459'),
      x('Amadeo Brands', 'amadeobrands'),
    ],
  },
  {
    title: "Unleash The Graph's Data",
    kind: 'Talk',
    event: 'ETH Belgrade',
    year: 2024,
    href: youtube('mDK9KA3as_0'),
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
    title: 'First Look at Timeseries and Aggregations',
    kind: 'Livestream',
    event: 'Graph Builders Office Hours #27',
    location: 'online',
    year: 2024,
    href: youtube('n8xI6vfLe3M'),
  },
  {
    title:
      'Querying and Indexing Smart Contract Data on Ethereum with The Graph',
    kind: 'Workshop',
    event: 'ETHGlobal Istanbul',
    year: 2023,
    href: youtube('Y9w1cZkicCU'),
  },
  {
    title: 'Supercharge Web2 Data With Web3 Technologies',
    kind: 'Talk',
    event: 'DappCon',
    location: 'Berlin',
    year: 2023,
    href: youtube('qvQqcfgQWQA'),
  },
  {
    title:
      'Querying and Indexing Smart Contract Data on Ethereum with The Graph',
    kind: 'Workshop',
    event: 'ETHGlobal New York',
    year: 2023,
    href: youtube('EXnMpDacjkw'),
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
    title: "What's Next for The Graph",
    kind: 'Talk',
    event: 'ETH Belgrade',
    year: 2023,
    href: youtube('tOhYU3OTfsk'),
  },
  {
    title:
      'Querying and Indexing Smart Contract Data on Ethereum with The Graph',
    kind: 'Workshop',
    event: 'ETHGlobal Waterloo',
    year: 2023,
    href: youtube('u-SuqtwGXDU'),
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
    title: 'The Graph Workshop',
    kind: 'Workshop',
    event: 'ETHDam',
    location: 'Amsterdam',
    year: 2023,
    href: youtube('16bXQvxjQ0w'),
  },
  {
    title:
      'Querying and Indexing Smart Contract Data on Ethereum with The Graph',
    kind: 'Workshop',
    event: 'ETHGlobal Lisbon',
    year: 2023,
    href: youtube('rE68jHYQv7Q'),
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
    title: 'Querying Blockchain Data with GraphQL',
    kind: 'Workshop',
    event: 'JSNation',
    location: 'online',
    year: 2023,
    href: 'https://gitnation.com/contents/querying-blockchain-data-with-graphql',
    note: 'Free GitNation sign-in needed to watch',
    description:
      'Curious about how data works in the world of blockchain? In this workshop, I introduced The Graph, the decentralized indexing protocol that makes it easy for blockchain developers to search and query blockchain data. Topics: understanding blockchain data, anatomy of a smart contract, indexing blockchain data with The Graph, accessing data on The Graph, recommended subgraphs and an overview of writing subgraphs. Presented at JSNation 2023.',
  },
  {
    title: 'Data Science & Subgraph Development',
    kind: 'Talk',
    event: 'ETHDenver',
    location: 'Denver',
    year: 2023,
    href: youtube('6r9Jz5aiQNg'),
  },
  {
    title: 'Hackathon Starter Kit',
    kind: 'Livestream',
    event: 'Shill Your Stack with Austin Griffith',
    year: 2022,
    href: youtube('zsa0irrs27M'),
    with: [people.austin],
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
    title: 'The State of Data Infrastructure',
    kind: 'Panel',
    event: 'ETHGathering',
    location: 'Barcelona',
    year: 2022,
    href: youtube('p74euAp_A1w'),
    with: [
      x('Rafael Ugolini', 'rafaelugolini'),
      x('Makoto Inoue', 'makoto_inoue'),
      x('Tomek Mierzwa', 'mierzwik'),
    ],
  },
  {
    title: 'Building a Custom NFT Subgraph',
    kind: 'Workshop',
    event: 'ETHNewYork',
    location: 'New York',
    year: 2022,
    href: youtube('qksGoW9N9U4'),
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
    title: 'Tools & Infra',
    kind: 'Panel',
    event: 'ETHDay',
    location: 'Amsterdam',
    year: 2022,
    href: youtube('3kFdNu9TvcI'),
    with: [
      people.austin,
      x('Francesco Andreoli', 'francescoswiss'),
      x('JJ Knegtel', 'jpknegtel'),
    ],
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
    title: 'Open Source Business',
    kind: 'Talk',
    event: 'Pantalks',
    location: 'online',
    year: 2020,
    href: 'https://www.panter.ch/en/stories/pantalk-1/',
    note: 'Recording offline, talk description only',
    description:
      'In this talk, I explained the current state, recent developments, different strategies and approach towards open source business at Unchained Commerce GmbH. Pantalks is the talk series of Panter AG in Zurich. This first one of 2020 was a livestream.',
  },
  {
    title: 'Front-end Architecture Overview and Melon.js',
    kind: 'Talk',
    event: 'M-1',
    location: 'Zug',
    year: 2019,
    href: youtube('Rc_zldkswfo'),
  },
  {
    title: 'Crypto Economics',
    kind: 'Talk',
    event: 'Pantalks',
    location: 'Zurich',
    year: 2018,
    href: 'https://www.slideshare.net/slideshow/crypto-economics-pantalks-24-april-2018/94976437',
    note: 'Slides only',
    description:
      '«Crypto Economics» is a semi-technical introduction into blockchain technology with a focus on the potential of the blockchain to change the way we organise our lives. I talked about the current financial system, its strengths and weaknesses, and compared it to blockchain based solutions. The talk explained how distributed consensus is reached in a trust-less system and how proof of work mining works. It went further into the concept of smart contracts and how smart or not they are. I held it at the Pantalks of Panter AG in Zurich on 24 April 2018, as Head of UX/Front-end at Melonport.',
  },
  {
    title: 'Building a Trading Bot with Melon.js',
    kind: 'Talk',
    event: 'M-0',
    location: 'Zug',
    year: 2017,
    href: youtube('eY1D03fbIuQ'),
  },
  // Interviews and podcasts
  {
    title: 'Edge & Node, The Graph and the Future of Decentralized Data',
    kind: 'Podcast',
    event: 'Crypto Mastery',
    year: 2023,
    href: youtube('E_gzztVq50k'),
    with: [people.kevin],
  },
  {
    title: 'Do FUN, STUPID Stuff Also',
    kind: 'Interview',
    event: 'Devfolio',
    year: 2023,
    href: youtube('hskO24GkM4Y'),
  },
  {
    title: 'What Privacy Means to Simon',
    kind: 'Interview',
    event: 'HOPR at EthCC',
    location: 'Paris',
    year: 2022,
    href: youtube('gUbXdjggMZY'),
  },
  {
    title: 'Solutions Engineer at Edge & Node',
    kind: 'Podcast',
    event: 'GRTiQ Podcast',
    year: 2022,
    href: youtube('IO2QEatwpsM'),
  },
  {
    title: 'Melonport',
    kind: 'Interview',
    event: 'Enzyme',
    year: 2018,
    href: youtube('8IwVuy_kV3U'),
  },
];

export const featuredTalks = talks.filter((talk) => talk.featured);
const isInterview = (talk: Talk) =>
  talk.kind === 'Interview' || talk.kind === 'Podcast';
export const otherTalks = talks.filter(
  (talk) => !talk.featured && !isInterview(talk),
);
export const interviews = talks.filter(isInterview);

// "Workshop · Devcon SEA, Bangkok · 2024"
export function talkContext(talk: Talk): string {
  const where = talk.location ? `${talk.event}, ${talk.location}` : talk.event;
  const context = `${talk.kind} · ${where} · ${talk.year}`;
  return talk.note ? `${context} · ${talk.note}` : context;
}

// URL path of a talk's own page: /speaking/<slug>/. Stable, so do not rename
// titles lightly, the slug follows them.
export function talkSlug(talk: Talk): string {
  const kebab = (text: string) =>
    text
      .toLowerCase()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  // Long titles are cut at a word boundary, the event and year always stay
  const title = kebab(talk.title);
  const short =
    title.length <= 50 ? title : title.slice(0, 50).replace(/-[^-]*$/, '');
  return `${short}-${kebab(talk.event)}-${talk.year}`;
}

export function getTalk(slug: string): Talk | undefined {
  return talks.find((talk) => talkSlug(talk) === slug);
}

// YouTube id and start offset (seconds) of a talk, if it is a YouTube video
export function youtubeRef(
  talk: Talk,
): { id: string; start: number } | undefined {
  const url = new URL(talk.href);
  if (!url.hostname.endsWith('youtube.com')) return undefined;
  const id = url.searchParams.get('v');
  if (!id) return undefined;
  return { id, start: parseInt(url.searchParams.get('t') ?? '0', 10) || 0 };
}

// Where the original lives, for "Watch on ..." style links
export function sourceLabel(talk: Talk): string {
  const host = new URL(talk.href).hostname;
  if (host.endsWith('youtube.com')) return 'Watch on YouTube';
  if (host.endsWith('slideshare.net')) return 'View the slides on SlideShare';
  if (host.endsWith('gitnation.com')) return 'Watch on GitNation';
  if (host.endsWith('panter.ch')) return "Panter's page about the talk";
  return 'Open the original';
}
