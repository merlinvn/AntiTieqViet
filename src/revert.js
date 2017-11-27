'use strict'

// const maps = [
//   ['kh', 'x'],
//   ['c(?!h)', 'k'],
//   ['q', 'k'],
//   ['tr', 'c'],
//   ['ch', 'c'],
//   ['d', 'z'],
//   ['gi', 'z'],
//   ['r', 'z'],
//   ['đ', 'd'],
//   ['ph', 'f'],
//   ['ngh?', 'q'],
//   ['gh', 'g'],
//   ['th', 'w'],
//   ['nh', 'n\'']
// ]

const mapsReverseStart = {
  'x': 'kh',
  'k': 'c(q)',
  //   'k': 'q',
  'c': 'tr(ch)',
  //   'c': 'ch',
  'z': 'd(gi)(r)',
  //   'z': 'gi',
  //   'z': 'r',
  'd': 'đ',
  'f': 'ph',
  'q': 'ng(ngh)',
  //   'q': 'ngh',
  'g': 'gh',
  'w': 'th',
  'n\'': 'nh'
}

const mapsReverseEnd = {
  'k': 'c',
  'c': 'ch',
  'q': 'ng',
  'n\'': 'nh'
}

/**
 * Capitalize the first letter in a string.
 * @param {*} string
 */
const capitalize = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`

/**
 * Convert using a single map element.
 * @param {*} input
 * @param {*} map
 */
// const convert = (input, from, to) => {
//   return input
//     .replace(new RegExp(from), to)
//     .replace(new RegExp(capitalize(from)), capitalize(to))
// }

export function revert(input) {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof input}`)
  }
  var lines = input.split('\n')
  for (var j = 0; j < lines.length; j++) {
    var splitStr = lines[j].split(' ')
    for (var i = 0; i < splitStr.length; i++) {
      // for each word in string
      for (var key in mapsReverseStart) {
        if (splitStr[i].startsWith(key) || splitStr[i].startsWith(capitalize(key))) {
          var pattern = '(^' + key + ')(.*)'
          // console.log(pattern + ',' + mapsReverse[key])
          splitStr[i] = splitStr[i].replace(new RegExp(pattern), mapsReverseStart[key] + '$2')

          pattern = '(^' + capitalize(key) + ')(.*)'
          splitStr[i] = splitStr[i].replace(new RegExp(pattern), capitalize(mapsReverseStart[key]) + '$2')
          // console.log(splitStr[i])
          break
        }
      }
      for (key in mapsReverseEnd) {
        pattern = '(.*)(' + key + ')([^a-zA-Z]*$)'
        if (splitStr[i].match(new RegExp(pattern))) {
          // console.log(splitStr[i])
          splitStr[i] = splitStr[i].replace(new RegExp(pattern), '$1' + mapsReverseEnd[key] + '$3')
          // console.log(splitStr[i])
          break
        }
      }
    }

    lines[j] = splitStr.join(' ')
  }

  //   mapsReverse.forEach(map => {
  //     input = convert(input, map)
  //   })

  return lines.join('\n')
}
