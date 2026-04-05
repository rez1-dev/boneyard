import type { Component, Snippet } from 'svelte'
import type { ResponsiveBones, SkeletonResult, SnapshotConfig } from './types.js'

export interface SkeletonProps {
  loading: boolean
  name?: string
  initialBones?: SkeletonResult | ResponsiveBones
  color?: string
  darkColor?: string
  animate?: boolean
  class?: string
  className?: string
  fallback?: Snippet
  fixture?: Snippet
  children?: Snippet
  snapshotConfig?: SnapshotConfig
}

declare const Skeleton: Component<SkeletonProps>

export default Skeleton
export { registerBones } from './shared.js'
