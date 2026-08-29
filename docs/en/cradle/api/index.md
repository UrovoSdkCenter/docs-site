# API Reference

Public facade: `IDockTool` via `DockTool.getInstance()`.

| Category | Description |
|----------|-------------|
| [Entry](/en/cradle/api/entry) | `DockTool.getInstance` |
| [Lifecycle and link](/en/cradle/api/lifecycle) | open / close / LinkState |
| [Cradle control](/en/cradle/api/control) | Unlock, LED, reboot |
| [LED test](/en/cradle/api/led-test) | LED test parameters |
| [Layout IDs](/en/cradle/api/layout) | Wall / row / column |
| [Charge and identity](/en/cradle/api/identity) | Fast charge, serial, model, errors, versions |
| [Firmware upgrade](/en/cradle/api/firmware) | MCU OTA |
| [Callbacks and errors](/en/cradle/api/errors) | UnlockCallback, DockError, MLog |

Do not depend on `protocol.*` / `serial.*` except returned `LinkState`.
