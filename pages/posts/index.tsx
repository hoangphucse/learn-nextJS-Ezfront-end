import { GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';
import Link from 'next/link';

export interface PostListPageProps {
  posts: any[];
}

export default function PostListPage({ posts }: PostListPageProps) {
  return (
    <div>
      <h1>Post list page</h1>

      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Link href={`/posts/${post.sourceId}`}>
              <a>{post.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
  context: GetStaticPropsContext
) => {
  // server-side
  // run lusc build time
  // hàm chỉ gọi bên phía server
  // node js server làm j đc thì ở dây cũng có thẻ làm như v

  const repsonse = await fetch('http://sharecode.ap-southeast-1.elasticbeanstalk.com/api/sources');
  const data = await repsonse.json();

  return {
    props: {
      posts: data.data.listItems,
    },
  };
};
