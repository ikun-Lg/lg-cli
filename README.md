# lg-cli
![NPM 版本](https://img.shields.io/badge/lg-cli_V0.0.1-green)
一个简单易用的项目脚手架工具，用于快速创建各种模板项目。

## 功能特点

- 💡 支持多种项目模板选择
- 🖥 交互式命令行界面 
- 📦 支持git仓库模板克隆
- 🛠 智能处理文件覆盖
- 🎨 友好的进度提示

## 安装

```bash
npm install lggbond-cli -g
# 或者使用 pnpm
pnpm add lggbond-cli -g
```

## 使用方法

### 创建新项目

```bash
lg create [项目名]
```

如果不指定项目名，会通过交互式提示要求输入。

## 可用模板

目前支持以下模板：

- **Vite-Vue3-Typescript-template**
  - 描述：Vue3技术栈开发模板
  - 包含：Vue3 + TypeScript + Vite

- **Vite-temp**
  - 描述：Vue3技术栈开发模板1
  - 基于：Vue3生态

## 命令列表

- `lg create [name]` - 创建新项目
- `lg -v` - 查看版本号
- `lg --version` - 查看版本号

## 本地开发

```bash
# 克隆项目
git clone <repository_url>

# 安装依赖
pnpm install

# 构建项目
pnpm build
```

## 技术栈

- 🛠 TypeScript - 类型系统
- 📦 Rollup - 打包工具
- 🖥 Commander.js - 命令行界面
- 💬 Inquirer - 交互式命令行
- 🔄 fs-extra - 文件系统操作

## 项目结构

```
lg-cli
├── bin/              # 可执行文件目录
├── src/              # 源代码目录
│   ├── command/      # 命令实现
│   └── utils/        # 工具函数
├── package.json      # 项目配置
└── tsconfig.json     # TypeScript配置
```

## License

MIT

## 作者

Luoguang