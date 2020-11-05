const router = require('express').Router();
const Box = require('../models/box');
const Tool = require('../models/tool');


router.get('/new', async (req, res) => {
  let allTools = await Tool.find({}).sort({name: 1});
  // let allTools = await Tool.find({});
//   res.send(allTools)
  res.render('boxes/new.ejs', { tools: allTools });
});


// INDEX
router.get('/', async (req, res) => {
    let boxes = await Box.find().populate('tools').sort({name: 1});
    // let boxes = await Box.find().populate('tools');
    console.log(`found and populated all boxes: ${boxes}`);
    res.render('boxes/index.ejs', { boxes: boxes });
  });

router.post('/', async (req, res) => {
      //  let box = await Box.create(req.body, (error, createdBox) => {
        try{
          let box = await Box.create(req.body);
          console.log(`ID value is ${box.id}`)
          res.redirect(`/boxes/${box.id}`);
      }
      catch(error){
          console.log(error)
          res.send('<a href="/boxes/new">ToolBox not created - check - REQUIRED * - fields and Try Again</a>')
      }
      // console.log(`ID value is ${box.id}`)
      // res.redirect(`/boxes/${box.id}`);
    });

// router.post('/', async (req, res) => {
//      let box = await Box.create(req.body);
//     //  let box = await Box.create(req.body, (error, createdBox) => {
//     //     if (error) {
//     //         console.log(error)
//     //         res.send('<a href="/boxes/new">ToolBox not created - check required fields and Try Again</a>')
//     //       }
//     // });
//       console.log(`ID value is ${box.id}`)
//       res.redirect(`/boxes/${box.id}`);
//     });


//SHOW Route
router.get('/:id', async (req, res) => {
    console.log(req.body)
  let tools = await Tool.find();
  let box = await Box.findById(req.params.id).populate('tools');
  res.render('boxes/show.ejs', { box, tools });
});


  // DELETE
  router.delete('/:id', async (req, res) => {
      console.log(req.params.id)
    //   console.log('hitting delete')
    //   res.redirect('boxes/')
    //  let boxAwait = await Box.findByIdAndRemove(req.params.id, (error) => {
     Box.findByIdAndRemove(req.params.id, (error) => {
      res.redirect('/boxes');
    // console.log(error)
    });
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


module.exports = router;