var allItemsArray = [];
var namesArray = [];
var votes = [];
var shown = [];
var popularity = [];
var clickCount = 0;
var counts = 4;
var threeImageContainer = document.getElementById('three-image-container');
var charts = document.getElementById('charts');
var data1;
var data2;
var data3;

function MallItem (name, path) {
  this.itemName = name;
  this.itemPath = path;
  this.timesShown = 0;
  this.timesVoted = 0;
  allItemsArray.push(this);
  namesArray.push(this.itemName);
  // popularity.push(this.itemPopularity());
  // votes.push(this.timesVoted);
  // shown.push(this.timesShown);
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

function getRandomArray(){ //making sure all three images are different
  var k = 0;
  var numbers = [];
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
  return numbers; //returns an array with three unique random numbers
};

function displayThreeImages (event){
  var r = getRandomArray(); // 'r' is an array with three unique random numbers
  for (var i = 0; i < r.length; i++){
    var singleImage = document.createElement('div');
    singleImage.innerHTML = '<img src="' + allItemsArray[r[i]].itemPath + '">';
    singleImage.id = allItemsArray[r[i]].itemName;
    allItemsArray[r[i]].timesShown++; //tracking what was shown
    threeImageContainer.appendChild(singleImage);
  }
};
displayThreeImages();

function handleClickMoreVoting() {
  console.log('clickCount ' + clickCount);
  charts.textContent = '',
  results.textContent = '',
  votes = [];
  popularity = [];
  shown = [];
  counts = counts + 10;
}

var results = document.getElementById('results');
var divResults = document.createElement('div');
var resultsButton = document.createElement('button');
var continueButton = document.createElement('button');

function handleClickOnImages() {
  if (clickCount > counts){
    resultsButton.textContent = ('Show Results');
    continueButton.textContent = ('Continue to vote');
    divResults.appendChild(resultsButton);
    divResults.appendChild(continueButton);
    results.appendChild(divResults);
  }else{
    clickResponse(event);
  }
}

function createDataForCharts() {
  data1 = {
    labels: namesArray,
    datasets: [
      {
        data: votes,   // The actual data
        label: 'Number of votes',
        backgroundColor: 'red',
        hoverBackgroundColor: 'purple'
      }]
  };

  data2 = {
    labels: namesArray,
    datasets: [
      {
        data: shown,
        label: 'Times shown',
        backgroundColor: 'green',
        hoverBackgroundColor: 'blue'
      }]
  };

  data3 = {
    labels: namesArray,
    datasets: [
      {
        data: popularity,
        label: 'Popularity (timesVoted/timesShown)',
        backgroundColor: 'magenta',
        hoverBackgroundColor: 'green'
      }]
  };
}

function createCanvasElements() {
  var canvas1 = document.createElement('canvas');
  canvas1.id = 'votes-chart';
  canvas1.width = 400;
  canvas1.height = 300;
  charts.appendChild(canvas1);

  var canvas2 = document.createElement('canvas');
  canvas2.id = 'shown-chart';
  canvas2.width = 400;
  canvas2.height = 300;
  charts.appendChild(canvas2);

  var canvas3 = document.createElement('canvas');
  canvas3.id = 'popularity-chart';
  canvas3.width = 400;
  canvas3.height = 300;
  charts.appendChild(canvas3);
};

function handleClickOnResults() {  //display results by clicking RESULTS button
  for(var i = 0; i < allItemsArray.length; i++){
    popularity.push(allItemsArray[i].itemPopularity());
    votes.push(allItemsArray[i].timesVoted);
    shown.push(allItemsArray[i].timesShown);
  }

  createDataForCharts();
  createCanvasElements();

  //voted Chart
  var votesChart = document.getElementById('votes-chart').getContext('2d');
  var myBarChart1 = new Chart(votesChart, {
    type: 'bar',
    data: data1,
    options: {
      responsive: false
    }
  });

  //shown Chart
  var shownChart = document.getElementById('shown-chart').getContext('2d');
  var myBarChart2 = new Chart(shownChart, {
    type: 'bar',
    data: data2,
    options: {
      responsive: false
    }
  });

  //popularity Chart
  var popularityChart = document.getElementById('popularity-chart').getContext('2d');
  var myBarChart3 = new Chart(popularityChart, {
    type: 'bar',
    data: data3,
    options: {
      responsive: false
    }
  });
}

function clickResponse (event){ //tracking what was clicked, displaying 3 new pics after a click
  clickCount++;
  console.log('used clicks ' + clickCount);
  var response = event.target.parentNode.id;
  for (var i = 0; i < allItemsArray.length; i++){
    if (allItemsArray[i].itemName === response){
      allItemsArray[i].timesVoted++;
      console.log(response + ' voted ' + parseInt(allItemsArray[i].timesVoted));
    }
  }
  threeImageContainer.textContent = '';
  displayThreeImages();
};

threeImageContainer.addEventListener('click', handleClickOnImages);
resultsButton.addEventListener('click', handleClickOnResults);
continueButton.addEventListener('click', handleClickMoreVoting);
