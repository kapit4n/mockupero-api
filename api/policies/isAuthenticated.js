module.exports = function(req, res, next) {
	if(req.isSocket) {
        return next();
    } 
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/login');
    }
};
