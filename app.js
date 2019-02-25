var request = require('request');
var scrape = {
  url: 'https://advancedentalsmile.com/',
  imgType: ['png', 'jpg', 'jpeg'],
  imgURL: [[],[],[]],
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
      indexBack: 0,
      url: "",
    }
    console.log(`================= finding: ${scrape.imgType[x]} =================`);
    imgData.index = rawData.indexOf(`.${scrape.imgType[x]}`);
    imgData.indexBack = imgData.index;
    while (imgData.index != -1) {

      while(!imgData.fullURL) {
        imgData.indexBack--;
        // find index of the first double quote, single quote, space, and left parenthesis
        imgData.fullURL = (rawData[imgData.indexBack] != '"' && rawData[imgData.indexBack] != ' ' && rawData[imgData.indexBack] != '(') ? false : true;
      } // end while
      imgData.fullURL = false;

      //console.log(`Initial Index: ${imgData.index} Index Value: ${rawData[imgData.index]}`);
      //console.log(`Last Index: ${imgData.indexBack} Last Value: ${rawData[imgData.indexBack]}`);

      imgData.url = rawData.slice(imgData.indexBack + 1, imgData.index + scrape.imgType[x].length + 1);
      rawData = rawData.replace(imgData.url, '');
      if (imgData.url.length > (scrape.imgType[x].length + 1)) {
        console.log(`Real URL: ${imgData.url}`);
        imgData.totalImgs++;
      } else {
        console.log(`False Alarm: ${imgData.url}`);
      }

      imgData.index = rawData.indexOf(`.${scrape.imgType[x]}`);
      imgData.indexBack = imgData.index;

    } // end while

    console.log();
  } // end for
} // end scrapeImages()