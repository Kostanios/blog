import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import Article from '../Article';
import { getArticlesThunk } from '../../redux/slices/dataSlice';
import Pagin from '../Pagin';

const Collection = () => {
  const dispatch = useDispatch();
  const context = useSelector((state) => state);
  useEffect(() => {
    dispatch(getArticlesThunk(context.data.page));
  }, [context.data.page]);

  return <div className={styles.collection}>
    {context.data.articles.map((article) => <Article
        article={article}
        key={article.title + article.createdAt}
    />)}
    <Pagin/>
</div>;
};
export default Collection;
