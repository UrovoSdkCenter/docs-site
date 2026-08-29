# Quick start

This page helps you integrate a Urovo SDK for the first time and complete one basic call on a real device. Follow the steps below; see each product guide for full API details.

## Before you begin

Make sure you have the following:

| Item | Requirement |
|------|-------------|
| IDE | Android Studio (latest stable recommended) |
| Device | A matching Urovo device with developer options enabled |
| Debugging | USB debugging, or wireless debugging on the same LAN |
| SDK package | Download from the product’s Download & Demo page |

::: tip Choose the right SDK
Docs on this site are organized by capability. Pick the package that matches your scenario:

- Built-in thermal printing → [Print development](/printer/pos/)
- SP35 development → [Cradle Development](/cradle/)
- Scanning → [Scanning development](/scanning/)
- RFID → [RFID development](/rfid/)
- Label printers → [Label printer development](/label-printer/k388pro/)
:::

## Integration steps

### 1. Get the SDK and Demo

1. Open the product’s **Download & Demo** page.
2. Download the SDK package (AAR / JAR / ZIP) and the Demo if available.
3. Unzip the package and check the minimum Android API level and dependency notes.

### 2. Add the SDK to your project

For a local AAR / JAR:

1. Copy the SDK file into your app module’s `libs/` folder.
2. Declare the dependency in the module `build.gradle` (or `build.gradle.kts`), for example:

```groovy
dependencies {
    implementation files('libs/YourSdk.aar')
}
```

3. Sync Gradle and confirm the project builds.

Use the product guide’s integration section for the exact dependency syntax.

### 3. Initialize the SDK

Initialize the SDK in an appropriate lifecycle callback (often `Application` or the first `Activity`), and handle the result:

```java
// Example: initialize using the entry class from the product docs
// Call business APIs only after initialization succeeds
```

Keep these points in mind:

- Initialize before calling business APIs.
- Update the UI on the main thread; run long work off the main thread.
- Request any permissions listed in the product docs (Bluetooth, storage, location, and so on).

### 4. Run the Demo

1. Open the Demo project in Android Studio.
2. Connect the device and install the Demo.
3. Complete one basic flow in the Demo UI (for example, print a receipt, scan a barcode, or read a tag).

If the Demo works, the device, firmware, and SDK versions are compatible, and you can integrate the SDK into your app.

## Verify your setup

After these steps, you should be able to:

- Build your app with the SDK linked successfully
- Initialize the SDK without fatal errors
- Run at least one primary Demo flow on a real device

If initialization fails or the Demo does not run, check the product FAQ first, and confirm that the device model, OS version, and SDK version match.

## What’s next

- [Development guide and basics](/guide/basics): permissions, logging, debugging, and troubleshooting
- [Print development](/printer/pos/): POS thermal printing
- [Scanning development](/scanning/): scanner integration
- [RFID development](/rfid/): inventory and tag operations
- [Cradle Development](/cradle/): SP35 cradle unlock and control
- [Label printer development](/label-printer/k388pro/): K388Pro built-in / BLE printing
