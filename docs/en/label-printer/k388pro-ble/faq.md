# Notes & FAQ

## Notes

1. Run BLE I/O and firmware upgrade on a background thread.
2. Use `printByGzipData` for image jobs.
3. Keep page width within the printable width, typically 384–400 dots.
4. Text is encoded as GBK.
5. After firmware upgrade, call `connect` again.
6. This version does not provide RFID APIs.

Exception class: `com.urovo.printer.exception.PrinterException`  
Log filter: `>>`

## Callbacks

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

## FAQ

**Q: I called `drawText`, but nothing printed.**  
A: Drawing APIs only build the page. Call `printByte`, then `printByData` or `printByGzipData`.

**Q: Connection succeeds, but printing does nothing.**  
A: Confirm Bluetooth permissions and the MAC address, then check `getPrinterStatus()` for paper or cover errors.

**Q: The image has blank space on the top or right.**  
A: Reduce page width to the printable area (for example 384 dots) and make sure label orientation matches `pageSetup` width and height.
