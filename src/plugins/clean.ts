import fs from 'node:fs'
import type { Plugin } from 'rollup'

export default function clean(paths: string[]): Plugin {
  return {
    name: 'clean',
    buildStart() {
      paths.forEach(item => {
        try {
          fs.rmSync(item, { recursive: true })
        } catch (error) {
          // 🤫
        }
      })
    },
  }
}
