const datesInput = document.querySelector("#day");
const monthsInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const btn = document.querySelector("#button");
const containers = document.querySelectorAll("input");
const pReaults = document.querySelector("#ikosa");
const yearResults = document.querySelector("#year-results");
const monthsResults = document.querySelector("#months-results");
const daysResults = document.querySelector("#days-results");
const dayErrorMsge = document.querySelector("#day-error");
const monthErrorMsge = document.querySelector("#month-error");
const yearErrorMsge = document.querySelector("#year-error");

function error(msg, field, result, text) {
  msg.classList.toggle("hidden");
  field.classList.toggle("border-red-400", "text-red-400");
  document
    .querySelector(`label[for="${field.id}"]`)
    .classList.add("text-red-400");
  result.innerHTML = `<p>--<span>${text}</span></p>`;
}

const removeError = (msg, field) => {
  msg.classList.add("hidden");
  field.classList.remove("border-red-400", "text-red-400");
  document
    .querySelector(`label[for="${field.id}"]`)
    .classList.remove("text-red-400");
};

function calculateAge() {
  const dates = parseInt(datesInput.value);
  const months = parseInt(monthsInput.value);
  const years = parseInt(yearInput.value);
  const date = new Date(years, months - 1, dates);
  let hasErro = false;
  if (hasErro) {
    displayWhenEmpty();
  }
  if (!dates) {
    error(dayErrorMsge, datesInput, daysResults, "day");
    hasErro = true;
  } else {
    if (date.getDate() !== dates) {
      dayErrorMsge.textContent = "use valid days for this month please";
      error(dayErrorMsge, datesInput, daysResults, "day");
      hasErro = true;
      return false;
    } else if (dates > new Date().getDate()) {
      removeError(dayErrorMsge, datesInput);
      hasErro = false;
      const iminsi = dates - new Date().getDate();
      daysResults.innerHTML = "";
      daysResults.innerHTML =
        iminsi <= 1
          ? `<p>${iminsi}<span>Day</span></p>`
          : `<p>${iminsi}<span >Days</span></p>`;
      emptyFields();
    } else {
      removeError(dayErrorMsge, datesInput);
      hasErro = false;
      let iminsi = new Date().getDate() - dates;
      daysResults.innerHTML = "";
      daysResults.innerHTML =
        iminsi <= 1
          ? `<p>${iminsi}<span>Day</span></p>`
          : `<p>${iminsi}<span >Days</span></p>`;
      emptyFields();
    }
  }

  if (!years) {
    error(yearErrorMsge, yearInput, yearResults, "year");
    hasErro = true;
  } else if (years > new Date().getFullYear()) {
    error(yearErrorMsge, yearInput, yearResults, "year");
    yearErrorMsge.textContent = "use valid year please";
    hasErro = true;
    return false;
  } else {
    removeError(yearErrorMsge, yearInput);
    hasErro = false;
    let imyaka = new Date().getFullYear() - years;
    yearResults.innerHTML = "";
    yearResults.innerHTML =
      imyaka <= 1
        ? `<p>${imyaka}<span>Year</span></p>`
        : `<p>${imyaka}<span>Years</span></p>`;
    emptyFields();
  }
  if (!months) {
    error(monthErrorMsge, monthsInput, monthsResults, "month");
    hasErro = true;
  } else if (months > 12) {
    monthErrorMsge.textContent = "Enter a valid month please";
    error(monthErrorMsge, monthsInput, monthsResults, "month");
    hasErro = true;
    return false;
  } else if (date.getMonth() > new Date().getMonth() - 1) {
    removeError(monthErrorMsge, monthsInput);
    hasErro = false;
    let amezi = date.getMonth() - new Date().getMonth();
    monthsResults.innerHTML = "";
    monthsResults.innerHTML =
      amezi <= 1
        ? `<p>${amezi}<span>month</span></p>`
        : `<p>${amezi}<span>months</span></p>`;
    emptyFields();
  } else {
    removeError(monthErrorMsge, monthsInput);
    hasErro = false;
    let amezi = new Date().getMonth() - date.getMonth();
    monthsResults.innerHTML = "";
    monthsResults.innerHTML =
      amezi <= 1
        ? `<p>${amezi}<span>month</span></p>`
        : `<p>${amezi}<span>months</span></p>`;
    emptyFields();
  }

  const texts = document.getElementsByTagName("p");
  [...texts].forEach((text) => {
    text.classList.add(
      "text-5xl",
      "lowercase",
      "space-x-20",
      "text-purple-500",
      "font-bold"
    );
  });

  const spanElement = document.querySelectorAll("span");
  [...spanElement].forEach((span) => {
    span.classList.add("text-black", "font-extrabold");
  });

  function displayWhenEmpty() {
    daysResults.innerHTML = `<p>--<span>days</span></p>`;
    yearResults.innerHTML = `<p>--<span>year</span></p>`;
    monthsResults.innerHTML = `<p>--<span>month</span></p>`;
  }
  function emptyFields() {
    datesInput.value = "";
    monthsInput.value = "";
    yearInput.value = "";
  }
}
btn.addEventListener("click", calculateAge);

containers.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      calculateAge();
    }
  });
});
