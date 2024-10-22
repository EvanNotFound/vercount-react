# vercount-react

The react hook for [Vercount](https://github.com/EvanNotFound/vercount-react). A simple website counter powered by NextJS.

## Installation

```bash
npm install vercount-react

# or with pnpm

pnpm install vercount-react
```

## Usage

```tsx
import { useVercount } from 'vercount-react'

export default function Home() {


  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```