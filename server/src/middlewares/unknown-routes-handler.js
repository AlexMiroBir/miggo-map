function unknownRoutesHandler(req, res, next) {
    res.status(404).json({error: `Url not found: ${req.baseUrl}`});
}

export default unknownRoutesHandler;
