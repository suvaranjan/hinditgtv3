import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const root = process.cwd()
const filePath = join(root, '.contentlayer/generated/Blogs/_index.mjs')

try {
  let content = readFileSync(filePath, 'utf8')
  content = content.replace(
    /import (.*) from '(.*)' assert { type: 'json' }/g,
    "import $1 from '$2'"
  )
  writeFileSync(filePath, content, 'utf8')
  console.log(`Fixed ${filePath}`)
} catch (error) {
  console.error('Error:', error)
}
