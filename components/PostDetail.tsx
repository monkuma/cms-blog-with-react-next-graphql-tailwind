import React from "react";
import moment from "moment";
import parse from "html-react-parser";
import { PostRap } from "../models/Graph";
import PostDetailStyle from "./postDetail.module.scss";
import Image from "next/image";

const PostDetail: React.FC<PostRap> = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          height={1000}
          width={1000}
          className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg "
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              height={30}
              width={30}
              className="align-middle rounded-full "
            />
            <p className="inline align-middle text-gray-700 ml-2 text-lg font-medium">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {moment(post.createdAt).format("YYYY年 MM月DD日 HH:mm")}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        <div className={PostDetailStyle.post_content}>
          {parse(post.content.html)}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
