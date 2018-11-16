var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

/**
 * Filter array by type
 * @param row
 * @param objType
 * @returns {number}
 */
function filterByType (row, objType) {
  return row.type === objType ? 1 : 0
}

var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'}
]

var reduce = function (row, memo) {
  memo.impressions = (memo.impressions || 0) + filterByType(row, 'impression')
  memo.loads = (memo.loads || 0) + filterByType(row, 'load')
  memo.displays = (memo.displays || 0) + filterByType(row, 'display')
  memo.loadRate = (memo.loads * 100) / memo.impressions
  memo.displayRate = (memo.displays * 100) / memo.loads
  return memo
}

var calculations = [
  {
    title: 'Impressions',
    value: 'impressions'
  },
  {
    title: 'Loads',
    value: 'loads'
  },
  {
    title: 'Displays',
    value: 'displays'
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    template: function (val) {
      return val.toFixed(1) + '%'
    }
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    template: function (val) {
      return val.toFixed(1) + '%'
    }
  }
]

module.exports = createReactClass({
  render () {
    return (
      <ReactPivot
        rows={rows}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
        activeDimensions={['Date', 'Host']} />
    )
  }
})
