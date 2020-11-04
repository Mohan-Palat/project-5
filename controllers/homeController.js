const router = require('express').Router();
// No models being used yet for home page information so kept these commented
// const Box = require('../models/box');
// const Tool = require('../models/tool');

// HOME Page
router.get('/', async (req, res) => {
  res.render('home/home.ejs');
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