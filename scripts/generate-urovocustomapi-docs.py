import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_SRC = Path(r"c:\Users\lai_ming\Desktop\usdk-profile-jar-sdk-docs.html")
DOWNLOADS = ROOT / "downloads" / "urovocustomapi"
PUBLIC = ROOT / "docs" / "public" / "urovocustomapi"
DOCS_ZH = ROOT / "docs" / "urovo-customer-api"
DOCS_EN = ROOT / "docs" / "en" / "urovo-customer-api"

API_GROUPS = [
    ("device-manager", "DeviceManager", "DeviceManager", "设备信息、锁屏、静默装/卸、白名单、流量与内存统计等基础管理能力。"),
    ("device-manager-ex", "DeviceManagerEx", "DeviceManagerEx", "扩展系统设置：亮度、音量、时区、WiFi/热点、截图、Shell 命令等。"),
    ("network-manager-ex", "NetworkManagerEx", "NetworkManagerEx", "WiFi 连接与 INI 调优、双卡默认卡槽、APN、网络策略锁定等。"),
    ("application-manager-ex", "ApplicationManagerEx", "ApplicationManagerEx", "应用启停、运行时权限、通知黑白名单、电池优化、开机启动等。"),
    ("log-manager-ex", "LogManagerEx", "LogManagerEx", "按 TAG/关键字 logcat 采集、WiFi/崩溃日志 dump、MTK/QCOM 离线日志。"),
    ("device-policy-enhancer", "DevicePolicyEnhancer", "DevicePolicyEnhancer", "静默系统更新安装、蓝牙配对等。"),
    ("types-callbacks", "Types and callbacks", "类型与回调", "回调接口与监听器类型。"),
    ("types-models", "Types and models", "类型与数据模型", "数据模型与常量类型。"),
]

API_SEC_IDS = {
    "device-manager": "DeviceManager",
    "device-manager-ex": "DeviceManagerEx",
    "network-manager-ex": "NetworkManagerEx",
    "application-manager-ex": "ApplicationManagerEx",
    "log-manager-ex": "LogManagerEx",
    "device-policy-enhancer": "DevicePolicyEnhancer",
    "types-callbacks": ("Types-and-callbacks", "svcef7"),
    "types-models": ("Types-and-models", "sdylffe"),
}


def extract_section(html: str, section_id: str) -> str:
    m = re.search(rf'id="{section_id}".*?</section>', html, re.S)
    return m.group(0) if m else ""


def extract_api_section(html: str, sec_id, lang: str) -> str:
    ids = sec_id if isinstance(sec_id, tuple) else (sec_id,)
    for sid in ids:
        start = re.search(rf'<h2 id="api-sec-{sid}-{lang}"', html)
        if not start:
            continue
        rest = html[start.start() :]
        end = re.search(rf'<h2 id="api-sec-(?!{re.escape(sid)})', rest[1:])
        return rest[: end.start() + 1] if end else rest
    return ""


def extract_method_summary(section_html: str, lang: str) -> str:
    method_col = "Method" if lang == "en" else "方法"
    desc_col = "Description" if lang == "en" else "说明"
    rows = []
    for block in re.findall(r'<article class="api-block".*?</article>', section_html, re.S):
        title_m = re.search(
            r'api-block__class">([^<]+)</span>.*?api-block__method">([^<]+)</span>',
            block,
            re.S,
        )
        if not title_m:
            continue
        cls, method = title_m.group(1), title_m.group(2)
        desc_m = re.search(r'api-block__desc">([^<]*)</p>', block)
        desc = decode_entities(desc_m.group(1).strip()) if desc_m else ""
        rows.append((f"`{cls}.{method}`", desc))
    if not rows:
        return ""
    lines = [
        f"| {method_col} | {desc_col} |",
        "| --- | --- |",
    ]
    for method, desc in rows:
        lines.append(f"| {method} | {desc} |")
    return "\n".join(lines)


