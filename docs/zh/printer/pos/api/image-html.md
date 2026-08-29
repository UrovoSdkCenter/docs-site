# 图片与 HTML

## PrinterProviderImpl.addImage

添加位图（字节数组）。

### 签名

```java
void addImage(Bundle format, byte[] imageData)
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| format | Bundle | 是 | OFFSET、WIDTH（最大约 380）、HEIGHT |
| imageData | byte[] | 是 | 图片 PNG/JPEG 等编码字节 |

## PrinterProviderImpl.addImageWithText

图文混排：图片与同行/同块文本。

### 签名

```java
void addImageWithText(Bundle format, byte[] imageData)
```

format 额外支持：`YAlign`（文本相对图片垂直对齐）、`TEXT`、`FONT`、`FONTBOLD` 等。

## PrinterProviderImpl.addHtml

渲染 HTML 片段并加入打印队列。

### 签名

```java
void addHtml(Bundle format, String content)
```

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| format | Bundle | 是 | OFFSET、WIDTH（max 380）、HEIGHT |
| content | String | 是 | HTML 字符串 |
