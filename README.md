# use-exportable-csv [![npm](https://img.shields.io/npm/v/use-exportable-csv.svg)](https://www.npmjs.com/package/use-exportable-csv) [![npm downloads](https://img.shields.io/npm/dm/react-perfect-zoom.svg)](https://www.npmjs.com/package/use-exportable-csv)

React hook for downloading csv in convenient way.

- your json-like data in converted into csv (with options You provide: delimiter, BOM mask) and on top of this, blob is generated
- blob is available under DOMString, which is bounded with anchor tag returned from hook
- anchor can be easily customized by options specified by You

## Usage

```js
function Component() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then(setData)
  }, [])

  const options = useMemo(
    () => ({
      filename: 'data.csv',
      children: <button className="button">Download CSV</button>,
    }),
    []
  )

  const csvLink = useExportableCSV(data, options)

  return (
    <div className="xyz">
      (...)
      {csvLink}
      (...)
    </div>
  )
}
```

## [Live Example](https://codesandbox.io/s/zealous-haibt-8rr08)

## API

```js
type Options = Partial<{
  bom: boolean
  children: JSX.Element | string
  className: string
  delimiter: CSVDelimiter
  headers: string[]
  fileName: string
}>
type Value = string | number | bigint | boolean | null
type Content = Value[][] | Record<string, Value | Value[]>[]

```

`useExportableCSV()` call

```js
const link: JSX.Element = useExportableCSV(content: Content, options: Options)

```
