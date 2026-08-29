# 注意事项与 FAQ

## 注意事项
- **线程：** Demo 在后台线程调用打印；避免在主线程长时间阻塞。
- **生命周期：** 规范建议每次打印完成后 `close()`，下次再 `initPrint()`，避免状态残留。
- **宽度：** 图片/HTML 宽度不超过约 380～384 像素，否则可能被截断。
- **顺序：** 必须先组内容再 `startPrint()`；返回后再进行下一次组单。
- **废弃 API：** 不要使用无 Bundle 的左右/三栏文本重载。

## FAQ

**Q:** getStatus 返回非 0 还能继续 addText 吗？

**A:** 不建议。应先处理缺纸、过热等问题，或在 `close()` 后重新 `initPrint()`。

**Q:** feedLine(0) 与 feedLine(-1) 区别？

**A:** `0` 在票尾追加留白；`-1` 不追加底部空白。

**Q:** 标签打印为什么要 setLabelFeed？

**A:** 标签纸需物理定位；开始前定位/连续模式，结束后必须 `PRN_LABEL_END`，否则下次打印位置会偏。

**Q:** 自定义字体不生效？

**A:** 检查 `fontName` 路径应用可读，且 TTF 文件有效；若设置了 `fontSize` 会忽略 `font` 档位。

**Q:** 规范里的 addTextLeft_Right_Center 找不到？

**A:** 代码中方法名为 `addTextLeft_Center_Right`，以 SDK 源码为准。
