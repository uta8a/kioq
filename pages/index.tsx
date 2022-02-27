import Head from 'next/head';
import type { NextPage } from 'next';
import { getKioq } from 'utils/getKioq';
import type { GetServerSideProps } from 'next';
import type { Kioq } from '@/types/kioq';
import { useState } from 'react';
import type { ChangeEventHandler, MouseEventHandler } from 'react';

export const getServerSideProps: GetServerSideProps<{
  kioq: Kioq;
}> = async () => {
  return { props: { kioq: await getKioq() } };
};

const Home: NextPage<{ kioq: Kioq }> = ({ kioq }) => {
  const [tag, setTag] = useState(kioq[0].tag);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const tagChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTag(event.target.value);
    setIndex(0);
  };
  const indexChangeHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    }
    if (index + 1 >= kioq.filter((quiz) => quiz.tag === tag).length) {
      // index over kioq length, end of quiz
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div>
      <Head>
        <title>kioq</title>
      </Head>
      <main>
        <p>kioq - simple flash card use Notion.</p>
        <select value={tag} onChange={tagChangeHandler}>
          {Array.from(new Set(kioq.map((quiz) => quiz.tag))).map((tag) => {
            return (
              <option value={tag} key={tag}>
                {tag}
              </option>
            );
          })}
        </select>
        <div>
          Quiz {kioq.filter((quiz) => quiz.tag === tag)[index]?.question}
        </div>

        <div>Ans {kioq.filter((quiz) => quiz.tag === tag)[index]?.answer}</div>
        <button onClick={indexChangeHandler}>次へ</button>
      </main>
    </div>
  );
};

export default Home;
