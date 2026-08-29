# Entry and lifecycle

## PrinterProviderImpl.getInstance

Returns the printer manager singleton.

### Signature

```java
static PrinterProviderImpl getInstance(Context context)
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| context | Context | Yes | Application context |

### Returns

`PrinterProviderImpl` singleton.

### Errors

None.

### Example

```java
PrinterProviderImpl printer = PrinterProviderImpl.getInstance(getApplicationContext());
```

## PrinterProviderImpl.initPrint

Opens the printer and initializes the page (384 px wide).

### Signature

```java
int initPrint()
```

### Returns

Return value of underlying `PrinterManager.open()`; `0` means success.

### Errors

Non-zero open failure — do not compose content.

### Example

```java
int ret = printer.initPrint();
```

## PrinterProviderImpl.close

Closes the printer and releases page resources. Recommended after each `startPrint()`.

### Signature

```java
int close()
```

### Returns

Always `0`.

## PrinterProviderImpl.startPrint

Flushes the buffer and starts physical printing.

### Signature

```java
int startPrint()
```

### Returns

Print status — same semantics as `getStatus()`; see `PrintStatus` and the error-code section below.

### Example

```java
int status = printer.startPrint();
if (status != PrintStatus.ERROR_NONE) {
   // handle out-of-paper, overheat, etc.
}
```
