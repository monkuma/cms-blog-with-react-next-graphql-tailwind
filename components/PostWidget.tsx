import React from "react";
import { useState, useEffect } from "react";
import { getRecentPosts, getSimilarPosts } from "../services/index";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

const PostWidget = ({
  categories,
  slug,
}: {
  categories?: string[];
  slug?: string;
}) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories!, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg pb-12 p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>

      {relatedPosts
        .slice(0)
        .reverse()
        .map((post: any, index: number) => (
          <div key={index} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none hover:opacity-50">
              <Link href={`/post/${post.slug}`} key={index} className="text-md">
                <Image
                  src={post.featuredImage.url}
                  alt={post.title}
                  height={60}
                  width={60}
                  unoptimized
                  className="align-middle rounded-full"
                />
              </Link>
            </div>
            <div className="flex-grow ml-4 hover:opacity-50">
              <Link href={`/post/${post.slug}`} key={index} className="text-md">
                <p className="text-gray-500 font-xs">
                  {moment(post.createdAt).format("YYYY年 MM月DD日")}
                </p>

                {post.title}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostWidget;
