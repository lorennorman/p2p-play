export const
  rand = (min, max) => Math.floor(Math.random()*(max ? max-min : min) + (max ? min : 0)),

  range = (startAt, endAt) => {
    return [...Array(endAt - startAt).keys()].map(i => i + startAt)
  }
