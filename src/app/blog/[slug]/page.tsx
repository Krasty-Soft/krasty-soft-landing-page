import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { ContactForm } from "@/components/blocks";
import { Image, Section } from "@/components/ui";
import React from "react";
import { Breadcrumbs, PostCard } from "@/components";
import { posts } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const post = await getPostBySlug(awaitedParams.slug);

  if (!post) return notFound();

  return (
    <>
      <div className="container px-4 md:px-8 pb-c-50 md:pb-c-60 lg:px-c-50 lg:pb-20 xl:px-c-200 xl:pb-c-100">
        <div className="pt-6 pb-8">
          <Breadcrumbs />
        </div>

        <h1 className="text-1xl mb-8">
          {post.title}
        </h1>

        <div className="mb-8">
          <Image
            // src={post.preview}
            src="https://placehold.co/600x400.png"
            alt={post.title}
            wrapperClasses={'rounded-20 aspect-video overflow-hidden'}
          />
        </div>

        <div className="text-content">
          <p>
            {post.content}
          </p>

          <p>
            Ever wondered how leading healthcare providers are launching critical applications in days instead of months? Let us share our recent discovery that&#39;s transforming the healthcare software development landscape 👇

            ⚡At Krasty Soft, we&#39;ve embraced Retool to supercharge our healthcare solution delivery and the results are nothing short of remarkable:

            🔹70% Faster Development Cycles
            Traditional coding approaches would take weeks to create a patient management dashboard. With Retool&#39;s drag-and-drop interface and pre-built components, we&#39;re now delivering the same functionality in days.

            🔹60% Cost Reduction
            By eliminating the need for extensive custom coding, we&#39;ve significantly reduced development costs without compromising on quality or functionality.

            💡What Makes Retool a Game-Changer?

          </p>

          <p>
            👥 Healthcare professionals love the intuitive interfaces we create with Retool. No more complex training sessions – medical staff can start using new tools immediately.

            🏥 One of our clients, a regional healthcare network, launched a comprehensive patient monitoring system in just two weeks – a project that would traditionally take 2-3 months.
            Want to learn how Retool can transform your healthcare software development? Let&#39;s connect and discuss how we can help you achieve similar results 🚀
          </p>
        </div>

      </div>
      <Section
        variant={'paper'}
        subtitle={'Blog'}
        title={'Related posts'}
      >
        {
          posts.slice(0,1).map((post, i) => {
            return  <PostCard key={i} data={post} />
          })
        }
      </Section>
      <ContactForm />
    </>
  );
}
