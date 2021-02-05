/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux';
import md from 'markdown';
import { useState } from 'react';

import AuthorArticleMenu from 'components/AuthorArticleMenu';
import ArticleInitPage from 'components/ArticleInitPage';
import ArticleTitle from 'components/ArticleTitle';
import AuthorContainer from 'components/AuthorContainer';
import styles from './styles.module.scss';

const { markdown } = md;

const ArticleView = () => {
  const context = useSelector((state) => state);
  const [sure, setSure] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [favorite, setFavorite] = useState(context.data.viewArticle.favorited);
  const [likeCount, setLikeCount] = useState(context.data.viewArticle.favoritesCount);
  const currentUsername = context.auth.currentUser ? context.auth.currentUser.username : '';
  if (!editMode) {
    return <div className={styles.container}>
    <div className={styles.ArticleView}>
      <div className={styles.headerContainer}>
        <ArticleTitle
          context={context}
          favorite={favorite}
          setFavorite={setFavorite}
          likeCount={likeCount}
          setLikeCount={setLikeCount}
        />
        <AuthorContainer context={context}/>
      </div>
      <div className={styles.descriptionAndButtons}>
        <p className={styles.description}
          dangerouslySetInnerHTML={
            { __html: markdown.toHTML(context.data.viewArticle.description) }
          }
        ></p>
        {context.data.viewArticle.author.username !== currentUsername
          ? null
          : <AuthorArticleMenu
              context={context}
              sure={sure}
              setSure={setSure}
              setEditMode={setEditMode}
            />
        }
      </div>
      <p className={styles.body}
        dangerouslySetInnerHTML={{ __html: markdown.toHTML(context.data.viewArticle.body) }}
      ></p>
  </div>
  </div>;
  }
  return <ArticleInitPage slug={context.data.viewArticle.slug} />;
};
export default ArticleView;
