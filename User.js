const Contact = require('./Contact.js')
const ContactInfo = require('./ContactInfo.js')
const Invalid = require('./Invalid.js')
const Unauthorized = require('./Unauthorized.js')
const NotFound = require('./NotFound.js')

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
    catch(error){
       //console.log (error)
       return error
    }
}
    getAllUsers(){
       try{
        if(!this.isAdmin){
            throw new Unauthorized( "User must be Admin!")
        }
        return User.allUser
       }
       catch(error){
        return error
     }
    }
    getUserByID(userID){
       try{
        if(!this.isAdmin){
            throw new Unauthorized("User is not an Admin.")
        }
        for (let index = 0; index < User.allUser.length; index++) {
            if(userID == User.allUser[index].ID){
                return User.allUser[index]
            }
        }
        return "User doesnt exist!"
       }
        catch(error){
            return error
        }
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
       try{
        if(!this.isAdmin){
            throw new Unauthorized("User must be Admin!")
        }
        if(typeof parameter != 'string' ){
            throw new Invalid("Invalid parameter, enter a string.")
        }
        let [indexOfUser, userExists] = User.findUser(userID)
        if(!userExists){
            return "Cannot find User"
        }
        switch (parameter) {
            case 'fullName':
                if(typeof newValue != 'string' ){
                    throw new Invalid("Invalid name, enter a string.")
                }
                User.allUser[indexOfUser].fullName = newValue
                return User.allUser[indexOfUser]
            case 'gender':
                if(typeof newValue != 'string' ){
                    throw new Invalid("Invalid gender type, enter string.")
                }
                User.allUser[indexOfUser].gender = newValue
                return User.allUser[indexOfUser]    
            case 'country':
                if(typeof newValue != 'string' ){
                    throw new Invalid("Invalid country type, enter string.")
                }
                User.allUser[indexOfUser].country = newValue
                return User.allUser[indexOfUser]
            default:
                throw new NotFound("Parametr not found!")
        }
       }
       catch (error){
        return error
       }
    }
    deleteUser(userID){
       try{
        if(!this.isAdmin){
            throw new Unauthorized("User must be Admin!")
        }
        let [indexOfUser, userExists] = User.findUser(userID)
        if(!userExists){
            throw new NotFound("User not found! ")
        }
        User.allUser.splice(indexOfUser, 1)
       }
       catch(error){
        return error
       }
    }
    static newAdmin(fullName, gender, country){
        return new User(fullName, gender, country, true)
    }
    createContact(contactFullName){
       try{
        if(this.isAdmin){
            throw new Unauthorized("User must not be admin!")
        }
        if(typeof contactFullName != 'string'){
            throw new Invalid("Invalid type, must be a string")
        }
        let contact = new Contact(contactFullName)
        this.contacts.push(contact)
        return contact
       }
       catch(error){
        return error
       }
    }
    getContact(){
        try {
            if(this.isAdmin){
                throw new Unauthorized("User must not be admin!")
            }
            return this.contacts
        } catch (error) {
            return error
        }
    }
    getContactById(contactId){
       try {
        if(this.isAdmin){
            throw new Unauthorized("User must not be admin!")
        }
        if(typeof contactId != "number"){
           throw new Invalid("Invalid ID, must be number.")
        }
        let indexOfContact = this.findContact(contactId)
       
        return this.contacts[indexOfContact]
       } catch (error) {
            return error
       }
    }
    findContact(contactID){
        try {
            for (let index = 0; index < this.contacts.length; index++) {
                if(contactID == this.contacts[index].ID){
                    return index
                }
            }
            throw new NotFound("Contact not found.")
        } catch (error) {
            throw error
        }
    }
    updateContact(contactID, updatedName){
        try {
            if(this.isAdmin){
                throw new Unauthorized("User must not be admin!")
            }
            if(typeof contactID != "number"){
                throw new Invalid("Invalid ID, must be number.")
            }
             if(typeof updatedName != "string"){
                throw new Invalid("Invalid name, must be string.")
            }
            let indexOfContact = this.findContact(contactID)
            this.contacts[indexOfContact].contactFullName = updatedName
            return this.contacts[indexOfContact]
        } 
        catch (error) {
         return error
        }
    }
    deleteContact(contactID){
       try {
        if(this.isAdmin){
            throw new Unauthorized("User must not be admin!")
        }
        if(typeof contactID != "number"){
            throw new Invalid("Invalid ID, must be number.")
        }
        let indexOfContact = this.findContact(contactID)
        this.contacts.splice(indexOfContact, 1)
       } 
       catch (error) {
        return error
       }

    }
    newContactInfo(contactId, typeOfContact, valueOfContact) {
        try{
            if(this.isAdmin){
                throw new Unauthorized("User must not be admin!")
            }
            if (typeof contactId != "number") {
                throw new Invalid("Invalid ID type must be a number.")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts[indexOfContact].newContactInfo(typeOfContact, valueOfContact)
            return this.contacts[indexOfContact]
        }
        catch(error){
            return error
        }
    }

    getAllContactInfo(contactId) {
       try {
        if(this.isAdmin){
            throw new Unauthorized("User must not be admin!")
        }
        if (typeof contactId != "number") {
            throw new Invalid("Invalid ID type must be a number.")
        }
        let indexOfContact = this.findContact(contactId)
        this.contacts[indexOfContact].getAllContactInfo()
        return this.contacts[indexOfContact]
       } 
       catch (error) {
        return error
       }
    }
    getContactInfoById(contactId, contactInfoId){
        try {
            if(this.isAdmin){
                throw new Unauthorized("User must not be admin!")
            }
            if (typeof contactId != "number") {
                throw new Invalid("Invalid ID type must be a number.")
            }
            let indexOfContact = this.findContact(contactId)
           
            return this.contacts[indexOfContact].getContactInfoById(contactInfoId)
        } 
        catch (error) {
            return error
        }
    }
    updateContactInfo(contactId, contactInfoId, newValue) {
        try {
            if(this.isAdmin){
                throw new Unauthorized("User must not be admin!")
            }
            if (typeof contactId != "number") {
                throw new Invalid("Invalid ID type must be a number.")
            }
            let indexOfContact = this.findContact(contactId)
            
            this.contacts[indexOfContact].updateContactInfo(contactInfoId, newValue)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    deleteContactInfo(contactID, contactInfoID){
        if(this.isAdmin){
            throw new Unauthorized("User must not be admin!")
        }
        if (typeof contactID != "number") {
            throw new Invalid("Invalid ID type, must be a number.")
        }
        if (typeof contactInfoID != "number") {
            throw new Invalid("Invalid ID type, must be a number.")
        }
        let indexOfContact = this.findContact(contactID)
    
        this.contacts[indexOfContact].deleteContactInfo(contactInfoID)

        return this.contacts[indexOfContact]
    }
}

let a = User.newAdmin("Admin", "M", "IN")
let user1 = a.newUser("Yoozer","M","IN")

//let user2 = user1.newUser("Yoozer2","F","UK")
//console.log(user2)
let user3 = a.newUser("Yoozer3","T","USA")
//console.log(user1)
//console.log(user1.getAllUsers())
// console.log(a.getUserByID(2))
user1.createContact('Amar')
user1.createContact('Akbar')
user1.createContact('Anthony')
// console.log(user1.getContact())
// console.log(user1.updateContact(1, 'Bruhh'))
// console.log(a.updateUser(2,'country','Ghana'))
// console.log(a.deleteUser(2))
// console.log(a.getAllUsers())
// console.log(user1.getContact())
// console.log(user1.deleteContact(1))
// console.log(user1.getContact())
user1.newContactInfo(0,'Mail', 'abc@gmail.com')
user1.newContactInfo(0,'Mob', '988675674')
console.log(user1.getAllContactInfo(0))
//console.log(user1.getAllContactInfo(1))
user1.updateContactInfo(0, 0, 'xyz@mail')
//console.log(user1)
console.log(user1.getAllContactInfo(0))

//console.log(user1.deleteContactInfo(0,1))
console.log("-----------------")
console.log(user1.getContactInfoById(0,1))