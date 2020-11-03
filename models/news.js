'use strict';
const axios = require('axios');
const cheerio = require('cheerio');

const { formatTimestamp } = require('../helpers/date');

const server = 'https://covid19.go.id/p/berita';

exports.get = async () => {
  const html = await axios.get(server);

  const newsNode = cheerio('article', html.data);

  let news = [];

  newsNode.each(async function () {
    const gambar = cheerio(this)
      .children('a')
      .children('img')
      .attr('data-original');

    const judul = cheerio(this)
      .children('div')
      .children('div')
      .children('h4')
      .children('a')
      .text();

    const link = cheerio(this).children('a').attr('href');

    let tanggal = cheerio(this)
      .children('div')
      .children('time')
      .attr('datetime');

    tanggal = formatTimestamp(tanggal);

    news.push({ gambar, judul, link, tanggal });
  });

  return news;
};
