'use client'

import { Post, posts } from '@/lib/posts';
import { useState } from "react";
import { Breadcrumbs, Filters, PostCard } from '@/components';
import { ContactForm, Difference } from "@/components/blocks";
import { generateTagFilters } from "@/lib/util";

type Tag = 'all' | string;

function filterPostsByTag(posts: Post[], activeFilter: string): Post[] {
  if (activeFilter === 'all') return posts;

  return posts.filter(post => post.tags.includes(activeFilter));
}

export default function BlogListPage() {
  const [activeFilter, setFilter] = useState<Tag>('all');

  const filters = generateTagFilters(posts, 'All articles');
  const filteredPosts = filterPostsByTag(posts, activeFilter)

  return (
    <>
      <div className="container px-4 bg-background pb-c-50 md:pb-c-60 lg:pb-20 xl:pb-c-100">
        <div className="pt-6 pb-8">
          <Breadcrumbs />
        </div>

        <h1 className="text-1xl mb-8">
          Useful articles on design, analytics, and development.
        </h1>

        <div className="mb-10">
          <Filters filters={filters} onSelect={setFilter} selected={activeFilter} />
        </div>

        <ul className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-6 lg:gap-8 xl:gap-10">
          {filteredPosts.map((post, i) => (
            <PostCard key={i} data={post} />
          ))}
        </ul>

      </div>

      <ContactForm isDark />
      <Difference isDark={false} />
    </>
  );
}
