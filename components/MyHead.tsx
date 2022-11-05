import Head from "next/head";
import React from "react";

type MetaData = {
  pageTitle?: string;
  pageDescription?: string;
  pagePath?: string;
  pageImg?: string;
};

const MyHead: React.FC<MetaData> = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
}) => {
  const defaultTitle = "Kumamos Blog";
  const defaultDescription = "勉強したことを記録していくブログ";
  const defaultUrl = "/";
  const defaultImg = "/favicon.png";

  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
  const description = pageDescription ? pageDescription : defaultDescription;
  const url = pagePath ? `/${pagePath}` : defaultUrl;
  const img = pageImg ? pageImg : defaultImg;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://kumamos.blog${url}`} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={img} />
      </Head>
    </>
  );
};

export default MyHead;
