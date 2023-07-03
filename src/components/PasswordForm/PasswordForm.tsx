import { LockOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';
import styles from './PasswordForm.less';

interface PasswordFormProps {
  formType: number;
}
// 0 只有一个旧密码框 1 有两个新密码框 2 有一个旧密码框+两个新密码框 3 只有一个密码框（不带新旧）
const TwinPwdForm: React.FC = () => {
  return (
    <>
      {/* todo：密码校验的规则 */}
      <ProFormText.Password
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={styles.prefixIcon} />,
        }}
        name="rawpassword"
        placeholder="新密码"
        rules={[
          {
            required: true,
            message: '请输入新密码',
          },
        ]}
      />
      <ProFormText.Password
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={styles.prefixIcon} />,
        }}
        name="password"
        placeholder="确认新密码"
        rules={[
          {
            required: true,
            message: '请确认新密码',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('rawpassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject('两次密码输入不一致');
            },
          }),
        ]}
      />
    </>
  );
};

interface PasswordFormProps {
  formType: number;
}
const SinglePwdForm: React.FC<PasswordFormProps> = (props) => {
  return (
    <>
      <ProFormText.Password
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={styles.prefixIcon} />,
        }}
        name={props.formType === 3 ? 'password' : 'oldPassword'}
        placeholder={props.formType === 3 ? '密码' : '旧密码'}
        rules={[
          {
            required: true,
            message: `${props.formType === 3 ? '请输入密码' : '请输入旧密码'}`,
          },
        ]}
      />
    </>
  );
};
const PasswordForm: React.FC<PasswordFormProps> = (props) => {
  return (
    <>
      {props.formType === 0 && <SinglePwdForm formType={props.formType} />}
      {props.formType === 1 && <TwinPwdForm />}
      {props.formType === 2 && (
        <>
          <SinglePwdForm formType={props.formType} />
          <TwinPwdForm />
        </>
      )}
      {props.formType === 3 && <SinglePwdForm formType={props.formType} />}
    </>
  );
};

export default PasswordForm;
