type Value = string | number | bigint | boolean | null
export declare type Content = Value[][] | Record<string, Value | Value[]>[]
export declare type CSVDelimiter = ',' | ';'
export declare type Options = Partial<{
  bom: boolean
  children: JSX.Element | string
  className: string
  delimiter: CSVDelimiter
  headers: string[]
  fileName: string
}>
export declare function useCSVLink(
  content: Content,
  options?: Partial<Options>
): JSX.Element
