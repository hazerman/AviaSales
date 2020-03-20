
const PROXY = 'https://cors-anywhere.herokuapp.com/';
const AVIASALES_JSON_SERVER = 'http://api.travelpayouts.com/data/ru/cities.json';
const AVIASALES_JSON = '../database/cities.json';
const SECRET_KEY = 'da69997ffdd4a869ab4b4f86b68527fb';
const PRICE_CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload';

const formSearch = document.querySelector('.form-search');
const inputCitiesFrom = formSearch.querySelector('.input__cities-from');
const dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from');
const inputCitiesTo = formSearch.querySelector('.input__cities-to');
const dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to');
const inputDateDepart = formSearch.querySelector('.input__date-depart');

let cities = [];

// Функция получения данных

const getData = (url, successHandler) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200) {
      successHandler(xhr.response);
    }
  });

  xhr.open('GET', url);
  xhr.send();
};

// Функция вставки городов в инпуты

const pasteCity = (evt, input, dropdown) => {
  if (evt.target.tagName === 'LI') {
    input.value = evt.target.textContent;
    dropdown.textContent = '';
  }
};

// Обработчики вставки городов в инпуты

dropdownCitiesFrom.addEventListener('click', (evt) => {
  pasteCity(evt, inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener('click', (evt) => {
  pasteCity(evt, inputCitiesTo, dropdownCitiesTo);
});

// Функция показа выпадашек городов

const showCities = (input, dropdown) => {
  dropdown.textContent = '';
  if (input.value) {
    const startWithCities = cities.filter((city) => {
      const cityLowerCase = city.name.toLowerCase();
      return cityLowerCase.startsWith(input.value.toLowerCase());
    });
    const filteredCities = startWithCities.sort((left, right) => {
      if (left.name > right.name) return 1;
      if (left.name < right.name) return -1;
      return 0;
    });
    filteredCities.forEach((city) => {
      const elementLi = document.createElement('li');
      elementLi.className = 'dropdown__city';
      elementLi.setAttribute('tabindex', 0);
      elementLi.textContent = city.name;
      dropdown.append(elementLi);
    });
  }
};

// Обработчики показа выпадашек городов

inputCitiesFrom.addEventListener('input', () => {
  showCities(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
  showCities(inputCitiesTo, dropdownCitiesTo);
});

// Функция для спрятывания выпадашек с условием

const hideCitiesCondition = (evt, dropdown) => {
  if (evt.relatedTarget && evt.relatedTarget.tagName === 'LI') {
    return;
  }
  dropdown.textContent = '';
};

// Обработчики при потере фокуса с инпутов

inputCitiesFrom.addEventListener('blur', (evt) => {
  hideCitiesCondition(evt, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('blur', (evt) => {
  hideCitiesCondition(evt, dropdownCitiesTo);
});

// Функция рендеринга самого дешевого рейса на нужную дату

const renderCheapDay = (tickets) => {
  console.log(tickets);
};

// Функция редеринга самых дешевых рейсов на другие даты

const renderCheapYear = (tickets) => {
  const filteredTickets = tickets.sort((smaller, bigger) => smaller.value - bigger.value);
  console.log(filteredTickets);
};

// функция рендеринга рейсов

const renderCheap = (data, date) => {
  const cheapTickets = data.best_prices;
  const cheapestTicket = cheapTickets.filter((item) => item.depart_date === date);
  renderCheapDay(cheapestTicket);
  renderCheapYear(cheapTickets);
};

// Обработчик сабмита формы

formSearch.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const findCityFrom = cities.find((item) => inputCitiesFrom.value === item.name);
  const findCityTo = cities.find((item) => inputCitiesTo.value === item.name);

  if (findCityFrom !== undefined && findCityTo !== undefined) {
    const formData = {
      from: findCityFrom.code,
      to: findCityTo.code,
      date: inputDateDepart.value,
    };

    const requestData = `?depart_date=${formData.date}&origin=${formData.from}&destination=`
    + `${formData.to}&one_way=true&token=${SECRET_KEY}`;

    getData(PRICE_CALENDAR + requestData, (response) => {
      renderCheap(response, formData.date);
    });
    return 0;
  }
  return console.log('Такого города нет в списке');
});

// Получаем данные и закидываем в массив городов

getData(AVIASALES_JSON, (data) => {
  const loadedCities = data;
  cities = loadedCities.filter((city) => city.name);
});
