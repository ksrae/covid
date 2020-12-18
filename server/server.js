const express = require('express');
const cors = require('cors');
const req = require('request');
const request = require('request-promise-native');
const convert = require('xml-js');
const mongodb = require('mongodb');
const wsocket = require('ws');
const path = require('path');

const app = express();
app.use(cors());

const PORT = 3000;
const DIST_FOLDER = path.join(process.cwd(), 'dist/browser');
const MongoClient = mongodb.MongoClient;
// const DBURL = 'mongodb://localhost:27017';
const DBURL = '// mongodb+srv://ksrae:rlatjdfo78@cluster0.llyra.mongodb.net/covid?retryWrites=true&w=majority';


app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// ws
var wss = new wsocket.Server({port: 3100});
wss.on('connection', (ws, req) => {
  ws.on('message', async (message) => {
    // const client = await MongoClient.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });
    // const dictionaryDB = client.db('covid').collection('covid19State');

    // let rightWord = await dictionaryDB.find({word: searchWord}).toArray();
    // dictionaryDB.updateOne({code: rightWord[0]['code']}, {$set: {count: Number(rightWord[0]['count']) + 1}});
    // dictionaryDB.insertOne(Object.assign({}, response, {count: 1}));

    // ws.send(JSON.stringify({
    //   type: message.type,
    //   data: await dictionary(message.data, message.lang),
    //   time: new Date().getTime() - begintime
    // }));
  });
});

var currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
var weekago = new Date(new Date().setDate(new Date().getDate() - 7));
var weekagoDate = `${weekago.getFullYear()}${weekago.getMonth()}${weekago.getDate()}`;

app.get('/', async (req, res) => {
  res.send('Hello World!')
  // res.sendFile(__dirname + '/app/index.html');

  let result = await getInfectionState();
  console.log(result);
})

app.get('/infection', async (req,res) => {
  let result = await getInfectionState();
  console.log(result);
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})


async function getInfectionState() {
  let parsing = JSON.parse(await requestInfectionState());
  return parsing.response.body.items.item;
}

async function requestInfectionState() {
  let url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';
  let key = '%2FzkNb3D6w94BMs3KnnM3CLOF90bkH3I20qljTtayvPsyEJ8isQjsz8BqEzPv%2Bg8ah8c73Yscdqjr7JxGzDYwrQ%3D%3D'; 
  let queryParams = `?${encodeURIComponent('ServiceKey')}=${key}&${encodeURIComponent('pageNo')}=${encodeURIComponent('1')}&${encodeURIComponent('numOfRows')}=${encodeURIComponent('10')}&${encodeURIComponent('startCreateDt')}=${encodeURIComponent(weekagoDate)}&${encodeURIComponent('endCreateDt')}=${encodeURIComponent(currentDate)}`;
  
  let options = {
    url: `${url}${queryParams}`,
    method: 'GET',
  };

  let result = await request(options, (error, response, body) => body);

  return convert.xml2json(result, {compact: true});
}

