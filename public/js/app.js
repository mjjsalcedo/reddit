
const contentDiv = document.getElementById('content');
const containerDiv = document.getElementById('container');

function createXHR(method, url, cb){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", cb);
  oReq.open(method, url);
  oReq.send();
  return oReq;
}

var lolNavEl = document.getElementById('pug');
var corgiNavEl = document.getElementById('corgi');
var catNavEl = document.getElementById('cats');

lolNavEl.addEventListener('click', toggleContent);
corgiNavEl.addEventListener('click', toggleContent);
catNavEl.addEventListener('click', toggleContent);

var navValue = 'pug';
loadPage();

function toggleContent(e){
  navValue = e.target.id;
  lolNavEl.style = '#797a7d';
  corgiNavEl.style = '#797a7d';
  catNavEl.style = '#797a7d';

  e.target.style.color = '#f0592b';

  loadPage();
}

function loadPage(){
  var request = createXHR("GET", `https://www.reddit.com/r/${navValue}.json`, populatePage);

  function populatePage(){
    containerDiv.innerHTML = '';

    var allData = JSON.parse(this.responseText);
    console.log("me!", allData.data.children[0].data.title);
    var postsArray = allData.data.children;

    postsArray.forEach( (post, index, array) => {
      var postDivEl = document.createElement('div');
      postDivEl.className = 'posts';
      containerDiv.appendChild(postDivEl);

      var imageDivEl = document.createElement('div');
      imageDivEl.className = 'imageDivs';

      if (post.data.url){
        if (post.data.url.search('jpg') === -1 && post.data.url.search('jpeg') === -1 && post.data.url.search('png') === -1){
          imageDivEl.style.backgroundImage = 'url(' + 'assets/placeholder.jpg' + ')';
          console.log(index, 'need a place holder image');
        } else {
          imageDivEl.style.backgroundImage = 'url(' + post.data.url + ')';
        }
      } else {
        if (post.data.media.oembed.thumbnail_url){
          if(post.data.media.oembed.thumbnail_url.search('jpg') === -1 && post.data.media.oembed.thumbnail_url.search('jpeg') === -1 && post.data.media.oembed.thumbnail_url.search('png') === -1){
            imageDivEl.style.backgroundImage = 'url(' + '/assets/placeholder.jpg' + ')';
          } else {
            imageDivEl.style.backgroundImage = 'url(' + post.data.media.oembed.thumbnail_url + ')';
          }
        } else {
          imageDivEl.style.backgroundImage = 'url(' + '/assets/placeholder.jpg' + ')';
        }
      }

      postDivEl.appendChild(imageDivEl);

      var titleEl = document.createElement('h2');
      titleEl.innerHTML = post.data.title;
      titleEl.className = 'titles';
      postDivEl.appendChild(titleEl);

      var whenPosted = moment.unix((post.data.created_utc)).fromNow();
      var detailsEl = document.createElement('p');
      detailsEl.innerHTML = 'by  ' + post.data.author + '  &#8226  ' + whenPosted + '  &#8226  ' + post.data.ups + '  upcounts';
      detailsEl.className = 'details';
      postDivEl.appendChild(detailsEl);
    });
  }
}


