import { useEffect } from "react";

export function useEntryExitFocus(openedMenuIdx, onlyKeyFocus, prevMenuIdxRef, isKeyActive, btnsRef, panelsRef, headFocusItemInContent, destroyContent) {
  // 离开的焦点控制
  useEffect(() => {
    if (openedMenuIdx < 0) {
      if (prevMenuIdxRef.current > -1) {
        if ((onlyKeyFocus && isKeyActive.current) || !onlyKeyFocus)
          btnsRef.current[prevMenuIdxRef.current].focus();
      }
    }
  }, [openedMenuIdx, onlyKeyFocus]);

  // 进入的焦点控制
  useEffect(() => {
    if (openedMenuIdx > -1) {
      if (!destroyContent && ((onlyKeyFocus && isKeyActive.current) || !onlyKeyFocus)) {
        const head = headFocusItemInContent.current[openedMenuIdx];
        if (head) head.focus({ preventScroll: true });
        else panelsRef.current[openedMenuIdx].focus({ preventScroll: true });
      }
    }
  }, [openedMenuIdx, onlyKeyFocus, destroyContent]);
}