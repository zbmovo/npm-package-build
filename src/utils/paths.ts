import path from 'path'
import type { UserConfig } from '../config'

export function joinRoot(...paths: string[]) {
  return path.join(__dirname, '../', ...paths)
}

export function joinProjectRoot(...paths: string[]) {
  return path.join(process.cwd(), ...paths)
}

export function getUserConfig(): Partial<UserConfig> {
  const npmbuildrcPath = joinProjectRoot('npmbuildrc.ts')
  try {
    const npmbuildrc = require(npmbuildrcPath)
    return npmbuildrc.default || npmbuildrc
  } catch (error) {
    return {}
  }
}

export function getPackageJson() {
  return require(joinProjectRoot('package.json'))
}