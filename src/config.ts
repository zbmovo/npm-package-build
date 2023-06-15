import babel from './plugins/babel'
import clean from './plugins/clean'
import json from './plugins/json'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

import { joinProjectRoot } from './utils/paths'
import type { OutputOptions, RollupOptions } from 'rollup'

type Output = (options?: OutputOptions) => OutputOptions

const commonjs: Output = options => {
  return {
    dir: joinProjectRoot('lib'),
    format: 'commonjs',
    preserveModules: true,
    ...options
  }
}

const esmodule: Output = options => {
  return {
    dir: joinProjectRoot('es'),
    format: 'esm',
    preserveModules: true,
    ...commonjs
  }
}

const umd: Output = options => {
  return {
    dir: joinProjectRoot('umd'),
    format: 'umd',
    ...options
  }
}

export interface UserConfig {
  inject: Record<string, any>
  clean: string[]
  rollup: (config: RollupOptions) => void
}

export const presets = {
  output: {
    commonjs,
    esmodule,
    umd,
  },
  plugins: {
    babel,
    clean,
    json,
    nodeResolve,
    terser
  }
}
