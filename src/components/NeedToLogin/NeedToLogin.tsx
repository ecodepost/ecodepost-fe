import styles from './NeedToLogin.less';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import { useState } from 'react';
import { Button, Col, Row } from 'antd';
import UserLoginModal from "@/pages/Auth/UserLoginModal/UserLoginModal";
import AuthModal from "@/components/AuthModal";

interface NeedToLoginCom {
  login: string;
  signup: string;
  checkLogin: () => void;
}

const NeedToLogin = (props: NeedToLoginCom) => {
  const { login, signup, checkLogin } = props;
  // const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  // const [registerModalVisible, setRegisterModalVisible] = useState<boolean>(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  //
  // const changeMode = (type: string) => {
  //   if (type === 'login') {
  //     setLoginModalVisible(true);
  //     setRegisterModalVisible(false);
  //     return;
  //   } else if (type === 'register') {
  //     setLoginModalVisible(false);
  //     setRegisterModalVisible(true);
  //     return;
  //   }
  // };
  return (
    <>
      <div className={styles.container}>
        <Row gutter={40} justify="center">
          <Col>
            <Button
              className={styles.button}
              onClick={() => {
                setIsLoginOpen(true);
              }}
            >
              {login}
            </Button>
          </Col>
          <Col>
            <Button
              className={styles.button}
              onClick={() => {
                setIsRegisterOpen(true);
              }}
              type="primary"
            >
              {signup}
            </Button>
          </Col>
        </Row>
      </div>
      <AuthModal
        isOpen={isLoginOpen}
        handleCancel={() => {
          setIsLoginOpen(false);
        }}
        mode="login"
      />
      <AuthModal
        isOpen={isRegisterOpen}
        handleCancel={() => {
          setIsRegisterOpen(false);
        }}
        mode="register"
      />

      {/*<LoginModal*/}
      {/*  open={loginModalVisible}*/}
      {/*  handleOpen={setLoginModalVisible}*/}
      {/*  changeMode={changeMode}*/}
      {/*/>*/}
      {/*<RegisterModal*/}
      {/*  open={registerModalVisible}*/}
      {/*  handleOpen={setRegisterModalVisible}*/}
      {/*  changeMode={changeMode}*/}
      {/*/>*/}
    </>
  );
};

export default NeedToLogin;
