# 快速开始

```java
import com.urovo.docklib.DockTool;
import com.urovo.docklib.DockException;
import com.urovo.docklib.IDockTool;

IDockTool dock = DockTool.getInstance();

@Override protected void onStart() {
    super.onStart();
    dock.open();
}

@Override protected void onStop() {
    dock.close();
    super.onStop();
}

// 链路 ONLINE 时在后台线程：
try {
    int wall = dock.getWallId();
    String fw = dock.getFirmwareVersion();
} catch (DockException e) {
    // e.getError() → DockError
}
```

成功标志：`getLinkState() == LinkState.ONLINE`，且同步读取不抛 `DockException`。

下一步：[API 参考](/cradle/api/)
