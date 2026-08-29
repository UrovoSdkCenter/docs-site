# 快速入门

本页帮助你在 Urovo 设备上完成首次 SDK 接入，并跑通一次基础调用。按下方步骤操作即可；完整能力说明见各产品专题文档。

## 准备工作

在开始之前，确认你具备以下条件：

| 项目 | 要求 |
|------|------|
| 开发环境 | Android Studio（推荐最新稳定版） |
| 目标设备 | 对应机型的 Urovo 设备，并已开启开发者选项 |
| 调试方式 | USB 调试，或同一局域网下的无线调试 |
| SDK 包 | 从对应产品的「下载和 Demo」页获取 |

::: tip 选择正确的 SDK
本站按能力拆分文档。接入前先确认业务场景，再下载对应包：

- 内置热敏打印 → [Print 开发](/zh/printer/pos/)
- SP35 开发 → [Cradle 开发](/zh/cradle/)
- 扫码 → [扫码开发](/zh/scanning/)
- RFID → [RFID 开发](/zh/rfid/)
- 贴标机 → [贴标机开发](/zh/label-printer/k388pro/)
:::

## 接入步骤

### 1. 获取 SDK 与 Demo

1. 打开目标产品的 **下载和 Demo** 页。
2. 下载 SDK 包（AAR / JAR / ZIP）以及 Demo（如有）。
3. 解压后阅读包内说明，确认最低 Android API 级别与依赖要求。

### 2. 将 SDK 加入工程

以本地 AAR / JAR 为例：

1. 将 SDK 文件复制到应用模块的 `libs/` 目录。
2. 在模块的 `build.gradle`（或 `build.gradle.kts`）中声明依赖，例如：

```groovy
dependencies {
    implementation files('libs/YourSdk.aar')
}
```

3. 同步 Gradle，确认工程可以成功编译。

具体依赖写法以各产品文档中的「接入」说明为准。

### 3. 完成初始化

在合适的生命周期（通常是 `Application` 或首个 `Activity`）中初始化 SDK，并处理返回结果：

```java
// 示例：按产品文档中的入口类完成初始化
// 成功后再调用业务 API
```

注意：

- 在调用业务接口之前先完成初始化。
- 在主线程更新 UI；耗时操作放到后台线程。
- 按产品文档申请所需权限（如蓝牙、存储、位置等）。

### 4. 运行 Demo 验证

1. 用 Android Studio 打开 Demo 工程。
2. 连接设备并安装 Demo。
3. 按 Demo 界面完成一次基础操作（例如打印一张小票、扫描一条码、读取一枚标签）。

如果 Demo 运行正常，说明设备、固件与 SDK 版本匹配，可以开始接入业务工程。

## 验证结果

完成上述步骤后，你应该能够：

- 在业务工程中成功编译并引用 SDK
- 完成 SDK 初始化且无致命错误
- 在真机上跑通 Demo 中的至少一条主流程

若初始化失败或 Demo 无法运行，请先查看对应产品文档中的 FAQ，并核对设备型号、系统版本与 SDK 版本是否一致。

## 后续步骤

- [开发指南与基础](/zh/guide/basics)：权限、日志、调试与常见问题
- [Print 开发](/zh/printer/pos/)：POS 热敏打印
- [扫码开发](/zh/scanning/)：扫码接入
- [RFID 开发](/zh/rfid/)：RFID 盘点与读写
- [Cradle 开发](/zh/cradle/)：SP35 底座解锁与控制
- [贴标机开发](/zh/label-printer/k388pro/)：K388Pro 本机 / 蓝牙打印
