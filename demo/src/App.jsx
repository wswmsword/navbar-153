
import './App.css'
import N from 'navbar-s';

const { Trigger, Item, Content } = N;

function App() {
  return (
    <N style={{ position: "relative" }}>
      <Trigger style={{ display: "flex", gap: 8 }}>
        <Item><a href="https://github.com/wswmsword/navbar-153">Repo</a></Item>
        <Item>
          {props => <button {...props}>focus-fly</button>}
        </Item>
        <Item>
          {props => <button {...props}>postcss-mobile-forever</button>}
        </Item>
        <Item>
          {props => <button {...props}>navbar-153</button>}
        </Item>
      </Trigger>
      <Content className="panelsWrapper">
        <Item>
          {(props, head, tail) => <div
            {...props}
            style={{ ...props.style, width: '100%', flexShrink: 0}}>
            <ul>
              <li><a href="https://wswmsword.github.io/examples/focus-fly/#h-hot" ref={head}>热身</a></li>
              <li><a href="https://wswmsword.github.io/examples/focus-fly/#h-dialog">对话框</a></li>
              <li><a href="https://wswmsword.github.io/examples/focus-fly/#h-nav">导航栏</a></li>
              <li><a href="https://wswmsword.github.io/examples/focus-fly/#h-tabs">选项卡</a></li>
              <li><a href="https://wswmsword.github.io/examples/focus-fly/#h-player">播放列表</a></li>
              <li><a href="https://wswmsword.github.io/examples/focus-fly/#h-scroll" ref={tail}>滚动加载</a></li>
            </ul>
          </div>}
        </Item>
        <Item>
          {(props, head, tail) => <div
            {...props}
            style={{ ...props.style, width: '100%', flexShrink: 0}}>
            <ul>
              <li><a href="https://wswmsword.github.io/examples/mobile-forever/vanilla/" ref={head}>演示</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%A8%A1%E7%89%88%E5%92%8C%E8%8C%83%E4%BE%8B">移动端模版和范例</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E5%AE%89%E8%A3%85">安装</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0">配置参数</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E4%B8%8E%E5%8F%82%E4%B8%8E%E5%BC%80%E5%8F%91">单元测试与参与开发</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E8%8C%83%E4%BE%8B%E5%92%8C%E5%8E%9F%E7%90%86" ref={tail}>输入输出范例和原理</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9">注意事项</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E6%9C%9F%E6%9C%9B%E6%95%88%E6%9E%9C">期望效果</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#changelog">CHANGELOG</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E7%89%88%E6%9C%AC%E8%A7%84%E5%88%99">版本规则</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E5%8D%8F%E8%AE%AE">协议</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E6%94%AF%E6%8C%81%E4%B8%8E%E8%B5%9E%E5%8A%A9">支持与赞助</a></li>
              <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E5%85%B6%E5%AE%83" ref={tail}>其它</a></li>
            </ul>
          </div>}
        </Item>
        <Item>
          {(props) => <div
            {...props}
            style={{ ...props.style, width: '100%', flexShrink: 0}}>
            Super Smooth!
            <br />
            Super Fast!
            <br />
            Super Accessible!
          </div>}
        </Item>
      </Content>
    </N>
  )
}

export default App
