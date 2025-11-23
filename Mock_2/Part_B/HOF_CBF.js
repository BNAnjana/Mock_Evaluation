// Q8
let nums = [10, 3, 7, 20, 13, 2];

//map()
let squares = nums.map(x => x*x);
console.log(squares); 

//filter()
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

let primes = nums.filter(isPrime);
console.log(primes);

//reduce()
let sum = nums.reduce((a,b) => a+b);
console.log(sum);

//sort()
let sorted = nums.sort((a,b) => b-a);
console.log(sorted);