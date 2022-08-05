const fs = require("fs/promises");
const DIR = process.env.RUTA;
const controllVarEnv = async (path) => {
  let error = {};
  try {
    let data = await fs.readdir(`../${path}`);
    error.status = true;
    error.data = data;
    return error;
  } catch (e) {
    error.message = `No se encontro la ruta especificada: ${path}`;
    return { e, ...error };
  }
};

const checkDir = async (path) => {
  try {
    const stats = await fs.lstat(path);
    return stats;
  } catch (error) {}
};

const createTags = async (element) => {
  let error = {};
  try {
    await fs.access(`../${DIR}/${element.trim()}/tags`);
    return (error.message = true);
  } catch (e) {
    error.message = false;
    return { e, ...error };
  }
};

const createTrunks = async (element) => {
  let error = {};
  try {
    await fs.access(`../${DIR}/${element.trim()}/trunk`);
    return (error.message = true);
  } catch (e) {
    error.message = false;
    return { e, ...error };
  }
};

const moveConfig = async (element) => {
  let error = {};
  try {
    await fs.access(`../${DIR}/${element.trim()}/trunk/config`);
    return (error.message = true);
  } catch (e) {
    error.message = false;
    return { e, ...error };
  }
};

module.exports = {
  createTags,
  createTrunks,
  moveConfig,
  controllVarEnv,
  checkDir,
};
