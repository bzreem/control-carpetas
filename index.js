const fs = require("fs/promises");
const fs2 = require("fs");
const colors = require("colors");
const {
  createTags,
  createTrunks,
  moveConfig,
  controllVarEnv,
  checkDir,
} = require("./handlerError");

const DIR = process.env.RUTA;
const read = async () => {
  try {
    let res;
    let myEnv = await controllVarEnv(DIR);
    if (myEnv.status === true) {
      res = myEnv.data;
    } else {
      console.error(myEnv.message.red);
    }
    let res2;
    for (let i = 0; i < res.length; i++) {
      res2 = await fs.readdir(`../${DIR}/${res[i].trim()}`);
      for (let j = 0; j < res2.length; j++) {
        if (res2[j] !== "config" && res2[j] !== "tags" && res2[j] !== "trunk") {
          let isDir = await checkDir(`../${DIR}/${res[i].trim()}/${res2[j]}`);
          if (isDir.isDirectory()) {
            await fs.rmdir(`../${DIR}/${res[i].trim()}/${res2[j]}`, {
              recursive: true,
            });
          } else {
            await fs.unlink(`../${DIR}/${res[i].trim()}/${res2[j]}`);
          }
        }

        let responseTags = await createTags(res[i]);
        if (responseTags.message === false) {
          fs2.mkdirSync(`../${DIR}/${res[i].trim()}/tags`);
        } else {
          console.log(`Creada carpeta tags en ${res[i]}`.green);
        }

        let responseTrunks = await createTrunks(res[i]);
        if (responseTrunks.message === false) {
          fs2.mkdirSync(`../${DIR}/${res[i].trim()}/trunk`);
        } else {
          console.log(`Creada carpeta trunk en ${res[i]}`.yellow);
        }

        let responseConfig = await moveConfig(res[i]);

        if (responseConfig.message === false) {
          fs2.renameSync(
            `../${DIR}/${res[i]}/config/`,
            `../${DIR}/${res[i]}/trunk/config/`
          );
        } else {
          console.log(
            `Completado el cambio de config a trunk/config en ${res[i]}`.blue
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

read();