def html_table_to_md(section_html: str) -> str:
    rows = []
    for tr in re.findall(r"<tr>(.*?)</tr>", section_html, re.S):
        cells = re.findall(r"<t[dh]>(.*?)</t[dh]>", tr, re.S)
        if not cells:
            continue
        clean = []
        for c in cells:
            c = re.sub(r"<code[^>]*id=\"[^\"]*\"[^>]*>(.*?)</code>", r"`\1`", c, flags=re.S)
            c = re.sub(r"<code[^>]*>(.*?)</code>", r"`\1`", c, flags=re.S)
            c = re.sub(r"<[^>]+>", "", c)
            c = re.sub(r"\s+", " ", c).strip()
            clean.append(c)
        rows.append(clean)
    if not rows:
        return ""
    header = rows[0]
    lines = [
        "| " + " | ".join(header) + " |",
        "| " + " | ".join(["---"] * len(header)) + " |",
    ]
    for row in rows[1:]:
        while len(row) < len(header):
            row.append("")
        lines.append("| " + " | ".join(row[: len(header)]) + " |")
    return "\n".join(lines)


def strip_html(html_fragment: str) -> str:
    text = re.sub(r"<pre><code>(.*?)</code></pre>", lambda m: "\n```java\n" + decode_entities(m.group(1)) + "\n```\n", html_fragment, flags=re.S)
    text = re.sub(r"<code[^>]*>(.*?)</code>", r"`\1`", text, flags=re.S)
    text = re.sub(r"<h2[^>]*>(.*?)</h2>", r"\n## \1\n", text, flags=re.S)
    text = re.sub(r"<h3[^>]*>(.*?)</h3>", r"\n### \1\n", text, flags=re.S)
    text = re.sub(r"<p>(.*?)</p>", r"\1\n", text, flags=re.S)
    text = re.sub(r"<li>(.*?)</li>", r"- \1\n", text, flags=re.S)
    text = re.sub(r"<[^>]+>", "", text)
    text = decode_entities(text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def decode_entities(s: str) -> str:
    return s.replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", '"').replace("&amp;", "&")


def write(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n", encoding="utf-8")


def generate():
    html = HTML_SRC.read_text(encoding="utf-8")

    DOWNLOADS.mkdir(parents=True, exist_ok=True)
    dst_html = DOWNLOADS / "urovo-custom-api-sdk-docs.html"
    shutil.copy2(HTML_SRC, dst_html)
    content = dst_html.read_text(encoding="utf-8")
    content = content.replace(
        "<title>USDK Profile Service JAR Documentation</title>",
        "<title>UrovoCustomer API (USDK Profile Service JAR) Documentation</title>",
    )
    content = content.replace(
        '<p class="docs-header__title">USDK Profile Service JAR</p>',
        '<p class="docs-header__title">UrovoCustomer API</p>',
    )
    dst_html.write_text(content, encoding="utf-8")

    PUBLIC.mkdir(parents=True, exist_ok=True)
    public_html = PUBLIC / "urovo-custom-api-sdk-docs.html"
    shutil.copy2(dst_html, public_html)

    write(
        DOWNLOADS / "README.md",
        """# UrovoCustomer API downloads

| File | Description |
|------|-------------|
| `urovo-custom-api-sdk-docs.html` | Offline API documentation (open in a browser) |
""",
    )

    # --- ZH pages ---
    write(DOCS_ZH / "index.md", """# 概述

## SDK 简介

**UrovoCustomer API**（构件 `DeviceManagerNew`）是面向 Urovo/UBX 企业终端设备管理 SDK 的客户端 JAR 库，包名 `android.device`。通过 Binder 与系统 **USDKPlus** / `com.ubx.usdk.profile` 服务通信，提供设备信息、系统策略、网络、应用、日志等管理能力。

| 项目 | 说明 |
|------|------|
| 当前版本 | **16.3.04**（`build.gradle` `versionName`） |
| 平台 | Android（Java） |
| 最低 API | 22（Android 5.1） |
| 推荐 API | **29+**（Android 10+；Ex 类可无 Context 自动绑定） |
| 目标设备 | Android 10 及以上 Urovo 企业终端（部分接口兼容 Android 9 及以下） |

**下载：** [SDK / 离线 API 文档](/urovo-customer-api/download)

## 版本变更

当前 JAR 版本为 **16.3.04**（`build.gradle` `versionName`）。

## 核心能力

- **DeviceManager**：设备 SN/IMEI、APN、锁屏、Device Owner、静默装/卸、白名单、流量与内存统计等（Stub 接口声明，实机由 ROM 注入实现）
- **DeviceManagerEx**：扩展系统设置（亮度、音量、时区、默认应用等）、WiFi/热点、屏保、以太网 IP/代理、截图、Shell 命令
- **NetworkManagerEx**：WiFi 连接与 INI 调优、双卡默认卡槽、运营商手动选择、分卡槽 APN、网络策略锁定等
- **ApplicationManagerEx**：应用启停、运行时权限、通知黑白名单、电池优化、开机启动/安装后启动
- **LogManagerEx**：按 TAG/关键字 logcat 采集、WiFi/崩溃日志 dump、MTK/QCOM 离线日志
- **DevicePolicyEnhancer**：静默系统更新安装、蓝牙配对

## 适用场景

- MDM / 企业应用远程配置终端
- 批量部署：静默安装、默认 Launcher、WiFi/APN 预设
- 运维诊断：日志采集、流量与电量统计
- Kiosk / 锁定任务模式、按键与 USB 管控

## 环境要求

| 项目 | 要求 |
|------|------|
| compileSdk | 31 |
| Java | 1.8+ |
| 系统服务 | 设备预装 **USDKPlus** 系统服务及 `com.ubx.usdk.profile` Profile Service |
| 构建产物 | `gradlew makeJar` → `release/DeviceManagerNew_v16.3.04_<YYMMdd>.jar` |

## 文档导航

- [接入](/urovo-customer-api/integration)
- [快速开始](/urovo-customer-api/quick-start)
- [API 参考](/urovo-customer-api/api/)
- [示例](/urovo-customer-api/samples)
- [注意事项与 FAQ](/urovo-customer-api/faq)
- [下载 SDK / 离线 API 文档](/urovo-customer-api/download)
""")

    write(DOCS_ZH / "integration.md", """# 接入

## 获取 SDK

在本模块目录执行 `gradlew makeJar`（Windows：`gradlew.bat makeJar`），将 `release/` 下生成的 `DeviceManagerNew_v*.jar` 复制到应用工程的 `libs/` 目录。

在应用 `build.gradle` 中添加：

```gradle
dependencies {
    implementation files('libs/DeviceManagerNew_v16.3.04_xxxxxx.jar')
}
```

## 工程配置

**权限：** 多数操作在系统服务进程中执行，应用层通常无需特殊权限；涉及网络、存储日志路径时，按 Android 版本声明相应权限。

**ProGuard：** JAR 含 AIDL 与类 `android.device.*`，混淆时请 keep：

```
-keep class android.device.** { *; }
-keep class com.ubx.usdkplus.** { *; }
-keep class com.ubx.usdkenhancer.** { *; }
```

**系统服务：** `DeviceManager` 为 Stub，实现逻辑在设备 ROM；Ex 类通过 `ServiceManager.getService("USDKPlus")` 或 bind `com.ubx.usdkplus.profileserviceplus` 获取 Binder。

## 初始化

**Android 10+（API 29+）** — 无参构造自动获取 USDKPlus 服务：

```java
DeviceManagerEx dm = new DeviceManagerEx();
NetworkManagerEx nm = new NetworkManagerEx();
ApplicationManagerEx am = new ApplicationManagerEx();
LogManagerEx lm = new LogManagerEx();
```

`DeviceManager` 直接使用 `new DeviceManager()`（Stub，由系统替换实现）。

**Android 9 及以下：** Ex 类须使用 `Context` 构造；源码中 `bindService` 为 `private`，内部通过 `InitListener` 异步绑定。

绑定 Intent：

```java
Intent service = new Intent("com.ubx.usdkplus.profileserviceplus");
service.setPackage("com.ubx.usdk.profile");
```

**鉴权/密钥：** 无（依赖系统服务与 ROM 签名权限）。

下一步：[快速开始](/urovo-customer-api/quick-start)
""")

    write(DOCS_ZH / "quick-start.md", """# 快速开始

读取设备 SN 并设置 WiFi 国家码（Android 10+）：

```java
import android.device.DeviceManager;
import android.device.DeviceManagerEx;
import android.device.NetworkManagerEx;

public class QuickDemo {
    public void run() {
        DeviceManager dm = new DeviceManager();
        String sn = dm.getDeviceId();

        DeviceManagerEx dmEx = new DeviceManagerEx();
        NetworkManagerEx nmEx = new NetworkManagerEx();
        dmEx.controlCamera(false);
        nmEx.setWifiCountryCode("CN");
    }
}
```

完整 API 列表见 [API 参考](/urovo-customer-api/api/) 或 [下载离线 API 文档](/urovo-customer-api/download)。
""")

    write(DOCS_ZH / "samples.md", """# 示例

## 按卡槽配置 APN 并设为首选

```java
NetworkManagerEx nm = new NetworkManagerEx();
boolean ok = nm.setTargetSimApn(
        0, "MyAPN", "internet", "", 0, "", "", "", "460", "01",
        "", 0, 0, "default", "IPV4V6", 0, "IPV4V6", true);
String listJson = nm.listTargetSimApn(0);
```

要点：`current=true` 同时设为首选；精确切换可用 `setTargetSimCurrentApnById`。

## 手动选择运营商（后台线程）

```java
new Thread(() -> {
    NetworkManagerEx nm = new NetworkManagerEx();
    nm.startNetworkScan(0, callback);
    nm.selectManualNetwork(0, "46011", "中国电信");
}).start();
```

要点：`setNetworkSelectionAutomatic`、`selectManualNetwork` **禁止在主线程调用**（可能阻塞数秒导致 ANR）。

## 应用权限与白名单

```java
ApplicationManagerEx am = new ApplicationManagerEx();
am.grantRuntimePermission("com.example.app", "android.permission.CAMERA");
am.setDisallowAppUpgrade("com.example.app", 1);
```
""")

    write(DOCS_ZH / "faq.md", """# 注意事项与 FAQ

## 注意事项

**线程：** `NetworkManagerEx.setNetworkSelectionAutomatic`、`selectManualNetwork`、`setPreferredNetworkType` 等可能阻塞 modem，请在后台线程执行。

**服务绑定：** Ex 类在 Binder 断开时会尝试重绑 `ApplicationManagerEx` / `DeviceManagerEx` 等实例的 `DeathRecipient`；`DeviceManager` 源码中为 `throw new RuntimeException("stub")`，实机由设备 ROM 注入真实实现。

**机型差异：** WiFi INI 参数在 MTK / Qualcomm 平台有差异；离线日志路径 `OFFLINE_LOG_DIR_MTK` / `OFFLINE_LOG_DIR_QCOM` 因平台而异。

## FAQ

**Q: 调用返回 false 或空值？**

A: 请确认设备已安装 USDK Profile Service，且 `ServiceManager.getService("USDKPlus")` 非空；Android 9 及以下请使用 `Context` 构造 Ex 类。

**Q: DeviceManager 与 DeviceManagerEx 区别？**

A: `DeviceManager` 为传统 Stub 全量 API；`DeviceManagerEx` 通过 Binder 访问扩展服务，含更多系统设置与企业特性。

**Q: 如何采集 WiFi 日志？**

A: 使用 `LogManagerEx.startWifiLogCapture` 或 `startLogCaptureByKeywords` 配合 `DEFAULT_WIFI_LOG_KEYWORDS`。
""")

    write(DOCS_ZH / "download.md", """# 下载 SDK / 离线 API 文档

本页提供 UrovoCustomer API（USDK Profile Service JAR）的离线 API 文档。文件在仓库目录 `downloads/urovocustomapi/`。

## 下载列表

| 文件 | 说明 | 下载 |
|------|------|------|
| `urovo-custom-api-sdk-docs.html` | 离线 API 文档（双击用浏览器打开，含完整方法签名与示例） | [下载离线 API 文档](https://github.com/UrovoSdkCenter/docs-site/raw/main/downloads/urovocustomapi/urovo-custom-api-sdk-docs.html) |

## 使用说明

1. SDK JAR 请从 USDK Profile Service 模块执行 `gradlew makeJar` 获取，产物为 `DeviceManagerNew_v*.jar`。
2. 离线 API 文档为单页 HTML，支持中英文切换、全文搜索与侧边栏导航，本地双击即可浏览。
3. 在线开发指南见 [UrovoCustomer API](/urovo-customer-api/)。
""")

    # API index + group pages
    api_index_zh = ["# API 参考", "", "包名 `android.device`。完整方法签名、参数与示例见 [离线 API 文档](/urovo-customer-api/download)。", "", "| 分类 | 说明 |", "|------|------|"]
    for slug, en_title, zh_title, zh_desc in API_GROUPS:
        api_index_zh.append(f"| [{zh_title}](/urovo-customer-api/api/{slug}) | {zh_desc} |")
    api_index_zh.append("")
    write(DOCS_ZH / "api" / "index.md", "\n".join(api_index_zh))

    for slug, en_title, zh_title, zh_desc in API_GROUPS:
        section = extract_api_section(html, API_SEC_IDS[slug], "zh")
        table_md = extract_method_summary(section, "zh")
        intro = zh_desc
        offline = "完整方法说明见 [离线 API 文档](/urovo-customer-api/download)。"
        body = f"# {zh_title}\n\n{intro}\n\n{offline}\n\n"
        if table_md:
            body += table_md + "\n"
        write(DOCS_ZH / "api" / f"{slug}.md", body)

    # --- EN pages ---
    write(DOCS_EN / "index.md", """# Overview

## Introduction

**UrovoCustomer API** (artifact `DeviceManagerNew`) is the client JAR for Urovo/UBX enterprise device management. Package `android.device`. It talks to the system **USDKPlus** / `com.ubx.usdk.profile` service over Binder for device info, policy, network, apps, and logging.

| Item | Detail |
|------|--------|
| Version | **16.3.04** (`build.gradle` `versionName`) |
| Platform | Android (Java) |
| minSdk | 22 |
| Recommended | **API 29+** (Android 10+; Ex classes auto-bind without Context) |
| Devices | Android 10+ Urovo enterprise terminals (some APIs on Android 9 and below) |

**Download:** [SDK / offline API docs](/en/urovo-customer-api/download)

## Version history

Current JAR version is **16.3.04** (`build.gradle` `versionName`).

## Key features

- **DeviceManager**: SN/IMEI, APN, lock screen, Device Owner, silent install/uninstall, whitelists, traffic and memory stats (stub declarations)
- **DeviceManagerEx**: Extended settings (brightness, volume, timezone, defaults), WiFi/hotspot, screensaver, Ethernet IP/proxy, screenshot, shell commands
- **NetworkManagerEx**: WiFi connect & INI tuning, dual-SIM defaults, manual carrier selection, per-slot APN, network policy locks
- **ApplicationManagerEx**: App enable/disable, runtime permissions, notification lists, battery optimization, launch-after-boot/install
- **LogManagerEx**: logcat by TAG/keyword, WiFi/crash dumps, MTK/QCOM offline logs
- **DevicePolicyEnhancer**: Silent update install, Bluetooth pairing

## Use cases

- MDM / remote terminal configuration
- Mass deployment: silent install, default launcher, WiFi/APN preset
- Ops diagnostics: log capture, traffic and power stats
- Kiosk / lock task, key and USB control

## Requirements

| Item | Requirement |
|------|-------------|
| compileSdk | 31 |
| Java | 1.8+ |
| System | `USDKPlus` service and `com.ubx.usdk.profile` on device |
| Build | `gradlew makeJar` → `release/DeviceManagerNew_v16.3.04_<YYMMdd>.jar` |

## Documentation

- [Integration](/en/urovo-customer-api/integration)
- [Quick Start](/en/urovo-customer-api/quick-start)
- [API Reference](/en/urovo-customer-api/api/)
- [Examples](/en/urovo-customer-api/samples)
- [Notes & FAQ](/en/urovo-customer-api/faq)
- [Download](/en/urovo-customer-api/download)
""")

    write(DOCS_EN / "integration.md", """# Integration

## Obtain the SDK

Run `gradlew makeJar` in the Profile Service module. Copy `release/DeviceManagerNew_v*.jar` to your app `libs/`.

```gradle
dependencies {
    implementation files('libs/DeviceManagerNew_v16.3.04_xxxxxx.jar')
}
```

## Project setup

**Permissions:** Most operations run in the system service; declare network/storage permissions when writing log files.

**ProGuard:**

```
-keep class android.device.** { *; }
-keep class com.ubx.usdkplus.** { *; }
-keep class com.ubx.usdkenhancer.** { *; }
```

**Runtime:** `DeviceManager` is a stub; Ex classes use `ServiceManager.getService("USDKPlus")` or bind `com.ubx.usdkplus.profileserviceplus`.

## Initialization

**Android 10+ (API 29+)**

```java
DeviceManagerEx dm = new DeviceManagerEx();
NetworkManagerEx nm = new NetworkManagerEx();
ApplicationManagerEx am = new ApplicationManagerEx();
LogManagerEx lm = new LogManagerEx();
```

`DeviceManager` uses `new DeviceManager()` (stub replaced on device).

**Android 9 and below:** Use `Context` constructors for Ex classes.

```java
Intent service = new Intent("com.ubx.usdkplus.profileserviceplus");
service.setPackage("com.ubx.usdk.profile");
```

**Auth/keys:** None (relies on system service and ROM privileges).

Next: [Quick Start](/en/urovo-customer-api/quick-start)
""")

    write(DOCS_EN / "quick-start.md", """# Quick Start

Read device SN and set WiFi country code (Android 10+):

```java
import android.device.DeviceManager;
import android.device.DeviceManagerEx;
import android.device.NetworkManagerEx;

public class QuickDemo {
    public void run() {
        DeviceManager dm = new DeviceManager();
        String sn = dm.getDeviceId();

        DeviceManagerEx dmEx = new DeviceManagerEx();
        NetworkManagerEx nmEx = new NetworkManagerEx();
        dmEx.controlCamera(false);
        nmEx.setWifiCountryCode("US");
    }
}
```

See [API Reference](/en/urovo-customer-api/api/) or [offline API docs](/en/urovo-customer-api/download) for the full method list.
""")

    write(DOCS_EN / "samples.md", """# Examples

## Per-slot APN with preferred selection

```java
NetworkManagerEx nm = new NetworkManagerEx();
boolean ok = nm.setTargetSimApn(
        0, "MyAPN", "internet", "", 0, "", "", "", "460", "01",
        "", 0, 0, "default", "IPV4V6", 0, "IPV4V6", true);
String listJson = nm.listTargetSimApn(0);
```

Use `current=true` to set preferred APN; use `setTargetSimCurrentApnById` for precise switching.

## Manual carrier selection (background thread)

```java
new Thread(() -> {
    NetworkManagerEx nm = new NetworkManagerEx();
    nm.startNetworkScan(0, callback);
    nm.selectManualNetwork(0, "46011", "China Telecom");
}).start();
```

Do **not** call `setNetworkSelectionAutomatic` or `selectManualNetwork` on the main thread (may block for seconds).

## App permissions and upgrade blocklist

```java
ApplicationManagerEx am = new ApplicationManagerEx();
am.grantRuntimePermission("com.example.app", "android.permission.CAMERA");
am.setDisallowAppUpgrade("com.example.app", 1);
```
""")

    write(DOCS_EN / "faq.md", """# Notes & FAQ

## Notes

**Threading:** `NetworkManagerEx.setNetworkSelectionAutomatic`, `selectManualNetwork`, `setPreferredNetworkType`, etc. may block the modem—run on a background thread.

**Service binding:** Ex classes rebind via `DeathRecipient` when the Binder dies. `DeviceManager` source throws `RuntimeException("stub")`; the device ROM injects the real implementation.

**Platform differences:** WiFi INI keys differ on MTK vs Qualcomm; offline log paths `OFFLINE_LOG_DIR_MTK` / `OFFLINE_LOG_DIR_QCOM` vary by platform.

## FAQ

**Q: Calls return false or empty values?**

A: Ensure USDK Profile Service is installed and `ServiceManager.getService("USDKPlus")` is non-null. On Android 9 and below, construct Ex classes with `Context`.

**Q: DeviceManager vs DeviceManagerEx?**

A: `DeviceManager` is the legacy stub API surface. `DeviceManagerEx` talks to the extended Binder service with more system settings and enterprise features.

**Q: How to capture WiFi logs?**

A: Use `LogManagerEx.startWifiLogCapture` or `startLogCaptureByKeywords` with `DEFAULT_WIFI_LOG_KEYWORDS`.
""")

    write(DOCS_EN / "download.md", """# Download SDK / offline API docs

Offline API documentation for UrovoCustomer API (USDK Profile Service JAR). Files live under `downloads/urovocustomapi/`.

## Downloads

| File | Description | Link |
|------|-------------|------|
| `urovo-custom-api-sdk-docs.html` | Offline API docs (open in a browser; full signatures and samples) | [Download offline API docs](https://github.com/UrovoSdkCenter/docs-site/raw/main/downloads/urovocustomapi/urovo-custom-api-sdk-docs.html) |

## Usage

1. Build the JAR with `gradlew makeJar` in the Profile Service module (`DeviceManagerNew_v*.jar`).
2. The offline HTML supports bilingual UI, search, and sidebar navigation.
3. Online guide: [UrovoCustomer API](/en/urovo-customer-api/).
""")

    api_index_en = ["# API Reference", "", "Package `android.device`. Full signatures, parameters, and samples: [offline API docs](/en/urovo-customer-api/download).", "", "| Section | Description |", "|---------|-------------|"]
    en_descs = {
        "device-manager": "Device info, lock screen, silent install/uninstall, whitelists, traffic and memory stats.",
        "device-manager-ex": "Extended system settings, WiFi/hotspot, screenshot, shell commands.",
        "network-manager-ex": "WiFi, INI tuning, dual-SIM, APN, network policy locks.",
        "application-manager-ex": "App enable/disable, permissions, notifications, battery optimization.",
        "log-manager-ex": "logcat capture, WiFi/crash dumps, MTK/QCOM offline logs.",
        "device-policy-enhancer": "Silent update install, Bluetooth pairing.",
        "types-callbacks": "Callback interfaces and listeners.",
        "types-models": "Data models and constants.",
    }
    for slug, en_title, zh_title, _ in API_GROUPS:
        api_index_en.append(f"| [{en_title}](/en/urovo-customer-api/api/{slug}) | {en_descs[slug]} |")
    api_index_en.append("")
    write(DOCS_EN / "api" / "index.md", "\n".join(api_index_en))

    for slug, en_title, zh_title, _ in API_GROUPS:
        section = extract_api_section(html, API_SEC_IDS[slug], "en")
        table_md = extract_method_summary(section, "en")
        body = f"# {en_title}\n\n{en_descs[slug]}\n\nSee [offline API docs](/en/urovo-customer-api/download) for full method details.\n\n"
        if table_md:
            body += table_md + "\n"
        write(DOCS_EN / "api" / f"{slug}.md", body)

    print("Generated UrovoCustomer API docs.")


if __name__ == "__main__":
    generate()
