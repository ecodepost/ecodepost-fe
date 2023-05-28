import React, {useEffect, useState} from 'react';
import {Spin} from 'antd';
import {messageInfo} from '@/components/Message/Message';
import {GetApiIntgsQuery} from '@/services/base/api.gen';
import Echart from '@/components/Panel/Component/Echart';
import Stat from '@/components/Panel/Component/Stat';

interface PanelProps {
  mountId: string; // 绑定名称
  panelKey: string; // panel唯一Key名, 比如 "gh_v1_overview"
  st: number; // 开始时间戳, 秒
  et: number; // 终止时间戳, 秒
  type: string; // 集成类型, 比如 "github"
}

const Panel: React.FC<PanelProps> = (props) => {
  const { mountId, panelKey, st, et, type } = props;
  // const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [data, setData] = useState<AppPanel>();

  const handleData = async () => {
    // setDataLoading(true);
    try {
      const res = await GetApiIntgsQuery({
        et: et,
        key: panelKey,
        st: st,
        type: type,
      });

      if (res.code !== 0) {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
        return;
      }
      // setDataLoading(false);
      setData(res.data);
    } catch (err) {
      // messageInfo({
      //   type: 'error',
      //   content: '获取数据错误'+err,
      // });
    }
  };

  const getDiv = (mountId, data: AppPanel) => {
    switch (data.type) {
      case 'timeseries':
        return <Echart mountId={mountId} data={data} />;
      case 'stat':
        return <Stat data={data} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (st && et) {
      handleData().then((r) => {});
    }
  }, [st, et]);

  return !data ? <Spin /> : getDiv(mountId, data);
};

export default Panel;
