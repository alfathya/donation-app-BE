'use strict'

// const { RequestResult } = require("jsforce")

let Contact = {
    getAll: async (req, res, next) => {
        const SF = req.SF
        const data = await SF.sobject("Contact").find().select(["Name"])
        res.status(200).json({data})
    },
    create: async (req, res, next ) => {
        try {
            const SF = req.SF
            const {donation, email, fullname, nric, phone_number, address} = req.body

            //checking email
            const emailCheck = await SF.sobject("Contact").findOne({Email: email})
                                        .select(["Email", "LastName", "Phone", "NRIC__c", "MailingCity"])

            if(!emailCheck){
                //contact created
                const dataContact = {
                    Email: email,
                    LastName: fullname,
                    MailingCity: address,
                    NRIC__c: nric,
                    Phone: phone_number
                }
                let newContact = await SF.sobject('Contact').create(dataContact)
                if(!newContact.success){
                    return next({
                        code: 500,
                        message: "error create contact"
                    })
                }
            }
                //get contact data
                let contact = await SF.sobject("Contact").findOne({Email: email}).select(["LastName", "Id"])

                //donation create
                let date = new Date().toISOString()
                let donationData = await SF.sobject("Donation__c").create({
                    Donor_Name__c: contact.Id,
                    Donation_Amount__c: donation,
                    Donation_Datetime__c: date
                })
                if(!donationData.success){
                    return next({
                        code: 500,
                        message: "internal error"
                    })
                }
                res.status(200).json({
                    message: "Donation Success", donation
                })
            
        } catch (error) {
            return next({code: 500, message: error.message})
        }
    }
}

module.exports = Contact