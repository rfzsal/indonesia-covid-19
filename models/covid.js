'use strict';
const axios = require('axios');

const { formatTimestamp } = require('../helpers/date');

const server = 'https://data.covid19.go.id/public/api';

exports.getLatestData = async () => {
  const covid = await axios.get(`${server}/update.json`);

  const data = {
    tanggal: formatTimestamp(covid.data.update.penambahan.tanggal),
    ...covid.data.update.total,
    penambahan: {
      positif: covid.data.update.penambahan.jumlah_positif,
      dirawat: covid.data.update.penambahan.jumlah_dirawat,
      sembuh: covid.data.update.penambahan.jumlah_sembuh,
      meninggal: covid.data.update.penambahan.jumlah_meninggal
    }
  };

  return data;
};

exports.getDailyData = async () => {
  const covid = await axios.get(`${server}/update.json`);

  const data = covid.data.update.harian.map((currentData) => {
    return {
      tanggal: formatTimestamp(currentData.key),
      jumlah_positif: currentData.jumlah_positif_kum.value,
      jumlah_dirawat: currentData.jumlah_dirawat_kum.value,
      jumlah_sembuh: currentData.jumlah_sembuh_kum.value,
      jumlah_meninggal: currentData.jumlah_meninggal_kum.value,
      penambahan: {
        positif: currentData.jumlah_positif.value,
        dirawat: currentData.jumlah_dirawat.value,
        sembuh: currentData.jumlah_sembuh.value,
        meninggal: currentData.jumlah_meninggal.value
      }
    };
  });

  return data;
};

exports.getProvinceList = async () => {
  const covid = await axios.get(`${server}/prov.json`);

  const data = covid.data.list_data.map((province, index) => {
    return { id: index + 1, provinsi: province.key };
  });

  return data;
};

exports.getProvinceData = async (id) => {
  let covid = await axios.get(`${server}/prov.json`);

  const provinceData = covid.data.list_data.map((currentData) => {
    return {
      provinsi: currentData.key,
      jumlah_positif: currentData.jumlah_kasus,
      jumlah_dirawat: currentData.jumlah_dirawat,
      jumlah_sembuh: currentData.jumlah_sembuh,
      jumlah_meninggal: currentData.jumlah_meninggal,
      jenis_kelamin: {
        laki_laki: currentData.jenis_kelamin[0].doc_count,
        perempuan: currentData.jenis_kelamin[1].doc_count
      },
      kelompok_umur: {
        '0-5': currentData.kelompok_umur[0].doc_count,
        '6-18': currentData.kelompok_umur[1].doc_count,
        '19-30': currentData.kelompok_umur[2].doc_count,
        '31-45': currentData.kelompok_umur[3].doc_count,
        '46-59': currentData.kelompok_umur[4].doc_count,
        '>=60': currentData.kelompok_umur[5].doc_count
      }
    };
  });

  let data = {
    tanggal: formatTimestamp(covid.data.last_date),
    data: [...provinceData]
  };

  if (id) {
    let province = provinceData[id - 1].provinsi;
    province = province.replace(/ /g, '_');

    covid = await axios.get(`${server}/prov_detail_${province}.json`);

    let dailyData = covid.data.list_perkembangan;

    dailyData = dailyData.map((currentData) => {
      return {
        tanggal: formatTimestamp(currentData.tanggal),
        jumlah_positif: currentData.AKUMULASI_KASUS,
        jumlah_dirawat: currentData.AKUMULASI_DIRAWAT_OR_ISOLASI,
        jumlah_sembuh: currentData.AKUMULASI_SEMBUH,
        jumlah_meninggal: currentData.AKUMULASI_MENINGGAL,
        penambahan: {
          positif: currentData.KASUS,
          dirawat: currentData.DIRAWAT_OR_ISOLASI,
          sembuh: currentData.SEMBUH,
          meninggal: currentData.MENINGGAL
        }
      };
    });

    data = {
      ...data,
      data: data.data[id - 1],
      harian: {
        positif_dengan_tgl: covid.data.kasus_dengan_tgl,
        positif_tanpa_tgl: covid.data.kasus_tanpa_tgl,
        sembuh_dengan_tgl: covid.data.sembuh_dengan_tgl,
        sembuh_tanpa_tgl: covid.data.sembuh_tanpa_tgl,
        meninggal_dengan_tgl: covid.data.meninggal_dengan_tgl,
        meninggal_tanpa_tgl: covid.data.meninggal_tanpa_tgl,
        perkembangan: [...dailyData]
      }
    };
  }

  return data;
};
