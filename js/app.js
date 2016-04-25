var allItemsArray = [];

function MallItem (name, path) {
  this.itemName = name;
  this.itemPath = path;
  this.timesShown = 0;
  this.timesVoted = 0;
  allItemsArray.push(this);
}

MallItem.prototype.itemShown = function() {
  //if(){this.timesShown++}
  return this.timesShown;
};

MallItem.prototype.itemVoted = function() {
  //if(){this.timesVoted++}
  return this.timesVoted;
};

MallItem.prototype.itemPopularity = function() {
  return (this.itemVoted() / this.itemShown());
};

var bag = new MallItem ('bag', '../images/bag.jpg');
