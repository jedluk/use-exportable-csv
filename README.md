# use-csv
React hook for using exportable csv in convenient way.
```js
function Component() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const csvLink = useMemo(
    () =>
      useCSVLink(data || [], {
        filename: "data.csv",
        children: <button className="button">Download CSV</button>,
      }),
    [data]
  );

  return (
      <div className="component">
      (...)
      {csvLink}
      (...)
      </div>
  );
}

```