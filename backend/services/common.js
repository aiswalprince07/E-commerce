exports.isAuth = (req, res, done)=>{
    if (req.user) {
      done();
    } else {
      res.send(401);
    }
};
  

exports.sanitizeUser = (user)=>{
    return {id:user.id, role: user.role} // ab jha jha user ho..usko iske andar se pass kar denge(specially wha jha authenticated se related kaam ho !!)
}