'use strict'

const ContactRouter = require('express').Router()
const salesforce = require('../middlewares/salesforce')
const ContactController = require('../controllers/contact')

ContactRouter.get('/contact',salesforce,ContactController.getAll);
ContactRouter.post('/contact', salesforce, ContactController.create);

module.exports = ContactRouter