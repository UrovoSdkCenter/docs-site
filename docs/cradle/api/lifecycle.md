# Lifecycle and link

| Method | Description |
|--------|-------------|
| `open()` | Start serial worker and connect UART |
| `close()` | Stop worker and release port |
| `isOpen()` | `true` only when `getLinkState() == ONLINE` |
| `getLinkState()` | Current link state |
| `setAutoReconnect(boolean enable)` | Default `true` |
| `addLinkListener(DockLinkListener listener)` | Main-thread state callback |
| `removeLinkListener(DockLinkListener listener)` | Unregister |
| `setSerialTraceEnabled(boolean enable)` | Hex TX/RX via `MLog` |

## LinkState

| Value | Meaning |
|-------|---------|
| `CLOSED` | Port closed |
| `OPENING` | Connecting / reconnecting |
| `ONLINE` | Ready for transactions |
| `LOST` | Link lost; auto-reconnect if enabled |
