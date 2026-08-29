# 接入

## 获取 SDK

**方式一：Gradle 模块依赖（Demo 方式）**

```groovy
implementation project(path: ':urovoPrinterSdk')
```

**方式二：AAR**

将 `urovoPrinterLib_v1.0.6_release.aar` 放入 `libs/`，并在 `build.gradle` 中：

```groovy
implementation fileTree(include: ['*.aar'], dir: 'libs')
```

## 工程配置
- `compileSdkVersion` 建议 ≥ 33（与 Demo 一致）。
- 打印运行在 UROVO 设备系统服务之上，无需额外 Manifest 权限即可调用基础打印 API（自定义字体路径需确保应用可读存储路径）。
- 无额外 ProGuard 规则要求（若混淆，请保留 `com.urovo.sdk.print.**`）。

## 初始化

典型生命周期：**获取实例 → initPrint → 组内容 → startPrint → close**。每次完整打印结束后建议 `close()`，下次打印前再次 `initPrint()`。

```java
PrinterProviderImpl printer = PrinterProviderImpl.getInstance(context);
printer.initPrint();
// … 添加内容 …
int status = printer.startPrint();
printer.close();
```

鉴权/密钥：**无**。
