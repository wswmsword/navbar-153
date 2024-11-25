# hanav (hana-nav)

<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996.icu" align="right"></a>

English | [中文](./README.md)

hanav is a React navigation menu component that includes a set of triggers and a corresponding set of menu panels. Users can expand, switch, and collapse the menu panels through the triggers. The navigation menu typically appears at the top of a website, providing the most desired links and other controls for users.

Features include:

- 🍯 Smooth transition animation
- 🎹 Keyboard navigation
- ♿️ Assistive devices navigation
- 🎨 Highly customizable
- 📱 Mobile-friendly design
- 🚀 Excellent developer experience

You can open [the demo link](https://wswmsword.github.io/examples/hanav/en) to see how hanav performs on different screen sizes.

<details>
<summary>In Chrome, you can enable the 'Show a quick highlight on the focused object' accessibility feature to visually track the focus movement of components.</summary>

You can enter `chrome://settings/accessibility` in the address bar or go to 'Settings -> Accessibility' to enable 'Show a quick highlight on the focused object'.

![Chrome Outer Row](./images/chrome-outer-row.png)

</details>

## Installation and Usage

With npm：

```bash
npm install hanav
```

Below is the general layout of using components after installation. For a complete example, you can open [the `dark-space` folder in the repository](./examples/dark-space/components/header/nav.jsx) (Next.js project) to view.

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

Generally, the examples above are more suitable for desktops or wider screens. To see how hanav works on mobile devices, you can refer to the "[Mobile View Mini Series](#mobile-view-mini-series)" section below or check the complete example in the repository's [`dark-space` folder](./examples/dark-space/components/header/mini-nav.jsx).

## API

The NavBar component is primarily composed of four parts: `<NavBar>`, `<Trigger>`, `<Content>`, and `<Item>`. Additionally, `<Content>` includes some variants to accommodate requirements for **closing** or **customizing** transition animations.

For mobile views, hanav offers the mini series, including `<MiniNavBar>`, `<MiniTrigger>`, `<MiniContent>`, `<MiniItem>`, `<MiniMenu>`, `<MiniToggle>`, and `<MiniBack>`.

### NavBar

The outermost component of the NavBar, imported with a named import, for example:

```javascript
import { NavBar } from "hanav";
```

`<NavBar>` is rendered as a `<nav>` element, serving as the outermost layer of the NavBar component. `<NavBar>` accepts any props applicable to HTML elements, along with the following additional options:

- `dur`, number, define the duration of the transition animation (s)
- `gap`, number, Set the distance between the panel and the trigger (px)
- `dynamicWidth`, boolean, allow the panel width to vary
- `onlyKeyFocus`, boolean, set focus transfer to occur only when controlled by the keyboard
- `close`, boolean, follow the trigger's position when toggling panels

### Trigger

Import the `<Trigger>` component like this:

```javascript
import { Trigger } from "hanav";
```

`<Trigger>` is rendered as a `<div>` within `<nav>` as a child element. `<Trigger>` accepts any built-in props. Inside `<Trigger>` component is a set of triggers, so you can pass className or style to define the layout of the trigger.

### Content

```javascript
import { Content } from "hanav";
```

The `<Content>` component contains a set of content panels, each sequentially corresponding to a trigger within the `<Trigger>` component. `<Content>` and `<Trigger>` must be sibling elements. `<Content>` is rendered as two nested `<div>` elements: the inner `<div>` is used for vertical axis animations, while the outer `<div>` handles horizontal axis animations for *the entire panel*.

`<Content>` accepts any built-in props, which are applied to the **inner** `<div>`. Props for the outer `<div>` can be passed using the `outer` attribute. The inner `<div>` is responsible for styling the entire panel, while the outer `<div>` is primarily used for hanav's internal control of horizontal panel animations.

- `outer`, An object containing props that will be passed to the outer `<div>` rendered by `<Content>`.

### Item

```javascript
import { Item } from "hanav";
```

`<Item>` must be a direct child of either `<Trigger>` or `<Content>`. Within `<Trigger>`, `<Item>` acts as a trigger, and within `<Content>`, it serves as a content panel. `<Item>` does not accept any parameters.

Triggers and content panels are paired, so the number of `<Item>` components within `<Trigger>` and `<Content>` should be equal.

The content of `<Item>` within `<Trigger>` can be a component or element, or a render prop:

```javascript
// component/element
<Item><button>Trigger 1</button></Item>
// render prop
<Item>{props => <button {...props}>Trigger 1</button>}</Item>
```

Using a render prop approach may be more helpful for understanding the code, but it is not as concise as directly passing in a component. The render prop provides essential information, including events and ARIA labels.

When `<Item>` is used within `<Content>`, its children form a content panel. The child element must be a render prop, structured like this:

```javascript
<Item>
  {(props, head, tail) => <div {...props} style={{ ...props.style, width: "100%", flexShrink: 0 }}>
    <a href="https://react.dev/?uwu" ref={head}>React</a>
    vs
    <a href="https://vuejs.org/?uwu" ref={tail}>Vue</a>
  </div>}
</Item>
```

The props from the example above must be passed to the content panel element. These props also include essential information like events and ARIA labels. The render prop’s parameters additionally provide a second argument, `head`, and a third argument, `tail`. If the content panel contains focusable elements, `head` must be passed as a `ref` to the first focusable element, and `tail` must be passed as a `ref` to the last focusable element. These `refs` facilitate keyboard <kbd>Tab</kbd> navigation. If the content panel only displays content without any focusable elements, these two parameters can be ignored.

### Group

```javascript
import { Group } from "hanav";
```

`<Group>` is only used within `<Trigger>` or the `<MiniTrigger>` introduced later. It allows multiple triggers to be grouped together for easier styling.

## Close animations and custom x/y-axis animations

The close animation is important. When a user has enabled the "Reduce motion" setting in their operating system, the browser can detect this option. Based on this setting, website providers can display a version of hanav without animations:

```javascript
import { ReducedMotionContent } from "hanav";
```

The usage of `<ReducedMotionContent>` is the same as `<Content>`.

The default animation effect for hanav's x/y axis is sliding, but developers can customize the x/y axis animations based on their specific use case.

Customizing the x-axis animation:

```javascript
import { CustomXMotionContent } from "hanav";
```

Customizing the y-axis animation:

```javascript
import { CustomYMotionContent } from "hanav";
```

Customizing the x-axis and y-axis animations:

```javascript
import { CustomMotionContent } from "hanav";
```

The custom motion effect component accepts a few additional properties compared to `<Content>`, namely `xTrans`, `yTrans`, and `trans`. `<CustomMotionContent>` uses `xTrans` and `yTrans` to customize x/y axis animations, while `trans` can be used in `<CustomXMotionContent>` and `<CustomYMotionContent>` to customize animations.

- `xTrans`: Customizes the x-axis transition animation when switching panels. Pass an object where the keys are CSS properties and the values are either a string or an array with 2 or 3 elements. A 2-element array represents the **start** and **end** states of the animation, while a 3-element array represents **before entering**, **normal**, and **after exiting** states. In addition to these array types, it also accepts a special `transition` property for setting the transition duration of the animation. The value can be `false` or a string. If not set, the default value will be applied, and if set to `false`, the default value will be ignored.
  
- `yTrans`: Customizes the y-axis transition animation for collapsing and expanding the entire panel. Pass an object where the keys are CSS properties and the values are a string or a 2-element array. The array values represent the **start** and **end** states of the animation. Similar to `xTrans`, `yTrans` also accepts the special `transition` property to set the transition duration, which can also be set to `false` or a string.
  
- `trans`: When used in `<CustomXMotionContent>`, it works the same way as `xTrans`, and when used in `<CustomYMotionContent>`, it works the same as `yTrans`.

Here is an example of setting a custom x-axis transition animation using `xTrans` for a fading enter and exit animation:

```json
{
  "opacity": [0, 1],
  "transform": ["translate(0)", "translateX(-280px)", "translateX(280px)"]
}
```

### Mobile View Mini Series

The mobile series components include `<MiniNavBar>`, `<MiniTrigger>`, `<MiniContent>`, `<MiniItem>`, `<MiniMenu>`, `<MiniToggle>`, and `<MiniBack>`.

Mini components require no parameters, making them easier to use. Any passed properties are directly forwarded to the rendered DOM elements. Below is an outline of how to use the mini components. For a complete example, please refer to the repository's [`dark-space` folder](./examples/dark-space/components/header/mini-nav.jsx):

```javascript
import { MiniNavBar, MiniTrigger, MiniItem, MiniContent, MiniMenu, MiniToggle, MiniBack } from "hanav";

export default function MyLittleNav() {
  return <MiniNavBar>
    <a>Repo</a>
    <MiniToggle />
    <MiniMenu>
      <MiniTrigger>
        <MiniItem><button>hanav</button></MiniItem>
        <MiniItem><button>postcss-mobile-forever</button></MiniItem>
        <a>about</a>
      </MiniTrigger>
      <MiniContent>
        <MiniItem>{(p, head, tail) => <div {...p}>
          <MiniBack ref={head} />
          <a>Home Page</a>
          <a ref={tail} href="https://github.com/wswmsword/hanav/blob/main/images/wechat-pay.png">Donate</a>
        </div>}</MiniItem>
        <MiniItem>{(p, head, tail) => <div {...p}>
          <a ref={head}>Home Page</a>
          <MiniBack>Back To Main Menu</MiniBack>
          <a ref={tail}>Bye Bye</a>
        </div>}</MiniItem>
      </MiniContent>
    </MiniMenu>
  </MiniNavBar>;
}
```

The usage of mini components is the same as non-mini components, with additional attention required for the newly introduced `<MiniToggle>` and `<MiniBack>`.

`<MiniToggle>` is typically used to display a hamburger button, controlling the expansion and collapse of the menu. Its children can be a render prop, with the menu's open state passed as an argument.  

`<MiniTrigger>` represents a menu list. Clicking on an item navigates to the details (corresponding to the `<MiniItem>` under `<MiniContent>`), while `<MiniBack>` serves as a button to return from the details view to the menu list (`<MiniTrigger>`).  

## Keyboard Interactions

| Key | Description |
|:--|:--|
| <kbd>Tab</kbd> | When the focus is on the trigger, it will move forward one by one. When the focus is on the content panel, the focus will cycle between the head element and the tail element. |
| <kbd>Space</kbd> <kbd>Enter</kbd> | When the focus is on the trigger, pressing a key will expand or collapse the content panel. |
| <kbd>Esc</kbd> | When the focus is in the content panel, pressing a key will collapse the panel, and the focus returns to the trigger. |

## Instructions

In macOS, users might not be able to use the <kbd>Tab</kbd> key to focus on link elements in Firefox. Users need to follow these steps: open 'System Settings', open 'Keyboard', and then open '[Keyboard navigation](https://support.apple.com/guide/mac-help/use-your-keyboard-like-a-mouse-mchlp1399)'.

## Development and Maintenance Direction

Run the following command in the project root directory to monitor changes in the component source code and update the output in real-time:

```bash
npm run watch
```

Keep the above monitoring command running, then open a new terminal session and run the following command to start the React demo application that includes the source components. This allows you to see the effects in the browser in real-time as you modify the source code:

```bash
cd examples/demo
npm i
npm run dev
```

The following list outlines the broad directions of this project, focusing on three main aspects: end users, developers, and source code maintenance.

- Accessibility
  - Proper ARIA labels, validated by Android TalkBack and iOS/MacOS VoiceOver
  - Fully controllable via keyboard
  - Toggleable opening and closing transition animations
- Smooth transition animations
- Good performance
- Excellent developer experience
  - Intuitive usage patterns
  - Retains core functionality of the navigation menu without infringing on developer customization
- Simple documentation
- Code organization
  - No need to follow specific formatting conventions, feel free to use your preferred style
  - Appropriate naming in the code, with detailed comments to aid understanding when suitable names are not found
  - Promote and demote functions to find the appropriate level of abstraction

Understand [some principles (CN)](./how-it-works.md).

## CHANGELOG

Check the [changelog](./CHANGELOG.md).

## Versioning

Check the [SemVer 2.0.0](https://semver.org/).

## License

Check the [MIT License](./LICENSE)。

## Support and Sponsorship

Feel free to issue, PR, and star the project. You can also contribute financially, with the amount based on the benefits you gain from the project.

<details>
<summary>Expand to view QR codes for WeChat Pay and Alipay.</summary>

<table>
  <tr align="center">
    <td>WeChat Pay</td>
    <td>Alipay</td>
  </tr>
	<tr>
		<td><img src="./images/wechat-pay.png" alt="Pay through WeChat" /></td>
		<td><img src="./images/ali-pay.jpg" alt="Pay through AliPay" /></td>
	</tr>
</table>

</details>

<div align="right">🌷🪻🌹🌻🌷</div>