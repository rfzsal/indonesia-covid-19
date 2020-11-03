'use strict';
const axios = require('axios');

const { URL } = require('../helpers/arcgis');

const server = URL.hospitals;

exports.get = async () => {
  let hospitals = await axios.get(server);

  hospitals = hospitals.data.features.map((hospital) => {
    return {
      nama: hospital.attributes.nama,
      telepon: hospital.attributes.telepon,
      wilayah: hospital.attributes.wilayah,
      alamat: hospital.attributes.alamat,
      peta: { lat: hospital.attributes.lat, lon: hospital.attributes.lon }
    };
  });

  return hospitals;
};
