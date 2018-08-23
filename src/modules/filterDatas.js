import uniq from 'lodash/uniq'
import orderBy from 'lodash/orderBy'

const typeOf = o => Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
const purify = o => JSON.parse(JSON.stringify(o)) // purify data

/**
 * mockData - simulate Ajax request and respond
 * @param   {Object} query
 * @resolve {Object}
 */
export default function filterDatas(data, query) {
    query = query
    const { limit = 10, offset = 0, sort = '', order = '' } = query

    let rows = data;

    // custom query conditions
    ['uid', 'name', 'email', 'country', 'lang', 'programLang'].forEach(field => {
        switch (typeOf(query[field])) {
          case 'array':
            rows = rows.filter(row => query[field].includes(row[field]))
            break
          case 'string':
            rows = rows.filter(row => row[field].toLowerCase().includes(query[field].toLowerCase()))
            break
          default:
            // nothing to do
            break
        }
    })

    if (sort) {
        rows = orderBy(rows, sort, order)
    }

    const res = {
        rows: rows.slice(offset, offset + limit),
        total: rows.length,
        summary: {
          uid: rows.length,
          age: rows.length && ~~(rows.map(({ age }) => age).reduce((sum, cur) => sum + cur) / rows.length), // average age
          country: uniq(rows.map(({ country }) => country)).length
        }
    }

    return Promise.resolve(res)
}