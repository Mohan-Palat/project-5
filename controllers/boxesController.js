const router = require('express').Router();
const Box = require('../models/box');
const Tool = require('../models/tool');


router.get('/new', async (req, res) => {
  let allTools = await Tool.find({});
//   res.send(allTools)
  res.render('boxes/new.ejs', { tools: allTools });
});

router.get('/:id', async (req, res) => {
  // console.log('in Movies SHOW route')
  let tools = await Tool.find();
  let box = await Box.findById(req.params.id).populate('tools');
  res.render('tools/show.ejs', { box, tools });
});

// router.put('/:movieId/actors', async (req, res) => {
//   console.log('in Put route')
//   let foundMovie = await Movie.findByIdAndUpdate(
//     req.params.movieId,
//     {
//       $push: {
// 	actors: req.body.actors,
//       },
//     },
//     { new: true, upsert: true }
//   );
//   console.log(foundMovie);
//   res.redirect(`/movies/${foundMovie.id}`);
// });


// SEND ALL ACTORS FOR ALL MOVIES
router.get('/', async (req, res) => {
  // console.log('in GET 36 route')
    let boxes = await Box.find().populate('tools');
  
    console.log(`found and populated all boxes: ${boxes}`);
    res.render('boxes/index.ejs', { boxes: boxes });
  });

router.post('/', async (req, res) => {
  res.send(req.body)
  let box = await Box.create(req.body);
  res.redirect(`/boxes/${box.id}`);
});

module.exports = router;