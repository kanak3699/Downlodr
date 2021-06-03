
const youtubedl = require('youtube-dl-exec')

document.getElementById("body").addEventListener("click", myFunction);

function myFunction() {
  youtubedl('https://www.youtube.com/watch?v=wHZCYi1K664&t=1352s', {
  dumpSingleJson: true,
  noWarnings: true,
  noCallHome: true,
  noCheckCertificate: true,
  preferFreeFormats: true,
  youtubeSkipDashManifest: true,
  referer: 'https://www.youtube.com/watch?v=wHZCYi1K664&t=1352s'
})
  .then(output => console.log(output))
  
}
