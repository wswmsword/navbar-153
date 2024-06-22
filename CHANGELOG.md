# Changelog

该文件记录项目的所有改动。

格式基于“[如何维护更新日志](https://keepachangelog.com/zh-CN/1.0.0/)”，
版本管理基于“[语义化版本 2.0.0](https://semver.org/lang/zh-CN/)”。

## [Unreleased]

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