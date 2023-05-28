import {useDebounceFn} from 'ahooks';
import {Button, message, notification} from 'antd';
import {CopyOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {messageInfo} from "@/components/Message/Message";

require('lodash');

type ResInfo<T> = Res<T>;
type ResDataInfo<T> = T;

export interface ErrorWithResponse<T> extends Error {
  response?: ResInfo<T>;
}

function newError<T>(res: ResInfo<T>): ErrorWithResponse<T> {
  return {
    name: res.msg,
    message: res.msg,
    response: res,
  };
}

export interface RequestOptions<R, P extends any[]> {
  // 请求参数
  // 自动执行时使用本参数进行请求
  params?: P[];

  // 默认 loading 状态. default false
  defaultLoading?: boolean;

  // 防抖等待时间 (ms). default 1000ms
  debounceWait?: number;

  beforeRequest?: (params: P) => void;

  // service throw exception 时回调
  onError?: (e: any) => void | boolean;

  // service 调用成功后回调. 如果返回 false, 则不进行后续的异常提示
  onSuccess?: (res: ResInfo<R>) => void | boolean;

  // 加载的文字提示. 设置为 false 则不显示.
  loadingText?:
    | {
        loading?: string; // 正在加载中的文字提示
        done?: string; // 加载成功的文字提示
      }
    | false;
}

export interface RequestType<R, P extends any[]> {
  // 响应的数据
  data?: ResDataInfo<R>;

  // 分页数据 (如果有的话)
  pagination?: Commonv1Pagination;

  // loading状态
  loading: boolean;

  // 发起请求，返回值是 service 的响应值
  run: (...args: P) => Promise<ResInfo<R> | undefined>;

  // 防抖模式执行, 无返回值
  debounceRun: (args: P) => void;
}

const defaultOptions = <R, P extends any[]>(): {
  defaultParams: any[];
  debounceWait: number;
  defaultLoading: boolean;
} => {
  return {
    // deps: undefined,
    defaultLoading: false,
    // loadingText: {
    //   loading: '正在加载',
    //   done: '加载成功',
    // },
    defaultParams: [],
    debounceWait: 500,
  };
};

function convertHeaders(h?: Headers) {
  const ret: any[] = [];
  //
  // h?.forEach((val, key) => {
  //   ret.push({
  //     key,
  //     val,
  //   });
  // });

  return ret;
}

function useRequestX<R = any, P extends any[] = any>(
  service: (...args: P) => Promise<ResInfo<R>>,
  options?: RequestOptions<R, P>,
): RequestType<R, P> {
  const {defaultLoading, debounceWait, onError, onSuccess, beforeRequest, loadingText} = {
    ...defaultOptions<R, P>(),
    ...options,
  } as RequestOptions<R, P>;
  const [data, setData] = useState<ResDataInfo<R>>();
  const [pagination, setPagination] = useState<Commonv1Pagination>();
  const [loading, setLoading] = useState<boolean>(!!defaultLoading);

  const showError = (resData: ResInfo<R>, res?: Response, req?: Request) => {
    const resText = JSON.stringify({
      resData,
      response: res && {
        headers: res?.headers ? convertHeaders(res?.headers) : undefined,
        ok: res?.ok,
        redirected: res?.redirected,
        status: res?.status,
        statusText: res?.statusText,
        // trailer: res?.trailer,
        type: res?.type,
        url: res?.url,
      },
      request: req && {
        url: req?.url,
        headers: req?.headers && convertHeaders(req?.headers),
        method: req?.method,
        referer: req?.referrer,
      },
    });
    if (!resData) {
      return;
    }

    switch (resData?.code) {
      case 203:
        resData.msg = '用户未登录';
    }

    notification.error({
      message: '请求失败',
      description: (
        <div>
          <div>错误: {resData?.msg || '未知错误, 请联系负责人'}</div>
          {resData.traceId && <div>Trace ID: {resData?.traceId}</div>}
          <div style={{ marginTop: '10px' }}>
            <Button
              size="small"
              type="primary"
              shape="round"
              style={{ marginRight: '10px' }}
              onClick={() => {
                navigator.clipboard.writeText(resText);
              }}
            >
              <CopyOutlined />
              复制错误信息
            </Button>
          </div>
        </div>
      ),
    });
  };

  const handleRes = (res: ResInfo<R>) => {
    setData(res?.data);
    // https://segmentfault.com/q/1010000039688789
    // https://jkchao.github.io/typescript-book-chinese/typings/discrominatedUnion.html#%E8%AF%A6%E7%BB%86%E7%9A%84%E6%A3%80%E6%9F%A5
    // 根据不同类型，执行不同方式代码
    if ('pagination' in res) {
      setPagination(res?.pagination);
    }

    // 错误提示
    if (res.code !== 0) {
      const skipMsg = onError && onError(newError(res)) === false;
      if (skipMsg) return;
      showError(res);
      return;
    }

    if (loadingText && loadingText?.done) {
      messageInfo({
        type: "success",
        content: loadingText.done
      })
    }

    if (onSuccess) onSuccess(res);
  };

  const handleError = (e: any) => {
    console.error('useRequestX: catch an error while call service', e);
    const skipMsg = onError && onError(e) === false;
    if (skipMsg) return;
    showError(e.data, e.response, e.request);
  };

  const handleReq = async (args: P) => {
    let hideLoading = () => {
    };
    beforeRequest?.(args)

    if (loadingText && loadingText?.loading) {
      hideLoading = message.loading(loadingText?.loading);
    }

    try {
      const res = await service(...args);
      handleRes(res);

      hideLoading();
      setLoading(false);

      return res;
    } catch (e) {
      handleError(e);
      hideLoading();
      setLoading(false);
    }
    return null;
  };

  const debounceService = useDebounceFn(
    async (args: P) => {
      await handleReq(args);
    },
    { wait: debounceWait },
  );

  const debounceRun = (args: P) => {
    setLoading(true);
    debounceService.run(args);
  };

  const run = async (...args: P) => {
    setLoading(true);
    return await handleReq(args);
  };

  return {
    data,
    pagination,
    loading,
    run,
    debounceRun,
  };
}

export default useRequestX;
