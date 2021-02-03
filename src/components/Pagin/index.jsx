import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setPage } from 'redux/slices/dataSlice';
import styles from './styles.module.scss';

const Pagin = () => {
  const dispatch = useDispatch();
  const context = useSelector((state) => state);
  const changePage = (page) => {
    dispatch(setPage({ page }));
  };
  return context.data.totalPages === null
    ? null
    : <div className={styles.paginContainer}>
      <Pagination
        current={context.data.page}
        defaultCurrent={1}
        onChange={changePage}
        total={context.data.totalPages}
      />
    </div>;
};

export default Pagin;
