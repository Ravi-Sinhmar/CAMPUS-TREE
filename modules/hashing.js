const bcrypt = require("bcrypt")
const saltRounds = 10;

module.exports=hashing=((password)=>{
    bcrypt
    .genSalt(saltRounds)
    .then(salt => {
      console.log('Salt: ', salt)
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      console.log('Hash: ', hash);
      return hash;
    })
    .catch(err => console.error(err.message))
});