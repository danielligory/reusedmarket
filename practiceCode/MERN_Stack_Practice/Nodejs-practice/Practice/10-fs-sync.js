const { readFileSync, writeFileSync } = require ('fs');

const first = readFileSync('./Practice/content/first.txt', 'utf8');
const second = readFileSync('./Practice/content/second.txt', 'utf8');

console.log(first, second)

writeFileSync('./Practice/content/result-sync.txt', `Here is the result : ${first}, ${second}`,
{ flag:'a' });

console.log('done with this task')
console.log('starting the next one')