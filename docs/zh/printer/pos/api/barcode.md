# 条码与二维码

## PrinterProviderImpl.addBarCode

添加一维条码。

### 签名

```java
void addBarCode(Bundle format, String barcode)
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| format | Bundle | 是 | ALIGN、WIDTH、HEIGHT、BARCODE_TYPE 等 |
| barcode | String | 是 | 条码数据 |

## PrinterProviderImpl.addQrCode

添加 QR 二维码。

### 签名

```java
void addQrCode(Bundle format, String qrCode)
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| format | Bundle | 是 | ALIGN（offset=-1 时生效）、OFFSET、EXHEIGHT 等 |
| qrCode | String | 是 | 二维码内容 |
