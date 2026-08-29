# 生命周期与链路

| 方法 | 说明 |
|------|------|
| `open()` | 启动串口 worker 并连接 UART |
| `close()` | 停止 worker 并释放端口 |
| `isOpen()` | 当且仅当 `getLinkState() == ONLINE` 时为 `true` |
| `getLinkState()` | 当前链路状态 |
| `setAutoReconnect(boolean enable)` | 默认 `true` |
| `addLinkListener(DockLinkListener listener)` | 主线程状态回调 |
| `removeLinkListener(DockLinkListener listener)` | 取消注册 |
| `setSerialTraceEnabled(boolean enable)` | 经 `MLog` 输出十六进制 TX/RX |

## LinkState

| Value | Meaning |
|-------|---------|
| `CLOSED` | 端口已关闭 |
| `OPENING` | 连接中 / 重连中 |
| `ONLINE` | 可收发事务 |
| `LOST` | 链路断开；若启用则自动重连 |
