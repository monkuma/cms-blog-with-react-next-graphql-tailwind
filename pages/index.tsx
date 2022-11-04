import { PostCard, PostWidget, Categories } from "../components/";
import MyHead from "../components/MyHead";
import FeaturedPosts from "../sections/FeaturedPosts";
import { getPosts } from "../services";

export default function Home({ posts }: { posts: any }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <MyHead />
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts
            .slice(0)
            .reverse()
            .map((post: any, index: number) => (
              <PostCard post={post.node} key={index} />
            ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
