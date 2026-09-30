import fs from 'node:fs'
import path from 'node:path'

export function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true })
}

export function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T
  } catch {
    return fallback
  }
}

export function writeJson(file: string, data: unknown) {
  ensureDir(path.dirname(file))
  const tmp = `${file}.tmp`
  fs.writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`)
  fs.renameSync(tmp, file)
}

export function appendJsonl(file: string, row: unknown) {
  ensureDir(path.dirname(file))
  fs.appendFileSync(file, `${JSON.stringify(row)}\n`)
}

export function parseArgs(argv: string[]) {
  const flags: Record<string, string | boolean> = {}
  const positional: string[] = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const [k, inline] = a.slice(2).split('=')
      if (inline !== undefined) flags[k] = inline
      else if (argv[i + 1] && !argv[i + 1].startsWith('--')) flags[k] = argv[++i]
      else flags[k] = true
    } else positional.push(a)
  }
  return { flags, positional }
}
