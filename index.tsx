import React, { useMemo, useEffect } from 'react'
import { createLink, toCSV, toFileName } from './utils'

type CSVDelimiter = ',' | ';'
type Options = {
  children: React.ReactNode
  className: string
  delimiter: CSVDelimiter
  headers: string[]
  fileName: string
}

export function useCSVLink(
  content: string[] | Record<string, unknown>[],
  options: Partial<Options>
) {
  const { delimiter = ',', headers, children, fileName } = options

  const attributes = useMemo(
    (): React.HTMLAttributes<HTMLAnchorElement> => ({
      href: createLink(toCSV(content, delimiter, headers)),
      download: toFileName(fileName),
    }),
    [delimiter, fileName, headers, content]
  )

  useEffect(() => {
    return () => window.URL.revokeObjectURL(attributes.href)
  }, [attributes])

  return (
    <a {...attributes} className={options.className}>
      {children}
    </a>
  )
}
