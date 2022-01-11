import Header from '@/components/common/header';
import { MainLayout } from '@/components/common/layout';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
// const Header = dynamic(() => import('@/components/common/header'), {
//   ssr: false,
// });

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const [postList, setPostList] = useState([]);
  const router = useRouter();
  const page = router.query?.page || 0;

  useEffect(() => {
    (async () => {
      const repsonse = await fetch(
        `http://sharecode.ap-southeast-1.elasticbeanstalk.com/api/sources?size=2&page=${page}`
      );
      const data = await repsonse.json();
      setPostList(data.data.listItems);
    })();
  }, [page]);

  const handleNextClick = () => {
    console.log('click');
    router.push(
      {
        pathname: '/about',
        query: {
          page: Number(page) + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  console.log('about query', router.query);

  return (
    <div>
      <h1>Aboutpage</h1>
      <Header />

      <ul className="post-list">
        {postList.map((post: any, index) => (
          <li key={index}>{post.name}</li>
        ))}
      </ul>

      <button onClick={handleNextClick}>Next page</button>
    </div>
  );
}
AboutPage.Layout = MainLayout;

export async function getStaticProps() {
  console.log('getstatic prop');
  return {
    props: {},
  };
}

// export async function getServerSideProps() {
//   return {
//     props: {},
//   };
// }
