# Layout IDs

| Method | Description |
|--------|-------------|
| `setWallId(int id)` / `getWallId()` | Wall ID **0..32** |
| `setRowId(int id)` / `getRowId()` | Row ID **0..32** |
| `setColId(int id)` / `getColId()` | Column ID **0..32** |

Out of range throws `DockException` (`INVALID_ARGUMENT`).
