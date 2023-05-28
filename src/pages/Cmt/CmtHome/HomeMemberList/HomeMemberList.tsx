import {useIntl} from "umi";
import styles from "@/pages/Cmt/CmtHome/Home.less";
import {pushUserPage} from "@/utils/historypush/history";
import {Avatar, Col, Row} from "antd";
import {memo, useEffect, useState} from "react";
import useRequestX from "@/hooks/useRequestX";
import {GetApiCmtManagers} from "@/services/base/api.gen";


const HomeMemberList = () => {
  console.log("HomeMemberList Update")
  const [cmtAdminInfo, setCmtAdminInfo] = useState<Pmsv1MemberInfo[]>([]);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  // 获取社区管理员信息 GetApiCmtManagers
  const GetApiCmtManagersRequest = useRequestX(() => GetApiCmtManagers(), {
    onSuccess: (res) => {
      setCmtAdminInfo([...res.data.list]);
    },
  });
  useEffect(() => {
    GetApiCmtManagersRequest.run()
  }, []);

  const PmsRoleTypeTextMap = [
    '',
    i('pmsroletype.creator'),
    i('pmsroletype.superAdmin'),
    i('pmsroletype.admin'),
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_title}>管理员</div>
      <div className={styles.member_list}>
        {cmtAdminInfo.map((item) => {
          return (
            <div
              className={styles.member_item}
              key={item.uid}
              onClick={() => {
                pushUserPage(item.name);
              }}
            >
              <Row gutter={20}>
                <Col span={5}>
                  <Avatar src={item.avatar} size={36}/>
                </Col>
                <Col span={19}>
                  <Row justify="start">
                    <div className={styles.member_item_name}>{item.nickname}</div>
                    <div>
                        <span className={styles.member_item_position}>
                          {PmsRoleTypeTextMap[item.pmsManagerType]}
                        </span>
                    </div>
                  </Row>
                  <div className={styles.member_item_desc}>
                    {item.position ? item.position : '这家伙很懒，什么都没写。'}
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(HomeMemberList);
