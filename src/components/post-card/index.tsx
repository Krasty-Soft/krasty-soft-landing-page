import React from "react";
import { ArrowLink, Image, Pill } from "@/components/ui";
import { Post } from "@/lib/posts";

export const PostCard = ({ data } : { data: Post }) => {
  return (
    <div className="grid grid-col-1 gap-5 lg:gap-8 xl:gap-11 rounded-20">
      <Image
        //src={data.preview}
        src="https://placehold.co/600x400.png"
        alt={data.title}
        wrapperClasses={'flex gap-4 bg-light-grey rounded-20 flex-grow aspect-video overflow-hidden'}
      />

      <div>
        <div className="flex gap-2 mb-5">
          {
            data?.tags?.length ? (
              data?.tags?.map((tag, i) => <Pill key={i} title={tag} variant={"bordered"} />)
              ) : null
          }
        </div>
        <p className="mb-7">
          {data.title}
        </p>
        <ArrowLink to={`/blog/${data.slug}`} />
      </div>
    </div>
  )
}
