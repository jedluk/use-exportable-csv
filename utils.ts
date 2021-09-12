import { Blob, createObjectURL } from './globals'

type Delimeter = ',' | ';'
type Content = string[] | Record<string, unknown>[]
type Headers = string[]

function toSafeString(x: unknown): string {
  return x != null ? String(x) : ''
}

function sanitize(delimeter: Delimeter): (word: string) => string {
  return (word) => (word.includes(delimeter) ? `"${word}"` : word)
}

export function toCSV(content: Content, delimeter: Delimeter, headers?: Headers): string {
  if (content.length === 0) {
    return ''
  }
  const csvHeaders = (headers !== undefined ? headers : Object.keys(content[0])).join(
    delimeter
  )

  const csv = [csvHeaders]
  content.forEach((row) =>
    csv.push(
      Object.values(row).map(toSafeString).map(sanitize(delimeter)).join(delimeter)
    )
  )

  return csv.join('\r\n')
}

export function toFileName(fileName: string): string {
  if (!fileName) {
    return 'data.csv'
  }
  return fileName.endsWith('.csv') ? fileName : `${fileName}.csv`
}

const BOM = new Uint8Array([0xef, 0xbb, 0xbf])

export function createLink(content, useBOM = true): string {
  return createObjectURL(Blob(useBOM ? [BOM, content] : [content]))
}
