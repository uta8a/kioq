import Head from 'next/head';
import type { NextPage } from 'next';
import { Sample } from '@/components/Sample';
import { getKioq } from 'utils/getKioq';
import type { GetServerSideProps } from 'next';
import type { Kioq } from '@/types/kioq';

export const getServerSideProps: GetServerSideProps<{
  kioq: Kioq;
}> = async () => {
  return { props: { kioq: await getKioq() } };
};

const Home: NextPage<{ kioq: Kioq }> = ({ kioq }) => {
  return (
    <div>
      <Head>
        <title>kioq</title>
      </Head>

      <main>
        <p>kioq - simple flash card use Notion.</p>
        <Sample />
        <p>{JSON.stringify(kioq)}</p>
      </main>
    </div>
  );
};

export default Home;
