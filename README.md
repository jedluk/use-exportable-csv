# use-exportable-csv [![npm](https://img.shields.io/npm/v/use-exportable-csv.svg)](https://www.npmjs.com/package/use-exportable-csv) [![npm downloads](https://img.shields.io/npm/dm/use-exportable-csv.svg)](https://www.npmjs.com/package/use-exportable-csv)

React hook for downloading csv in convenient way.

- your json-like data (or 2D array) in converted into csv (with options You provide: delimiter, headers, BOM mask) and on top of this, blob is generated
- blob is available under object URL, which is returned from hook
- each time you change your data/options, object URL is updated (old one is unbound from document)
- link can be used as anchor tag attribute - `href`
## Usage

Check also my blog post [how to deal with CSV exports](https://www.lukasi.uk/blog/export-csv-in-react/)

```js
function Component() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then(setData)
  }, [])

  const options = { bom: true }
  const csvLink = useExportableCSV(data, options)

  return (
    <div className="xyz">
      (...)
      <a className="link" href={csvLink} download="data.csv">
        CSV download
      </a>
      (...)
    </div>
  )
}
```

## [Live Example](https://codesandbox.io/s/jolly-morning-tpwww)

## API

```js
type CSVDelimiter = ',' | ';'
type Options = Partial<{
  bom: boolean
  delimiter: CSVDelimiter
  headers: string[]
}>
type Value = string | number | bigint | boolean | null
type Content = Value[][] | Record<string, Value | Value[]>[]

```

`useExportableCSV()` call

```js
const link: string = useExportableCSV(content: Content, options: Options)

```
