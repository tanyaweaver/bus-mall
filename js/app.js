var allItemsArray = [];

function MallItem (name, path) {
  this.itemName = name;
  this.itemPath = path;
  this.timesShown = 0;
  this.timesVoted = 0;
  this.popularity = 0;
  allItemsArray.push(this);
};

MallItem.prototype.itemShown = function() {
  //if(){this.timesShown++}
  return this.timesShown;
};

MallItem.prototype.itemVoted = function() {
  //if(){this.timesVoted++}
  return this.timesVoted;
};

MallItem.prototype.itemPopularity = function() {
  this.popularity = this.itemVoted() / this.itemShown();
  return this.popularity;
};

var bag = new MallItem ('bag', 'images/bag.jpg');
var banana = new MallItem ('banana', 'images/banana.jpg');
var bathroom = new MallItem ('bathroom', 'images/bathroom.jpg');
var boots = new MallItem ('boots', 'images/boots.jpg');
var breakfast = new MallItem ('breakfast', 'images/breakfast.jpg');
var bubblegum = new MallItem ('bubblegum', 'images/bubblegum.jpg');

function getRandomItem(){
  return Math.floor(Math.random() * allItemsArray.length);
};

var threeImageContainer = document.getElementById('three-image-container');
function displayThreeImages (){
  for (var i = 0; i < 3; i++){
    var singleImage = document.createElement('div');
    singleImage.innerHTML = '<img src="' + allItemsArray[getRandomItem()].itemPath + '">';
    threeImageContainer.appendChild(singleImage);
  }
}
