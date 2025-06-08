import {posts} from "@/lib/posts";

export interface Case {
  slug: string,
  title: string,
  tags: string[],
  content: string,
  preview: string,
}
export const cases: Case[] = [
  {
    slug: 'bot-to-find-and-execute-profitable-crypto-arbitrage-trades-1',
    title: 'Bot to find and execute profitable crypto arbitrage trades 1',
    tags: ['Duration: Ongoing', 'Crypto'],
    content: 'Bot to find and execute profitable crypto arbitrage trades. Worked with such exchanges as Binance, ByBit, Coinbase, WhiteBit and OKX. User can connect their account and earn money with arbitrage automation tool.',
    preview: '',
  },
  {
    slug: 'bot-to-find-and-execute-profitable-crypto-arbitrage-trades-2',
    title: 'Bot to find and execute profitable crypto arbitrage trades 2',
    tags: ['Duration: Ongoing', 'Booking'],
    content: 'The Flight Booking Software project exemplifies our commitment to transforming travel experiences. By combining cutting-edge technology with a user-centric design, we have created a platform that not only facilitates ticket purchases but elevates the entire journey.',
    preview: '',
  },
  {
    slug: 'bot-to-find-and-execute-profitable-crypto-arbitrage-trades-3',
    title: 'Bot to find and execute profitable crypto arbitrage trades 3',
    tags: ['Duration: Ongoing', 'Fintech'],
    content: 'Bot to find and execute profitable crypto arbitrage trades. Worked with such exchanges as Binance, ByBit, Coinbase, WhiteBit and OKX. User can connect their account and earn money with arbitrage automation tool.',
    preview: '',
  },
];

export async function getCaseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug) || null;
}

export async function getAllSlugs() {
  return cases.map((item) => ({ slug: item.slug }));
}
