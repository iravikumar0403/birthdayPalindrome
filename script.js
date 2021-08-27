const inputDate = document.getElementById("birthdate");
const button = document.getElementById("btn");
const outputEl = document.getElementById("output");
const errorEl = document.getElementById("error");

button.addEventListener("click", () => {
  if (!inputDate.value) {
    errorEl.innerHTML = "Please provide a valid input";
    return;
  }else{
      errorEl.innerHTML = ""
  }

  let dateObj = {
    day: inputDate.value.split("-")[2],
    month: inputDate.value.split("-")[1],
    year: inputDate.value.split("-")[0],
  }

  if (checkPalindromeForAllVariations(dateObj)) {
    outputEl.innerHTML = "Yay! 🥳 Your Birthday is a Palindrome.";
  } else {
    let [noOfDaysMissed, nextPalindromeDate] = getNextPalindromeDate(dateObj);
    outputEl.innerHTML = `<p>Alas! 😢 You missed by ${noOfDaysMissed} ${noOfDaysMissed === 1 ? "day" : "days"}. <br>
    Next Palindrome date is ${nextPalindromeDate.day}-${nextPalindromeDate.month}-${nextPalindromeDate.year}</p>`
  }
});

function getAllDateVariations(dateObj) {
  let yyyymmdd = dateObj.year + dateObj.month + dateObj.day;
  let yyyyddmm = dateObj.year + dateObj.day + dateObj.month;
  let ddmmyyyy = dateObj.day + dateObj.month + dateObj.year;
  let ddmmyy = dateObj.day + dateObj.month + dateObj.year.slice(-2);
  let mmddyy = dateObj.month + dateObj.day + dateObj.year.slice(-2);
  let yymmdd = dateObj.year.slice(-2) + dateObj.month + dateObj.day;

  return [yyyyddmm, yyyymmdd, ddmmyyyy, ddmmyy, mmddyy, yymmdd];
}

function isPalindrome(dateStr) {
  return dateStr === dateStr.split("").reverse().join("");
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getNextDate(date) {
  const noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  date.day++;

  if (isLeapYear(date.year)) {
    noOfDaysInMonth[1] = 29;
  }
  
  if (date.day > noOfDaysInMonth[date.month - 1]) {
    if (date.month === 12) {
      date.year++;
      date.month = 1;
      date.day = 1;
    } else {
      date.month++;
      date.day = 1;
    }
  }
  return date;
}

function convertDateToString(date) {
  let dateStr = {
    day: date.day < 10 ? "0" + date.day : date.day.toString(),
    month: date.month < 10 ? "0" + date.month : date.month.toString(),
    year: date.year.toString(),
  };
  return dateStr;
}

function getNextPalindromeDate(dateObj) {
  let date = {
    day: Number(dateObj.day),
    month: Number(dateObj.month),
    year: Number(dateObj.year),
  };
  let noOfDaysMissed = 0;
  while (true) {
    noOfDaysMissed++;
    let nextDate = getNextDate(date);
    let nextDateStr = convertDateToString(nextDate);
    if (checkPalindromeForAllVariations(nextDateStr)) {
      return [noOfDaysMissed, nextDateStr];
    }
  }
}

function checkPalindromeForAllVariations(dateObj) {
  let allDateVariations = getAllDateVariations(dateObj);
  let flag = false;
  for (dateVariant of allDateVariations) {
    if (isPalindrome(dateVariant)) {
      flag = true;
      break;
    }
  }

  if (flag) {
    return true;
  } else {
    return false;
  }
}