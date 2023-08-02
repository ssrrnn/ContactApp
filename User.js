const Contact = require('./Contact.js')
const ContactInfo = require('./ContactInfo.js')
const BaseError = require('./BaseError.js')
const Unauthorized = require('./Unauthorized.js')
class User{
    static ID = 0
    static allUser =[]
    constructor(fullName, gender, country, isAdmin){
        this.ID = User.ID++
        this.fullName = fullName
        this.gender = gender
        this.country = country
        this.isAdmin = isAdmin
        this.contacts = []
    }
    newUser(fullName, gender, country){
       try{
        if(!this.isAdmin){
            //return "Unauthorised User."
            throw new Unauthorized("Unauthorized user Error!")
        }
        let userObj = new User(fullName, gender, country, false)
           
        User.allUser.push(userObj)
        return userObj
        //return new User(fullName, false, gender, country)
    }
    catch(e){
       console.log (e)
       return e
    }
}
    getAllUsers(){
        if(!this.isAdmin){
            return "Unauthorised User."
        }
        return User.allUser
    }
    getUserByID(userID){
        if(!this.isAdmin){
            return "Unauthorised User."
        }
        for (let index = 0; index < User.allUser.length; index++) {
            if(userID == User.allUser[index].ID){
                return User.allUser[index]
            }
        }
        return "User doesnt exist!"
        
    }
    static findUser(userID){
        for (let index = 0; index < User.allUser.length; index++) {
            if(userID == User.allUser[index].ID){
                return [index, true]
            }
        }
            return [-1, false]
    }
    updateUser(userID, parameter, newValue){
        if(!this.isAdmin){
            return "Unauthorised User."
        }
        if(typeof parameter != 'string' ){
            return "Invalid Parameter type"
        }
        let [indexOfUser, userExists] = User.findUser(userID)
        if(!userExists){
            return "Cannot find User"
        }
        switch (parameter) {
            case 'fullName':
                if(typeof newValue != 'string' ){
                    return "Invalid Name Input"
                }
                User.allUser[indexOfUser].fullName = newValue
                return User.allUser[indexOfUser]
            case 'gender':
                if(typeof newValue != 'string' ){
                    return "Invalid Gender Input"
                }
                User.allUser[indexOfUser].gender = newValue
                return User.allUser[indexOfUser]    
            case 'country':
                if(typeof newValue != 'string' ){
                    return "Invalid Country Input"
                }
                User.allUser[indexOfUser].country = newValue
                return User.allUser[indexOfUser]
            default:
                return "Invalid Parameter!"
        }
    }
    deleteUser(userID){
        if(!this.isAdmin){
            return "Unauthorised User."
        }
        let [indexOfUser, userExists] = User.findUser(userID)
        if(!userExists){
            return "User not found."
        }
        User.allUser.splice(indexOfUser, 1)

    }
    static newAdmin(fullName, gender, country){
        return new User(fullName, gender, country, true)
    }
    createContact(contactFullName){
        let contact = new Contact(contactFullName)
        this.contacts.push(contact)
        return contact
    }
    getContact(){
        return this.contacts
    }
    getContactById(contactId){
        if(typeof contactId != "number"){
            return "Invalid number"
        }
        let [indexOfContact, isContactExist] = this.findContact(contactId)
        if(!isContactExist){
            return "User does not exist"
        }
        return this.contacts[indexOfContact]
    }
    findContact(contactID){
        for (let index = 0; index < this.contacts.length; index++) {
            if(contactID == this.contacts[index].ID){
                return [index, true]
            }
        }
        return [-1, false]
    }
    updateContact(contactID, updatedName){
        let[indexOfContact, contactExists] = this.findContact(contactID)
        if(!contactExists){
            return "Contact doesnt exist!"
        }
        this.contacts[indexOfContact].contactFullName = updatedName
        return this.contacts[indexOfContact]
    }
    deleteContact(contactID){
        let [indexOfContact, userExists] = this.findContact(contactID)
        if(!userExists){
            return "Contact not found."
        }
        this.contacts.splice(indexOfContact, 1)

    }
    newContactInfo(contactId, typeOfContact, valueOfContact) {
        if (typeof contactId != "number") {
            return "Invalid user ID"
        }
        let [indexOfContact, isContactExist] = this.findContact(contactId)
        if (!isContactExist) {
            return "contact does not exist"
        }
        // let contactInfoObj = new ContactInfo(typeOfContact, valueOfContact)
        // this.contactInfo.push(contactInfoObj)
        // return contactInfoObj
        this.contacts[indexOfContact].newContactInfo(typeOfContact, valueOfContact)
        return this.contacts[indexOfContact]
    }

    // findContactInfo(contactInfoID) {
    //     for (let index = 0; index < this.contactInfo.length; index++) {
    //         if (contactInfoID == this.contactInfo[index].ID) {
    //             return [index, true]
    //         } return [-1, false]

    //     }
    // }
    getAllContactInfo(contactId) {
        if (typeof contactId != "number") {
            return "Invalid user ID"
        }
        let [indexOfContact, isContactExist] = this.findContact(contactId)
        if (!isContactExist) {
            return "contact does not exist"
        }
        this.contacts[indexOfContact].getAllContactInfo()
        return this.contacts[indexOfContact]
    }
    getContactInfoById(contactId, contactInfoId){
        if(typeof contactId != "number"){
            return "Invalid number"
        }
        let [indexOfContact, isContactExist] = this.findContact(contactId)
        if(!isContactExist){
            return "User does not exist"
        }
        return this.contacts[indexOfContact].getContactInfoById(contactInfoId)
    }
    updateContactInfo(contactId, contactInfoId, newValue) {
        if (typeof contactId != "number") {
            return "invalid user Id"
        }
        let [indexOfContact, isContactExist] = this.findContact(contactId)
        if (!isContactExist) {
            return "contact does not exist"
        }
        this.contacts[indexOfContact].updateContactInfo(contactInfoId, newValue)
        return this.contacts[indexOfContact]
    }

    deleteContactInfo(contactID, contactInfoID){
        if (typeof contactInfoID != "number") {return "Invalid contactInfoID input"}
        let [indexOfContact, isContactExist] = this.findContact(contactID)
        if (!isContactExist) {return "Contact not found"}
        return this.contacts[indexOfContact]
    }
}

let a = User.newAdmin("Admin", "M", "IN")
let user1 = a.newUser("Yoozer","M","IN")

//let user2 = user1.newUser("Yoozer2","F","UK")
let user3 = a.newUser("Yoozer3","T","USA")
//console.log(user1)
// console.log(a.getAllUsers())
// console.log(a.getUserByID(2))
user1.createContact('Amar')
user1.createContact('Akbar')
user1.createContact('Anthony')
// console.log(user1.getContact())
// console.log(user1.updateContact(1, 'Bruhh'))
// console.log(a.updateUser(3,'country','Ghana'))
// console.log(a.deleteUser(2))
// console.log(a.getAllUsers())
// console.log(user1.getContact())
// console.log(user1.deleteContact(1))
// console.log(user1.getContact())
user1.newContactInfo(0,'Mail', 'abc@gmail.com')
console.log(user1.getAllContactInfo(0))
user1.updateContactInfo(0,'Mail','aaaaaaa')
//console.log(user1)
console.log(user1.getAllContactInfo(0))