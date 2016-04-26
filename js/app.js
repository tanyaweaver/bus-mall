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

var numbers = [];
function getRandomArray() {
  numbers = [];
  c = getRandomItem();
  console.log('c is' + c);
  numbers.push(c);
  console.log('numbers length ' + numbers.length);
  c = getRandomItem();
  console.log('c is' + c);
  while(c === numbers[0]){
    console.log('c=numbers[0]');
    c = getRandomItem();
    console.log('c is' + c);
  };

  numbers.push(c);
  console.log('numbers length ' + numbers.length);
  c = getRandomItem();
  console.log('c is' + c);
  while(c === numbers[0] || c === numbers[1]){
    console.log('c = numbers[0] and [1]');
    c = getRandomItem();
    console.log('c is' + c);
  }
  numbers.push(c);
  console.log('numbers length ' + numbers.length);
  return numbers;
};

var threeImageContainer = document.getElementById('three-image-container');

function displayThreeImages (event){
  getRandomArray();
  for (var i = 0; i < numbers.length; i++){
    var singleImage = document.createElement('div');
    singleImage.innerHTML = '<img src="' + allItemsArray[numbers[i]].itemPath + '">';
    singleImage.classList.add(allItemsArray[numbers[i]].itemName);
    allItemsArray[numbers[i]].timesShown++;
    threeImageContainer.appendChild(singleImage);
  }
};
displayThreeImages();

var clickCount = 0;
var poll = true;

function handleClick() {
  clickCount++;
  if (clickCount >= 6){
    console.log('done');
  }else{
    clickResponse(event);
  }
}

function clickResponse (event){
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

threeImageContainer.addEventListener('click', handleClick);
