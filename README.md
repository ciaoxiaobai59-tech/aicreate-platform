# AICreate - AI创作平台

一个基于 Express + SQLite + Chart.js 构建的AI创作平台，类似 RunningHub 的设计风格，提供工作流市场、作品分享、模型库和数据可视化等功能。

## 功能特性

### 🎨 核心功能
- **工作流市场** - 浏览、搜索、使用AI创作工作流
  <img width="959" height="545" alt="屏幕截图 2026-05-07 205514" src="https://github.com/user-attachments/assets/098e4e06-6642-4728-9101-268835c76261" />
- **作品广场** - 分享和展示AI生成的作品
- **模型库** - 管理和下载AI模型
- **数据可视化** - 实时查看平台数据统计和趋势分析
- <img width="959" height="544" alt="屏幕截图 2026-05-07 205615" src="https://github.com/user-attachments/assets/b61bbb22-9dbd-44e4-8e54-efd18281a52e" />
- **AI助手** - 智能问答助手，提供创作指导
<img width="953" height="545" alt="屏幕截图 2026-05-07 205043" src="https://github.com/user-attachments/assets/df930382-98e6-4256-b0cd-65452e13e27b" />

### 📊 数据可视化
- 平台总览统计（用户数、工作流数、作品数、模型数）
- 分类分布图表（工作流、作品、模型分类）
- 增长趋势分析（按日期统计新增数据）
- 热门内容排行榜
- 用户创作活跃度统计

### 🔐 用户系统
- 用户注册与登录
- JWT身份认证
- 个人中心管理
- 点赞和收藏功能
<img width="310" height="286" alt="屏幕截图 2026-05-07 205657" src="https://github.com/user-attachments/assets/3686c316-d3f0-4ef1-8996-b14d951acdf5" />

## 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| 后端框架 | Express.js | ^4.18.2 |
| 数据库 | SQLite3 | ^5.1.6 |
| 前端框架 | Vanilla JavaScript | ES6+ |
| 图表库 | Chart.js | ^4.x |
| 样式框架 | CSS3 | 自定义主题 |
| 图标库 | Font Awesome | ^6.4.0 |
| 认证方式 | JWT | ^9.0.2 |

## 项目结构

```
ai-creative-platform/
├── public/                 # 静态资源目录
│   ├── app.js              # 前端主逻辑
│   ├── styles.css          # 全局样式
│   └── index.html          # 入口HTML
├── server.js               # 后端服务器
├── database.sqlite         # SQLite数据库（运行后自动生成）
├── package.json            # 项目配置
├── .gitignore              # Git忽略文件
└── README.md               # 项目说明文档
```

## 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

服务器将运行在 `http://localhost:3000`

### 开发模式

```bash
npm run dev
```

使用 nodemon 自动重启服务器

## API接口

### 认证接口

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/auth/register` | 用户注册 |
| POST | `/api/auth/login` | 用户登录 |
| GET | `/api/auth/me` | 获取当前用户 |

### 工作流接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/workflows` | 获取工作流列表 |
| GET | `/api/workflows/:id` | 获取单个工作流 |
| POST | `/api/workflows` | 创建工作流 |

### 作品接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/artworks` | 获取作品列表 |
| GET | `/api/artworks/:id` | 获取单个作品 |
| POST | `/api/artworks` | 创建作品 |
| GET | `/api/artworks/:id/comments` | 获取作品评论 |
| POST | `/api/artworks/:id/comments` | 添加评论 |

### 模型接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/models` | 获取模型列表 |
| GET | `/api/models/:id` | 获取单个模型 |

### 数据统计接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/stats/overview` | 平台总览统计 |
| GET | `/api/stats/categories` | 分类统计 |
| GET | `/api/stats/trends` | 趋势数据 |
| GET | `/api/stats/popular` | 热门内容排行 |
| GET | `/api/stats/activity` | 用户活跃度 |

### 互动接口

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/like` | 点赞/取消点赞 |
| POST | `/api/favorites` | 收藏/取消收藏 |
| GET | `/api/favorites` | 获取收藏列表 |

## API使用示例

### 用户注册

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### 用户登录

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### 获取工作流列表

```bash
curl http://localhost:3000/api/workflows
```

### 获取平台统计

```bash
curl http://localhost:3000/api/stats/overview
```

## 测试账号

```
邮箱: admin@example.com
密码: admin123
用户名: admin
```

## 数据库结构

### users 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT | 用户ID（主键） |
| username | TEXT | 用户名 |
| email | TEXT | 邮箱 |
| password | TEXT | 密码（加密） |
| avatar | TEXT | 头像URL |
| bio | TEXT | 个人简介 |
| created_at | DATETIME | 创建时间 |

### workflows 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT | 工作流ID（主键） |
| user_id | TEXT | 用户ID（外键） |
| title | TEXT | 标题 |
| description | TEXT | 描述 |
| category | TEXT | 分类 |
| tags | TEXT | 标签 |
| cover_image | TEXT | 封面图片 |
| workflow_data | TEXT | 工作流数据 |
| likes | INTEGER | 点赞数 |
| views | INTEGER | 浏览数 |
| created_at | DATETIME | 创建时间 |

### artworks 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT | 作品ID（主键） |
| user_id | TEXT | 用户ID（外键） |
| workflow_id | TEXT | 工作流ID（外键） |
| title | TEXT | 标题 |
| description | TEXT | 描述 |
| type | TEXT | 类型（image/video） |
| url | TEXT | 作品URL |
| thumbnail | TEXT | 缩略图URL |
| likes | INTEGER | 点赞数 |
| comments | INTEGER | 评论数 |
| created_at | DATETIME | 创建时间 |

### models 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT | 模型ID（主键） |
| name | TEXT | 模型名称 |
| description | TEXT | 描述 |
| category | TEXT | 分类 |
| type | TEXT | 类型 |
| cover_image | TEXT | 封面图片 |
| download_url | TEXT | 下载链接 |
| likes | INTEGER | 点赞数 |
| downloads | INTEGER | 下载数 |
| created_at | DATETIME | 创建时间 |

## 开发指南

### 添加新页面

1. 在 `app.js` 的 `router.routes` 对象中添加路由
2. 创建对应的渲染函数
3. 添加必要的样式到 `styles.css`

### 添加新API

1. 在 `server.js` 中添加新的路由处理函数
2. 实现数据库操作逻辑
3. 确保返回正确的JSON格式

### 代码规范

- 使用 ES6+ 语法
- 变量命名使用 camelCase
- 函数命名使用 camelCase
- 常量命名使用 UPPER_CASE
- 添加适当的注释
- 错误处理使用 try-catch

## 部署说明

### 生产环境部署

```bash
# 安装依赖
npm install --production

# 启动服务器
NODE_ENV=production node server.js
```

### 使用 PM2 管理进程

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start server.js --name ai-creative-platform

# 查看状态
pm2 status

# 日志查看
pm2 logs ai-creative-platform
```

## 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交规范

- 代码提交遵循 Conventional Commits 规范
- PR 请提供清晰的描述
- 确保代码通过测试

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件至开发者邮箱

---

**享受AI创作的乐趣！** 🎉
