# hanav

<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996.icu" align="right"></a>

中文 | [English](./README_EN.md)

hanav 是一个 React 导航栏组件，包含一组触发器和一组对应的菜单面板，用户可以通过触发器展开、切换、收起菜单面板。导航栏通常出现在网站的顶部，提供最希望用户访问的链接和其它控件。hanav 有下面这些特性：

- 🍯 流畅的过渡动画；
- 🎹 键盘导航；
- ♿️ 屏幕阅读器导航；
- 🎨 高度自定义。

> hanav is a React navigation menu component that includes a set of triggers and a corresponding set of menu panels. For more information, please refer to [the English README](./README_EN.md) or [demo](https://wswmsword.github.io/examples/hanav/en).

您可以打开[演示链接](https://wswmsword.github.io/examples/hanav)，查看使用效果。

<details>
<summary>在 Chrome 中，可以打开“短暂地突出显示焦点对象”无障碍功能，来可视化查看组件的焦点走向。</summary>

在地址栏输入 `chrome://settings/accessibility`，或者在“设置 -> 无障碍”中，可以设置“短暂地突出显示焦点对象”。

![Chrome Outer Row](./images/chrome-outer-row.png)

</details>

## 安装和使用

使用 npm 安装 hanav：

```bash
npm install hanav
```

下面是安装之后，使用组件的大致形态，完整的范例可以打开[仓库的 `dark-space` 文件夹](./examples/dark-space)（Next.js 项目）查看：

```javascript
import { NavBar, Trigger, Item, Content } from "hanav";
function MyNavBar() {
  return <NavBar style={{ position: "relative" }}>
    <Trigger style={{ display: "flex", gap: 8 }}>
      <a href="https://github.com/wswmsword/hanav">Repo</a>
      <Item><button>Trigger 1</button></Item>
      <Item><button>Trigger 2</button></Item>
      <Item><button>Trigger 3</button></Item>
    </Trigger>
    <Content className="panelsWrapper">
      <Item>{props => <div {...props}>Content 1</div>}</Item>
      <Item>
        {(props, head, tail) => <div {...props}>
          <a href="https://react.dev/?uwu" ref={head}>React</a>
          vs
          <a href="https://vuejs.org/?uwu" ref={tail}>Vue</a>
        </div>}
      </Item>
      <Item>{props => <div {...props}>Content 3</div>}</Item>
    </Content>
  </NavBar>;
}
export default MyNavBar;
```

## API

导航栏组件主要由 4 部分组成，分别是 `<NavBar>`、`<Trigger>`、`<Content>` 和 `<Item>`，此外，`<Content>` 还包括一些变体用于满足**关闭**或**定制**过渡动画的需求。

### NavBar

导航栏组件的最外层组件，使用的时候具名导入，例如：

```javascript
import { NavBar } from "hanav";
```

`<NavBar>` 会被渲染成 `<nav>` 作为导航栏组件的最外层，`<NavBar>` 接收任何用于 HTML 元素的 props，以及下面这些额外选项：

- `dur`，number，定义过渡动画的持续时间（s）；
- `gap`，number，设置面板和触发器之间的距离（px）；
- `dynamicWidth`，boolean，允许面板的宽度变化；
- `onlyKeyFocus`，boolean，设置焦点仅在键盘控制时触发转移；
- `close`，boolean，切换面板时跟随触发器的位置。

### Trigger

像下面这样导入 `<Trigger>` 组件：

```javascript
import { Trigger } from "hanav";
```

`<Trigger>` 会被渲染成 `<div>`，作为 `<nav>` 的子元素，`<Trigger>` 接收任何内置的 props。`<Trigger>` 组件内部是一组触发器，因此可以在 `<Trigger>` 上传入 `className` 或 `style` 来定义触发器的布局。

### Content

```javascript
import { Content } from "hanav";
```

`<Content>` 组件内部是一组内容面板，每一个内容面板都按顺序对应了 `<Trigger>` 组件内部的触发器，`<Content>` 与 `<Trigger>` 需要是兄弟节点，`<Content>` 组件会被渲染成两层 `<div>`，内层 `<div>` 用于纵轴动画，外层 `<div>` 用于*整个面板*的横轴动画。

`<Content>` 接收任何内置的 props，这些 props 最终生效在**内层** `<div>` 上，外层 `<div>` 可以通过 `outer` 属性传入需要的 props。内层 `<div>` 用于设置整个面板的样式，外层 `<div>` 主要用于 hanav 内部对整个面板横向动画的控制。

- `outer`，`outer` 中的对象会作为 props 传入 `<Content>` 渲染的外层 `<div>` 上。

### Item

```javascript
import { Item } from "hanav";
```

`<Item>` 必须作为 `<Trigger>` 或 `<Content>` 的直接子元素，`<Item>` 在 `<Trigger>` 中是触发器，在 `<Content>` 中是内容面板，`<Item>` 不接收任何参数。

触发器和内容面板成双成对，因此 `<Trigger>` 和 `<Content>` 中的 `<Item>` 数量相等。

`<Trigger>` 中 `<Item>` 的内容可以是一个组件或元素，也可以是一个 render prop：

```javascript
// 组件/元素
<Item><button>Trigger 1</button></Item>
// render prop
<Item>{props => <button {...props}>Trigger 1</button>}</Item>
```

render prop 的方式也许对于代码的理解更有帮助，但是不如直接传入组件简洁。render prop 的入参包含了事件、ARIA 标签等必要信息。

`<Item>` 在 `<Content>` 中时，`<Item>` 的子元素是一个内容面板，子元素 children 必须是一个 render prop，例如下面这样：

```javascript
<Item>
  {(props, head, tail) => <div {...props} style={{ ...props.style, width: "100%", flexShrink: 0 }}>
    <a href="https://react.dev/?uwu" ref={head}>React</a>
    vs
    <a href="https://vuejs.org/?uwu" ref={tail}>Vue</a>
  </div>}
</Item>
```

上面例子中的 props 必须要传递给内容面板元素，这些 props 同样包含了事件、ARIA 标签等必须的信息，render prop 的入参还提供了第二个参数 `head` 和第三个参数 `tail`，如果内容面板中包含可聚焦的元素，必须要分别把 `head` 作为 `ref` 传递给第一个可聚焦元素，把 `tail` 作为 `ref` 传递给最后一个可聚焦元素，这两个 `ref` 会完成键盘 <kbd>Tab</kbd> 导航的工作，如果内容面板中只展示，没有聚焦元素，可以忽略这两个参数。

## 关闭动画与自定义 x/y 轴动画

关闭动画很重要，当用户设置了操作系统的“减弱动态效果”后，浏览器可以检测到这个选项，网站的提供者可以根据这个选项，展示无动画效果版本的 hanav：

```javascript
import { ReducedMotionContent } from "hanav";
```

`<ReducedMotionContent>` 使用方法和 `<Content>` 一致。

hanav 的 x/y 轴默认动效是滑动，开发者可以根据自己的场景，进行 x/y 轴动效的定制。

定制 x 轴动效：

```javascript
import { CustomXMotionContent } from "hanav";
```

定制 y 轴动效：

```javascript
import { CustomYMotionContent } from "hanav";
```

定制 x 轴和 y 轴动效：

```javascript
import { CustomMotionContent } from "hanav";
```

定制动效组件相比 `<Content>` 额外接受几个属性，分别是 `xTrans`、`yTrans`、`trans`。`<CustomMotionContent>` 使用 `xTrans` 和 `yTrans` 定制 x/y 轴动画，`trans` 可以被 `<CustomXMotionContent>` 和 `<CustomYMotionContent>` 使用定制动画。

- `xTrans`，定制面板切换时的 x 轴过渡动画，传入一个对象，对象的键是 CSS 属性，值是字符串或长度为 2 或 3 的数组，长度 2 的数组表示动画拥有**起止**两个状态，长度 3 的数组表示动画有**进入前**、**正常**、**退出后**三个状态，除了这两种数组类型，还接受一个特殊的 `transition` 属性，用于设置切换动画时的过渡时间，值为 `false` 或字符串，如果不设置将应用默认值，如果设置为 `false` 将不应用默认值；
- `yTrans`，定制整个面板的收起和展开 y 轴过渡动画，传入一个对象，对象的键是 CSS 属性，值是字符串或长度为 2 的数组，数组值表示动画的**起止**状态，和 `xTrans` 一样，`yTrans` 也接受一个特殊的 `transition` 属性用于设置动画的过渡时间，同样可以设置为 `false` 或字符串；
- `trans`，当属性在 `<CustomXMotionContent>` 时，用法和 `xTrans` 一致，当属性在 `<CustomYMotionContent>` 中时，用法和 `yTrans` 一致。

下面是一个设置 x 轴动画，`xTrans` 渐变进入、离开的自定义过渡动画例子：

```json
{
  "opacity": [0, 1],
  "transform": ["translate(0)", "translateX(-280px)", "translateX(280px)"]
}
```


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

下面的列表是这个项目宏观方向，大概是终端用户、开发者和源码维护三个方面：

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

<div align="right">🌷🪻🌹🌻🌷</div>