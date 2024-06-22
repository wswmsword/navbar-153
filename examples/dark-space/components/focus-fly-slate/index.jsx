import styles from "./index.module.css";
import { forwardRef } from "react";

export default function FocusFlySlate({ propsFromN, head, tail }) {
  const contentItemStyle = {
    width: "100%",
    flexShrink: 0,
  };
  return <ul
    className={styles.wrapper}
    {...propsFromN}
    style={{ ...propsFromN.style, ...contentItemStyle }}>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-hot"
        t="热身" d="想度过一个美好的夜晚吗？先热身"
        ref={head} />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-dialog"
        t="对话框"
        d="开发对话框时，要注意的焦点之间的跳跃和传递，对话框很常见，但通常会存在可访问性的问题" />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-nav"
        t="导航栏" d="有的在顶部，有的在侧边，每一个导航栏都是特别的" />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-tabs"
        t="选项卡" d="切换选项卡，展示相应面板，切换方式分为自动与手动" />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-player"
        t="播放列表" d="音乐平台 Spotify 的网页有很好的键盘体验，其中一个例子是播放列表" />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-scroll"
        t="滚动加载" d="深不见底线的滚动加载"
        ref={tail} />
    </li>
  </ul>;
}

const DemoSlate = forwardRef(function DemoSlate({ href, t, d }, ref) {
  return <a href={href} ref={ref}>
    <div className={styles.title}>{t}</div>
    <div className={styles.desc}>{d}</div>
  </a>
})