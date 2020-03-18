
const formSearch = document.querySelector('.form-search');
const inputCitiesFrom = formSearch.querySelector('.input__cities-from');
const dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from');
const inputCitiesTo = formSearch.querySelector('.input__cities-to');
const dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to');
const inputDateDepart = formSearch.querySelector('.input__date-depart');

const cities = ['Абенгуру', 'Джхунджхуну', 'Пунта Кардон', 'Готки', 'Лесной', 'Лион', 'Клагенфурт', 'Квекве',
  'Беруни', 'Глендейл', 'Михара', 'Цюйцзин', 'Асуль', 'Накхон Си Тхаммарат', 'Бансвара', 'Эспо', 'Наро-Фоминск'];

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
