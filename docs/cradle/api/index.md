# API 参考

公开门面为 `IDockTool`（经 `DockTool.getInstance()` 获取）。

| 分类 | 说明 |
|------|------|
| [入口](/cradle/api/entry) | `DockTool.getInstance` |
| [生命周期与链路](/cradle/api/lifecycle) | open / close / LinkState |
| [底座控制](/cradle/api/control) | 解锁、LED、重启 |
| [LED 测试](/cradle/api/led-test) | LED 测试参数与启停 |
| [布局 ID](/cradle/api/layout) | 墙 / 行 / 列 |
| [充电与身份](/cradle/api/identity) | 快充、序列号、型号、错误码、版本 |
| [固件升级](/cradle/api/firmware) | MCU OTA |
| [回调与错误](/cradle/api/errors) | UnlockCallback、DockError、MLog |

请勿依赖 `com.urovo.docklib.protocol.*` 或 `com.urovo.docklib.serial.*`（除返回的 `LinkState` 外）。
