# Quick Start

```java
IDockTool dock = DockTool.getInstance();

@Override protected void onStart() {
    super.onStart();
    dock.open();
}

@Override protected void onStop() {
    dock.close();
    super.onStop();
}

// On a background thread when ONLINE:
try {
    int wall = dock.getWallId();
    String fw = dock.getFirmwareVersion();
} catch (DockException e) {
    // e.getError() → DockError
}
```

Success: `getLinkState() == LinkState.ONLINE` and sync reads do not throw `DockException`.

Next: [API Reference](/en/cradle/api/)
