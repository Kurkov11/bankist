'use strict';

// DOGS
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
function displayMovements(movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov >= 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
displayMovements(movements);

function checkDogs(dogsJulia, dogsKate) {
  const correctDogsJulia = dogsJulia.slice(1, -2);
  const allDogs = correctDogsJulia.concat(dogsKate);
  allDogs.forEach(function (dog, i) {
    const isAdult = dog >= 3;
    console.log(
      `Dog number ${i + 1} is ${
        isAdult ? `an adult, and is ${dog} years old` : 'still a puppy 🐶'
      }`
    );
  });
}
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
const myArr = [10, -4, 20];
const addedZeros = myArr.map(current => Number(`${current}0`));
console.log(addedZeros);
// const addedZerosForOf = [];
// for (const current of myArr) {
//   addedZerosForOf.push(Number(`${current}0`));
// }
// console.log(addedZerosForOf);
const myFunc = () => {
  return 'curly braces inside arrow function. Neat, but when is it actually useful??';
};
console.log(myFunc());

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .split(' ')
      .map(curr => curr[0].toLowerCase())
      .join('');
  });
};
createUsernames(accounts);
console.log(accounts);

// const deposits = movements.filter(mov => mov > 0);
// const depositsForEach = [];
// movements.forEach(mov => mov > 0 && depositsForEach.push(mov));

// const depositsForOf = [];
// for (const mov of movements) {
//   mov > 0 && depositsForOf.push(mov);
// }

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// const balance = movements.reduce((acc, curr) => acc + curr, 0);
// console.log(balance);

// let sum = 0;
// movements.forEach(mov => (sum += mov));
// console.log(sum === balance);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
  labelBalance.textContent = `${balance}€`;
};
const calcDisplaySummary = function (movements) {
  const income = movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  console.log(income);
  labelSumIn.textContent = income + '€';

  const spending = movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + Math.abs(curr), 0);
  labelSumOut.textContent = spending + '€';

  //Interest receives 1.5 percent of every deposit
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (1.5 / 100))
    .filter(interest => interest >= 1)
    .reduce((totalInterest, interest) => totalInterest + interest, 0);
  labelSumInterest.textContent = interest + '€';
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(account => {
    // account.username === inputLoginUsername.value &&
    return account.username === inputLoginUsername.value;
  });
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Hello ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //Display movement
    displayMovements(currentAccount.movements);

    //Display balance
    calcDisplayBalance(currentAccount.movements);

    //Display summary
    calcDisplaySummary(currentAccount.movements);
  }
});
