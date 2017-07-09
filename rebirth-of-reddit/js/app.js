
const contentDiv = document.getElementById('content');

function createXHR(method, url, cb){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", cb);
  oReq.open(method, url);
  oReq.send();
  return oReq;
}

var request = createXHR("GET", "https://www.reddit.com/r/lol.json", populatePage);

function populatePage(){
  var allData = JSON.parse(this.responseText);
  console.log("me!", allData.data.children[0].data.title);
  var postsArray = allData.data.children;

  postsArray.forEach( (post) => {
    var postDivEl = document.createElement('div');
    contentDiv.appendChild(postDivEl);

    var imageEl = document.createElement('img');
    if (!post.data.url){
      imageEl.src = post.data.media.oembed.thumbnail_url;
    } else {
      imageEl.src = post.data.url;
    }

    console.log('image source' , imageEl.src);
    postDivEl.appendChild(imageEl);

    var titleEl = document.createElement('h2');
    titleEl.innerHTML = post.data.title;
    postDivEl.appendChild(titleEl);

    var detailsEl = document.createElement('p');
    detailsEl.innerHTML = 'by ' + post.data.author + ' * ' + post.data.created + ' * upcounts: ' + post.data.ups;
    postDivEl.appendChild(detailsEl);
  });
}


