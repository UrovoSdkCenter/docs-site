# Development guide and basics

This page covers shared environment, permission, debugging, and practice guidance for Urovo device development. For hardware-specific APIs (print, scan, RFID, and so on), see the matching product docs.

## Development environment

Use the following setup to reduce compatibility issues:

| Item | Recommendation |
|------|----------------|
| IDE | Latest stable Android Studio |
| JDK | Match the Android Gradle Plugin requirement (often JDK 17) |
| Build tools | Keep the Android Gradle Plugin and Gradle versions pinned by the project |
| Device | Validate on the target device; emulators usually cannot cover printer, scanner, or RFID hardware |

When you upgrade a major SDK version, also verify:

- `minSdk` / `targetSdk` meet the documented requirements
- Extra system permissions or signing capabilities, if any
- The official Demo still runs on the same device

## Permissions and system configuration

Different SDKs need different permissions. Check the product docs before integration. Common categories include:

- **Bluetooth**: external printers and Sled RFID often need Bluetooth and location-related permissions (depends on OS version)
- **Storage**: firmware update, log export, fonts, or assets may need storage or media permissions
- **Network**: some update, remote config, or log upload flows need network access
- **System capabilities**: some device APIs require system signature or vendor privileges that third-party apps cannot use

Recommended practice:

1. Declare the documented permissions in `AndroidManifest.xml`.
2. Request runtime permissions before calling APIs that need them, and handle the result.
3. If the user denies a permission, show a clear message and do not call dependent APIs.

## Logging and debugging

During integration, keep information that helps reproduce issues:

1. **Enable SDK logging** when the product provides a switch, and keep timestamps, error codes, and connection state.
2. **Use `adb logcat`** filtered by your package name and SDK-related tags.
3. **Record the environment**: device model, OS version, SDK version, and reproduction steps.
4. **Run the official Demo first**: if the Demo works but your app fails, compare initialization order, permissions, and dependency versions.

Debugging connection:

- USB debugging: confirm the computer is authorized on the device
- Wireless debugging: confirm the device and computer are on the same network and the port is reachable

## Error handling

When you call SDK APIs, handle return values and callbacks as documented:

- Separate **retryable errors** (brief disconnects, busy state) from **configuration errors** (missing permission, invalid arguments, unsupported model)
- Show a readable message to users, and log the raw error code
- Do not ignore initialization failures; do not call business APIs after a failed init

## Versioning and compatibility

Before release, confirm the following:

| Check | Notes |
|-------|------|
| SDK version | Use the same official version as the docs and Demo |
| Firmware / service version | Print, scan, and RFID features may depend on on-device services or firmware |
| ProGuard / R8 rules | Keep required classes and interfaces for release builds |
| Regression path | Cover initialization, one successful main flow, and one failure case |

## Troubleshooting

Work through these checks in order:

1. Does the Demo work on the same device?
2. Are the SDK version, device model, and OS version supported?
3. Are permissions granted, and did initialization succeed?
4. Does the error code appear in the product FAQ?
5. Are duplicate SDKs or conflicting dependencies present?

If you still need support, include the device model, OS version, SDK version, reproduction steps, and relevant logs.

## What’s next

Continue with the guide that matches your product:

- [Quick start](/guide/quick-start)
- [Print development](/printer/pos/)
- [Cradle development](/cradle/)
- [Scanning development](/scanning/)
- [RFID development](/rfid/)
- [Label printer development](/label-printer/k388pro/)
