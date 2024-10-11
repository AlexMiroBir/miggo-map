function errorHandler(err, req, res, next) {
    if (err) {
        res.status(500).json({error: err.message || err.toString()});
    }
}

export default errorHandler;
