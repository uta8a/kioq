import Head from 'next/head';
import { Sample } from '@/components/Sample';

export default function Home() {
  return (
    <div>
      <Head>
        <title>kioq</title>
      </Head>

      <main>
        <p>kioq - simple flash card use Notion.</p>
        <Sample />
      </main>
    </div>
  );
}
