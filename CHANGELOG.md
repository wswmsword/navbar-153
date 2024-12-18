# Changelog

该文件记录项目的所有改动。

格式基于“[如何维护更新日志](https://keepachangelog.com/zh-CN/1.0.0/)”，
版本管理基于“[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)”。

## [Unreleased]

### Added

- `<Head>` 和 `<Tail>` 焦点控制，替代菜单面板的 function children；
- 添加钩子，开始展开、开始关闭、已展开、已关闭；
- 使用 class-name 自定义过渡动画；
- 位置自定义。

### Fixed

- 修复默认动画组件中，展开面板动画结束的瞬间收起面板不触发收起面板动画的问题；
- 修复自定义 X 轴动效时，外部状态更新导致的渲染会引起 X 轴动画错误、面板内容消失问题；
- 修复 Chrome 节能模式、默认动画组件，展开面板时，会出现 X 轴动画问题。

## [2.1.0] - 2024-11-25

### Added

- 添加 mini 系列用于响应式窄屏，`<MiniNavBar>`、`<MiniTrigger>`、`<MiniContent>`、`<MiniItem>`、`<MiniMenu>`、`<MiniToggle>`、`<MiniBack>`；
- 添加 `<Group>` 便于设置一组触发器的样式。

## [2.0.0] - 2024-11-11

### Changed

- 重命名库名 navbar-153 为 hanav。

### Added

- 添加 x/y 轴自定义动画组件；
- 分离关闭过渡动画组件为单独组件；
- 添加 `<Content>` 系列组件的 `outer` 属性，移除 `inner` 属性；
- 默认动画组件内置必须的行内样式；
- 允许向 `<Trigger>` 下的 `<Item>` children 传入组件而不是 render prop。

### Removed

- 移除 `<Content>` 的 `inner` 属性；
- 移除 `motion` 属性，单独分离为 `<ReducedMotionContent>` 组件；
- 移除 `customTransProps`，使用 `trans`、`xTrans`、`yTrans` 替代。

## [1.3.1] - 2024-09-29

### Fixed

- 修复关闭 `motion` 后，开启 `customTransProps`，导致 `customTransProps` 传入原生标签上的问题；
- 修复关闭 `motion` 后，开启 `customTransProps`，切换面板，计算属于 motion 的代码，导致运行错误问题。

## [1.3.0] - 2024-09-29

### Added

- 添加 `customTransProps` 选项，用于自定义切换面板的过渡动画。

### Fixed

- 修复火狐无障碍开发者工具的焦点警告；
- 使用 `clientWidth`/`clientHeight` 获取面板尺寸。

## [1.2.0] - 2024-07-16

### Added

- 添加 `motion` 选项，用于关闭动画；
- 添加英语文档。

### Fixed

- 修复嵌套的触发器不能被触发的问题。

## [1.1.0] - 2024-06-22

### Added

- 添加 `gap` 选项，设置面板和触发器之间的距离；
- 添加 `dynamicWidth` 选项，当面板宽度变化，使用动画过渡；
- 添加 `onlyKeyFocus` 选项，设置焦点仅在键盘控制时触发；
- 添加 `close` 选项，切换面板时跟随触发器的位置。

### Fixed

- 修复字符串触发器；
- 修复 Safari 中不能区分键盘和点击触发的问题；
- 修复焦点导航错误。

## [1.0.0] - 2024-06-02

Hello World