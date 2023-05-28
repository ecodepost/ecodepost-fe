import { message } from 'antd';
import styles from './Message.less';

export const messageInfo = (props) => {
  let { content } = props;
  const { type } = props;
  if (type === 'error') {
    // 如果为空，会报错
    if (content == '') {
      content = 'error';
    }
    message.error({
      content: content,
      duration: 1,
      className: styles.captchaErrorMessage,
    });
  } else if (type === 'success') {
    if (content == '') {
      content = 'success';
    }
    message.success({
      content: content,
      duration: 1,
      className: styles.captchaMessage,
    });
  }
};

// export const messageInfoX = (props) => {
//   let {content} = props;
//   const {type} = props
//   if (type === 'error') {
//     // 如果为空，会报错
//     if (content == "") {
//       content = "error"
//     }
//     message.error({
//       content: content,
//       duration: 2,
//       className: styles.captchaErrorMessage,
//     });
//   } else if (type === 'success') {
//     if (content == "") {
//       content = "success"
//     }
//     message.success({
//       content: content,
//       duration: 2,
//       className: styles.captchaMessage,
//     });
//   }
// };
