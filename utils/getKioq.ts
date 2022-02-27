import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.d';
import type { Kioq, Quiz } from '@/types/kioq';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const database = async () =>
  await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
    sorts: [
      {
        property: 'created_at',
        direction: 'descending',
      },
    ],
  });

type Text = {
  type: string;
  text: { content: string; link: null };
  annotations: {
    bold: false;
    italic: false;
    strikethrough: false;
    underline: false;
    code: false;
    color: string;
  };
  plain_text: string;
  href: null;
};
type Select = {
  id: string;
  name: string;
  color: string;
};
type Page = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { object: string; id: string };
  last_edited_by: { object: string; id: string };
  cover: null;
  icon: null;
  parent: {
    type: string;
    database_id: string;
  };
  archived: false;
  properties: {
    answer: { id: string; type: 'rich_text'; rich_text: Array<Text> };
    tag: {
      id: string;
      type: 'select';
      select: Select;
    };
    updated_at: {
      id: string;
      type: string;
      last_edited_time: string;
    };
    created_at: {
      id: string;
      type: string;
      created_time: string;
    };
    question: { id: string; type: string; title: Array<Text> };
  };
  url: string;
};

const convertKioq = (db: QueryDatabaseResponse): Kioq => {
  return db.results.map((rawPage): Quiz => {
    const page = rawPage as Page;
    const answer = page.properties.answer.rich_text.map(
      (e) => e.text.content,
    )[0];
    const tag = page.properties.tag.select.name;
    const question = page.properties.question.title.map(
      (e) => e.text.content,
    )[0];
    return { tag, question, answer };
  });
};

const getKioq = async () => {
  const db = await database();
  return convertKioq(db);
};

export { getKioq };
