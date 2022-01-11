import { useRouter } from 'next/dist/client/router';
import * as React from 'react';

export interface NewsPageProps {}

export default function NewsPage(props: NewsPageProps) {
  const router = useRouter();

  return (
    <div>
      <h1>News page</h1>
      <p>Query : {JSON.stringify(router.query)}</p>
    </div>
  );
}

export async function getServerSideProps() {
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  return {
    props: {},
  };
}
