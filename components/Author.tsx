import React from "react";
import Image from "next/image";
import { Author } from "../models/Graph";

const Author: React.FC<{ author: Author }> = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-11 relative rounded-lg bg-black bg-opacity-20">
    <div className="">
      <Image
        alt={author.name}
        unoptimized
        width={100}
        height={100}
        className="align-middle rounded-full absolute left-0 right-0 -top-12 m-auto"
        src={author.photo.url}
      />
    </div>

    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-lg">{author.bio}</p>
  </div>
);

export default Author;
