class ContactInfo{
    static ID = 0
    constructor(typeOfContact, valueOfContact){
        this.ID = ContactInfo.ID++ 
        this.typeOfContact = typeOfContact
        this.valueOfContact = valueOfContact
    }
    updateContactInfo(newValue) {
        return this.valueOfContact = newValue
    }
}
module.exports = ContactInfo