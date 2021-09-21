export declare type Value = string | number | bigint | boolean | null
export declare type Content = Value[][] | Record<string, Value | Value[]>[]
export declare type CSVDelimiter = ',' | ';'
export declare type Options = Partial<{
  bom: boolean
  delimiter: CSVDelimiter
  headers: string[]
}>
export declare function useExportableCSV(content: Content, options?: Options): string
