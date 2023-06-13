import { transformSync } from '@babel/core'
import type { Plugin, TransformResult } from 'rollup'
import type { TransformOptions } from '@babel/core'

export default function babel(options: TransformOptions = {}): Plugin {
  return {
    name: 'babel',
    transform(code, filename) {
      if(/\.(ts|tsx)$/.test(filename)){
        return transformSync(code, { filename, ...options, }) as TransformResult
      }
    },
  }
}