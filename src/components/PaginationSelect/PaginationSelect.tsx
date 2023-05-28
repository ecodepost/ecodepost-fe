import { Empty, Form, Select, Spin } from 'antd';
import LoadMore from '../LoadMore/LoadMore';

interface PaginationSelectProps {
  id: string;
  formItemName: string;
  requiredText: string;
  placeholderText: string;
  list: any[];
  listLoading: boolean;
  total: number;
  children: React.ReactNode;
  fetchList: () => void;
}

const PaginationSelect: React.FC<PaginationSelectProps> = (props) => {
  const {
    id,
    requiredText,
    list,
    listLoading,
    total,
    fetchList,
    formItemName,
    placeholderText,
    children,
  } = props;
  return (
    <Form.Item
      name={formItemName}
      rules={[
        {
          required: true,
          message: requiredText,
        },
      ]}
    >
      <Select
        placeholder={placeholderText}
        optionLabelProp="value"
        labelInValue
        notFoundContent={listLoading ? <Spin size="small" /> : <Empty />}
        options={list.map((item, i) => ({
          ...item,
          key: item.id,
          value: item.name,
          label: (
            <div key={item.id}>
              {children}
              {i === list.length - 1 && (
                <LoadMore
                  id={id}
                  haveMore={list.length < total}
                  onLoadMore={fetchList}
                  marginTop={0}
                />
              )}
            </div>
          ),
        }))}
      />
    </Form.Item>
  );
};

export default PaginationSelect;
