import { getAllPosts } from "@/lib/posts";
import { BlogClient } from "@/app/blog/client";

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogClient posts={posts} />;
}
