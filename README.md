<div align="right">
  <img src="https://img.shields.io/badge/-English-A31F34?style=for-the-badge" alt="English" />
  <a title="zh-CN" href="README.zh.md">  <img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-4A628A?style=for-the-badge" alt="简体中文"></a>
</div>


![vercount react banner@3x](https://github.com/user-attachments/assets/a540dc18-8d92-4b46-a121-ad6580d3ef3d)

# vercount-react

**vercount-react** is a React hook designed for [Vercount](https://github.com/EvanNotFound/vercount), a fast and efficient website counter powered by Next.js and Redis. It provides real-time website traffic statistics while being reliable, fast, and secure.

If you want to use Vercount as plain JavaScript, check out the [vercount](https://github.com/EvanNotFound/vercount) repository.

## Why Choose Vercount?

Vercount is designed to replace slower and less reliable counters like Busuanzi. Key features include:
- **Speed**: Server response times under 10ms.
- **Reliability**: Choose between a China-optimized version or Vercel's global CDN with 99.99% uptime.
- **Accurate Tracking**: Uses POST requests for improved counting, avoiding the limitations of Referrer-based methods.
- **Security**: Utilizes JSON callbacks to prevent CSRF attacks, moving away from vulnerable JSONP methods.
- **Data Sync**: Automatic synchronization with Busuanzi data—no manual work required.
- **Compatibility**: Seamless integration with existing Busuanzi tags.

## Installation

Install `vercount-react` using your preferred package manager:

```bash
# With npm
npm install vercount-react

# With pnpm
pnpm install vercount-react

# With yarn
yarn add vercount-react
```

## Usage

To retrieve traffic statistics for your site or page, import the `useVercount` hook from `vercount-react` and use it in your React components.

### Example:

```tsx
import { useVercount } from 'vercount-react'

export default function Home() {
  const { sitePv, pagePv, siteUv } = useVercount()

  return (
    <div>
      <h1>Site Page Views: {sitePv}</h1>
      <h2>Page Views: {pagePv}</h2>
      <h2>Unique Visitors: {siteUv}</h2>
    </div>
  )
}
```

In this example:
- `sitePv`: Total page views across the entire site.
- `pagePv`: Page views for the current page.
- `siteUv`: Unique visitors to the site.

## Documentation

### `useVercount` Hook

The `useVercount` hook is the core of `vercount-react`. It fetches traffic statistics for the site and page using Vercount’s backend. Here's a breakdown of how it works:

```tsx
const { sitePv, pagePv, siteUv } = useVercount()
```

#### Return Values:
- **sitePv** (`number`): The total number of page views across the entire website.
- **pagePv** (`number`): The number of page views on the current page.
- **siteUv** (`number`): The number of unique visitors to the website.

[//]: # (### Advanced Configuration)

[//]: # (#### Setting Custom Tags)

[//]: # (You can add custom tags to display specific statistics on your website, as Vercount will automatically replace these tags. Here are some common tags that you can use to display statistics directly on your website:)

[//]: # ()
[//]: # (```html)

[//]: # (<script defer src="https://cn.vercount.one/js"></script>)

[//]: # ()
[//]: # (Total Page Views: <span id="vercount_value_page_pv">Loading</span> times  )

[//]: # (Total Site Views: <span id="vercount_value_site_pv">Loading</span> times  )

[//]: # (Unique Visitors: <span id="vercount_value_site_uv">Loading</span> people)

[//]: # (```)

[//]: # (### Migrating from Busuanzi)

[//]: # ()
[//]: # (Vercount is fully compatible with Busuanzi’s tags. To migrate from Busuanzi:)

[//]: # (1. Replace your existing Busuanzi script with the Vercount script:)

[//]: # (   ```html)

[//]: # (   <script defer src="https://cn.vercount.one/js"></script>)

[//]: # (   ```)

[//]: # (2. You can keep your existing Busuanzi tags or update them with Vercount-specific IDs for extended features.)

[//]: # ()
[//]: # (#### Example Busuanzi to Vercount Migration:)

[//]: # (Replace:)

[//]: # (```html)

[//]: # (<script defer src="https://busuanzi.ibruce.info/busuanzi/2.0/busuanzi.pure.js"></script>)

[//]: # (```)

[//]: # (With:)

[//]: # (```html)

[//]: # (<script defer src="https://cn.vercount.one/js"></script>)

[//]: # (```)

[//]: # ()
[//]: # (Existing tags like:)

[//]: # (```html)

[//]: # (<span id="busuanzi_value_page_pv">Loading</span> 次)

[//]: # (```)

[//]: # ()
[//]: # (Can be updated to:)

[//]: # (```html)

[//]: # (<span id="vercount_value_page_pv">Loading</span> 次)

[//]: # (```)

[//]: # ()
[//]: # (### Tracking Methodology)

[//]: # ()
[//]: # (- **Page Views &#40;PV&#41;**: Every page visit increments this value by one.)

[//]: # (- **Unique Visitors &#40;UV&#41;**: Calculated based on the user's browser UserAgent and IP address, providing a more accurate count than traditional referrer-based methods.)

[//]: # ()
[//]: # (## Quick Start)

[//]: # ()
[//]: # (Add one of the following scripts to your website to start tracking:)

[//]: # ()
[//]: # (### For China-Optimized Access:)

[//]: # (```html)

[//]: # (<script defer src="https://cn.vercount.one/js"></script>)

[//]: # (```)

[//]: # ()
[//]: # (### For Global Access:)

[//]: # (```html)

[//]: # (<script defer src="https://events.vercount.one/js"></script>)

[//]: # (```)

[//]: # ()
[//]: # (After adding the script, you can use tags to display the stats, such as:)

[//]: # ()
[//]: # (```html)

[//]: # (Total Page Views: <span id="vercount_value_page_pv">Loading</span> times)

[//]: # (Total Site Views: <span id="vercount_value_site_pv">Loading</span> times)

[//]: # (Unique Visitors: <span id="vercount_value_site_uv">Loading</span> people)

[//]: # (```)

## Support the Project

Vercount is a community-driven project, and your contributions help sustain and enhance it. Visit my [donation page](https://evannotfound.com/sponsor) to support the project, or check out my other initiatives.

---

For additional information, visit the [Vercount official website](https://vercount.one).

## Disclaimer

All rights reserved by EvanNotFound.
