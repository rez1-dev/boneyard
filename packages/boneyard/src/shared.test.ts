import { describe, expect, it } from 'bun:test'
import {
  adjustColor,
  ensureBuildSnapshotHook,
  getRegisteredBones,
  registerBones,
  resolveResponsive,
} from './shared.js'
import type { ResponsiveBones, SkeletonResult } from './types.js'

describe('shared adapter runtime', () => {
  it('registers and resolves stored bones', () => {
    const bones: SkeletonResult = {
      name: 'shared-card',
      viewportWidth: 375,
      width: 375,
      height: 140,
      bones: [{ x: 0, y: 0, w: 100, h: 32, r: 8 }],
    }

    registerBones({ 'shared-card': bones })

    expect(getRegisteredBones('shared-card')).toEqual(bones)
  })

  it('picks the nearest responsive breakpoint', () => {
    const responsive: ResponsiveBones = {
      breakpoints: {
        375: { name: 'responsive', viewportWidth: 375, width: 375, height: 100, bones: [] },
        768: { name: 'responsive', viewportWidth: 768, width: 768, height: 200, bones: [] },
      },
    }

    expect(resolveResponsive(responsive, 420)?.viewportWidth).toBe(375)
    expect(resolveResponsive(responsive, 900)?.viewportWidth).toBe(768)
  })

  it('lightens colors for overlay bones and pulse states', () => {
    expect(adjustColor('#000000', 0.5)).toBe('#808080')
    expect(adjustColor('rgba(10,20,30,0.2)', 0.4)).toBe('rgba(10,20,30,0.400)')
  })

  it('installs the snapshot hook in build mode', () => {
    const originalWindow = (globalThis as any).window
    ;(globalThis as any).window = { __BONEYARD_BUILD: true }

    try {
      ensureBuildSnapshotHook()
      expect(typeof (globalThis as any).window.__BONEYARD_SNAPSHOT).toBe('function')
    } finally {
      if (originalWindow === undefined) {
        delete (globalThis as any).window
      } else {
        ;(globalThis as any).window = originalWindow
      }
    }
  })
})
