var request = require('request');
var scrape = {
  url: 'http://www.benarea.com/',
  imgType: ['png', 'jpg', 'jpeg'],
  imgURLS: []
};
request(scrape.url, function (error, response, body) {
  scrapeImages(body);
});

function scrapeImages(rawData) {
  for (x in scrape.imgType) {
    var imgData = {
      index: 0,
      totalImgs: 0,
      fullURL: false,
      indexBack: 0
    }
    console.log(`finding: ${scrape.imgType[x]}`);
    imgData.index = rawData.indexOf(`.${scrape.imgType[x]}`);
    imgData.indexBack = imgData.index;
    if (imgData.index != -1) {
      while(!imgData.fullURL) {
        imgData.indexBack--;
        // find index of the first double quote, single quote, space, and left parenthesis
        imgData.fullURL = (rawData[imgData.indexBack] != '"' && rawData[imgData.indexBack] != ' ' && rawData[imgData.indexBack] != '(') ? false : true;
        console.log(rawData[imgData.indexBack]);
      }
      imgData.totalImgs++;
    }
    console.log(`Initial Index: ${imgData.index} Index Value: ${rawData[imgData.index]}\n\n`);
  }
}