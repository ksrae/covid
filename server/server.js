const express = require('express');
const cors = require('cors');
const req = require('request');
const request = require('request-promise-native');
const convert = require('xml-js');
const mongodb = require('mongodb');
// const wsocket = require('ws');
const path = require('path');

const app = express();
app.use(cors());

const PORT = 3000;
const DIST_FOLDER = path.join(process.cwd(), 'dist/browser');
const MongoClient = mongodb.MongoClient;
// const DBURL = 'mongodb://localhost:27017';
const DBURL = '// mongodb+srv://ksrae:rlatjdfo78@cluster0.llyra.mongodb.net/covid?retryWrites=true&w=majority';
const OpenApiKey = '%2FzkNb3D6w94BMs3KnnM3CLOF90bkH3I20qljTtayvPsyEJ8isQjsz8BqEzPv%2Bg8ah8c73Yscdqjr7JxGzDYwrQ%3D%3D'; 
const OpenApiUrl = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/';

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// ws
// var wss = new wsocket.Server({port: 3100});
// wss.on('connection', (ws, req) => {
//   ws.on('message', async (message) => {
//     // const client = await MongoClient.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });
//     // const dictionaryDB = client.db('covid').collection('covid19State');

//     // let rightWord = await dictionaryDB.find({word: searchWord}).toArray();
//     // dictionaryDB.updateOne({code: rightWord[0]['code']}, {$set: {count: Number(rightWord[0]['count']) + 1}});
//     // dictionaryDB.insertOne(Object.assign({}, response, {count: 1}));

//     // ws.send(JSON.stringify({
//     //   type: message.type,
//     //   data: await dictionary(message.data, message.lang),
//     //   time: new Date().getTime() - begintime
//     // }));
//   });
// });

// var currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
// var weekago = new Date(new Date().setDate(new Date().getDate() - 7));
// var previousDate = `${weekago.getFullYear()}${weekago.getMonth()}${weekago.getDate()}`;

app.get('/', async (req, res) => {
  res.send('Hello World!')
  // res.sendFile(__dirname + '/app/index.html');

  // let result = await getInfectionState();
  // console.log(result);
})

app.get('/todayInfection', async (req,res) => {
  // 앞으로 db를 바라봐야 합니다.
  if(!req.query)
    res.json({});

  let previousDate = req.query.previousDate ? req.query.previousDate : undefined;
  let currentDate = req.query.currentDate ? req.query.currentDate : undefined;
  if(currentDate && previousDate && currentDate >= previousDate) {
    let result = await getTodayInfectionState(previousDate, currentDate);
    //console.log(result);
    return res.json(result);
  }  
})

app.get('/nationalInfection', async (req,res) => {
  if(!req.query)
    res.json({});

  let previousDate = req.query.previousDate ? req.query.previousDate : undefined;
  let currentDate = req.query.currentDate ? req.query.currentDate : undefined;
  if(currentDate && previousDate && currentDate >= previousDate) {
    let result = await getNationalInfectionState(previousDate, currentDate);
    //console.log(result);
    return res.json(result);
  }
})

app.get('/cityInfection', async (req,res) => {
  if(!req.query)
    res.json({});

  let previousDate = req.query.previousDate ? req.query.previousDate : undefined;
  let currentDate = req.query.currentDate ? req.query.currentDate : undefined;
  if(currentDate && previousDate && currentDate >= previousDate) {
    let result = await getCityInfectionState(previousDate, currentDate);
    //console.log(result);
    return res.json(result);
  }
})

app.get('/genInfection', async (req,res) => {
  if(!req.query)
  res.json({});

  let previousDate = req.query.previousDate ? req.query.previousDate : undefined;
  let currentDate = req.query.currentDate ? req.query.currentDate : undefined;
  if(currentDate && previousDate && currentDate >= previousDate) {
    let result = await getGenAgeInfectionState(previousDate, currentDate);
    //console.log(result);
    return res.json(result);
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);

  // setTimeout(() => {
  //   let infectionState = await getInfectionState();
  //   let nationalInfectionState = await getNationalInfectionState();
  //   let cityInfectionState = await getCityInfectionState();
  //   let genageInfectionState = await getGenAgeInfectionState();

  // }, 1000 * 60 * 60);
})

// request는 1시간에 1번씩 하게 하고 
// 이걸 db에 쌓고
// 값은 db에서 가져감
// 만약 db에 값이 없으면 request 강제 실행
async function getTodayInfectionState(previousDate, currentDate) {
  let parsing = JSON.parse(await requestInfectionState(previousDate, currentDate));
  let items = getTextValue(parsing.response.body.items.item);
  // console.log(items);
  return items;
}
async function getNationalInfectionState(previousDate, currentDate) {
  let parsing = JSON.parse(await requestNationalInfectionState(previousDate, currentDate));
  let items = getTextValue(parsing.response.body.items.item);
  return items;
}
async function getCityInfectionState(previousDate, currentDate) {
  let parsing = JSON.parse(await requestCityInfectionState(previousDate, currentDate));
  let items = getTextValue(parsing.response.body.items.item);
  return items;
}
async function getGenAgeInfectionState(previousDate, currentDate) {
  let parsing = JSON.parse(await requestGenAgeInfectionState(previousDate, currentDate));
  let items = getTextValue(parsing.response.body.items.item);
  return items;
}

async function requestInfectionState(previousDate, currentDate) {
  return await requestOpenApi('getCovid19InfStateJson', previousDate, currentDate);
}
async function requestNationalInfectionState(previousDate, currentDate) {
  return await requestOpenApi('getCovid19NatInfStateJson', previousDate, currentDate);
}
async function requestCityInfectionState(previousDate, currentDate) {
  return await requestOpenApi('getCovid19SidoInfStateJson', previousDate, currentDate);
}
async function requestGenAgeInfectionState(previousDate, currentDate) {
  return await requestOpenApi('getCovid19GenAgeCaseInfJson', previousDate, currentDate);
}

async function requestOpenApi(url, previousDate, currentDate) {
  let queryParams = `?${encodeURIComponent('ServiceKey')}=${OpenApiKey}&${encodeURIComponent('pageNo')}=${encodeURIComponent('1')}&${encodeURIComponent('numOfRows')}=${encodeURIComponent('1')}&${encodeURIComponent('startCreateDt')}=${encodeURIComponent(previousDate)}&${encodeURIComponent('endCreateDt')}=${encodeURIComponent(currentDate)}`;  
  let options = {
    url: `${OpenApiUrl}${url}${queryParams}`,
    method: 'GET',
  };

  let result = await request(options, (error, response, body) => body);

  return convert.xml2json(result, {compact: true});
}
function getTextValue(items) {
  if(items && items.length) {
    for(let data of items) {
      for(let item in data) {
        data[item] = data[item]['_text'];
      }
    }
  }
  return items;
}



