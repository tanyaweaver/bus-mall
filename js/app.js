var allItemsArray = [];
var namesArray = [];
var votes = [];
var shown = [];
var popularity = [];
var clickCount = 0;
var attempts = 5;
var attemptsLeftDisplay = document.getElementById('attempt-counter');
var votesToDate = document.getElementById('votes-to-day');
var threeImageContainer = document.getElementById('three-image-container');
var chartsContainer = document.getElementById('charts');
var threeButtonsContainer = document.getElementById('three-buttons-container');
var resultsButton = document.getElementById('results');
var continueButton = document.getElementById('continue');
var doneButton = document.getElementById('done');
var data1; //info on times voted
var data2; //info on times shown
var data3; //info on popularity

function MallItem (name, path) {
  this.itemName = name;
  this.itemPath = path;
  this.timesShown = 0;
  this.timesVoted = 0;
  allItemsArray.push(this);
  namesArray.push(this.itemName);
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

(function getDataFromLocalStorage () {
  if(localStorage.allItemsArrayData){
    console.log('localStorage for allItemsArrayData exist');
    allItemsArray = JSON.parse(localStorage.allItemsArrayData);
  }else{
    console.log('localStorage for allItemsArrayData doesn\'t exist');
  };
})();

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
  threeImageContainer.textContent = '';
  threeButtonsContainer.classList.add('invisible');
  attemptsLeftDisplay.textContent = (parseInt(attempts - clickCount) + ' attempt(s) left');

  var r = getRandomArray(); // 'r' is an array with three unique random numbers
  for (var i = 0; i < r.length; i++){
    var singleImage = document.createElement('div');
    singleImage.innerHTML = '<img src="' + allItemsArray[r[i]].itemPath + '">';
    singleImage.id = allItemsArray[r[i]].itemName;
    allItemsArray[r[i]].timesShown++;
    localStorage.setItem('allItemsArrayData', JSON.stringify(allItemsArray));
    threeImageContainer.appendChild(singleImage);
  }
};

displayThreeImages();

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
        label: 'Popularity, % (timesVoted / timesShown * 100)',
        backgroundColor: 'magenta',
        hoverBackgroundColor: 'green'
      }]
  };
}

function createCanvasElements() {
  var canvasIds = ['votes-chart', 'shown-chart', 'popularity-chart'];
  for (var i = 0; i < canvasIds.length; i++) {
    var canvas = document.createElement('canvas');
    canvas.id = canvasIds[i];
    canvas.width = 800;
    canvas.height = 200;
    chartsContainer.appendChild(canvas);
  };
};

function displayCharts(){
  var votesChart = document.getElementById('votes-chart').getContext('2d');
  var myBarChart1 = new Chart(votesChart, {
    type: 'bar',
    data: data1,
    options: {
      responsive: false
    }
  });

  var shownChart = document.getElementById('shown-chart').getContext('2d');
  var myBarChart2 = new Chart(shownChart, {
    type: 'bar',
    data: data2,
    options: {
      responsive: false
    }
  });

  var popularityChart = document.getElementById('popularity-chart').getContext('2d');
  var myBarChart3 = new Chart(popularityChart, {
    type: 'bar',
    data: data3,
    options: {
      responsive: false
    }
  });
}

//Below: functions to handle clicks
function handleClickOnImages() { //keeps track of clicking attempts
  if (clickCount === (attempts - 1)){
    lastClickOnImageResponse(event);
    threeButtonsContainer.classList.remove('invisible');
  }else if(clickCount >= attempts){
    threeButtonsContainer.classList.remove('invisible');
  }else{
    clickOnImageResponse(event);
  }
}

function lastClickOnImageResponse (event) { //for last click no new images displayed
  clickCount++;
  var response = event.target.parentNode.id;
  for (var i = 0; i < allItemsArray.length; i++){
    if (allItemsArray[i].itemName === response){
      allItemsArray[i].timesVoted++;
      localStorage.setItem('allItemsArrayData', JSON.stringify(allItemsArray));
      console.log(response + ' voted ' + parseInt(allItemsArray[i].timesVoted));
    }
  }
  attemptsLeftDisplay.textContent = (parseInt(attempts - clickCount) + ' attempt(s) left');
}

function clickOnImageResponse (event){ //tracking what was clicked, displaying 3 new pics after a click
  clickCount++;
  var response = event.target.parentNode.id;
  for (var i = 0; i < allItemsArray.length; i++){
    if (allItemsArray[i].itemName === response){
      allItemsArray[i].timesVoted++;
      localStorage.setItem('allItemsArrayData', JSON.stringify(allItemsArray));
      console.log(response + ' voted ' + parseInt(allItemsArray[i].timesVoted));
    }
  }
  displayThreeImages();
};

function generateArraysAndTotal(){
  chartsContainer.textContent = '';
  var votesTotal = 0;
  votes = [];
  shown = [];
  popularity = [];
  for(var i = 0; i < allItemsArray.length; i++){
    votes.push(allItemsArray[i].timesVoted);
    votesTotal += votes[i];
    shown.push(allItemsArray[i].timesShown);
    popularity.push(parseInt(allItemsArray[i].timesVoted * 100 / allItemsArray[i].timesShown));
  }
  votesToDate.textContent = ('Total votes: ' + votesTotal);
}

function handleClickOnResults() { //display results by clicking RESULTS button
  generateArraysAndTotal();
  createDataForCharts();
  createCanvasElements();
  displayCharts();
};

function handleClickMoreVoting() { //takes user back to voting by clicking CONTINUE button
  chartsContainer.textContent = '',
  votesToDate.textContent = '',
  attempts += 10;
  displayThreeImages();
};

function handleDoneButton(){
  document.getElementById('all-content').classList.add('invisible');
  alert('Thank you for participating in the poll! Refresh page to start over.');
}

threeImageContainer.addEventListener('click', handleClickOnImages);
resultsButton.addEventListener('click', handleClickOnResults);
continueButton.addEventListener('click', handleClickMoreVoting);
doneButton.addEventListener('click', handleDoneButton);
