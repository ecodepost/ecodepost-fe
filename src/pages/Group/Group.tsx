import { message, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import type { IRoute } from 'umi';
import { useModel, useParams, useIntl } from '@umijs/max';
import styles from './Group.less';
import SpaceCard from './SpaceCard/SpaceCard';
import GroupBlocked from './GroupBlocked/GroupBlocked';
import { Visibility } from '@/enums/visibilitylevel';
import type { Space } from '@/pages/typings';
import {
  GetApiSpacesGroupsGuidPermission,
  GetApiSpacesMemberStatus,
} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import GroupHeader from '@/components/Header/GroupHeader/GroupHeader';

const Group = (props: IRoute) => {
  const { groupGuid } = useParams<{ groupGuid: string }>();
  const { setSelectedSpaceGroup, spaceGroupMap, spaceTreeLoading } = useModel('community');
  const [groupPmsLoading, setGroupPmsLoading] = useState<boolean>(true);
  const [groupPms, setGroupPms] = useState<Spacev1GetSpacePermissionByUidRes>();
  const [memberStatus, setMemberStatus] = useState<Spacev1MemberStatus[]>([]);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const { getCurrentTitle } = useModel('community');
  document.title = getCurrentTitle(i('title.base'), {
    title_group: i('title.group'),
  });

  const GetApiSpacesMemberStatusRequest = useRequestX(GetApiSpacesMemberStatus, {
    onSuccess(res) {
      setMemberStatus(res.data || []);
    },
  });

  const GetApiSpacesGroupsGuidPermissionRequest = useRequestX(GetApiSpacesGroupsGuidPermission, {
    onSuccess: (res) => {
      setGroupPms(res.data);
      setGroupPmsLoading(false);
    },
  });

  const fetchGroupPms = async (guid: string) => {
    setGroupPmsLoading(true);
    GetApiSpacesGroupsGuidPermissionRequest.run(guid);
  };

  const fetchMemberStatus = async (groupID: string) => {
    const spaceGuids = spaceGroupMap.get(groupID)?.children?.map((item) => item.guid);
    if (spaceGuids?.length > 0) {
      GetApiSpacesMemberStatusRequest.run({
        guids: spaceGuids,
      });
    }
  };

  const getSpaceMemberStatus = (space: Space) => {
    return memberStatus.find((item) => item.spaceGuid === space.guid);
  };

  // 有两种情况会触发
  // 1 直接访问该页面
  // 2 点击左侧导航栏，选中了某个space，那么这个时候，不能在选中
  useEffect(() => {
    if (groupGuid && !spaceTreeLoading) {
      setSelectedSpaceGroup(groupGuid);
      fetchMemberStatus(groupGuid);
    }
  }, [groupGuid, spaceTreeLoading]);

  useEffect(() => {
    setGroupPmsLoading(true);
    // setSelectedSpaceGroup(groupGuid);
    fetchGroupPms(groupGuid);
    return () => {
      message.destroy();
    };
  }, [location]);

  return (
    <div>
      <GroupHeader></GroupHeader>
      <Spin spinning={groupPmsLoading}>
        {groupPms && (
          <div style={{ overflowY: 'auto' }} className={styles.container}>
            {groupPms.isAllowView ? (
              <div className={styles.content}>
                <div style={{ margin: '32px 0' }}>
                  <Row gutter={[32, 32]}>
                    {spaceGroupMap.get(groupGuid)?.children?.map((space) => (
                      <SpaceCard
                        key={space.guid}
                        space={space}
                        type={0}
                        groupid={groupGuid}
                        memberStatus={getSpaceMemberStatus(space)}
                        fetchMemberStatus={fetchMemberStatus}
                      />
                    ))}
                    {/* 空的创建空间的space card */}
                    {spaceGroupMap.get(groupGuid)?.isAllowCreateSpace === 1 && (
                      <SpaceCard type={1} groupid={groupGuid} space={{} as Space} />
                    )}
                  </Row>
                </div>
              </div>
            ) : (
              <GroupBlocked
                // visibility={groupsMap.get(groupGuid)?.visibility || Visibility.INVALID}
                visibility={Visibility.INTERNAL}
                key={groupGuid}
                groupPms={groupPms}
              />
            )}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default Group;
