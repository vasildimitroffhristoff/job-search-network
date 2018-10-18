const express = require('express');
const router = express.Router()
const passport = require('passport')

const Job = require('../../models/Jobs')
const User = require('../../models/User')
const Profile = require('../../models/Profile')

const validateJobInput = require('../../validation/job')

/* 
@route  :: GET /api/jobs
@desc   :: Get jobs
@access :: Public
*/
router.get('/', (req, res) => {
    const errors = {}

    Job.find({})
        .sort({date: -1})
        .then(jobs => {
            if (!jobs) {
                errors.nojobs = 'There are now jobs found.'
                return res.status(404).json(errors)
            }
            res.json(jobs)
        })
        .catch(err => res.status(404).json({nojobfound: 'No jobs found'}))
})

/* 
@route  :: POST /api/jobs/:id
@desc   :: Get single job by id
@access :: Public
*/
router.get('/:id', (req, res) => {
    Job.findById(req.params.id)
        .then(job => {
            res.json(job)
        })
        .catch(err => res.status(404).json({ nojobfound: 'No job found' }))
})

/* 
@route  :: POST /api/jobs
@desc   :: Create new job
@access :: Private
*/
router.post('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { errors, isValid } = validateJobInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newJob = new Job({
      user: req.user.id,
      company: req.body.company,
      position: req.body.position,
      salary: req.body.salary,
      location: req.body.location,
      description: req.body.description,
      tags: req.body.tags
    })

    newJob.save().then(job => res.json(job))
})

/* 
@route  :: POST /api/jobs/apply/:id
@desc   :: Apply for job
@access :: Private
*/
router.post('/apply/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'You must have a profile in order to apply for this job.'
                return res.status(404).json(errors)
            }
            Job.findById(req.params.id)
                .then(job => {
                    // check if user ID is in the applications array
                    if (job.applications.filter(application => application.user._id === req.user.id )) {
                        res.status(404).json({ caanotapply: "You have already applied for this job." })
                    }
                    // check if this job belongs to the user 
                    if(job.user.toString() === req.user.id) { 
                        res.status(404).json({ cannotapply: "You cannot apply for your own job post." })
                    }

                    job.applications.unshift({ user: req.user.id })
                    job.save().then(job => res.json(job.applications))
                })
                .catch(err => res.status(404).json({jobnotfound: "Job post not found"}))
        })
        .catch(err => res.status(404).json({ nopofile: 'No profile found' }))
})

/* 
@route  :: GET /api/jobs/applications
@desc   :: Get Job Applications
@access :: Private
*/
router.get('/applications/:userid', passport.authenticate('jwt', {session: false}), (req, res) => {
        Job.find({ user: req.user.id })
            .select('applications')
            .then(applications => {
                res.json(applications)
            })
            .catch(err => res.status(404).json({nojobfound: 'No jobs found'}))    

})


/* 
@route  :: DELETE /api/jobs/:id
@desc   :: Delete job
@access :: Private
*/
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
  User.findOne({_id: req.user.id })
     .then(user => {
        Job.findById(req.params.id)
            .then(job => {
                if(job.user.toString() !== req.user.id) {
                    return res.status(401).json({ notauthorize: 'User not authorized' }) 
                }

                job.remove().then(() => res.json({ success: true }))
            })
     })  
})


module.exports = router