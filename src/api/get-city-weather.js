
const API_KEY = 'd4094c06e0195d75ef238b152b266823';
const URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherByCity = async (city) => {
  try {
    const response = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error: ', error);
    throw error;
  }
};
