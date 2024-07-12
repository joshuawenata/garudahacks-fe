// pages/index.tsx
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../app/component/map'), { ssr: false });

const Home = () => {
  return (
    <div>
      <Head>
        <title>My Map App</title>
        <meta name="description" content="Track user location on a map" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Map />
      </main>
    </div>
  );
};

export default Home;
