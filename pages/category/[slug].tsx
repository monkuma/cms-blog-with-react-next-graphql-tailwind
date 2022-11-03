import React from "react";
import { useRouter } from "next/router";
import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Categories, Loader } from "../../components";
import { Post, PostRap } from "../../models/Graph";
import MyHead from "../../components/MyHead";

const CategoryPost = ({ posts }: { posts: any }) => {
  const router = useRouter();
  const metaFlag = posts?.length !== 0 || undefined ? true : false;
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      {metaFlag ? (
        <MyHead
          pageTitle={posts[0].categories[0].slug}
          pageDescription={`カテゴリ${posts[0].categories[0].slug}のページです`}
          pagePath={`category/${posts[0].categories[0].slug}`}
          // pageImg={posts.featuredImage.url}
        />
      ) : (
        <MyHead />
      )}

      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post: Post, index: number) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }: { params: any }) {
  const poststmp = await getCategoryPost(params.slug);
  const posts = poststmp.map((post: any) => post.node);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }: { slug: any }) => ({ params: { slug } })),
    fallback: true,
  };
}
