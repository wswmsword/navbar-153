import styles from "./index.module.css";
import { Context } from "../../main";
import { useContext } from "react";

export default function Docs() {
  const { go } = useContext(Context);
  return <>
    <h1 className={styles.txt}>hanav</h1>
    <pre className={styles.install}>npm install hanav</pre>
    <p className={styles.txt}>hanav 是一个 React 导航栏组件，包含一组触发器和一组对应的菜单面板，用户可以通过触发器展开、切换、收起菜单面板。导航栏通常出现在网站的顶部，提供最希望用户访问的链接和其它控件。</p>
    <div className={styles.feats}>
      <FeatSlate emoji="🍯" title="流畅的过渡动画" desc="符合直觉的入场、退场和切换动画，退场动画结束后，消失的面板将被移除 DOM" />
      <FeatSlate emoji="🎹" title="键盘导航" desc={<>按下 <kbd>Tab</kbd> 和 <kbd>Esc</kbd>，让焦点流动，用户可以任意选择鼠标或键盘访问</>} />
      <FeatSlate emoji="♿️" title="屏幕阅读器导航" desc="有规范的 ARIA 属性，具备可访问性，可以通过 TalkBack 或 VoiceOver 辅助设备访问" />
      <FeatSlate emoji="🎨" title="高度自定义" desc="被渲染的 DOM 和组件一一对应，为每个元素设置样式，还能自定义切换过渡动画" />
    </div>
    <p className={styles.txt}>hanav 的使用方法很简单，提供了直观简单的 API，有良好的开发体验，具体的使用方法请查看 <a href="https://github.com/wswmsword/hanav">hanav 的 GitHub 仓库主页</a>。</p>
    <p className={styles.txt} style={{ position: "relative" }}>星海闪烁，请握紧导航栏。
      <svg className={styles.wwrapper} width="80" height="60" viewBox="5 0 80 60">
        <path
          className={styles.wave}
          style={{ stroke: go ? "#fbde3b" : "#c5c5c5", animationPlayState: go ? "running" : "paused" }}
          fill="none"
          strokeWidth="4" strokeLinecap="round"
          d="M 0 37.5 c 7.684299348848887 0 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15 s 7.172012725592294 15 15 15 s 7.172012725592294 -15 15 -15" />
      </svg>
    </p>
    <div role="presentation" className={styles.presentation}>HANAV</div>
  </>;
}

function FeatSlate({ emoji, title, desc }) {
  return <div className={styles.feat}>
  <p className={styles.emoji}>{emoji}</p>
  <p className={styles.featTt}>{title}</p>
  <p className={styles.featDesc}>{desc}</p>
</div>
}