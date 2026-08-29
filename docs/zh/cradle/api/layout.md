# 布局 ID

| 方法 | 说明 |
|------|------|
| `setWallId(int id)` / `getWallId()` | 墙 ID **0..32** |
| `setRowId(int id)` / `getRowId()` | 行 ID **0..32** |
| `setColId(int id)` / `getColId()` | 列 ID **0..32** |

越界抛 `DockException`（`INVALID_ARGUMENT`）。
