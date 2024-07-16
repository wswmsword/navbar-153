import styles from "./index.module.css";

export default function MobileForeverSlate({ propsFromN, head, tail, dynamicWidth }) {
  const contentItemStyle = {
    width: dynamicWidth ? 280 : "100%",
    flexShrink: 0,
  };
  return <div
    className={styles.wrapper}
    {...propsFromN}
    style={{ ...propsFromN.style, ...contentItemStyle }}>
    <p className={styles.desc}><a ref={head} href="https://github.com/wswmsword/postcss-mobile-forever">postcss-mobile-forever</a> 是一款 PostCSS 插件，是一种移动端适配方法。postcss-mobile-forever 可以配合 <a href="https://github.com/wswmsword/scale-view">scale-view</a> 使用，前者用于编译阶段，后者用于运行阶段。</p>
    <ul className={styles.links}>
      <li><a href="https://wswmsword.github.io/examples/mobile-forever/vanilla/">演示</a></li>
      <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%A8%A1%E7%89%88%E5%92%8C%E8%8C%83%E4%BE%8B">移动端模版和范例</a></li>
      <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E5%AE%89%E8%A3%85">安装</a></li>
      <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0">配置参数</a></li>
      <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E4%B8%8E%E5%8F%82%E4%B8%8E%E5%BC%80%E5%8F%91">单元测试与参与开发</a></li>
      <li><a ref={tail} href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E8%8C%83%E4%BE%8B%E5%92%8C%E5%8E%9F%E7%90%86">输入输出范例和原理</a></li>
    </ul>
  </div>;
}