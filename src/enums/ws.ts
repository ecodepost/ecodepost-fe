enum Cmd {
  INVALID = 0, // 无效指令
  IM_MSG_INCOME = 2, // 有人发消息后给的推送
  COMMON_LOGOUT = 100, // 退出
  IM = 200, // IM
  MSG = 300, // MSG
}

export { Cmd };
