import { useRouter } from 'next/dist/client/router';
import * as React from 'react';

export interface ParamPageProps {}

export default function ParamPage(props: ParamPageProps) {
  const router = useRouter();

  return (
    <div>
      <p> Param page</p>
      <p>QUERY: {JSON.stringify(router.query)}</p>
    </div>
  );
}
