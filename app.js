var request = require('request');
var scrape = {
  url: 'http://www.benarea.com/',
  imgType: ['png', 'jpg', 'jpeg'],
  imgURL: [[],[],[]],
  siteLinks: []
};
request(scrape.url, function (error, response, body) {
  scrapeSiteLinks(body);
  scrapeSiteImages(body);
});

function scrapeSiteLinks(rawData) {

  console.log(`================= finding: links =================`);

  linkData = {
    search: '<a href=',
    fullLink: false
  };

  linkData.index = rawData.indexOf(linkData.search) + linkData.search.length;
  linkData.indexStart = linkData.index;
  while(rawData.indexOf(linkData.search) != -1) {
  //for (var i = 0; i < 30; i++) {

    while(!linkData.fullLink) {
      linkData.index++;
      linkData.fullLink = (rawData[linkData.index] != '"' && rawData[linkData.index] != ' ' && rawData[linkData.index] != "'") ? false : true;
    }

    linkData.fullLink = false;
    linkData.link = rawData.slice(linkData.indexStart + 1, linkData.index);
    rawData = rawData.replace(linkData.search + rawData[linkData.indexStart] + linkData.link + rawData[linkData.indexStart], '');
    linkData.index = rawData.indexOf(linkData.search) + linkData.search.length;
    linkData.indexStart = linkData.index;
    scrape.siteLinks[scrape.siteLinks.length] = linkData.link
  }

  
  console.log(scrape.siteLinks);

} // end scrapeSiteLinks()

function scrapeSiteImages(rawData) {

  console.log(`================= finding: images =================`);

  for (x in scrape.imgType) {
    var imgData = {
      index: 0,
      totalImgs: 0,
      fullURL: false,
      indexBack: 0,
      url: "",
    };

    imgData.index = rawData.indexOf(`.${scrape.imgType[x]}`);
    imgData.indexBack = imgData.index;
    
    while (imgData.index != -1) {

      while(!imgData.fullURL) {
        imgData.indexBack--;
        // find index of the first double quote, single quote, space, and left parenthesis
        imgData.fullURL = (rawData[imgData.indexBack] != '"' && rawData[imgData.indexBack] != ' ' && rawData[imgData.indexBack] != '(' && rawData[imgData.indexBack] != "'") ? false : true;
      } // end while

      imgData.fullURL = false;
      imgData.url = rawData.slice(imgData.indexBack + 1, imgData.index + scrape.imgType[x].length + 1);
      rawData = rawData.replace(imgData.url, '');

      if (imgData.url.length > (scrape.imgType[x].length + 1)) {
        if (imgData.url.indexOf(`http`) || imgData.url[0] === '/') { // check if local url
          imgData.url = scrape.url + imgData.url;
        }
        scrape.imgURL[x][scrape.imgURL[x].length] = imgData.url;
        imgData.totalImgs++;
      }

      imgData.index = rawData.indexOf(`.${scrape.imgType[x]}`);
      imgData.indexBack = imgData.index;

    } // end while
  } // end for
  console.log(scrape.imgURL);
} // end scrapeSiteImages()
