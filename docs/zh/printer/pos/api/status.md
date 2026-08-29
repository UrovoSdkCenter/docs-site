# 状态与参数

## PrinterProviderImpl.getStatus

获取当前打印机状态。

### 签名

```java
int getStatus()
```

### 返回值

| 值 | 含义 |
| --- | --- |
| 0x00 | 正常，可打印 |
| 0xF0 | 缺纸 |
| 0xF3 | 打印头过热 |
| 0xE1 | 低压 |
| 0xF7 | 打印机忙 |
| 0xFB | 打印机芯/电机故障 |
| 0xF2 | 硬件错误 |
| 其他 | 打印失败 |

`````````````` 详见 `PrintStatus` 常量类。

| Method | Description |
| --- | --- |
| void setGray(int gray) | 设置灰度，范围 -6～6 |
| int setSpeed(int speedLevel) | 设置打印速度，范围 10～20；返回 0 成功 |
