const delay = (req, res, next) => {
    const skipPaths = ['/api/login', '/api/create-user']; // bỏ qua những route này

    if (skipPaths.includes(req.path)) {
        return next();
    }

    const delayTime = 1000;
    setTimeout(() => {
        if(req.headers.authorization) {
           const token = req.headers.authorization.split(' ')[1];
           console.log('token', token);
        }
        next();
    }, delayTime);
};

export default delay;
