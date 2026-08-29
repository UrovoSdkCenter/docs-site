# 连接

| 方法 | 说明 |
|------|------|
| `connect(String macAddress)` | 连接打印机，例如 `"AA:BB:CC:DD:EE:FF"`。 |
| `disconnect()` | 断开连接。 |
| `isConnected()` | 返回是否已连接。 |
| `getConnectedAddress()` | 返回已连接设备的 MAC 地址。 |
| `setConnectionListener(BleConnectionListener listener)` | 设置连接回调。 |
| `setPacketGapMs(int packetGapMs)` | 设置 BLE 发包间隔（毫秒）。默认 100。 |
| `flushBuffer()` | 清空接收缓冲区。 |

连接失败或已处于连接状态时，`connect()` 会抛出 `PrinterException`。超时约 15 秒。

```java
printer.setConnectionListener(new BleConnectionListener() {
    @Override
    public void onConnected(String deviceAddress) {
        // Connected
    }

    @Override
    public void onDisconnected(String deviceAddress) {
        // Disconnected
    }

    @Override
    public void onConnectFailed(String deviceAddress, String message) {
        // Failed
    }
});
printer.connect("AA:BB:CC:DD:EE:FF");
```

若大图打印出现丢包，可加大间隔，例如 `printer.setPacketGapMs(150)`。
