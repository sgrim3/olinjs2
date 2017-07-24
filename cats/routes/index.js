var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');
var nameList = ["Austin", "Dakota", "Sue", "Philipa"];
var colorList = ["white", "black", "orange", "yellow","tan", "brown", "patchy", "stripey", "the cutest"];


//function that constructs and returns cat object
function Cat(name, age, color){
  var cat = {
    name: name,
    age: age,
    color: color
  };
  return cat;
}

//renders homepage
router.home = function (req, res, next) {
  res.render("home");
};


//get all cat names
router.listCats = function(req, res, next){
  
  //get all cats from the database
  var cats = db.getAll();

  //sort cats by age using sort function
  var sortedCats = cats.sort(function (a,b) {return a.age - b.age;});

  //if there cats, display them
  if (cats.length === 0) {
    res.render("noCats");
  }
  else {
  res.render("catList",{"cats": sortedCats});
  } 
};

//get all cats that are a particular color
router.colors = function (req, res, next){
  var cats = db.getAll();
  var colorCats = [];

  //create list of all cats that have the right color
  cats.forEach(function(cat) {
    if (req.params.color===cat.color) {
      colorCats.push(cat);
    }
  })

  //if there are cats of the right color, display those cats
  if (colorCats.length === 0) {
    res.render("noCats", {"color": req.params.color});
  }
  else {
  res.render("catList", {"color": req.params.color, "cats":colorCats});
  } 
};

//delete the oldest cat
router.farm = function (req, res, next) {
  var cats= db.getAll();
  var oldestCat = Cat("none", 0, "none")

  //search through list for oldest cat
  cats.forEach (function(cat) {
    if (cat.age> oldestCat.age) {
      oldestCat = cat;
    }
  })

  //if there are cats, delete the oldest. If there aren't cats, tell the user that
  if (cats.length === 0) {
    res.render("noCats");
  }
  else {
  db.remove(cats.indexOf(oldestCat));
  res.render("farm", {"cat": oldestCat});
  } 

};

// create new cat 
router.newCat = function(req, res, next) {
  //generating random name, age and color
  var nameIndex = Math.floor(Math.random()*nameList.length);
  var colorsIndex = Math.floor(Math.random()*colorList.length);
  var ageGen = Math.floor((Math.random()*25) + 1);

  //create cat and add it to the database
  var cat = Cat(nameList[nameIndex], ageGen, colorList[colorsIndex])
  db.add(cat);
  res.render("newCat",{"cat": cat});
};

module.exports = router;