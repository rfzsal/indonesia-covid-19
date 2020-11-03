'use strict';
require('dotenv').config();
const Covid = require('../models/covid');
const Hospitals = require('../models/hospitals');
const News = require('../models/news');
const file = require('../helpers/file');
const { downloadImage } = require('../helpers/downloader');

const myDomain = process.env.myDomain;

const updateCovid = async () => {
  console.log('Updating data...');
  const startTime = new Date();

  const latestData = await Covid.getLatestData();
  const dailyData = await Covid.getDailyData();
  const provinceData = await Covid.getProvinceData();

  file.writeFile('public/api/latest', JSON.stringify(latestData));
  file.writeFile('public/api/daily', JSON.stringify(dailyData));
  file.writeFile('public/api/province', JSON.stringify(provinceData));

  const provinceList = await Covid.getProvinceList();

  let province;
  for (province of provinceList) {
    const provinceDetail = await Covid.getProvinceData(province.id);
    const provinceName = province.provinsi.replace(/ /g, '_').toLowerCase();

    file.writeFile(
      `public/api/${provinceName}`,
      JSON.stringify(provinceDetail)
    );
  }

  const endTime = new Date() - startTime;
  console.log(`Data updated. (${endTime}ms)`);
};

const updateHospitals = async () => {
  console.log('Updating hospitals data...');
  const startTime = new Date();

  const hospitals = await Hospitals.get();

  file.writeFile('public/api/hospitals', JSON.stringify(hospitals));

  const endTime = new Date() - startTime;
  console.log(`Hospitals data updated. (${endTime}ms)`);
};

const updateNews = async () => {
  console.log('Updating news...');
  const startTime = new Date();

  let news = await News.get();
  let fixedNews = [];

  let currentNews;
  for (currentNews of news) {
    let imageName = currentNews.judul.toLowerCase();

    imageName = imageName.replace(/[/ ]/g, '_');
    imageName = imageName.replace(/[()]/g, '');

    await downloadImage(currentNews.gambar, imageName);

    fixedNews.push({
      gambar: `${myDomain}/image/${imageName}`,
      judul: currentNews.judul,
      link: currentNews.link,
      tanggal: currentNews.tanggal
    });
  }

  file.writeFile('public/api/news', JSON.stringify(fixedNews));

  const endTime = new Date() - startTime;
  console.log(`News updated. (${endTime}ms)`);
};

exports.update = async () => {
  file.createFolder('public');
  file.createFolder('public/api');

  await updateCovid();
  await updateHospitals();

  file.deleteFolder('public/image');
  file.createFolder('public/image');

  await updateNews();
};
