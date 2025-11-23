// Q10
function counter() {
  let count = 0;
  
  return function() {
    count++;
    console.log(count);
  }
}

const c = counter();
c(); // 1
c(); // 2
c(); // 3

// Q11
function createWallet() {
  let balance = 0;
  function addMoney(amount) {
    balance += amount;
  }
  function checkBalance() {
    console.log(balance);
  }
  return {
    addMoney,
    checkBalance,
  };
}

let myWallet = createWallet();
myWallet.addMoney(500);
myWallet.addMoney(200);
myWallet.checkBalance(); //should show 700