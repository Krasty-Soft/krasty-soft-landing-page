import { posts } from "@/lib/posts";

export interface Case {
  slug: string;
  title: string;
  tags: string[];
  content: string;
  preview: string;
}
export const cases: Case[] = [
  {
    slug: "bot-to-find-and-execute-profitable-crypto-arbitrage-trades",
    title: "Bot to find and execute profitable crypto arbitrage trades",
    tags: ["Duration: Ongoing", "Crypto"],
    content:
      "Bot to find and execute profitable crypto arbitrage trades. Worked with such exchanges as Binance, ByBit, Coinbase, WhiteBit and OKX. User can connect their account and earn money with arbitrage automation tool.",
    preview: "",
  },
];

export async function getCaseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug) || null;
}

export async function getAllSlugs() {
  return cases.map((item) => ({ slug: item.slug }));
}
