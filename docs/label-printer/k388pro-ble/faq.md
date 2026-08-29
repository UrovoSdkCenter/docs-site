# 注意事项与 FAQ

## 注意事项

1. `draw*` 只组页，必须再调用 `printByData` / `printByGzipData` / `printByText` 才会打印。
2. BLE 收发和固件升级请放在子线程。
3. 文本按 GBK 编码。
4. 页宽建议不超过可打宽度（约 384~400 点）。
5. 固件升级完成后必须重新 `connect`。
6. 本版本无 RFID 接口。
7. 组页 API 为 CPCL，不是 ZPL 封装。

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

**问：`printByData` 在蓝牙版能直接调用吗？**  
答：可以。先 `connect`，再组页或直接传入字节。

**问：调用了 `drawText`，但没有出纸。**  
答：绘制接口只负责组页。需要先调用 `printByte`，再调用 `printByData` 或 `printByGzipData`。

**问：是否支持 ZPL？**  
答：组页 API 为 CPCL。若固件接受 ZPL，仅可用 `printByText` / `printByData` 发送原文。

**问：连接成功，但打印没有反应。**  
答：确认蓝牙权限和 MAC 地址，再用 `getPrinterStatus()` 检查是否缺纸或开盖。

**问：图片上方或右侧有空白。**  
答：将页面宽度缩小到可打印区域（例如 384 点），并确认标签方向与 `pageSetup` 的宽高一致。图片页建议使用 `printByGzipData`；丢包时可 `setPacketGapMs(150)`。
