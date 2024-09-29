# Changelog

该文件记录项目的所有改动。

格式基于“[如何维护更新日志](https://keepachangelog.com/zh-CN/1.0.0/)”，
版本管理基于“[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)”。

## [Unreleased]

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