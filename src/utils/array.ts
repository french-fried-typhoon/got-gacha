export function shuffle(arr: any[]) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = [arr[i], Math.random()]
  }

  arr.sort(function(a, b) { return a[1] - b[1]})

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i][0]
  }
  return arr
}
