# navbar-153

<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996.icu" align="right"></a>

中文 | [English](./README_EN.md)

navbar-153 是一个 React 导航栏组件，包含一组触发器和一组对应的菜单面板，用户可以通过触发器展开、切换、收起菜单面板。导航栏通常出现在网站的顶部，提供最希望用户访问的链接和其它控件。navbar-153 有下面这些特性：

- 🍯 流畅的过渡动画；
- 🎹 键盘导航；
- ♿️ 屏幕阅读器导航；
- 🎨 高度自定义。

> navbar-153 is a React navigation menu component that includes a set of triggers and a corresponding set of menu panels. For more information, please refer to [the English README](./README_EN.md) or [demo](https://wswmsword.github.io/examples/navbar-153/en).

您可以打开[演示链接](https://wswmsword.github.io/examples/navbar-153)，查看使用效果。

<details>
<summary>在 Chrome 中，可以打开“短暂地突出显示焦点对象”无障碍功能，来可视化查看组件的焦点走向。</summary>

在地址栏输入 `chrome://settings/accessibility`，或者在“设置 -> 无障碍”中，可以设置“短暂地突出显示焦点对象”。

![Chrome Outer Row](./images/chrome-outer-row.png)

</details>

## 安装和使用

使用 npm 安装 navbar-153：

```bash
npm install navbar-153
```

下面是安装之后，使用组件的大致形态，完整的范例可以打开[仓库的 `dark-space` 文件夹](./examples/dark-space)（Nextjs 项目）查看：

```javascript
import N from "navbar-153";
const { Trigger, Item, Content } = N;
function MyNavBar() {
  const contentItemStyle = props => ({ ...props.style, width: "100%", flexShrink: 0 });
  return (
    <N style={{ position: "relative" }}>
      <Trigger style={{ display: "flex", gap: 8 }}>
        <Item><a href="https://github.com/wswmsword/navbar-153">Repo</a></Item>
        <Item>{props => <button {...props}>Trigger 1</button>}</Item>
        <Item>{props => <button {...props}>Trigger 2</button>}</Item>
        <Item>{props => <button {...props}>Trigger 3</button>}</Item>
      </Trigger>
      <Content className="panelsWrapper">
        <Item>{props => <div {...props} style={contentItemStyle(props)}>Content 1</div>}</Item>
        <Item>
          {(props, head, tail) => <div {...props} style={contentItemStyle(props)}>
            <a href="https://react.dev/?uwu" ref={head}>React</a>
            vs
            <a href="https://vuejs.org/?uwu" ref={tail}>Vue</a>
          </div>}
        </Item>
        <Item>{props => <div {...props} style={contentItemStyle(props)}>Content 3</div>}</Item>
      </Content>
    </N>
  );
}
export default MyNavBar;
```

## API

导航栏组件由下面几个组件组合而成，分别是 `<N>`、`<Trigger>`、`<Content>` 和 `<Item>`。

### N（Root）

导航栏组件的最外层组件，使用的时候默认导入，例如：

```javascript
import N from "navbar-153";
```

`<N>` 会被渲染成 `<nav>` 作为导航栏组件的最外层，`<N>` 接收任何用于 HTML 元素的 props，以及下面这些额外选项：

- `motion`，boolean，是否减弱动态效果；
- `dur`，number，定义过渡动画的持续时间（s）；
- `gap`，number，设置面板和触发器之间的距离（px）；
- `dynamicWidth`，boolean，允许面板的宽度变化；
- `onlyKeyFocus`，boolean，设置焦点仅在键盘控制时触发转移；
- `close`，boolean，切换面板时跟随触发器的位置。

### Trigger

像下面这样导入 `<Trigger>` 组件：

```javascript
import N from "navbar-153";
const { Trigger, Content, Item } = N;
```

`<Trigger>` 会被渲染成 `<div>`，作为 `<nav>` 的子元素，`<Trigger>` 接收任何内置的 props。`<Trigger>` 组件内部是一组触发器，因此可以在 `<Trigger>` 上传入 `className` 或 `style` 来定义触发器的布局。

### Content

`<Content>` 的导入方式和 `<Trigger>` 相同。`<Content>` 组件内部是一组内容面板，每一个内容面板都按顺序对应了 `<Trigger>` 组件内部的触发器，`<Content>` 与 `<Trigger>` 应该在同一层级，`<Content>` 组件会被渲染成两层 `<div>`，接收任何内置的 props，这些 props 最终生效在外层 `<div>` 上，此外，可以传入 `inner`，`inner` 中的对象会作为 props 传入内层 `<div>`。可以向 `<Content>` 传入 `className` 或 `style` 来为面板设置阴影等样式。

### Item

`<Item>` 的导入方式和 `<Trigger>` 相同。`<Item>` 必须作为 `<Trigger>` 或 `<Content>` 的直接子元素，`<Item>` 在 `<Trigger>` 中是触发器，`<Item>` 在 `<Content>` 中是内容面板，`<Item>` 不接收任何参数。

`<Item>` 在 `<Trigger>` 中时，`<Item>` 的子元素可能是一个触发器，也可能是一个普通的元素，每个触发器都对应了一个内容面板。当子元素是一个组件，或是一个具体的元素，例如 `<a>`，则 `<Item>` 会被视为一个普通元素。当子元素 children 是一个 render props，则会被视为一个触发器，例如下面这样：

```javascript
<Item>{props => <button {...props}>Trigger 1</button>}</Item>
```

上面例子中的 props 必须要传递给触发器元素，这些 props 包含了事件、ARIA 标签等必须的信息。

`<Item>` 在 `<Content>` 中时，`<Item>` 的子元素是一个内容面板，子元素 children 必须是一个 render props，例如下面这样：

```javascript
<Item>
  {(props, head, tail) => <div {...props} style={{ ...props.style, width: "100%", flexShrink: 0 }}>
    <a href="https://react.dev/?uwu" ref={head}>React</a>
    vs
    <a href="https://vuejs.org/?uwu" ref={tail}>Vue</a>
  </div>}
</Item>
```

上面例子中的 props 必须要传递给内容面板元素，这些 props 同样包含了事件、ARIA 标签等必须的信息，render props 的入参还提供了第二个参数 `head` 和第三个参数 `tail`，如果内容面板中包含可聚焦的元素，必须要分别把 `head` 作为 `ref` 传递给第一个可聚焦元素，把 `tail` 作为 `ref` 传递给最后一个可聚焦元素，这两个 `ref` 会完成键盘 <kbd>Tab</kbd> 导航的工作，如果内容面板中只展示，没有聚焦元素，可以忽略这两个参数。

## 键盘交互

| Key | Description |
|:--|:--|
| <kbd>Tab</kbd> | 当焦点在触发器上，将从前往后逐个聚焦，当焦点在内容面板中，焦点将在头元素和尾元素之间循环 |
| <kbd>Space</kbd> <kbd>Enter</kbd> | 当焦点在触发器上，按下按键，会展开或收起内容面板 |
| <kbd>Esc</kbd> | 当焦点在内容面板中，按下按键会收起面板，焦点回到触发器 |

## 注意事项

macOS 里，用户在 Firefox 可能无法使用 <kbd>Tab</kbd> 聚焦链接元素，需要用户执行下面的步骤：打开“系统设置”，打开“键盘”，打开“键盘导航”。

## 开发与维护方向

在项目根目录执行下面的命令，监听组件源码的变化，并实时更新输出：

```bash
npm run watch
```

保持上面的监听命令打开，再打开新的终端会话，执行下面的命令运行引入了源码组件的 React Demo 应用，在更改源码时，在浏览器实时查看效果：

```bash
cd examples/demo
npm i
npm run dev
```

下面我会带您看到这个项目的目标，大概是终端用户、开发者和源码维护三个方面，最终希望您也能够参与进来完善这个项目：

- 可访问性
  - 有正确的 ARIA 标签，能够通过安卓 TalkBack 和 iOS、MacOS 的 VoiceOver 的验证
  - 能够完全通过键盘控制
  - 能够切换打开与关闭过渡动画
- 流畅的过渡动画
- 不错的性能
- 良好的开发体验
  - 有符合直觉的使用形态
  - 保留导航栏功能核心，不侵犯开发者的自定义空间
- 简易的文档
- 编码整理
  - 无需遵循特定的格式规范，请自由使用习惯的格式
  - 编码中的命名合适，在没有找到合适的命名前有详细的注释辅助理解
  - 上浮和下沉函数，找到合适的抽象层

查看[一些原理](./how-it-works.md)。

## CHANGELOG

查看[更新日志](./CHANGELOG.md)。

## 版本规则

查看[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)。

## 协议

查看 [MIT License](./LICENSE)。

## 支持与赞助

请随意 Issue、PR 和 Star，您也可以支付该项目，支付金额由您从该项目中获得的收益自行决定。

<details>
<summary>展开查看用于微信支付和支付宝支付的二维码。</summary>

<table>
  <tr align="center">
    <td>微信支付</td>
    <td>支付宝支付</td>
  </tr>
	<tr>
		<td><img src="./images/wechat-pay.png" alt="Pay through WeChat" /></td>
		<td><img src="./images/ali-pay.jpg" alt="Pay through AliPay" /></td>
	</tr>
</table>

</details>
