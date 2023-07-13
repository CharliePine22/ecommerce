import '@/styles/globals.css';
import { Layout } from '../../components';
import { StateContext } from '../../context/StateContext';
import { Toaster } from 'react-hot-toast';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <ParallaxProvider>
          <Component {...pageProps} />
        </ParallaxProvider>
      </Layout>
    </StateContext>
  );
}
