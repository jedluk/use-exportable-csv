import { useMemo, useEffect } from 'react'
import { createLink, toCSV } from './utils'
import { Content, Options } from '../index'

export function useExportableCSV(content: Content, options: Options = {}): string {
  const { headers, bom = false, delimiter = ',' } = options

  const link = useMemo(
    () => createLink(toCSV(content, delimiter, headers), bom),
    [bom, delimiter, headers, content]
  )

  useEffect(() => {
    return () => {
      window.URL.revokeObjectURL(link)
    }
  }, [link])

  return link
}
