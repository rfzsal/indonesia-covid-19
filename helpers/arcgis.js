'use strict';

const createURL = (serviceName, condition) => {
  const where = condition ? `(${condition}) AND (1=1)` : '1=1';

  const pathname = [
    'VS6HdKS0VfIhv8Ct',
    'arcgis',
    'rest',
    'services',
    serviceName,
    'FeatureServer',
    '0',
    'query'
  ].join('/');

  const query = new URLSearchParams({
    f: 'json',
    where,
    returnGeometry: 'false',
    spatialRel: 'esriSpatialRelIntersects',
    outFields: '*',
    resultOffset: '0',
    cacheHint: 'true'
  });

  const targetURL = new URL(pathname, 'https://services5.arcgis.com');
  targetURL.search = query.toString();

  return targetURL.toString();
};

const services = [
  // { name: 'Statistik_Perkembangan_COVID19_Indonesia', value: null },
  // { name: 'COVID19_Indonesia_per_Provinsi', value: null },
  { name: 'RS_Rujukan_Update_May_2020', value: "tipe='RS_RUJUKAN_NASIONAL'" }
];

exports.URL = {
  hospitals: createURL(services[0].name, services[0].value)
};
