const router = require('express').Router();
// Used for counts on Homepage
const Box = require('../models/box');


// HOME Page
router.get('/', async (req, res) => {
  let allBoxes = await Box.countDocuments({}) 
    console.log(`number of toolboxes is ${allBoxes}`)
    res.render('home/home.ejs', { allBoxes: allBoxes });
});


// Buling a ToolBox Page
router.get('/building', async (req, res) => {
  res.render('home/building.ejs');
});

// Sharing Information Page
router.get('/sharing', async (req, res) => {
  res.render('home/sharing.ejs');
});



module.exports = router;