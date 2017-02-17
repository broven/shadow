import {DEBUG} from '../config'
export function debug(val) {
  if (DEBUG) console.log(val)
}