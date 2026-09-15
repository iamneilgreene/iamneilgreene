import { mkdtempSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const output = mkdtempSync(join(tmpdir(), 'capability-tests-'))
const tests = readdirSync('tests').filter((file) => file.endsWith('.test.ts')).map((file) => `tests/${file}`)
try {
  const compiled = spawnSync(process.execPath, ['node_modules/typescript/bin/tsc', '--module', 'commonjs', '--target', 'es2022', '--moduleResolution', 'node', '--esModuleInterop', '--skipLibCheck', '--outDir', output, ...tests], { stdio: 'inherit' })
  if (compiled.status !== 0) process.exitCode = compiled.status ?? 1
  else {
    const files = readdirSync(join(output, 'tests')).filter((file) => file.endsWith('.test.js')).map((file) => join(output, 'tests', file))
    const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' })
    process.exitCode = result.status ?? 1
  }
} finally { rmSync(output, { recursive: true, force: true }) }
