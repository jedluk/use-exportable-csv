import { Content, CSVDelimiter, Value } from '../index'
import { Blob, createObjectURL } from './globals'

const QUOTED_REGEX = /^\".*\"$/
const NEW_LINE_SIGN = '\n'
const LINE_BREAK = `\r${NEW_LINE_SIGN}`
const BOM = new Uint8Array([0xef, 0xbb, 0xbf])

function sanitize(delimeter: CSVDelimiter): (values: string[]) => string[] {
  return (values: string[]): string[] =>
    values.map((value) => {
      if (QUOTED_REGEX.test(value)) {
        return value
      }
      return value.includes(delimeter) || value.includes(NEW_LINE_SIGN)
        ? `"${value}"`
        : value
    })
}

function stringify(values: Value[]): string[] {
  return values.map((value) => `${value}`)
}

export function toCSV(
  content: Content,
  delimeter: CSVDelimiter,
  headers?: string[]
): string {
  if (content.length === 0) {
    return ''
  }
  const rows = content.map(Object.values).map(stringify).map(sanitize(delimeter))
  return [headers !== undefined ? headers : Object.keys(content[0])]
    .concat(rows)
    .map((row) => row.join(delimeter))
    .join(LINE_BREAK)
}

export function createLink(content: string, useBOM: boolean): string {
  return createObjectURL(
    Blob(useBOM ? [BOM, content] : [content], {
      type: 'text/csv;charset=utf-8',
    })
  )
}
