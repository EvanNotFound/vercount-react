![vercount react banner@3x](https://github.com/user-attachments/assets/a540dc18-8d92-4b46-a121-ad6580d3ef3d)

# vercount-react

[English Version](./README.md)

**vercount-react** 是为 [Vercount](https://github.com/EvanNotFound/vercount) 设计的 React Hook，它提供了一个简单且高效的方式来统计网站流量。Vercount 是基于 Next.js 和 Redis 的快速网站计数器，适合那些需要可靠、快速、安全的流量统计方案的网站。

如果你更喜欢使用纯 JavaScript，请查看 [vercount](https://github.com/EvanNotFound/vercount) 仓库。

## 为什么选择 Vercount？

很多网站计数器，像不蒜子，速度慢且不够稳定，而 Vercount 提供了一种更好的选择：

- **极速**：服务器响应时间通常低于 10 毫秒。
- **高可用性**：针对中国优化的版本或者使用 Vercel 全球 CDN，确保 99.99% 的正常运行时间。
- **精准统计**：使用 POST 请求提高计数准确性，避免传统基于 Referrer 的方法带来的不准确性。
- **安全性**：通过 JSON 回调防止 CSRF 攻击，取代了不太安全的 JSONP 方式。
- **自动同步**：与 Busuanzi 的数据同步，无需手动操作。
- **兼容性强**：可以直接兼容现有的 Busuanzi 标签，轻松迁移。

## 安装

你可以用任意你喜欢的包管理器来安装 `vercount-react`：

```bash
# 使用 npm
npm install vercount-react

# 使用 pnpm
pnpm install vercount-react

# 使用 yarn
yarn add vercount-react
```

## 使用方法

要在 React 项目中使用 Vercount 统计你的网站流量，只需导入 `useVercount` Hook，并在你的组件中调用它。

### 示例：

```tsx
import { useVercount } from 'vercount-react'

export default function Home() {
  const { sitePv, pagePv, siteUv } = useVercount()

  return (
    <div>
      <h1>全站页面浏览量：{sitePv}</h1>
      <h2>当前页面浏览量：{pagePv}</h2>
      <h2>独立访客：{siteUv}</h2>
    </div>
  )
}
```

在这个例子中：
- **`sitePv`**：整个网站的总页面浏览量。
- **`pagePv`**：当前页面的浏览量。
- **`siteUv`**：网站的独立访客数。

## 文档

### `useVercount` Hook

`useVercount` 是 `vercount-react` 的核心 Hook，它从 Vercount 后端获取网站和页面的流量统计信息。

```tsx
const { sitePv, pagePv, siteUv } = useVercount()
```

#### 返回值：
- **`sitePv`**：全站页面浏览量。
- **`pagePv`**：当前页面浏览量。
- **`siteUv`**：全站独立访客数。

## 支持项目

Vercount 是一个开源社区驱动的项目。你的支持对于维持和发展项目至关重要。如果你愿意，请访问我的 [捐赠页面](https://evannotfound.com/sponsor)，为项目提供帮助，或查看我的其他开发项目。

---

更多详细信息，请访问 [Vercount 官方网站](https://vercount.one)。

## 免责声明

版权所有，EvanNotFound。