# API Reference

Public facade: `IDockTool` via `DockTool.getInstance()`.

| Category | Description |
|----------|-------------|
| [Entry](/cradle/api/entry) | `DockTool.getInstance` |
| [Lifecycle and link](/cradle/api/lifecycle) | open / close / LinkState |
| [Cradle control](/cradle/api/control) | Unlock, LED, reboot |
| [LED test](/cradle/api/led-test) | LED test parameters |
| [Layout IDs](/cradle/api/layout) | Wall / row / column |
| [Charge and identity](/cradle/api/identity) | Fast charge, serial, model, errors, versions |
| [Firmware upgrade](/cradle/api/firmware) | MCU OTA |
| [Callbacks and errors](/cradle/api/errors) | UnlockCallback, DockError, MLog |

Do not depend on `protocol.*` / `serial.*` except returned `LinkState`.
