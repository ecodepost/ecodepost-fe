import styles from '@/pages/LayoutCmt/Community.less';
import CommunitySidebar from '@/pages/CommunitySidebar/CommunitySidebar';
import {Outlet} from "@@/exports";

interface PropsType {}

export default (props: PropsType) => {
  console.log("CmtFront Update");
  return (
    <>
      <div className={styles.container_sidebar}>
        <CommunitySidebar/>
      </div>
      <div className={styles.container_content} >
        <Outlet/>
      </div>
    </>
  );
};
