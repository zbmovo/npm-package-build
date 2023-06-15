# 一个打包工具
该工具基于 `rollup` 开发、适用于 `npm` 第三方包的打包输出

## 安装
### npm
```bash
npm install npm-package-build --save-dev
```
### yarn
```bash
yarn add npm-package-build --dev
```

## 使用方法
创建文件 `/src/index.ts`
```bash
npx npm-package-build
```
输出目录
- **/es**   按照 `esmodule` 规范输出
- **/lib**  按照 `commonjs` 规范输出

## 配置文件
创建文件 `/npmbuildrc.ts`
```typescript
import { presets } from 'npm-package-build'
import type { UserConfig } from 'npm-package-build'

export default <Partial<UserConfig>>{
  rollup(config) {
    // edit default config
    if (config.output instanceof Array) {
      config.output.push(
        // build umd
        presets.output.umd({
          name: 'myLib',
          sourcemap: true,
        }),
      )
    }
  }
}
```


## 输出 `declaration`
```bash
npm i typescript --save-dev
```

创建 `tsconfig.[name].json`
```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationDir": "./types",
    "strict": true,
  },
  "include": [
    "src/**/*.ts"
  ]
}
```
```bash
npx tsc -p tsconfig.[name].json
```

## License
npm-package-build is [MIT licensed](./LICENSE).