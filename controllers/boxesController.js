const router = require('express').Router();
const Box = require('../models/box');
const Tool = require('../models/tool');


router.get('/new', async (req, res) => {
  let allTools = await Tool.find({});
//   res.send(allTools)
  res.render('boxes/new.ejs', { tools: allTools });
});
//SHOW Route
router.get('/:id', async (req, res) => {
    console.log(req.body)
  let tools = await Tool.find();
  let box = await Box.findById(req.params.id).populate('tools');
  res.render('boxes/show.ejs', { box, tools });
});


router.put('/:boxId/tools', async (req, res) => {
    console.log('in Put route')
    console.log(req.body)
    let foundBox = await Box.findByIdAndUpdate(
      req.params.boxId,
      {
        $push: {
      tools: req.body.tools,
        },
      },
      { new: true, upsert: true }
    );
    console.log(foundBox);
    res.redirect(`/boxes/${foundBox.id}`);
  });

//  router.put('/:boxId/tools', async (req, res) => {
//      console.log('in PUT')
//    console.log(req.body)
// //    console.log(`PUT route data - ${req.body}`)
// });


// router.put('/:boxId/tools', async (req, res) => {
//   console.log(`PUT route data - ${req.body}`)
//   let foundBox = await Box.findByIdAndUpdate(
//     req.params.boxId,
//     {
//       $push: {
// 	tools: req.body.tools,
//       },
//     },
//     { new: true, upsert: true }
//   );
//   console.log(foundBox);
//   res.redirect(`/boxes/${foundBox.id}`);
// });


// INDEX
router.get('/', async (req, res) => {
    let boxes = await Box.find().populate('tools');
    console.log(`found and populated all boxes: ${boxes}`);
    res.render('boxes/index.ejs', { boxes: boxes });
  });

router.post('/', async (req, res) => {
//   res.send(req.body)
  let box = await Box.create(req.body);
  res.redirect(`/boxes/${box.id}`);
});

module.exports = router;