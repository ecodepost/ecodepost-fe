import styles from "./index.less";
import { Modal} from "antd";
import {useEffect, useState} from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

type UserLoginModalProps = {
  mode: string;
  isOpen: boolean;
  handleCancel: () => void;
}

const AuthModal = (props: UserLoginModalProps) => {
  const { isOpen , handleCancel, mode } = props
  const [modeType, setModeType] = useState<string>();

  useEffect(()=>{
    setModeType(mode)
  },[mode])

  return (
    <Modal
      open={isOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <div className={styles.loginCard}>
        {modeType === "login" &&  <LoginModal
          setModeType={setModeType}
          handleCancel={handleCancel}
        />}
        {modeType === "register" && <RegisterModal
          setModeType={setModeType}
          handleCancel={handleCancel}
        />}
      </div>
    </Modal>
  )
}

export default AuthModal
