import * as jsonc from 'jsonc-parser'
import type { Plugin } from 'rollup'

export default function json(): Plugin {
  return {
    name: 'json',
    transform(code, id) {
      if (!/\.(json)$/i.test(id)) {
        return
      }
      const content = jsonc.parse(code)
      return `export default ${JSON.stringify(content, null, 2)}`
    },
  }
}
