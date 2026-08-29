# 入口与生命周期

## PrinterProviderImpl.getInstance

获取打印管理单例。

### 签名

```java
static PrinterProviderImpl getInstance(Context context)
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | Context | 是 | 应用上下文 |

### 返回值

`PrinterProviderImpl` 单例实例。

### 异常 / 错误码

无

### 示例

```java
PrinterProviderImpl printer = PrinterProviderImpl.getInstance(getApplicationContext());
```

## PrinterProviderImpl.initPrint

打开打印机并初始化打印页（宽 384 像素）。

### 签名

```java
int initPrint()
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 无 |

### 返回值

底层 `PrinterManager.open()` 返回值；`0` 表示打开成功。

### 异常 / 错误码

非 0 表示打开失败，不应继续组单。

### 示例

```java
int ret = printer.initPrint();
```

## PrinterProviderImpl.close

关闭打印机并释放页面资源。建议每次 `startPrint()` 完成后调用。

### 签名

```java
int close()
```

### 返回值

固定返回 `0`。

## PrinterProviderImpl.startPrint

提交缓冲区并开始物理打印。

### 签名

```java
int startPrint()
```

### 返回值

打印结果状态码，含义与 `getStatus()` 一致，参见 `PrintStatus` 及本文「错误码」分组。

### 示例

```java
int status = printer.startPrint();
if (status != PrintStatus.ERROR_NONE) {
   // 处理缺纸、过热等
}
```
