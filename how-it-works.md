# 神秘的原理

## 力量、敏捷、综合的形态选择

下面是组件可能的三个形态，每种形态各有优劣，最终实现的时候，选择了第二种形态作为了开发的目标。

```javascript
<N>
  <Item>
    <Trigger>
      {(props) => <button ...props></button>}
    </Trigger>
    <Content></Content>
  </Item>
  <Item></Item>
  <Item>
    <Trigger></Trigger>
    <Content></Content>
  </Item>
</N>
```

这一种形态作为导航栏组件，能很好的从结构上关联表示 trigger 和 content 的关系，缺点是需要使用 [React 的过时 API](https://zh-hans.react.dev/reference/react/legacy)，也不能直觉地从结构上让用户自定义一组 trigger 父元素和一组 content 父元素的样式和其它属性。

```javascript
<N>
  <Trigger>
    <Item>
      {(props) => <button {...props}></button>}
    </Item>
    <Item>link</Item>
    <Item>
      {(props) => <button {...props}></button>}
    </Item>
    <Item>
      {(props) => <button {...props}></button>}
    </Item>
  </Trigger>
  <Content>
    <Item></Item>
    <Item></Item>
    <Item></Item>
  </Content>
</N>
```

这一种形态的导航栏组件，虽然没有从结构上直接关联 trigger 和 content 的关系，但是这样的结构，和最终渲染到浏览器的结构相同，符合用户的开发习惯，并且这样的结构也能让用户方便地自定义一组 trigger 的父元素和 一组 content 的父元素的样式和其它属性，这种结构的缺点是使用了 React 的过时 API。

将功能分解在不同的组件，也利于用户按需引入，利于摇树优化产包。

```javascript
<N
  items={[
    {
      trigger: <button></button>,
      content: <div></div>
    },
    <a></a>,
    {
      trigger: <button></button>,
      content: <div></div>,
    },
  ]}
/>
```

这一种形态的导航栏组件的优点，是无需使用过时的 React API，但是也有明显的缺点，组件被抽象的层次过高，通过参数传入标签，难以识别组件的结构，并且参数形式也会放纵用户在调用的时候放入过多的逻辑，这会增加阅读代码的负担。

## 引入方式

一开始组件仅提供单个默认导出，在这个默认导出的组件上，依附了其它必须的功能组件，这些组件缺一不可。例如：

```javascript
import C from "ilb";
const { X, Y } = C;

function App() {
  return <C>
    <X />
    <Y />
  </C>;
}
```

当库覆盖了更多的功能，添加了更多功能，变得臃肿了，如果继续如上将为用户带来无意义的代码，徒增产包体积，因此将各个组件单独导出，有利于用户按需引入、摇树优化：

```javascript
import { C, X, Y2 } from "ilb";

function App() {
  return <C>
    <X />
    <Y2 />
  </C>;
}
```

`<Content>` 每个变体之间可重用部分少，因此单独分离成组件，才能对于用户产包的体积增大的影响较小。即使用户对每个变体应用尽用，也能尽量控制总体产包体积，可以预测，大多数用户会选择使用 2 个变体。

hanav 提供了关闭动画的选项，虽然关闭动画很重要，但是用户的选择更重要，因此单独提取 `<ReducedMotionContent>`，以便用户按需导入。一条观念的普及，除了强制手段外，放开同样可以。