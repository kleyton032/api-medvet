const router = require('express').Router();

router.use('/v1/api', require('./api/v1'));
router.get('/', (req, res, next) => res.send({ ok: true }));

router.use((err, req, res, next) => {
    if (err.name === "ValdiationError") {
        res.status(422).json({
            errors: Object.keys(err.errors).reduce(function (errors, key) {
                errors[key] = err.errors[key.message];
                return errors;
            }, {})
        })
    }
    return next(err)
})
module.exports = router