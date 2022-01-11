import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import * as React from 'react';

export interface PostPageProps {
  post: any;
}

export default function PostDetailPage({ post }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  if (!post) {
    return null;
  }

  return (
    <div>
      <p> Post detail page</p>
      <p>QUERY: {JSON.stringify(router.query)}</p>

      <ul>
        <li>
          <p>{post.name}</p>
          <p>{post.price}</p>
          <p>{post.description}</p>
        </li>
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repsonse = await fetch('http://sharecode.ap-southeast-1.elasticbeanstalk.com/api/sources');
  const data = await repsonse.json();

  const tempValue: any = data.data.listItems.map((post: any) => ({
    params: { postId: post.sourceId },
  }));

  return {
    paths: tempValue,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context: GetStaticPropsContext
) => {
  // server-side
  // run lusc build time
  // hàm chỉ gọi bên phía server
  // node js server làm j đc thì ở dây cũng có thẻ làm như v

  const postId = context.params?.postId;

  console.log('Get static props', postId);

  if (!postId) {
    return {
      notFound: true,
    };
  }

  const repsonse = await fetch(
    `http://sharecode.ap-southeast-1.elasticbeanstalk.com/api/sources/getById/${postId}`
  );
  const data = await repsonse.json();

  return {
    props: {
      post: data.data,
    },
    revalidate: 5,
  };
};
