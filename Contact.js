
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
            } return [-1, false]

        }
    }
    getAllContactInfo(){
        return this.contactInfo
    }

    updateContactInfo(contactInfoID, parameter, newValue) {
        if (typeof contactInfoID != "number") { return "Invalid UserID input" }
        let [indexOfContactInfo, isContactInfoExist] = this.findContactInfo(contactInfoID)
        if (!isContactInfoExist) { return "Contact Info not found" }
        switch (parameter) {
            case "typeOfContact":
                if (typeof newValue !== "string") { return "Please input valid input for new type" }
                Contact.contactInfo[indexOfContactInfo].typeOfContact = newValue
                return Contact.contactInfo[indexOfContactInfo]

            case "valueOfContact":
                if (typeof newValue !== "string") { return "Please input valid input for new value" }
                Contact.contactInfo[indexOfContactInfo].valueOfContact = newValue
                return Contact.contactInfo[indexOfContactInfo]
            default: return "invalid parameter"
        }   
    }

    deleteContactInfo(contactInfoID){
        if (typeof contactInfoID != "number") {return "Invalid contactInfoID input"}
        let [indexOfContactInfo, isContactInfoExist] = Contact.findContactInfo(contactInfoID)
        if (isContactInfoExist) {return "Contact Info not found"}
        Contact.contactInfo.splice(indexOfContactInfo,1)
    }

}


module.exports = Contact