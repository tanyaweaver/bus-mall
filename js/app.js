var allItemsArray = [];
var pollResults = [];

function MallItem (name, path) {
  this.itemName = name;
  this.itemPath = path;
  this.timesShown = 0;
  this.timesVoted = 0;
  allItemsArray.push(this);
};

MallItem.prototype.itemPopularity = function() {
  return this.timesVoted / this.timesShown;
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
var j;
function displayThreeImages (event){
  for (var i = 0; i < 3; i++){
    var singleImage = document.createElement('div');
    j = getRandomItem();
    singleImage.innerHTML = '<img src="' + allItemsArray[j].itemPath + '">';
    singleImage.classList.add(allItemsArray[j].itemName);
    allItemsArray[j].timesShown++;
    threeImageContainer.appendChild(singleImage);
  }
};
displayThreeImages();

var clickCount = 0;
var poll = true;

function click25 (){
  clickCount++;
  console.log('click' + clickCount);
  if(clickCount >= 6){
    console.log('done');
  }else{
    handleClick(event);
  };
}

// function clickNumber (numberOfClicks){
//   clickCount++;
//   console.log('click' + clickCount);
//   if(clickCount >= numberOfClicks){
//     console.log('done');
//   }else{
//     handleClick(event);
//   };
// }

function handleClick (event){
  var response = event.target.parentNode;
  var item = response.classList[0];
  for (var i = 0; i < allItemsArray.length; i++){
    if (allItemsArray[i].itemName == item){
      allItemsArray[i].timesVoted++;
      console.log(item + ' voted ' + parseInt(allItemsArray[i].timesVoted));
    }
  }
  threeImageContainer.textContent = '';
  displayThreeImages();
};

threeImageContainer.addEventListener('click', click25);
