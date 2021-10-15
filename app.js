const color = require("colors");
const {
  leerInput,
  inquirerMenu,
  pausa,
  listadoLugares,
} = require("./helpers/inquirer");
const { ciudad, climaLugar } = require("./models/busquedas");
require("dotenv").config();
const main = async () => {
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // MOstrar mensaje
        const termino = await leerInput("Ciudad:  ");

        //Buscar los lugares
        const lugares = await ciudad(termino);

        //Selecciona el lugar
        const id = await listadoLugares(lugares);
        if (id === "0") continue;
        const lugarSel = lugares.find((l) => l.id === id);

        //clima
        const clima = await climaLugar(lugarSel.lat, lugarSel.lng);
        // MOstrar resultados
        console.clear();
        console.log("\nInformacion del lugar\n".green);
        console.log("Ciudad:", lugarSel.nombre.green);
        console.log("Lat:", lugarSel.lat);
        console.log("Lon:", lugarSel.lng);
        console.log("Temperatura:", clima.temp);
        console.log("Minima:", clima.min);
        console.log("Maxima:", clima.max);
        console.log("Como esta el clima: ", `${clima.descrip}`.green);
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
