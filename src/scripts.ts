import path from 'path'
import chalk from './utils/chalk'
import resolve from '@rollup/plugin-node-resolve'
import json from './plugins/json'
import babel from './plugins/babel'
import clean from './plugins/clean'

import { rollup } from 'rollup'
import { presets } from './config'
import { joinProjectRoot, getUserConfig } from './utils/paths'
import type { OutputOptions, RollupOptions } from 'rollup'

export async function build() {
  console.log(
    chalk
      .bold()
      .color(0, 0, 255)
      .text('build start...\n')
  );

  const npmbuildrc = getUserConfig()
  const input = joinProjectRoot('src/index.ts')
  const config: RollupOptions = {
    input,
    output: [
      presets.output.commonjs(),
      presets.output.esmodule(),
    ],
    plugins: [
      clean(npmbuildrc.clean || [
        joinProjectRoot('es'),
        joinProjectRoot('lib'),
        joinProjectRoot('dist'),
      ]),
      resolve({ extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] }),
      babel(),
      json()
    ],
  }

  if (typeof npmbuildrc.rollup === 'function') {
    npmbuildrc.rollup(config)
  }

  try {
    const startTime = performance.now()
    const rollupBuild = await rollup(config)
    await Promise.all((config.output as OutputOptions[]).map(write))

    async function write(options: OutputOptions) {
      const { output } = await rollupBuild.write(options)
      const outpath = path.relative(joinProjectRoot(), options.dir as string)
      console.log(
        chalk
          .bold()
          .color('#ff0')
          .text(output.map(item => `${item.type}: ${outpath}/${item.fileName}`).join('\n'))
      );
    }

    await rollupBuild.close()

    const time = (performance.now() - startTime).toFixed(0)
    console.log(
      chalk
        .bold()
        .color(0, 255, 0)
        .text(`\nbuild end at ${time}ms.`)
    );
  } catch (error) {
    console.log(error);
  }
}
