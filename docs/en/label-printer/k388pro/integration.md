# Integration

Get the offline docs from the [download page](/en/label-printer/k388pro/download), then follow the steps below.

## Obtain the SDK

Add the `print` module build output (AAR or JAR):

```gradle
implementation project(':print')
```

Or copy a JAR, for example:

```gradle
implementation files('libs/UK388PrintLibrary_v2.3.1.jar')
```

Build the JAR (`makeJar` is registered in the module):

```bash
./gradlew :print:compileDebugJavaWithJavac :print:makeJar
```

Output: `print/build/libs/`.

## Project setup

- The `print` module does not declare extra permissions; request storage (firmware files) as needed.
- ProGuard keep: `com.urovo.printer.**`.
- No API key / auth configuration.

## Initialization

```java
UPrinterManager printer = UPrinterManager.getInstance(context);
// or
UPrinterManager.initialize(context);
UPrinterManager printer = UPrinterManager.getInstance();
```

Pass a `Context` on first use. After that, `getInstance()` is enough.

Next: [Quick Start](/en/label-printer/k388pro/quick-start)
