var allItemsArray = [];
var namesArray = [];
var pollResults = [];

function MallItem (name, path) {
  this.itemName = name;
  this.itemPath = path;
  this.timesShown = 0;
  this.timesVoted = 0;
  allItemsArray.push(this);
  namesArray.push(this.itemName);
};

MallItem.prototype.itemPopularity = function() {
  return parseFloat((this.timesVoted / this.timesShown).toFixed(1));
};

var bag = new MallItem ('bag', 'images/bag.jpg');
var banana = new MallItem ('banana', 'images/banana.jpg');
var bathroom = new MallItem ('bathroom', 'images/bathroom.jpg');
var boots = new MallItem ('boots', 'images/boots.jpg');
var breakfast = new MallItem ('breakfast', 'images/breakfast.jpg');
var bubblegum = new MallItem ('bubblegum', 'images/bubblegum.jpg');
var chair = new MallItem ('chair', 'images/chair.jpg');
var cthulhu = new MallItem ('cthulhu', 'images/cthulhu.jpg');
var dogDuck = new MallItem ('dogDuck', 'images/dog-duck.jpg');
var dragon = new MallItem ('dragon', 'images/dragon.jpg');
var pen = new MallItem ('pen', 'images/pen.jpg');
var petSweep = new MallItem ('petSweep', 'images/pet-sweep.jpg');
var scissors = new MallItem ('scissors', 'images/scissors.jpg');
var shark = new MallItem ('shark', 'images/shark.jpg');
var sweep = new MallItem ('sweep', 'images/sweep.png');
var tauntaun = new MallItem ('tauntaun', 'images/tauntaun.jpg');
var unicorn = new MallItem ('unicorn', 'images/unicorn.jpg');
var usb = new MallItem ('usb', 'images/usb.gif');
var waterCan = new MallItem ('water-can', 'images/water-can.jpg');
var wineGlass = new MallItem ('wine-glass', 'images/wine-glass.jpg');

function getRandomItem(){
  return Math.floor(Math.random() * allItemsArray.length);
};

var numbers = [];

function getRandomArray(){ //making sure all three images are different
  var k = 0;
  numbers = [];
  while(k < 3){
    c = getRandomItem();
    if(k === 1){
      while(c === numbers[0]){
        // console.log('c = numbers[0]');
        c = getRandomItem();
      };
    }else if(k === 2){
      while(c === numbers[0] || c === numbers[1]){
        // console.log('c = numbers[0] or numbers[1]');
        c = getRandomItem();
      }
    }
    numbers.push(c);
    k++;
  };
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

var results = document.getElementById('results');
var divResults = document.createElement('div');
var resultsButton = document.createElement('button');
var continueButton = document.createElement('button');

// function handleClick10() {
//   clickCount++;
//   if (clickCount > 35){
//     divResults.appendChild('resultsButton');
//     resultsButton.textContent = ('divResults');
//     results.appendChild(divResults);
//   }else{
//     clickResponse(event);
//   }
// }

function handleClick25() {
  clickCount++;
  if (clickCount > 25){
    resultsButton.textContent = ('Show Results (item popularity)');
    continueButton.textContent = ('Continue to vote');
    divResults.appendChild(resultsButton);
    divResults.appendChild(continueButton);
    results.appendChild(divResults);
    for(var i = 0; i < allItemsArray.length; i++){
      pollResults.push(allItemsArray[i].itemPopularity());
    }
  }else{
    clickResponse(event);
  }
}

function handleResults() {
  for(var i = 0; i < namesArray.length; i++){
    var divResultsArray = document.createElement('div');
    divResultsArray.textContent = (namesArray[i] + ': ' + pollResults[i]);
    results.appendChild(divResultsArray);
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

threeImageContainer.addEventListener('click', handleClick25);
resultsButton.addEventListener('click', handleResults);
// continueButton.addEventListener('click', handleClick10);
