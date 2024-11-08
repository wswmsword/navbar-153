export function getSlateWrapperTranslateVal(y, openedMenuIdx, triggerRef, slateClientWidthRef) {
  const curSlateWidth = slateClientWidthRef.current[openedMenuIdx];
  const curTrigger = triggerRef.current[openedMenuIdx];
  const left = (curSlateWidth == null || curTrigger == null) ?
    0 :
    (curTrigger.offsetLeft + curTrigger.clientWidth / 2 - curSlateWidth / 2);
  return `translate(${left}px, ${y})`;
}
