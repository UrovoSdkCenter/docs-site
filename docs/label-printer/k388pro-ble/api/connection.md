# Connection

| Method | Description |
|--------|-------------|
| `connect(String macAddress)` | Connects to the printer, e.g. `"AA:BB:CC:DD:EE:FF"`. |
| `disconnect()` | Disconnects. |
| `isConnected()` | Returns whether the printer is connected. |
| `getConnectedAddress()` | Returns the connected MAC address. |
| `setConnectionListener(BleConnectionListener listener)` | Sets connection callbacks. |
| `setPacketGapMs(int packetGapMs)` | Sets BLE packet interval in ms. Default: 100. |
| `flushBuffer()` | Clears the receive buffer. |

`connect()` throws `PrinterException` on failure or if already connected. Timeout is about 15 seconds.

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

If large images drop packets, increase the interval, for example `printer.setPacketGapMs(150)`.
