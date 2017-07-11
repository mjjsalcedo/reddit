
const contentDiv = document.getElementById('content');
const containerDiv = document.getElementById('container');

function createXHR(method, url, cb){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", cb);
  oReq.open(method, url);
  oReq.send();
  return oReq;
}

var request = createXHR("GET", "https://www.reddit.com/r/pugs.json", populatePage);

function populatePage(){
  var allData = JSON.parse(this.responseText);
  console.log("me!", allData.data.children[0].data.title);
  var postsArray = allData.data.children;

  postsArray.forEach( (post, index, array) => {
    var postDivEl = document.createElement('div');
    postDivEl.className = 'posts';
    containerDiv.appendChild(postDivEl);

    // changing img element to div element with image-background property
    // var imageEl = document.createElement('img');
    // imageEl.className = 'images';
    // imageEl.alt = 'hello';
    // if (!post.data.url){
    //   imageEl.src = post.data.media.oembed.thumbnail_url;
    // } else {
    //   if (!post.data.url)
    //   {
    //     imageEl.src = '/assets/placeholder.png';
    //   } else {
    //     imageEl.src = post.data.url+'.jpg';
    //   }
    // }
    var imageDivEl = document.createElement('div');
    imageDivEl.className = 'imageDivs';

    // var imgSrc1 = post.data.url;
    // var imgSrc2 = post.data.media.oembed.thumbnail_url;

    if (post.data.url){
      if (post.data.url.search('jpg') === -1 && post.data.url.search('jpeg') === -1 && post.data.url.search('png') === -1){
        imageDivEl.style.backgroundImage = 'url(' + 'assets/placeholder.jpg' + ')';
        console.log(index, 'need a place holder image');
      } else {
        imageDivEl.style.backgroundImage = 'url(' + post.data.url + ')';
      }
    } else {
      if (post.data.media.oembed.thumbnail_url){
      console.log('yes to imgSrc 2');
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

    var whenPosted = moment(new Date(post.data.created * 1000)).fromNow();
    var detailsEl = document.createElement('p');
    detailsEl.innerHTML = 'by ' + post.data.author + ' &#8226 ' + whenPosted + ' &#8226 ' + post.data.ups + ' upcounts';
    detailsEl.className = 'details';
    postDivEl.appendChild(detailsEl);
  });
}


