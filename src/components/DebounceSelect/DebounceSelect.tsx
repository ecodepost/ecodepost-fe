import {searchItems} from '@/services/search/api';
import {Empty, Select, Spin} from 'antd';
import type {SelectProps} from 'antd/es/select';
import {debounce} from 'lodash';
import {useMemo, useRef, useState} from 'react';
import {history, useModel, useParams} from 'umi';
import {messageInfo} from '@/components/Message/Message';

const {Option, OptGroup} = Select;

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  debounceTimeout?: number;
  prefix: React.ReactNode;
  bizType: string;
  innerClass: string;
}

const BizTypeMap = {
  BIZ_TYPE_ACTIVITY: '活动',
  BIZ_TYPE_ANSWER: '回答',
  BIZ_TYPE_ARTICLE: '文章',
  BIZ_TYPE_COMMUNITY: '社区',
  BIZ_TYPE_QUESTION: '提问',
  BIZ_TYPE_SPACE: '空间',
  BIZ_TYPE_USER: '用户',
};

const fetchOptions = async (keyword: string, bizType: string) => {
  try {
    const res = await searchItems(keyword, bizType);
    if (res.code === 0) {
      return res.data;
    } else {
      messageInfo({
        type: 'error',
        content: res.msg,
      });
    }
  } catch (err) {
    messageInfo({
      type: 'error',
      content: '搜索失败',
    });
  }
};

function DebounceSelect({
  debounceTimeout = 800,
  prefix,
  bizType,
  innerClass,
  ...props
}: DebounceSelectProps<any>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const fetchRef = useRef(0);
  const selectRef = useRef(null);
  const { spaceGuid } = useParams<{ spaceGuid: string }>();

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      if (value === '') {
        setOptions([]);
        return;
      }
      history.push({ pathname: '/search', query: { keyword: value } });
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value, bizType.toString()).then((data) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(data);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, bizType]);

  return (
    <Select
      ref={selectRef}
      className={innerClass}
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
      suffixIcon={prefix}
      onBlur={() => setOptions([])}
      value={[]}
      onSelect={(value: string, info: any) => {
        const type = info['data-type'];
        switch (type) {
          case 'BIZ_TYPE_ACTIVITY':
          case 'BIZ_TYPE_ANSWER':
          case 'BIZ_TYPE_QUESTION':
          case 'BIZ_TYPE_ARTICLE':
            history.push(`/s/${spaceGuid}/d/${value}`);
            break;
          // case 'BIZ_TYPE_COMMUNITY':
          //   handleChangeCommunityByGuid(value);
            break;
          case 'BIZ_TYPE_SPACE':
            history.push(`/s/${value}`);
            break;
          case 'BIZ_TYPE_USER':
            // history.push()
            break;
        }
        setOptions([]);
        /** @ts-ignore */
        selectRef?.current?.blur?.();
      }}
      {...props}
    >
      {Object.keys(options).map((key: string) => {
        const group = options[key];
        return group?.length > 0 ? (
          <OptGroup label={BizTypeMap[key]} key={key}>
            {group?.map((item: any) => {
              const { Payload } = item;
              const el = Payload[Object.keys(Payload)?.[0]];
              return (
                <Option key={el.guid} data-type={key}>
                  {el.name}-{el.guid}
                </Option>
              );
            })}
          </OptGroup>
        ) : null;
      })}
    </Select>
  );
}

export default DebounceSelect;
