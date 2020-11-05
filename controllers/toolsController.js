const router = require('express').Router();
const Tool = require('../models/tool');

router.get('/new', (req, res) => {
    res.render('tools/new.ejs');
});

// INDEX 
router.get('/', (req, res) => {
    Tool.find({}, (error, allTools) => {
        res.render('tools/index.ejs', { tools: allTools });
    });
});

// CREATE Route
router.post('/', (req, res) => {
    if (req.body.recommended) {
        req.body.recommended = true;
    }else {
        req.body.recommended = false;
    }   

    Tool.create(req.body, (error, createdTool) => {
        res.redirect('/tools');
    })
})


// SHOW Route
router.get('/:id', (req, res) => {
    Tool.findById(req.params.id, (error, gotTool) => {
        res.render('tools/show.ejs', 
        { tool: gotTool});
    });
});


  // DELETE
  router.delete('/:id', (req, res) => {
    Tool.findByIdAndRemove(req.params.id, (error) => {
    res.redirect('/tools');
    });
  });

// UPDATE Route - PUT
router.put('/:id', (req, res) => {
    if (req.body.recommended) {
        req.body.recommended = true;
    }else {
        req.body.recommended = false;
    }

    Tool.findByIdAndUpdate(req.params.id, req.body, (error) => {
        res.redirect(`/tools/${req.params.id}`); 

    } )

  })


    // EDIT log
    router.get('/:id/edit', (req, res) => {
        console.log('tools edit')
        Tool.findById(req.params.id, (error, tool) => {
          res.render('tools/edit.ejs', {
            tool: tool,
          })
        });
      });

module.exports = router;