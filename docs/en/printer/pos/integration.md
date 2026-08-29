# Integration

## Obtaining the SDK

**Option A — Gradle module (Demo)**

```groovy
implementation project(path: ':urovoPrinterSdk')
```

**Option B — AAR**

Place `urovoPrinterLib_v1.0.6_release.aar` under `libs/`:

```groovy
implementation fileTree(include: ['*.aar'], dir: 'libs')
```

## Project setup
- Recommended `compileSdkVersion` ≥ 33 (matches Demo).
- Basic printing uses the device system service; no extra Manifest permissions for core APIs (custom font paths must be readable by the app).
- No special ProGuard rules required (keep `com.urovo.sdk.print.**` if minifying).

## Initialization

Typical flow: **getInstance → initPrint → compose content → startPrint → close**. Call `close()` after each job; call `initPrint()` again before the next job.

```java
PrinterProviderImpl printer = PrinterProviderImpl.getInstance(context);
printer.initPrint();
// … add content …
int status = printer.startPrint();
printer.close();
```

Authentication / keys: **none**.
