#!/usr/bin/env node
require('ts-node')
  .register({
    swc: true,
    compilerOptions: {
      target: "esnext",
      module: "commonjs",
      moduleResolution: "node",
    }
  })

require('../dist/scripts')
  .build()
