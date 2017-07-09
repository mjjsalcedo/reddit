

function createXHR(method, url, cb){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", cb);
  oReq.open(method, url);
  oReq.send();
  return oReq;
}

function populatePage(){
  var data = JSON.parse(this.responseText);
  console.log("me!", data.data.children[0].data.title);
  var postsArray = data.data.children;
  }

var request = createXHR("GET", "https://www.reddit.com/r/lol.json", populatePage);



