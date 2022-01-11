import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppPropsWithLayout } from '../models';
import { EmptyLayout } from '@/components/common/layout';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
