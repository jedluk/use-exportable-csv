import { Content, CSVDelimiter } from '../index'
import { Blob, createObjectURL } from './globals'

function sanitize(delimeter: CSVDelimiter): (word: string) => string {
  return (word) => (word.includes(delimeter) ? `"${word}"` : word)
}

const LINE_BREAK = '\r\n'

export function toCSV(
  content: Content,
  delimeter: CSVDelimiter,
  headers?: string[]
): string {
  if (content.length === 0) {
    return ''
  }

  const csv = [
    headers !== undefined
      ? headers.join(delimeter)
      : Object.keys(content[0]).join(delimeter),
  ]
  content.forEach((row) => {
    const csvRow = Object.values(row).map(String).map(sanitize(delimeter)).join(delimeter)
    csv.push(csvRow)
  })

  return csv.join(LINE_BREAK)
}

export function toValidFileName(fileName: string): string {
  return fileName.endsWith('.csv') ? fileName : `${fileName}.csv`
}

const BOM = new Uint8Array([0xef, 0xbb, 0xbf])

export function createLink(content: string, useBOM = true): string {
  return createObjectURL(Blob(useBOM ? [BOM, content] : [content]))
}
