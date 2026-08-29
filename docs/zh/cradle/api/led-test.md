# LED 测试

| 方法 | 说明 |
|------|------|
| `setLedTestOnTimeMs(int ms)` | 亮灯时间 **0..5000** |
| `setLedTestOffTimeMs(int ms)` | 灭灯时间 **0..5000** |
| `setLedTestCount(int count)` | 次数 **1..100** |
| `setLedTestAlternate(boolean enable)` | 红绿交替 |
| `runLedTest()` | 开始测试 |
| `turnOffLedTest()` | 停止测试（cmd 0xB9） |
