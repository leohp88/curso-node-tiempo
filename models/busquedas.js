const axios = require("axios");
const color = require("colors");

const ciudad = async (lugar = "") => {
  historial = ["Tegucigalpa", "Madrid", "San Jose"];
  const datos = {
    access_token: process.env.MAXBOX_KEY,
    limit: 5,
    language: "es",
  };

  try {
    const instance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
      params: datos,
    });

    const resp = await instance.get();
    //peticion web

    return resp.data.features.map((lugar) => ({
      id: lugar.id,
      nombre: lugar.place_name,
      lng: lugar.center[0],
      lat: lugar.center[1],
    }));
  } catch (error) {
    return [];
  }
};

const climaLugar = async (lat, lon) => {
  const datos = {
    lat,
    lon,
    appid: process.env.OPENWEATHER_KEY,
    units: "metric",
    lang: "es",
  };

  try {
    const instance = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather`,
      params: datos,
    });

    const resp = await instance.get();
    const { weather, main } = resp.data;
    return {
      descrip: weather[0].description,
      min: main.temp_min,
      max: main.temp_max,
      temp: main.temp,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  ciudad,
  climaLugar,
};
