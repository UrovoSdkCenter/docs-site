# Notes & FAQ

## Notes

1. **Exclusive serial** — One worker thread and one UART. Only one operation at a time; do not call other `IDockTool` methods during OTA.
2. **OTA vs framed protocol** — OTA leaves frame mode temporarily; the SDK handles enter/exit.
3. **`.bin` size** — Valid range **1..0xD000** bytes. Validate in the app before calling.
4. **No cancel mid-flash** — Once `upgradeFirmware` starts there is no official cancel path.
5. **Do not use SerialPortLibrary for IAP** — Use `IDockTool.upgradeFirmware` only.
6. **Empty strings** — Version / model / serial may return `""` within the wait window.

## FAQ

**Q: Can I call blocking APIs on the main thread?**  
A: Not if the UI must stay responsive; use a background `Executor`. OTA may block up to about 180 seconds.

**Q: Can firmware upgrade be cancelled?**  
A: No official cancel path after `upgradeFirmware` starts.

**Q: Why does `getFirmwareVersion()` return an empty string?**  
A: The cradle may not send text within the SDK wait window; handle empty strings in the UI.
