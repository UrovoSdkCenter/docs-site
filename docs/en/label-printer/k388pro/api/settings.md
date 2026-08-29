# Print settings

Job settings go out with the current page; register settings write immediately and require a connection.

## Job settings (sent with the page)

| Method | Range | Description |
|--------|-------|-------------|
| `setContrast(int level)` | 0–3 | Contrast; out of range throws `IllegalArgumentException` |
| `setSpeed(int level)` | 0–5 | Speed; 0 is slowest |
| `setBold(int level)` | 0 or >0 | Bold |
| `setPrintWait(int time)` | ≥0 | Delay in 1/8 second units |
| `contRast(int level)` | — | Same contrast command (page build) |
| `speed(int level)` | — | Same speed command (page build) |
| `printWait(int time)` | — | Same wait command (page build) |

## Persistent settings (immediate, requires connection)

| Method | Description |
|--------|-------------|
| `setPrintDarkness(int darkness)` | Print darkness; throws `PrinterException` on failure |
| `setPrintMode(int mode)` | 0 normal / 1 high speed / 2 low speed |
| `setMultiPrintDelay(int delayMs)` | Multi-copy interval in ms, must be ≥0 |
| `setRewindPrint(boolean enable)` | Enable rewind print |
