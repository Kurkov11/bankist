'use strict';

// DOGS
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

function checkDogs(dogsJulia, dogsKate) {
  const correctDogsJulia = dogsJulia.slice(1, -2);
  const allDogs = correctDogsJulia.concat(dogsKate);
  allDogs.forEach(function (dog, i) {
    const isAdult = dog >= 3;
  });
}
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
const myArr = [10, -4, 20];
const addedZeros = myArr.map(current => Number(`${current}0`));
const myFunc = () => {
  return 'curly braces inside arrow function. Neat, but when is it actually useful??';
};

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
function displayMovements(account) {
  containerMovements.innerHTML = '';
  account.movements.forEach(function (mov, i) {
    const type = mov >= 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .split(' ')
      .map(curr => curr[0].toLowerCase())
      .join('');
  });
};
createUsernames(accounts);

const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance}€`;
};
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  console.log(income);
  labelSumIn.textContent = income + '€';

  const spending = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + Math.abs(curr), 0);
  labelSumOut.textContent = spending + '€';

  //Interest receives some percent of every deposit depending on the account
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (account.interestRate / 100))
    .filter(interest => interest >= 1)
    .reduce((totalInterest, interest) => totalInterest + interest, 0);
  labelSumInterest.textContent = interest + '€';
};

let currentAccount;
function updateUI(account) {
  //Display movement
  displayMovements(account);

  //Display balance
  calcDisplayBalance(account);

  //Display summary
  calcDisplaySummary(account);

  //Display welcome message
  labelWelcome.textContent = `Hello ${account.owner.split(' ')[0]}`;
}
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  //Lose input focus - even when data was incorrect
  inputLoginUsername.blur();
  inputLoginPin.blur();

  currentAccount = accounts.find(account => {
    // account.username === inputLoginUsername.value &&
    return account.username === inputLoginUsername.value;
  });
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Hello ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    updateUI(currentAccount);

    console.log(currentAccount.interestRate + 'Interest');

    //Empty inputs
    inputLoginUsername.value = inputLoginPin.value = '';
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const transferTo = inputTransferTo.value;
  console.log(amount + '€', transferTo);
  const receiverAccount = accounts.find(function (account) {
    return account.username === transferTo;
  });

  //Was the account found? Isn't it the current account? Is the amount value positive? Is there enough money?
  if (
    receiverAccount &&
    receiverAccount !== currentAccount &&
    amount > 0 &&
    currentAccount.balance >= amount
  ) {
    receiverAccount.movements.push(amount);
    currentAccount.movements.push(-1 * amount);

    updateUI(currentAccount);

    inputTransferAmount.value = inputTransferTo.value = '';
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  const closedUser = accounts.find(function (account) {
    return (
      account === currentAccount &&
      account.username === inputCloseUsername.value &&
      account.pin === Number(inputClosePin.value)
    );
  });
  if (closedUser) {
    inputCloseUsername.value = inputClosePin.value = '';
    closedUser &&
      accounts.splice(
        accounts.findIndex(user => user === closedUser),
        1
      );
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
});
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(deposit => deposit >= 0.1 * amount)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

// const enteredPW = prompt('Enter password');
// const enteredUN = prompt('Enter username');

// const searchedAccount = accounts.find(account => {
//   return account.username === enteredUN && account.pin === Number(enteredPW);
// });

// if (searchedAccount) {
//   updateUI(searchedAccount);
//   containerApp.style.opacity = 100;
//   currentAccount = searchedAccount;
// }
// console.log(searchedAccount);
const deposit = function (mov) {
  return mov > 0;
};
console.log(movements.some(deposit));
console.log(movements.every(deposit));
