// import type { RequestOptions } from '@@/plugin-request/request';
import type {RequestConfig} from '@umijs/max';
// import request from "@/utils/requestUtils/request";
// import queryString from "query-string";
import queryString from "querystring";

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
// interface ResponseStructure {
//   code: number;
//   msg: string;
//   data: any;
//   traceId?: string;
//   pagination?: Commonv1Pagination;
// }


/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 加入这个才行。新版本改版。。
  paramsSerializer(params) {
    return queryString.stringify(params);
  },
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      // const { code, data, msg } =
      //   res as unknown as Res<any>;
      // if (!success) {
      //   const error: any = new Error(errorMessage);
      //   error.name = 'BizError';
      //   error.info = { errorCode, errorMessage, showType, data };
      //   throw error; // 抛出自制的错误
      // }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      //   if (opts?.skipErrorHandler) throw error;
      //   // 我们的 errorThrower 抛出的错误。
      //   if (error.name === 'BizError') {
      //     const errorInfo: ResponseStructure | undefined = error.info;
      //     if (errorInfo) {
      //       const { errorMessage, errorCode } = errorInfo;
      //       switch (errorInfo.showType) {
      //         case ErrorShowType.SILENT:
      //           // do nothing
      //           break;
      //         case ErrorShowType.WARN_MESSAGE:
      //           message.warn(errorMessage);
      //           break;
      //         case ErrorShowType.ERROR_MESSAGE:
      //           message.error(errorMessage);
      //           break;
      //         case ErrorShowType.NOTIFICATION:
      //           notification.open({
      //             description: errorMessage,
      //             message: errorCode,
      //           });
      //           break;
      //         case ErrorShowType.REDIRECT:
      //           // TODO: redirect
      //           break;
      //         default:
      //           message.error(errorMessage);
      //       }
      //     }
      //   } else if (error.response) {
      //     // Axios 的错误
      //     // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      //     message.error(`Response status:${error.response.status}`);
      //   } else if (error.request) {
      //     // 请求已经成功发起，但没有收到响应
      //     // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
      //     // 而在node.js中是 http.ClientRequest 的实例
      //     message.error('None response! Please retry.');
      //   } else {
      //     // 发送请求时出了点问题
      //     message.error('Request error, please retry.');
      //   }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    // (config: RequestOptions) => {
    //   // 拦截请求配置，进行个性化处理。
    //   const url = config?.url?.concat('?token = 123');
    //   return { ...config, url };
    // },
    // 直接写一个 function，作为拦截器
    (url, options) => {
      // console.log("url",url)
      // // 这么处理避免自定义header导致的跨域问题
      // if (url && (url.indexOf("aliyuncs.com") != -1 || url.indexOf("a2.cdn0.co") != -1 || url.indexOf("cdn2.gocn.vip") != -1)) {
      //   return {
      //     url,
      //     options,
      //   };
      // }
      return {
        url,
        options: {
          ...options,
          headers: {
          },
        },
      };
      // do something
      // return { url, options }
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      // const { data } = response as unknown as ResponseStructure;
      //
      // if (data?.success === false) {
      //   message.error('请求失败！');
      // }
      // return response

      if (response.config && (response.config?.url?.indexOf("aliyuncs.com") != -1 || response.config.url.indexOf("a2.cdn0.co") != -1 || response.config.url.indexOf("cdn2.gocn.vip") != -1)) {
        return response
      }
      // response.data.traceId = response.headers.get('traceId');

      // return response.clone().json().then((res: Res<any>) => {
      //   if (res) {
      //     res.traceId = response.headers.get('x-trace-id');
      //   }
      //   return new Response(JSON.stringify(res), {...response})
      // })

      return response;
    },
  ],
};
