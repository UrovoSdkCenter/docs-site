# 接入

从 [下载页](/label-printer/k388pro/download) 获取离线文档后，按下面步骤接入工程。

## 获取 SDK

将 `print` 模块编译产物（AAR 或 jar）引入应用。常用方式：

```gradle
implementation project(':print')
```

或拷贝 jar，例如：

```gradle
implementation files('libs/UK388PrintLibrary_v2.3.1.jar')
```

生成 jar（模块内已注册 `makeJar`）：

```bash
./gradlew :print:compileDebugJavaWithJavac :print:makeJar
```

输出目录：`print/build/libs/`。

## 工程配置

- `print` 模块 `AndroidManifest.xml` 未声明额外权限；应用按业务需要自行申请存储（固件文件）等权限。
- 混淆时需 keep `com.urovo.printer.**`。
- 无 API Key / 鉴权配置。

## 初始化

```java
UPrinterManager printer = UPrinterManager.getInstance(context);
// 或
UPrinterManager.initialize(context);
UPrinterManager printer = UPrinterManager.getInstance();
```

首次必须使用带 `Context` 的入口。之后可 `getInstance()`。

下一步：[快速开始](/label-printer/k388pro/quick-start)
