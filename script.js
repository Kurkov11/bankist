'use strict';

// DOGS
// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// function checkDogs(dogsJulia, dogsKate) {
//   const correctDogsJulia = dogsJulia.slice(1, -2);
//   const allDogs = correctDogsJulia.concat(dogsKate);
//   allDogs.forEach(function (dog, i) {
//     const isAdult = dog >= 3;
//   });
// }
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// const myArr = [10, -4, 20];
// const addedZeros = myArr.map(current => Number(`${current}0`));
// const myFunc = () => {
//   return 'curly braces inside arrow function. Neat, but when is it actually useful??';
// };

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementDates: [
    '01 Jan 1945 00:00:00 GMT',
    '05 Jan 1945 00:00:00 GMT',
    '10 Jan 1970 00:00:00 GMT',
    '30 Jan 1970 00:00:00 GMT',
    '15 Feb 2024 05:30:00 GMT',
    '16 Feb 2024 04:34:12 GMT',
    '17 Feb 2024 00:00:00 GMT',
    '18 Feb 2024 03:01:03 GMT',
  ],
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementDates: [
    '02 Jan 1945 00:00:00 GMT',
    '05 Jan 1945 00:00:00 GMT',
    '10 Jan 1970 00:00:00 GMT',
    '30 Jan 1970 00:00:00 GMT',
    '12 Feb 1970 00:00:00 GMT',
    '01 Mar 1970 05:03:00 GMT',
    '03 Mar 1970 00:00:00 GMT',
    '14 Mar 1970 00:00:00 GMT',
  ],
};
//Connect each movement with it's date using map

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementDates: [
    '03 Jan 1945 00:00:00 GMT',
    '05 Jan 1945 00:00:00 GMT',
    '10 Jan 1970 00:00:00 GMT',
    '30 Jan 1970 00:00:00 GMT',
    '12 Feb 1970 00:00:00 GMT',
    '01 Mar 1970 05:03:00 GMT',
    '03 Mar 1970 00:00:00 GMT',
    '14 Mar 1970 00:00:00 GMT',
  ],
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementDates: [
    '04 Jan 1945 00:00:00 GMT',
    '05 Jan 1945 00:00:00 GMT',
    '10 Jan 1970 00:00:00 GMT',
    '30 Jan 1970 00:00:00 GMT',
    '12 Feb 1970 00:00:00 GMT',
  ],
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
const formatCurrency = function (number, locale, currency) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(number);
};
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

function hideUI() {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
}
/////////////////
//Functions END
function registerMovement(account, mov) {
  account.movements.push(mov);
  account.movementDates.push(new Date().toISOString());
  console.log(account.movementDates);
}
function formatMovementDate(date, locale = navigator.language) {
  function calcDaysPassed(date1, date2) {
    return Math.trunc(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  }
  const daysPassed = calcDaysPassed(date, new Date());

  if (daysPassed === 0) return 'today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 5) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
}
function displayMovements(account, sort = false) {
  const movs = sort
    ? account.movements.slice().sort((mov, next) => mov - next)
    : account.movements.slice();

  containerMovements.innerHTML = '';
  movs.forEach(function (mov, i) {
    const type = mov >= 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${formatMovementDate(
      new Date(account.movementDates[i])
    )}</div>
      <div class="movements__value">${formatCurrency(
        mov,
        navigator.language,
        'EUR'
      )}</div>
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
  labelBalance.textContent = formatCurrency(balance, navigator.language, 'EUR');
};
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  console.log(income);
  labelSumIn.textContent = formatCurrency(income, navigator.language, 'EUR');

  const spending = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + Math.abs(curr), 0);
  labelSumOut.textContent = formatCurrency(spending, navigator.language, 'EUR');

  //Interest receives some percent of every deposit depending on the account
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (account.interestRate / 100))
    .filter(interest => interest >= 1)
    .reduce((totalInterest, interest) => totalInterest + interest, 0);
  labelSumInterest.textContent = labelSumOut.textContent = formatCurrency(
    interest,
    navigator.language,
    'EUR'
  );
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
let counter; //Defined here to be accessed later

const startTimer = time => {
  let minutes = Math.trunc(time / 60);
  labelTimer.textContent = `${minutes.toString().padStart(2, '0')}:${(time % 60)
    .toString()
    .padStart(2, '0')}`;
  counter = setInterval(() => {
    // m1 time61 t01:01 // m1 time60 01:00 //m00:59
    time -= 1;
    console.log(time);
    if (time === 0) {
      hideUI();
      clearInterval(counter);
    }
    minutes = Math.trunc(time / 60);
    labelTimer.textContent = `${minutes.toString().padStart(2, '0')}:${(
      time -
      minutes * 60
    )
      .toString()
      .padStart(2, '0')}`;
  }, 1000);
};
//Functions
/////////////////

// FAKED LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  //Display date based on location
  const now = new Date(); //labelDate

  labelDate.textContent = Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now);

  //Lose input focus - even when data was incorrect
  inputLoginUsername.blur();
  inputLoginPin.blur();

  currentAccount = accounts.find(account => {
    // account.username === inputLoginUsername.value &&
    return account.username === inputLoginUsername.value;
  });
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //If any timer was running clear it
    clearInterval(counter);

    //Start timer
    startTimer(10);
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
    registerMovement(receiverAccount, amount);

    registerMovement(currentAccount, -1 * amount);

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
    setTimeout(() => {
      closedUser &&
        accounts.splice(
          accounts.findIndex(user => user === closedUser),
          1
        );
      hideUI();
    }, 2500);
  }
});
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(deposit => deposit >= 0.1 * amount)
  ) {
    inputLoanAmount.value = '';
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementDates.push(new Date());
      updateUI(currentAccount);
    }, 2500);
  }
});

const overallBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, val) => acc + val, 0);

const movsAscend = movements.sort((curr, next) => curr - next);
console.log(movsAscend);

let sort = false;
btnSort.addEventListener('click', function () {
  sort = !sort;
  displayMovements(currentAccount, sort);
});
// Exercises

//Log the deposits
// console.log(accounts.flatMap(acc => acc.movements).filter(mov => mov > 0));

// // 1.
// const depositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, dep) => sum + dep);

// // 2.1
// const depositsOver1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000).length;
// console.log(depositsOver1000);

// //2.2
// const depositsOver1000Reduce = accounts.reduce(function (sum, acc) {
//   return sum + acc.movements.filter(mov => mov > 1000).length;
// }, 0);
// console.log(depositsOver1000Reduce);

// // 3. Destructured object containing the sum of deposits and sum of withdrawals
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (obj, cur) => {
//       obj[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return obj;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(deposits);

// // 4. Capitalise with exceptions
// const convertTitle = function (sentence) {
//   const capitalise = word => word[0].toUpperCase() + word.slice(1);
//   const exceptions = [
//     'a',
//     'an',
//     'and',
//     'as',
//     'at',
//     'but',
//     'by',
//     'for',
//     'in',
//     'nor',
//     'of',
//     'on',
//     'or',
//     'the',
//     'up',
//   ];
//   return capitalise(
//     sentence
//       .split(' ')
//       .map(word =>
//         !exceptions.includes(word.toLowerCase()) ? capitalise(word) : word
//       )
//       .join(' ')
//   );
// };
// console.log(
//   convertTitle("but we don't have any butter in the fridge at home, John")
// );

//Coding challenge #4
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// // 1.
// dogs.forEach(function (dog) {
//   dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
// });
// // 2.
// const dogSarah = dogs.find(dog => {
//   return dog.owners.includes('Sarah');
// });
// if (dogSarah.curFood >= dogSarah?.recommendedFood)
//   console.log("Sarah's dog is eating enough");
// // 3.
// const ownersEatTooLittle = dogs
//   .filter(dog => {
//     return dog.curFood < dog.recommendedFood;
//   })
//   .flatMap(starvingDog => starvingDog.owners);

// const ownersEatTooMuch = dogs
//   .filter(dog => {
//     return dog.curFood > dog.recommendedFood;
//   })
//   .flatMap(overweightDog => overweightDog.owners);

// console.log(ownersEatTooLittle);
// console.log(ownersEatTooMuch);
// // 4.
// const ownersEatTooLittleString =
//   ownersEatTooLittle.join(' and ') + "'s dogs eat too little!";
// const ownersEatTooMuchString =
//   ownersEatTooMuch.join(' and ') + "'s dogs eat too much!";
// console.log(ownersEatTooLittleString);
// console.log(ownersEatTooMuchString);
// // 5.
// console.log(
//   'Are there any dogs eating exactly the recommended amount of food? ' +
//     dogs.some(dog => dog.recommendedFood === dog.curFood)
// );
// const foodAmountOk = function (dog) {
//   return (
//     dog.curFood >= dog.recommendedFood - dog.recommendedFood * 0.9 &&
//     dog.curFood <= dog.recommendedFood * 1.1
//   );
// };
// console.log(
//   'Are there any dogs eating the ok amount of food? ' + dogs.some(foodAmountOk)
// );
// const okEatingDogs = dogs.filter(foodAmountOk);
// console.log(okEatingDogs);

// const dogsRecomSorted = dogs.slice().sort((cur, next) => {
//   return cur.recommendedFood - next.recommendedFood;
// });
// console.log(dogsRecomSorted);

// console.log(Math.max(10, Number.parseInt('15px')));

// const numBetween = function (min, max) {
//   let num = Math.trunc(Math.random() * (max - min) + min) + 1;
//   return num;
// };
// console.log(numBetween(5, 10));
// console.log(Math.round('15.5'));

//Clock
// setInterval(() => {
//   console.log(
//     Intl.DateTimeFormat(navigator.language, {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//     }).format(new Date())
//   );
// }, 1000);
