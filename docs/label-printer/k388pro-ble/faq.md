# Notes & FAQ

## Notes

1. `draw*` only builds the page—you must call `printByData` / `printByGzipData` / `printByText` to print.
2. Run BLE I/O and firmware upgrade on a background thread.
3. Text is encoded as GBK.
4. Keep page width within the printable width (about 384–400 dots).
5. After firmware upgrade, call `connect` again.
6. This version does not provide RFID APIs.
7. Page APIs are CPCL, not a ZPL wrapper.

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

**Q: Can I call `printByData` directly on the BLE SDK?**  
A: Yes. Connect first, then build a page or pass existing bytes.

**Q: I called `drawText`, but nothing printed.**  
A: Drawing APIs only build the page. Call `printByte`, then `printByData` or `printByGzipData`.

**Q: Is ZPL supported?**  
A: Page APIs are CPCL. Raw ZPL may be sent with `printByText` / `printByData` only if firmware accepts it.

**Q: Connection succeeds, but printing does nothing.**  
A: Confirm Bluetooth permissions and the MAC address, then check `getPrinterStatus()` for paper or cover errors.

**Q: The image has blank space on the top or right.**  
A: Reduce page width to the printable area (for example 384 dots) and make sure label orientation matches `pageSetup` width and height. Prefer `printByGzipData` for image pages; if packets drop, try `setPacketGapMs(150)`.
