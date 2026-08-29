# 快速接入

## 1. 获取 SDK

从 [Releases 下载页](https://github.com/UrovoSdkCenter/RFID_Android/releases) 下载最新 `.aar`，或按仓库说明通过依赖引入。

## 2. 引入工程

将 `.aar` 放入模块的 `libs` 目录，并在 `build.gradle` 中添加：

```groovy
dependencies {
    implementation files('libs/xxx.aar') // 替换为实际 aar 文件名
}
```

## 3. 初始化与调用

```kotlin
// 示例：按实际 SDK API 替换
// RfidManager.init(context)
// RfidManager.startInventory { tag -> /* handle tag */ }
```

完整可运行工程请使用 [Demo 源码](https://github.com/UrovoSdkCenter/RFID_Android)。

## 下一步

- [下载与 Demo](/zh/rfid/download)
- [RFID 概述](/zh/rfid/)
