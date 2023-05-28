import React, {useMemo, useRef, useState} from 'react';
import styles from '@/pages/CmtAdmin/Manage/SuperAdmin/SuperAdminModal.less';
import {Avatar, Empty, Select, Spin} from 'antd';
import type {SelectProps} from 'antd/es/select';
import {debounce} from 'lodash';

interface DebounceSelectProps<ValueType extends {
  key?: string;
  label: React.ReactNode;
  value: string | number;
  uid: number;
  avatar: string;
  nickname: string;
} = any,
> extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<Userv1UserInfo[]>;
  debounceTimeout?: number;
  selectedUsers: Userv1UserInfo[];
  setSelectedUsers: (selectedUsers: Userv1UserInfo[]) => void;
}

const DebounceSelect: React.FC<DebounceSelectProps> = ({
  fetchOptions,
  debounceTimeout = 800,
  selectedUsers,
  setSelectedUsers,
  ...props
}: DebounceSelectProps<any>) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<Userv1UserInfo[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      if (value === '') {
        setOptions([]);
        return;
      }
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        console.log('newOptions', newOptions);

        const newOpts = newOptions?.map((opt) => {
          return {
            ...opt,
            key: opt.uid,
            value: opt.nickname,
            avatar: opt.avatar,
            label: (
              <div className={styles.opt}>
                <Avatar size={40} src={opt.avatar} />
                <span className={styles.opt_name}>{opt.nickname}</span>
              </div>
            ),
          };
        });
        console.log("newOpts", newOpts)
        setOptions(newOpts);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      showSearch
      labelInValue
      onSelect={(el: any) => {
        console.log("select options", options)
        console.log("select options2", el)
        setSelectedUsers([...selectedUsers, options.find((opt) => opt.uid === el.key)])
      }}
      onChange={(el: any) => {
        console.log("select change", el)
      }}
      onDeselect={(el: any) => setSelectedUsers(selectedUsers.filter((opt) => opt.uid !== el.key))}
      optionLabelProp="value"
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small"/> : <Empty/>}
      {...props}
      options={options}
    />
  );
};
export default DebounceSelect;
