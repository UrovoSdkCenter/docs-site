# 注意事项与 FAQ

## 注意事项

1. BLE 收发和固件升级请在后台线程执行。
2. 图片打印请使用 `printByGzipData`。
3. 页面宽度请控制在可打印宽度内，通常为 384–400 点。
4. 文本按 GBK 编码。
5. 固件升级完成后需再次调用 `connect`。
6. 当前版本不提供 RFID 接口。

异常类：`com.urovo.printer.exception.PrinterException`  
日志过滤关键字：`>>`

## 回调接口

```java
public interface BleConnectionListener {
    void onConnected(String deviceAddress);
    void onDisconnected(String deviceAddress);
    void onConnectFailed(String deviceAddress, String message);
}

public interface FirmwareUpgradeListener {
    void onProgress(int sentBytes, int totalBytes);
    void onCompleted();
}
```

## 常见问题

**问：调用了 `drawText`，但没有出纸。**  
答：绘制接口只负责组页。需要先调用 `printByte`，再调用 `printByData` 或 `printByGzipData`。

**问：连接成功，但打印没有反应。**  
答：确认蓝牙权限和 MAC 地址，再用 `getPrinterStatus()` 检查是否缺纸或开盖。

**问：图片上方或右侧有空白。**  
答：将页面宽度缩小到可打印区域（例如 384 点），并确认标签方向与 `pageSetup` 的宽高一致。
