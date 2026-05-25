import type { NotFound } from '../en/404';

const notFound: NotFound = {
  meta: {
    title: '页面未找到',
    description: '您访问的页面不存在。',
  },
  heading: '页面未找到',
  body: '您访问的页面不存在或已被移动。',
  cta: '返回首页',
};

export default notFound;
