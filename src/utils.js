import { Children, cloneElement } from "react";

export function getSlateWrapperTranslateVal(y, openedMenuIdx, triggerRef, slateClientWidthRef) {
  const curSlateWidth = slateClientWidthRef.current[openedMenuIdx];
  const curTrigger = triggerRef.current[openedMenuIdx];
  const left = (curSlateWidth == null || curTrigger == null) ?
    0 :
    (curTrigger.offsetLeft + curTrigger.clientWidth / 2 - curSlateWidth / 2);
  return `translate(${left}px, ${y})`;
}

/** 递归地为 `<Item>` 设置 `type` 和 `orderI` */
export function passTypeAndOrderI(children, relatedIdx = -1) {
  return Children.map(children, child => {
    const dn = (child.type || {}).displayName;
    if (dn === "Item") {
      ++ relatedIdx;
      return cloneElement(child, { type: "T", orderI: relatedIdx });
    } else if (dn === "Group") {
      return cloneElement(child, {
        children: passTypeAndOrderI(child.props.children, relatedIdx),
      });
    }
    return child;
  });
}