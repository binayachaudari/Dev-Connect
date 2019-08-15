const router = require('express').Router();
const { check } = require('express-validator');
const validation = require('../../middleware/validation');

const authenticateToken = require('../../middleware/tokenAuthenticate');
const { myProfile, updateProfile, deleteProfile } = require('../../controller/profile/myProfile');
const { addExperience, editExperience, deleteExperience } = require('../../controller/profile/experience');
const { addEducation, editEducation, deleteEducation } = require('../../controller/profile/education');
const githubProfile = require('../../controller/profile/github');

/**
 * @route   POST /api/profile/
 * @desc    Create or update user profile
 * @access  Private
 */
router
  .route('/')
  .get((req, res, next) => {
    res.redirect('/api/profile/me');
  })
  .post(authenticateToken, [
    check('status', 'Status is Required').not().isEmpty(),
    check('skills', 'Skills is Required').not().isEmpty()
  ], validation, updateProfile);


/**
 * @route   GET, DELETE /api/profile/me
 * @desc    Get Current users profile
 *          Delete current users Profile, userData, posts
 * @access  Private 
 */
router
  .route('/me')
  .get(authenticateToken, myProfile)
  .delete(authenticateToken, deleteProfile);


/**
* @route   POST /api/profile/experience
* @desc    Add experience on profile
* @access  Private 
*/
router
  .route('/experience')
  .post(authenticateToken, [
    check('title', 'Title is Required').not().isEmpty(),
    check('company', 'Company is Required').not().isEmpty(),
    check('location', 'Location is Required').not().isEmpty(),
    check('from', 'From is Required').not().isEmpty(),
  ], validation, addExperience);


/**
* @route   PUT, DELETE /api/profile/experience/:exp_id
* @desc    Edit experience
*          Delete experience from profile
* @access  Private 
*/
router.route('/experience/:exp_id')
  .put(authenticateToken, editExperience)
  .delete(authenticateToken, deleteExperience);


/**
* @route   POST /api/profile/education
* @desc    Add education on profile
* @access  Private 
*/
router
  .route('/education')
  .post(authenticateToken, [
    check('school', 'School is Required').not().isEmpty(),
    check('degree', 'Degree is Required').not().isEmpty(),
    check('field_of_study', 'Field Of Study is Required').not().isEmpty(),
    check('from', 'From is Required').not().isEmpty(),
  ], validation, addEducation);


/**
* @route   PUT, DELETE /api/profile/education/:edu_id
* @desc    Edit education
*          Delete education from profile
* @access  Private 
*/
router.route('/education/:edu_id')
  .put(authenticateToken, editEducation)
  .delete(authenticateToken, deleteEducation);



/**
* @route   GET /api/profile/github/:username
* @desc    Get github repo
* @access  Public 
*/
router.route('/github/:username')
  .get(githubProfile)

module.exports = router;