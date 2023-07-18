const passport = require("passport");

exports.isAuth = (req, res, done)=>{
    return passport.authenticate('jwt');
};
  

exports.sanitizeUser = (user)=>{
    return {id:user.id, role: user.role} // ab jha jha user ho..usko iske andar se pass kar denge(specially wha jha authenticated se related kaam ho !!)
}