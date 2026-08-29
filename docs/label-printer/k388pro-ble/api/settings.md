# Print settings

## Job settings (sent with the current page)

| Method | Range | Description |
|--------|-------|-------------|
| `setContrast(int level)` | 0–3 | Contrast. Higher is darker. |
| `setSpeed(int level)` | 0–5 | Speed. 0 is slowest. |
| `setBold(int level)` | 0 or >0 | Bold |
| `setPrintWait(int time)` | ≥0 | Delay in 1/8 second units |

## Persistent printer settings (written immediately; connection required)

| Method | Description |
|--------|-------------|
| `setPrintDarkness(int darkness)` | Print darkness |
| `setPrintMode(int mode)` | 0 normal / 1 fast / 2 slow |
| `setMultiPrintDelay(int delayMs)` | Delay between copies, in milliseconds |
| `setRewindPrint(boolean enable)` | Enable rewind printing |

These methods throw `PrinterException` on failure.
