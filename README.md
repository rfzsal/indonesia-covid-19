# Indonesia Covid-19

This static server provide the latest Indonesia Covid-19 data sourced from [covid19.go.id](https://covid19.go.id).

### Usage

[Node.js](https://nodejs.org/) is required to run this project.

rename `.env.example` to `.env` then paste the following line.

```sh
myDomain=https://your-domain.com
```

Install all dependencies then run the server to collect Covid-19 data from [covid19.go.id](https://covid19.go.id).

```sh
$ npm install
$ npm run build
```

All data will be saved inside `public` folder.

### Data

Currently available data.

| Data          | Description         | Example                                            |
| ------------- | ------------------- | -------------------------------------------------- |
| latest        | Latest data         | https://rfzsal.github.io/pirus-data/api/latest     |
| daily         | Daily data          | https://rfzsal.github.io/pirus-data/api/daily      |
| province      | Province data       | https://rfzsal.github.io/pirus-data/api/province   |
| province_name | Daily province data | https://rfzsal.github.io/pirus-data/api/jawa_barat |
| hospitals     | Hospital data       | https://rfzsal.github.io/pirus-data/api/hospitals  |
| news          | Covid 19 news       | https://rfzsal.github.io/pirus-data/api/news       |
