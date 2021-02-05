import { useDispatch } from 'react-redux';
import { deleteArticleThunk } from 'redux/slices/dataSlice';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

const AuthorArticleMenu = ({
  context, sure, setSure, setEditMode,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return <div className={styles.buttons}>
              <button
              onClick={() => { setSure(true); }}
                className={styles.deleteButton}>Delete</button>
              <div className={styles.sureContainer}>
                <div className={sure ? styles.sure : styles.hideSure}>
                  <span>Are you sure to delete this article?</span>
                  <div className={styles.sureButtons}>
                    <button
                      className={styles.sureButton}
                      onClick={() => { setSure(false); }}
                    >
                      No
                    </button>
                    <button
                      onClick={() => {
                        history.push('/');
                        dispatch(deleteArticleThunk(context.data.viewArticle.slug));
                      }}
                      className={styles.sureButton}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
              <button
                className={styles.editButton}
                onClick={() => { setEditMode(true); }}>Edit</button>
            </div>;
};
export default AuthorArticleMenu;
