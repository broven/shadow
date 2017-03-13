interface info {
  title: string
  duration: number
}
export interface timeTrack {
  path: string
  title: string
  startTime: Date
  endTime: Date
  duration: number
}
export interface website {
  info: info
  timeTrack: Array<timeTrack>
}

export interface rankRecord {
 duration: string
 title: string
 hours: number
 minutes: number
 days: number
}
