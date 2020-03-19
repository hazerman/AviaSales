
const PROXY = 'https://cors-anywhere.herokuapp.com/';
const AVIASALES_JSON_SERVER = 'http://api.travelpayouts.com/data/ru/cities.json';
const AVIASALES_JSON = '../database/cities.json';
const SECRET_KEY = 'da69997ffdd4a869ab4b4f86b68527fb';
const PRICE_CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload';
const HOMEWORK_GET = 'http://min-prices.aviasales.ru/calendar_preload?origin=SVX&destination=KGD&depart_date=2020-05-25';

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
    const filteredCities = cities.filter((city) => {
      const cityLowerCase = city.toLowerCase();
      return cityLowerCase.includes(input.value.toLowerCase());
    });
    filteredCities.forEach((city) => {
      const elementLi = document.createElement('li');
      elementLi.className = 'dropdown__city';
      elementLi.setAttribute('tabindex', 0);
      elementLi.textContent = city;
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

// Получаем данные и закидываем в массив городов

getData(AVIASALES_JSON, (data) => {
  const loadedCities = [];
  data.forEach((item) => {
    loadedCities.push(item.name);
  });
  cities = loadedCities.filter((city) => city);
});

// Получаем данные по домашке

getData(HOMEWORK_GET, (data) => {
  console.log(data.current_depart_date_prices[0]);
});
