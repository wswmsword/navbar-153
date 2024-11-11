import styles from "./index.module.css";

export default function NavbarSlate({ propsFromN, head, tail, dynamicWidth }) {
  const contentItemStyle = dynamicWidth ? {
    width: 300,
  } : {};
  return <div
    className={styles.wrapper}
    {...propsFromN}
    style={{ ...propsFromN.style, ...contentItemStyle }}>
    <p className={styles.navDesc}>请握紧导航栏，不要因为走得太远，就忘了当初为什么出发。</p>
    <div className={styles.feats}>
      <FeatSlate e="🍯" t="流畅的过渡动画" d="符合直觉的入场、退场和切换动画" />
      <FeatSlate e="🎹" t="键盘导航" d={<>按下 <kbd>Tab</kbd> 和 <kbd>Esc</kbd>，让焦点流动</>} />
      <FeatSlate e="♿️" t="屏幕阅读器导航" d="有规范的 ARIA 属性，具备可访问性" />
      <FeatSlate e="🎨" t="高度自定义" d="为每个元素设置样式，让每个导航栏变得不一样" />
    </div>
    <ul className={styles.links}>
      <li><a ref={head} href="https://github.com/wswmsword/hanav?tab=readme-ov-file#%E5%AE%89%E8%A3%85%E5%92%8C%E4%BD%BF%E7%94%A8">安装和使用</a></li>
      <li><a href="https://github.com/wswmsword/hanav?tab=readme-ov-file#api">API</a></li>
      <li><a href="https://github.com/wswmsword/hanav?tab=readme-ov-file#%E9%94%AE%E7%9B%98%E4%BA%A4%E4%BA%92">键盘交互</a></li>
      <li><a ref={tail} href="https://github.com/wswmsword/hanav?tab=readme-ov-file#%E5%BC%80%E5%8F%91%E4%B8%8E%E7%BB%B4%E6%8A%A4%E6%96%B9%E5%90%91">开发与维护方向</a></li>
    </ul>
  </div>;
}

function FeatSlate({ e, t, d }) {
  return <div className={styles.feat}>
    <div className={styles.icon_wrap}>{e}</div>
    <div>
      <div className={styles.title}>{t}</div>
      <div className={styles.desc}>{d}</div>
    </div>
  </div>;
}