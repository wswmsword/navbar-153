
import './App.css'
import N from 'navbar-s';

const { Trigger, Item, Content } = N;

function App() {
  return (
    <N style={{ position: "relative" }}>
      <Trigger>
        <Item>
          {props => <button {...props}>trigger1</button>}
        </Item>
        <Item>
          <a href="https://github.com/">link</a>
        </Item>
        <Item>
          {props => <button {...props}>trigger2</button>}
        </Item>
        <Item>
          {props => <button {...props}>trigger3</button>}
        </Item>
      </Trigger>
      <Content className="panelsWrapper">
        <Item>
          {props => <div
            {...props}
            style={{ ...props.style, width: '100%', flexShrink: 0}} tabIndex={0}>
            content1
          </div>}
        </Item>
        <Item>
          {props => <div
            {...props}
            style={{ ...props.style, width: '100%', flexShrink: 0}}>
            content2
            <br />
            content2
          </div>}
        </Item>
        <Item>
          {props => <div
            {...props}
            style={{ ...props.style, width: '100%', flexShrink: 0}}>
            content3
            <br />
            <br />
            content3
            <br />
            content3
          </div>}
        </Item>
      </Content>
    </N>
  )
}

export default App
