import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spin } from 'antd';
import Pagin from 'components/Pagin';
import Article from 'components/Article';
import { getArticlesThunk } from 'redux/slices/dataSlice';
import styles from './styles.module.scss';

const Collection = () => {
  const dispatch = useDispatch();
  const context = useSelector((state) => state);
  useEffect(() => {
    dispatch(getArticlesThunk(context.data.page));
  }, [context.data.page]);

  return <div className={styles.collection}>
    {context.data.isLoading ? <Spin size='large'/>
      : <>
      {
      context.data.articles.map((article) => <Article
        article={article}
        key={article.title + article.createdAt}
      />)
      }
    <Pagin/>
    </>
    }
    </div>;
};
export default Collection;
