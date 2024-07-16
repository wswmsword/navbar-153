
export const fallbackLng = "zh-CN";
export const languages = [fallbackLng, "en"];

export function getOptions(lng = fallbackLng) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
  }
}