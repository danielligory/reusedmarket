const { readFile, writeFile } = require('fs');

console.log('start');
readFile('./Practice/content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  // console.log(result);
  const first = result
  readFile('./Practice/content/second.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return;
    }

    const second = result
    writeFile(
      './Practice/content/result-async.txt',
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err)
          return;
        }
        console.log('done with this task');
      }
    )
  })
})
console.log('starting next tasks');