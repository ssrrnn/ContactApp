
const ContactInfo = require("./ContactInfo")

class Contact {
    static ID = 0
    constructor(contactFullName) {
        this.ID = Contact.ID++
        this.contactFullName = contactFullName
        this.contactInfo = []
    }

    newContactInfo(typeOfContact, valueOfContact) {
        if (typeof typeOfContact != "string" || typeof valueOfContact != "string") { return "Invalid Input Type in ContactInfo" }
        let contactInfoObj = new ContactInfo(typeOfContact, valueOfContact)
        this.contactInfo.push(contactInfoObj)
        return contactInfoObj
    }

    findContactInfo(contactInfoID) {
        for (let index = 0; index < this.contactInfo.length; index++) {
            if (contactInfoID == this.contactInfo[index].ID) {
                return [index, true]
            } 
        }return [-1, false]
    }
    getAllContactInfo(){
        return this.contactInfo
    }
    updateContactInfo(contactInfoId, newValue) {
        if (typeof contactInfoId != "number") {
            return "invalid user Id"
        }
        let [indexOfContactInfo, isContactInfoExist] = this.findContactInfo(contactInfoId)
        if (!isContactInfoExist) {
            console.log('notfound')
            return "contact info does not exist"
        }
        //console.log(this.contactInfo)
        this.contactInfo[indexOfContactInfo].updateContactInfo(newValue)
        return this.contactInfo[indexOfContactInfo]
    }

    deleteContactInfo(contactInfoID){
        if (typeof contactInfoID != "number") {return "Invalid contactInfoID input"}
        let [indexOfContactInfo, isContactInfoExist] = this.findContactInfo(contactInfoID)
        if (isContactInfoExist) {return "Contact Info not found"}
        this.contactInfo.splice(indexOfContactInfo,1)
    }
    getContactInfoById(contactInfoId){
        try {
            if (typeof contactInfoId != "number") {
                throw new ValidationError("contact info ID invalid input")
            }
            let [indexOfContactInfo, contactInfoexists] = this.findContactInfo(contactInfoId)
            console.log(indexOfContactInfo)
            return this.contactInfo[indexOfContactInfo]
        } catch (error) {
            throw error
        }
    }

}

module.exports = Contact