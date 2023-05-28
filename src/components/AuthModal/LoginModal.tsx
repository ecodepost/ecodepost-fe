import styles from "./index.less";
import {Button, Divider, Form, Input} from "antd";
import {WechatOutlined} from "@ant-design/icons";
import useRequestX from "@/hooks/useRequestX";
import {useModel} from "@@/exports";
import {ssoapiLoginDirect} from "@/services/custom/api";

type UserLoginModalProps = {
  handleCancel: () => void;
  setModeType: (type: string) => void;
}

const layout = {
  wrapperCol: { span: 24 },
};

const LoginModal = (props: UserLoginModalProps) => {
  const { setModeType, handleCancel } = props
  const { refresh } = useModel('@@initialState')
  const apiLoginReq = useRequestX(ssoapiLoginDirect,{
    onSuccess: ({data}) => {
      refresh()
      handleCancel()
    }
  })
  const onLoginFinish = (values: any) => {
    apiLoginReq.run(values)
  }


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_form}>
        <Form
          {...layout}
          initialValues={{ remember: true }}
          onFinish={onLoginFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label=""
            name="account"
            rules={[{ required: true, message: '手机号或用户名不能为空' }]}
          >
            <Input className={styles.name_input} placeholder="手机号或用户名" />
          </Form.Item>
          <Form.Item
            label=""
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password className={styles.password} placeholder="密码" />
          </Form.Item>
          <Button className={styles.submit} htmlType="submit">登录</Button>
        </Form>
        <div className={styles.switchMode} onClick={()=>{
          setModeType("register")
        }}> 快速注册 </div>
        {/*<a style={{ textAlign: 'center' }} onClick={() => { window.parent.postMessage('user_reset_pwd', '*'); }}> 忘记密码? </a>*/}
      </div>
      <Divider className={styles.divider}> Or </Divider>
      <Button onClick={() => {
        document.location.href = `/login/wechat?response_type=code&${window.location.href.split('?')[1]}`;
      }} className={styles.other_sign}>
        <WechatOutlined
          className={styles.icon}
        />
        <div className={styles.title}>使用微信账号登陆</div>
      </Button>
    </div>
  )
}

export default LoginModal
