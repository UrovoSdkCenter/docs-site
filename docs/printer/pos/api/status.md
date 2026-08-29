# Status and parameters

## PrinterProviderImpl.getStatus

Returns current printer status.

### Signature

```java
int getStatus()
```

### Returns

| Value | Meaning |
| --- | --- |
| 0x00 | OK, ready to print |
| 0xF0 | Out of paper |
| 0xF3 | Print head overheat |
| 0xE1 | Low voltage |
| 0xF7 | Printer busy |
| 0xFB | Motor / core error |
| 0xF2 | Hardware error |
| Other | Print failed |

`````````````` See `PrintStatus` constants for the full set.

| Method | Description |
| --- | --- |
| void setGray(int gray) | Grayscale level, range -6 to 6 |
| int setSpeed(int speedLevel) | Print speed, range 10–20; returns 0 on success |
