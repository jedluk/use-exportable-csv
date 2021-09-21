import { createLink, toCSV } from './utils'
import { Blob, createObjectURL } from './globals'

jest.mock('./globals')

describe('utils', () => {
  let delimiter: ',' | ';'
  let data: Record<string, number | string>[]

  beforeEach(() => {
    delimiter = ','
    data = [
      { name: 'fred', age: 22 },
      { name: 'joe', age: 33 },
      { name: 'liu', age: 21 },
    ]
  })

  describe('toCSV', () => {
    const toRows = (data: string): string[] => data.split('\r\n')

    it('returns empty string if content is empty', () => {
      expect(toCSV([], delimiter)).toEqual('')
    })

    it('joins rows with \\r\\n sequence', () => {
      const result = toCSV(data, delimiter)
      expect(toRows(result).length).toEqual(data.length + 1)
    })

    it('prints csv headers from record keys', () => {
      const result = toCSV(data, delimiter)
      expect(toRows(result)[0]).toEqual(Object.keys(data[0]).join(delimiter))
    })

    it('prints csv headers from argument if provided', () => {
      const headers = ['header1', 'header2', 'header2']
      const result = toCSV(data, delimiter, headers)
      expect(toRows(result)[0]).toEqual(headers.join(delimiter))
    })

    it('sanitizes string when includes delimiter inside', () => {
      data[0].name = 'maybe,fred'
      const result = toCSV(data, delimiter)
      expect(toRows(result)[1]).toEqual('"maybe,fred",22')
    })

    it('prints data with given delimiter', () => {
      const delim = ';'
      const result = toCSV(data, delim)
      expect(toRows(result).every((row) => row.includes(delim))).toEqual(true)
    })

    it('returns data in desired format', () => {
      const result = toCSV(data, delimiter)
      expect(result).toEqual(`name,age\r\nfred,22\r\njoe,33\r\nliu,21`)
    })

    it('works also with content as array of primitives', () => {
      const data = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]
      const headers = ['col1', 'col2', 'col3']
      const result = toCSV(data, delimiter, headers)
      expect(result).toEqual(`col1,col2,col3\r\n1,2,3\r\n4,5,6\r\n7,8,9`)
    })
  })

  describe('createLink', () => {
    it('invokes correct global functions', () => {
      const content = 'header1,header2\r\ndata1,data2'
      createLink(content, false)
      expect(createObjectURL).toHaveBeenCalledTimes(1)
      expect(Blob).toHaveBeenCalledTimes(1)
    })
  })
})
