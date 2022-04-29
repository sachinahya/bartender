import { FC } from 'react';

import { Progress } from '../../components/progress';

import { Layout, Main } from './layout';
import * as styles from './loading-view.css';

export const LoadingView: FC = () => {
  return (
    <Layout>
      <Main className={styles.main}>
        <Progress className={styles.loader} />
      </Main>
    </Layout>
  );
};
