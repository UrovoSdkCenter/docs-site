# Images and HTML

## PrinterProviderImpl.addImage

Adds a bitmap from a byte array.

### Signature

```java
void addImage(Bundle format, byte[] imageData)
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| format | Bundle | Yes | OFFSET, WIDTH (max ~380), HEIGHT |
| imageData | byte[] | Yes | Encoded image bytes (PNG/JPEG, etc.) |

## PrinterProviderImpl.addImageWithText

Image with accompanying text on the same block.

### Signature

```java
void addImageWithText(Bundle format, byte[] imageData)
```

Additional format keys: `YAlign`, `TEXT`, `FONT`, `FONTBOLD`, etc.

## PrinterProviderImpl.addHtml

Renders an HTML fragment into the print queue.

### Signature

```java
void addHtml(Bundle format, String content)
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| format | Bundle | Yes | OFFSET, WIDTH (max 380), HEIGHT |
| content | String | Yes | HTML string |
