import { Segmented as SegmentedAntd } from 'antd';
import styles from './Segmented.less';

interface SegmentedProps {
  defaultValue?: string;
  options: string[];
  onChange?: (value: any) => void;
  style?: React.CSSProperties;
}

const Segmented: React.FC<SegmentedProps> = (props) => {
  const { defaultValue, options, onChange } = props;
  return (
    <div className={styles.container}>
      <SegmentedAntd defaultValue={defaultValue} options={options} onChange={onChange} />
    </div>
  );
};

export default Segmented;
