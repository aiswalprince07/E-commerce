const passport = require("passport");

exports.isAuth = (req, res, done)=>{
    return passport.authenticate('jwt');
};
  

exports.sanitizeUser = (user)=>{
    return {id:user.id, role: user.role} // ab jha jha user ho..usko iske andar se pass kar denge(specially wha jha authenticated se related kaam ho !!)
}

exports.cookieExtractor = function(req){
    let token = null;
    if(req && req.cookies){
        token = req.cookies['jwt'];
    }
    //TODO: this is temporary token for testing without cookie
    token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjZjNGFlNmQ4MjBlOTEyNjAzYmU5ZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg5Njk5NTAyfQ.L0po4MEe4w_TV7_foEoQNxF98aojj7ceNPdaLyxmykg';
    return token;
}