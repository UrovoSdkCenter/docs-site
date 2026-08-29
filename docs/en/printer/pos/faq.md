# Notes & FAQ

## Notes
- **Threading:** The Demo runs print jobs on a background thread; avoid blocking the main thread.
- **Lifecycle:** Close after each job and re-init before the next to avoid stale state.
- **Width:** Keep image/HTML width within ~380–384 px to prevent clipping.
- **Order:** Compose all content before `startPrint()`; wait for the result before the next job.
- **Deprecated APIs:** Do not use legacy left/right text overloads without `Bundle`.

## FAQ

**Q:** Can I keep adding content when getStatus is non-zero?

**A:** Not recommended. Resolve paper/heat issues first, or `close()` and `initPrint()` again.

**Q:** Difference between feedLine(0) and feedLine(-1)?

**A:** `0` adds trailing whitespace; `-1` does not.

**Q:** Why setLabelFeed for labels?

**A:** Label stock needs physical positioning — start with LOCATION/CONTINUE, always end with `PRN_LABEL_END`.

**Q:** Custom font not applied?

**A:** Ensure the TTF path is readable; if `fontSize` is set, the `font` tier is ignored.

**Q:** Spec mentions addTextLeft_Right_Center but IDE cannot find it?

**A:** The SDK method is `addTextLeft_Center_Right` — follow source code.
