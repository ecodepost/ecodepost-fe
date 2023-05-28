import CreateSpace from '@/components/Space/CreateSpace/CreateSpace';
import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Col } from 'antd';
import React, { useState } from 'react';
import { useIntl, useParams } from '@umijs/max';
import styles from './SpaceCard.less';
import { pushFileList } from '@/utils/historypush/history';
import type { Space } from '@/pages/typings';
import useRequestX from '@/hooks/useRequestX';
import { PostApiSpacesGuidApply, PostApiSpacesGuidQuit } from '@/services/base/api.gen';
import { messageInfo } from '@/components/Message/Message';
import SpaceSettingModal from '@/components/SpaceSettingModal/SpaceSettingModal';
import { SpaceType } from '@/enums/spacetype';

interface SpaceCardProps {
  type: number;
  space: Space;
  groupid: string;
  fetchMemberStatus?: (groupID: string) => Promise<void>;
  memberStatus?: Spacev1MemberStatus;
}

const SpaceCard: React.FC<SpaceCardProps> = (props) => {
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const [booleanShowPanelSetting, setBooleanShowPanelSetting] = useState(false);

  /** type 0普通卡片 1空卡片 */
  const { type, space, groupid, memberStatus, fetchMemberStatus } = props;

  console.log('space', space);
  const [addSpaceVisible, setAddSpaceVisible] = useState<boolean>(false);

  const PostApiSpacesGuidQuitRequest = useRequestX(PostApiSpacesGuidQuit, {
    onSuccess: (res) => {
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('group.quit.success'),
        });
        fetchMemberStatus?.(groupid);
      }
    },
  });

  const PostApiSpacesGuidApplyRequest = useRequestX(PostApiSpacesGuidApply, {
    onSuccess: (res) => {
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('group.apply.success'),
        });
        fetchMemberStatus?.(groupid);
      }
    },
  });

  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
      <div className={type === 0 ? styles.container : styles.container_empty}>
        {type === 0 && (
          <>
            <div
              className={styles.content}
              onClick={() => {
                if (type === 0) {
                  if (space.spaceType === SpaceType.LINK) {
                    const w = window.open('about:blank');
                    if (space.link) {
                      w.location.href = space.link;
                    }
                    return;
                  }
                  pushFileList(space.guid);
                } else if (type === 1) {
                  setAddSpaceVisible(true);
                }
              }}
            >
              <div className={styles.card_icon}>
                <span className={styles.icon}>{space?.icon || '#'}</span>
              </div>
              <div className={styles.card_title}>
                <span>{space?.name}</span>
              </div>
              {/* <div className={styles.card_sum}>
                <span>
                  {space?.memberCnt || 0}
                  {i('group.space.card.member.count')}
                </span>
              </div> */}
            </div>
            <div className={styles.card_button_container}>
              {memberStatus != undefined &&
                (memberStatus.isMember ? (
                  <Button
                    className={styles.card_button}
                    onClick={(event) => {
                      PostApiSpacesGuidQuitRequest.run(space?.guid, {
                        reason: '',
                      });
                      event.nativeEvent.stopPropagation();
                      event.stopPropagation();
                    }}
                  >
                    {i('group.quit')}
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    className={styles.card_button}
                    onClick={(event) => {
                      PostApiSpacesGuidApplyRequest.run(space?.guid, {
                        reason: '',
                      });
                      event.nativeEvent.stopPropagation();
                      event.stopPropagation();
                    }}
                  >
                    {i('group.apply')}
                  </Button>
                ))}
              {memberStatus?.isAllowManage && (
                <Button
                  className={styles.card_button}
                  onClick={(event) => {
                    event.stopPropagation();
                    setBooleanShowPanelSetting(true);
                  }}
                >
                  设置空间
                </Button>
              )}
            </div>
          </>
        )}
        {type === 1 && (
          <>
            <div className={styles.content}>
              <div className={styles.card_icon}>
                <PlusCircleFilled className={styles.card_icon_add} />
              </div>
              <div className={styles.card_title}>
                <span>{i('group.space.card.new')}</span>
              </div>
            </div>
            <CreateSpace
              visible={addSpaceVisible}
              onClose={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                setAddSpaceVisible(() => false);
                e.stopPropagation();
              }}
              groupGuid={groupid}
            />
          </>
        )}
      </div>
      {type === 0 && space && (
        <SpaceSettingModal
          key={space?.guid}
          visible={booleanShowPanelSetting}
          spaceGuid={space?.guid}
          onClose={(event) => {
            event.stopPropagation();
            setBooleanShowPanelSetting(false);
          }}
          count={0}
        />
      )}
    </Col>
  );
};

export default SpaceCard;
