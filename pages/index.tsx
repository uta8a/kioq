import Head from 'next/head';
import type { NextPage } from 'next';
import { getKioq } from 'utils/getKioq';
import type { GetServerSideProps } from 'next';
import type { Kioq } from '@/types/kioq';
import { useState } from 'react';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import style from 'styles/index.module.css';

export const getServerSideProps: GetServerSideProps<{
  kioq: Kioq;
}> = async () => {
  return { props: { kioq: await getKioq() } };
};

const Index: NextPage<{ kioq: Kioq }> = ({ kioq }) => {
  const [tag, setTag] = useState(kioq[0].tag);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const tagChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTag(event.target.value);
    setIndex(0);
    setIsOpen(false);
  };

  const indexChangeHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!isOpen) {
      setIsOpen(true);
      return;
    } else {
      setIsOpen(false);
      if (index + 1 >= kioq.filter((quiz) => quiz.tag === tag).length) {
        // index over kioq length, end of quiz
        setIndex(0);
        setIsOpen(false);
      } else {
        setIndex(index + 1);
      }
    }
  };

  const displayButtonMessage = () => {
    return isOpen
      ? index + 1 >= kioq.filter((quiz) => quiz.tag === tag).length
        ? 'もう一度'
        : '次へ'
      : '答え';
  };

  return (
    <div>
      <Head>
        <title>kioq</title>
      </Head>
      <main className={style.main}>
        <div className={style.container}>
          <p className={style.title}>kioq</p>
          <progress
            className={style.progress}
            value={index + 1}
            max={kioq.filter((quiz) => quiz.tag === tag).length}
          />
          <select
            className={style.select}
            value={tag}
            onChange={tagChangeHandler}
          >
            {Array.from(new Set(kioq.map((quiz) => quiz.tag))).map((tag) => {
              return (
                <option value={tag} key={tag}>
                  {tag}
                </option>
              );
            })}
          </select>
          <div>
            <div className={style.quiz_title}>Quiz</div>
            <div className={style.quiz}>
              {kioq.filter((quiz) => quiz.tag === tag)[index]?.question}
            </div>
          </div>

          <div>
            <div className={style.answer_title}>Ans</div>
            <div className={`${style.answer} ${isOpen ? '' : style.close}`}>
              {kioq.filter((quiz) => quiz.tag === tag)[index]?.answer}
            </div>
          </div>
          <button onClick={indexChangeHandler} className={style.button}>
            {displayButtonMessage()}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;
