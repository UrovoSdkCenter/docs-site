# Cradle control

## unlockCradle

Async unlock; callbacks on the main thread.

```java
void unlockCradle(UnlockCallback callback)
```

## Other APIs

| Method | Description |
|--------|-------------|
| `setUnlockTimeSeconds(int seconds)` | Unlock duration **1..30** |
| `getUnlockTimeSeconds()` | Read unlock duration |
| `setLedEnabled(boolean enable)` | LED on/off |
| `getLedEnabled()` | Read LED state |
| `rebootCradle()` | Reboot cradle (cmd 0xB8); does **not** run OTA alone |
