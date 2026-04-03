# boneyard

Pixel-perfect skeleton loading screens, extracted from your real DOM.

## Quick start

```bash
npm install boneyard-js
```

```tsx
import { Skeleton } from 'boneyard-js/react'

<Skeleton name="blog-card" loading={isLoading}>
  <BlogCard data={data} />
</Skeleton>
```

```bash
npx boneyard-js build
```

```ts
// app/layout.tsx
import './bones/registry'
```

```svelte
<script lang="ts">
  import Skeleton from 'boneyard-js/svelte'
  import ProfileCard from './ProfileCard.svelte'
</script>

<Skeleton name="profile-card" loading={isLoading}>
  {#snippet fallback()}
    <p>Loading profile...</p>
  {/snippet}

  <ProfileCard />
</Skeleton>
```

Done. See the [full documentation](https://github.com/0xGF/boneyard) for all props, CLI options, and examples.

## License

MIT
