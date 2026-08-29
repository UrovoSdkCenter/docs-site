# Barcodes and QR codes

## PrinterProviderImpl.addBarCode

Adds a 1D barcode.

### Signature

```java
void addBarCode(Bundle format, String barcode)
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| format | Bundle | Yes | ALIGN, WIDTH, HEIGHT, BARCODE_TYPE, etc. |
| barcode | String | Yes | Barcode payload |

## PrinterProviderImpl.addQrCode

Adds a QR code.

### Signature

```java
void addQrCode(Bundle format, String qrCode)
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| format | Bundle | Yes | ALIGN (when offset=-1), OFFSET, EXHEIGHT, etc. |
| qrCode | String | Yes | QR content |
