import {Button, Form, Input} from "antd";
import {useEffect, useState} from "react";
import useRequestX from "@/hooks/useRequestX";
import styles from "@/components/AuthModal/index.less";
import {apiRegister, apiRegisterPhoneCode} from "@/services/custom/api";
import {useModel} from "@@/exports";


type RegisterModalProps = {
  handleCancel: () => void;
  setModeType: (type: string) => void;
}

const layout = {
  wrapperCol: { span: 24 },
};

const RegisterModal = (props: RegisterModalProps) => {
  const { setModeType, handleCancel } = props
  const { refresh } = useModel('@@initialState')
  const [registerForm] = Form.useForm();
  const phone = Form.useWatch('account', registerForm);
  const [isText, setIsText] = useState<boolean>(false);
  const [count, setCount] = useState<number>();


  const apiRegisterPhoneCodeReq = useRequestX(apiRegisterPhoneCode,{
    onSuccess: ({data}) => {
      setCount(data.ttl);
      setIsText(true);
    }
  })

  const apiRegisterReq = useRequestX(apiRegister,{
    onSuccess: ({data}) => {
      refresh()
      handleCancel()
    }
  })

  const onRegisterFinish = (values: any) => {
    apiRegisterReq.run(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (count === undefined) return;
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      clearTimeout(timer);
      setIsText(false);
    }
  }, [isText, count]);

  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_form}>
        <Form
          form={registerForm}
          {...layout}
          initialValues={{ remember: true }}
          onFinish={onRegisterFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label=""
            name="account"
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input className={styles.name_input} placeholder="手机号" />
          </Form.Item>
          <Form.Item
            label=""
            name="code"
            rules={[{ required: true, message: '验证码不能为空' }]}
          >
            <div className={styles.msgCode}>
              <Input className={styles.msg} placeholder="验证码"/>
              <Button className={styles.msgButton} onClick={(e)=>{
                apiRegisterPhoneCodeReq.run({
                  phone: phone,
                })
                e.preventDefault()
              }} disabled={isText}>{isText?count:'发送验证码'}</Button>
            </div>
          </Form.Item>
          <Form.Item
            label=""
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password className={styles.password} placeholder="密码" />
          </Form.Item>
          <Button className={styles.submit} htmlType="submit">注册</Button>
        </Form>
        <div className={styles.switchMode} onClick={()=>{
          setModeType("login")
        }}> 快速登录 </div>
      </div>
    </div>
  )
}

export default RegisterModal;
