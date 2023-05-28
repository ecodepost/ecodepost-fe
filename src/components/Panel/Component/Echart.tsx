import * as echarts from 'echarts/core';
import {GridComponent, LegendComponent, TooltipComponent} from 'echarts/components';
import {LineChart} from 'echarts/charts';
import {UniversalTransition} from 'echarts/features';
import {SVGRenderer} from 'echarts/renderers';
import React, {useEffect, useState} from 'react';
import styles from './Echart.less';

echarts.use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  SVGRenderer,
  UniversalTransition,
]);

interface EchartProps {
  mountId: string; // 绑定名称
  data: AppPanel; //
}

const Echart: React.FC<EchartProps> = (props) => {
  const { mountId, data } = props;
  const [listener, setListener] = useState<any>();

  const handleData = async () => {
    const chartDom = document.getElementById(mountId)!;
    let myChart = echarts?.getInstanceByDom(chartDom);
    if (!myChart) {
      myChart = echarts.init(chartDom);
    }
    /** @ts-ignore */
    const el = window.addEventListener('resize', myChart.resize);
    setListener(el);

    // 一个target只有一个ql, 一个panel可能有多个target, 初期默认所有panel都只有1个target
    const target = data.targets[0];
    // cols表示数据实体中包含的所有字段
    const cols = target.meta.cols;
    const targetData = target.data;
    if (targetData == null) {
      return;
    }

    const allData = cols.map((colItem) => {
      const seriesData = targetData.map((item: any) => item[colItem.name]);
      return {
        name: colItem.name,
        type: 'line',
        data: seriesData,
      };
    });
    // 一个serie,表示一个和时间相关的连续数据序列,一个serie渲染出来就是一条折线
    const series = allData.filter((item) => item.name !== target.meta.timeCol);
    const xAxisData = targetData.map((item: any) => item[target.meta.timeCol]);

    const xAxis = {
      type: 'category',
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0.0800)',
          width: 1,
        },
      },
      axisLabel: {
        show: true,
        color: 'var(--themeColorButtonText)',
      },
    };

    const option = {
      // title: { text: res.data.title },
      xAxis: xAxis,
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          color: 'var(--themeColorButtonText)',
        },
      },
      grid: {
        top: 20,
        left: 50,
        right: 34,
      },
      series: series,
      legend: {
        data: [
          {
            name,
            icon: 'circle',
          },
        ],
        selectedMode: false,
        x: 'center',
        y: 'bottom',
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.8000)',
        borderColor: 'rgba(0,0,0,0.8000)',
        borderWidth: 1,
        textStyle: {
          color: '#fff',
          fontSize: '12',
        },
        color: '#1890FF',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
    };
    myChart.setOption(option);
  };

  useEffect(() => {
    if (data) {
      handleData().then((r) => {});
    }
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [data]);

  return <div className={styles.container} id={mountId} style={{ height: 300 }} />;
};

export default Echart;
