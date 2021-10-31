const router = require('express').Router()
const contact = require('./contact')

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'server connected'
    })
})

router.use(contact)

module.exports = router