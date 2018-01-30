let arr=["", "#xf124", "#xe65c", "#xf856", "#xeefa", "#xf154"]

for (let i=0;i<arr.length;i++){
  switch (arr[i]){
    case '#xf124':
      arr[i]='前'
      break
    case '#xe65c':
      arr[i]=5
      break
    case '#xf856':
      arr[i]='端'
      break
    case '#xeefa':
      arr[i]='工'
      break
    default:
      arr[i]=arr[i]
  }
  console.log(arr)
  console.log(arr.join(''))
}
