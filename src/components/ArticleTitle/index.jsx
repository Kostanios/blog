import { useDispatch } from 'react-redux';
import Like from 'assets/SVG/Like.svg';
import FavoriteLike from 'assets/SVG/FavoriteLike.svg';
import { likeArticleThunk } from 'redux/slices/dataSlice';
import styles from './styles.module.scss';

const ArticleTitle = ({
  context, favorite, setFavorite, likeCount, setLikeCount,
}) => {
  const dispatch = useDispatch();
  return <div>
    <div className={styles.titleLine}>
        <header className={styles.title}>
            {context.data.viewArticle.title}
        </header>
        <div className={styles.likeContainer}>
            <img onClick={() => {
              if (!favorite) {
                setFavorite(true);
                setLikeCount(likeCount + 1);
              }
              dispatch(likeArticleThunk(context.data.viewArticle.slug));
            }} src={ favorite ? FavoriteLike : Like} alt=''/>
            <span>{context.data.viewArticle.favoritesCount >= 0 ? likeCount : ''}</span>
        </div>
    </div>
    <div className={styles.tags}>
      {context.data.viewArticle.tagList.map((tagName) => <div key={tagName} className={styles.tag}>{`${tagName}`}</div>)}
    </div>
</div>;
};

export default ArticleTitle;
