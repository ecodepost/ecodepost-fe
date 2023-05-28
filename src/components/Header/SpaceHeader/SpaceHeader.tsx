import {useIntl, useModel} from 'umi';
import {useEffect, useState} from 'react';
import {Button, Col, Radio, Row} from 'antd';
import {GetApiSpacesGuid} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import {messageInfo} from '@/components/Message/Message';
import classNames from 'classnames';
import spaceHeaderStyle from './SpaceHeader.less';
import {pushFileCreate} from '@/utils/historypush/history';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import {PlusOutlined, SettingOutlined, UserAddOutlined} from '@ant-design/icons';
import {FileSortType} from '@/enums/sort';
import {SpaceType} from '@/enums/spacetype';
import SpaceSettingModal from '@/components/SpaceSettingModal/SpaceSettingModal';

interface SpaceHeaderInfo {
  spaceID: string;
  spacePms?: Spacev1GetSpacePermissionByUidRes;
  onChangeSortType?: (value) => Promise<void>;
}

const SpaceHeader = (props: SpaceHeaderInfo) => {
  const {
    initialState: {currentUser, checkLogin, isOnline},
  } = useModel('@@initialState');
  const { isNeedAddSpace, addSpace } = useModel('space');
  const { spacePms, spaceID, onChangeSortType } = props;
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const [booleanShowPanelSetting, setBooleanShowPanelSetting] = useState(false);
  const [spaceInfo, setSpaceInfo] = useState<Commonv1SpaceInfo>();

  const getSpaceInfo = useRequestX(GetApiSpacesGuid, {
    onSuccess(res) {
      if (res.code == 0) {
        setSpaceInfo(res.data);
      }
    },
    onError(e) {
      messageInfo({ type: 'error', content: `失败. ${e}` });
    },
  });

  useEffect(() => {
    getSpaceInfo.run(spaceID);
  }, []);

  return (
    <div className={spaceHeaderStyle.header} key={spaceID}>
      <div className={spaceHeaderStyle.sub_header}>
        <BreadCrumb spacePms={spacePms}/>
        <div className={spaceHeaderStyle.actions}>
          <Row align="middle" justify="end" gutter={20}>
            {spaceInfo?.spaceType == SpaceType.ARTICLE ||
            spaceInfo?.spaceType == SpaceType.QUESTION ? (
              <Col>
                <div className={spaceHeaderStyle.sub_header}>
                  <div className={spaceHeaderStyle.header_select}>
                    <Radio.Group
                      onChange={onChangeSortType}
                      defaultValue={FileSortType.SORT_CREATE_TIME}
                      className={spaceHeaderStyle.header_select_btn_group}
                    >
                      <Radio.Button
                        className={spaceHeaderStyle.header_select_btn}
                        value={FileSortType.SORT_CREATE_TIME}
                      >
                        {i('article.tab.post.new')}
                      </Radio.Button>
                      <Radio.Button
                        className={spaceHeaderStyle.header_select_btn}
                        value={FileSortType.SORT_HOT_SCORE}
                      >
                        {i('article.tab.post.popular')}
                      </Radio.Button>
                      <Radio.Button
                        className={spaceHeaderStyle.header_select_btn}
                        value={FileSortType.SORT_RECOMMEND_SCORE}
                      >
                        {i('article.tab.post.recommend')}
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  {spacePms && isNeedAddSpace != undefined && (
                    <Button
                      className={spaceHeaderStyle.header_btn}
                      type="primary"
                      onClick={() => pushFileCreate(spaceID)}
                      disabled={
                        // const spaceTopOption = selectedSpace?.spaceOptions.find((item) => item.spaceOptionId === 104);
                        isNeedAddSpace || !(spacePms?.isAllowCreateFile && currentUser != undefined)
                      }
                    >
                      <PlusOutlined />
                      <span>{i('article.tab.post.publish')}</span>
                    </Button>
                  )}
                </div>
              </Col>
            ) : null}
            {(spaceInfo?.spaceType == SpaceType.ARTICLE ||
              spaceInfo?.spaceType == SpaceType.QUESTION) && (
              <>
                <Col>
                  <i className={classNames('iconfont', 'icon-tongzhi', spaceHeaderStyle.icon)} />
                </Col>
                {spacePms?.isAllowManage && (
                  <Col>
                    <SettingOutlined
                      onClick={() => setBooleanShowPanelSetting(true)}
                      className={spaceHeaderStyle.icon}
                    />
                  </Col>
                )}
              </>
            )}
            {isNeedAddSpace && (
              <Col>
                <Button
                  className={spaceHeaderStyle.header_btn}
                  type="primary"
                  onClick={() => {
                    if (isOnline()) {
                      addSpace();
                    } else {
                      checkLogin();
                    }
                  }}
                >
                  <UserAddOutlined/>
                  <span>加入空间</span>
                </Button>
              </Col>
            )}
            {spaceInfo?.spaceType == SpaceType.QUESTION && <></>}
            {spaceInfo?.spaceType == SpaceType.COLUMN && <></>}
            {!currentUser && (
              <Col>
                <Button
                  onClick={() => {
                    checkLogin();
                  }}
                >
                  登录
                </Button>
              </Col>
            )}
          </Row>
        </div>
        <SpaceSettingModal
          key={spaceID}
          visible={booleanShowPanelSetting}
          spaceGuid={spaceID}
          onClose={(event) => {
            event.stopPropagation();
            setBooleanShowPanelSetting(false);
          }}
          count={0}
        />
      </div>
    </div>
  );
};

export default SpaceHeader;
