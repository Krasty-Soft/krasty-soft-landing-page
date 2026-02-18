import { getAllPosts } from "@/lib/posts";
import { BlogClient } from "@/app/blog/client";

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogClient posts={posts} />;
}
