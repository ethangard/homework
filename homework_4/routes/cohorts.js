const express = require('express');
const database = require('../db/client');
const router = express.Router();

router.route('/').get((req, res) => {
  database('cohorts')
    //.orderBy('timestamp', 'desc')
    .then((data) => {
      res.render('cohorts/index', { data: data });
    });
});

router.route('/new').get((req, res) => {
  res.render('cohorts/newCohort');
});

router.route('/:id').get((req, res) => {
  database('cohorts')
    .where('id', req.params.id)
    .first()
    .then((data) => {
      if (!data) {
        res.send('No Cohort Found');
      }
      console.log(data);
      res.render('cohorts/cohort', { data: data });
    });
});
/* Render New Post Template */

router.get('/new', (req, res) => {
  res.render('cohorts/newCohort', { data: false });
});

/* Create a new single post */
router.post('/new', (req, res) => {
  database('cohorts')
    .insert({
      logoUrl: req.body.logoUrl,
      name: req.body.name,
      members: req.body.members,
    })
    .returning('*')
    .then((data) => {
      console.log(`This is the data...`);
      console.log(data);
      const val = data[0];
      res.redirect(`/cohorts/${val.id}`);
    });
});

/* Render Edit Post Template */
router.get('/:id/edit', (req, res) => {
  database('cohorts')
    .where('id', req.params.id)
    .first()
    .then((data) => {
      res.render('cohorts/editCohort', { data: data });
    });
});

/* Update Cohort */
router.patch('/:id', (req, res) => {
  database('cohorts')
    .where('id', req.params.id)
    .update({
      logoUrl: req.body.logoUrl,
      name: req.body.name,
      members: req.body.members,
    })
    .then(() => {
      console.log(req.body);
      console.log(req.body.logoUrl);
      console.log(req.body.name);
      console.log(req.body.members);
      res.redirect(`/cohorts/${req.params.id}`);
    });
});

/* Destory a Cohort */
router.delete('/:id', (req, res) => {
  database('cohorts')
    .where('id', req.params.id)
    .del()
    .then(() => {
      res.redirect('/cohorts');
    });
});

module.exports = router;
