import React, { useMemo, useEffect, AnchorHTMLAttributes } from 'react'
import { createLink, toCSV, toValidFileName } from './utils'
import { Content, Options } from '../index'

export function useExportableCSV(content: Content, options: Options = {}) {
  const { headers, bom = false, delimiter = ',', fileName = 'data.csv' } = options

  const attributes: AnchorHTMLAttributes<HTMLAnchorElement> = useMemo(
    () => ({
      href: createLink(toCSV(content, delimiter, headers), bom),
      download: toValidFileName(fileName),
    }),
    [bom, delimiter, fileName, headers, content]
  )

  useEffect(() => {
    return () => {
      if (attributes.href !== undefined) {
        window.URL.revokeObjectURL(attributes.href)
      }
    }
  }, [attributes])

  return (
    <a {...attributes} className={options.className}>
      {options.children}
    </a>
  )
}
