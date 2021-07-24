var express = require('express');
var router = express.Router();
const { getAudioDurationInSeconds } = require('get-audio-duration');
const fs = require('fs');
const Audio = require('../models/audio');
const { extractQuestion } = require('../helper/questionParseer');

const isStart = (txt) => txt.indexOf('╔───────────╗') > 0;
const isEnd = (txt) => txt.indexOf('╚───────────╝') > 0;

/* GET home page. */
router.get('/', function (req, res) {
  fs.readdirSync('./audios').forEach(async (file) => {
    getAudioDurationInSeconds('./audios/' + file).then((duration) => {
      console.log({ file, duration });
      const audio = new Audio({
        name: file,
        duration
      });
      audio.save();
    });
  })
  res.send('ok');
});


/* GET text parsed. */
router.get('/parse-chat', function (req, res) {
  const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('_chat.txt')
  });
  let questionArr = [];
  let question = '';
  lineReader.on('line', function (line) {
    if (line.indexOf('<Media omitted>') > 0) {
      return;
    }
    if (isStart(line)) {
      questionArr.push(extractQuestion(question));
      question = '';
    }
    question += line;
  });
  lineReader.on('close', () => {
    res.json(questionArr.splice(1,questionArr.length));
  });
});


module.exports = router;
