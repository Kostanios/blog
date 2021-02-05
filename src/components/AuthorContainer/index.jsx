import dateFormat from 'dateformat/lib/dateformat';
import User from 'assets/SVG/User.svg';
import styles from './styles.module.scss';

const AuthorContainer = ({ context }) => <div className={styles.authorContainer}>
<div className={styles.data_name}>
    <div className={styles.name}>{context.data.viewArticle.author.username}</div>
    <div
      className={styles.data}
    >
      {dateFormat(new Date(context.data.viewArticle.createdAt.slice(0, 10)), 'mmmm dS, yyyy')}
    </div>
</div>
<img
  className={styles.avatar}
  src={context.data.viewArticle.author.image
    ? context.data.viewArticle.author.image
    : User}
  alt={''}/>
</div>;

export default AuthorContainer;
