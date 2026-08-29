# LED test

| Method | Description |
|--------|-------------|
| `setLedTestOnTimeMs(int ms)` | ON time **0..5000** |
| `setLedTestOffTimeMs(int ms)` | OFF time **0..5000** |
| `setLedTestCount(int count)` | Count **1..100** |
| `setLedTestAlternate(boolean enable)` | Red-green alternate |
| `runLedTest()` | Start test |
| `turnOffLedTest()` | Stop test (cmd 0xB9) |
