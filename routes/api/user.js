const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
//@ route         POST
//@ description   register User
//@ access        public
router.post('/', [
  check("name", 'Name is Needed').not().isEmpty(),
  check('email', "include valid email").isEmail(),
  check('password', 'Try hard').isLength({min: 6})
],async (req, res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try{
    let user = await User.findOne({ email });
    // check if user exists
    if(user){
      return res.status(500).json({errors: [ {msg: 'User already Exists'} ]})
    }
    // Encrypt password
    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload ={
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtToken'),
      {expiresIn: 360000},
      (err, token) =>{
          if(err) throw err;
          res.json({ token });
      }
    );

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// login
router.post('/login',  [
    check('email','Enter a valid Email').isEmail(),
    check('password', 'password is required').exists()
  ],
  async (req, res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try{
    let user = await User.findOne( {email} );
    if(user)

  }catch (err) {

  }
})


module.exports = router;
