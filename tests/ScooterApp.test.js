const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

describe('Testing the ScooterApp class', () => {

    user = new User('John', 'pass', 22)

    scooter = new Scooter ('Bronx', user)

    scooterApp = new ScooterApp()

    test('Checks if the ScooterApp has a list of stations', () => {
        expect(Object.keys(scooterApp.stations)).toEqual(['Manhattan', 'Brooklynn', 'Queens', 'Bronx', 'StatenIsland'])
    })

    test('Checks if the registered user list is empty', () => {
        expect(scooterApp.registeredUsers).toEqual({})
    })

    //Method tests

    //register function
    test('Checks if a user can register given correct credidentials', () => {
        const logSpy = jest.spyOn(console, 'log')
        scooterApp.register(user)
        expect(logSpy).toHaveBeenCalledWith('User has been registered')
        expect(scooterApp.registeredUsers[user.username]).toEqual({password: 'pass', age: 22, loggedIn: false, accountChange: 0})
    })

    test('Checks if a user that alredy exists cannot register as a new user', () => {
        const logSpy = jest.spyOn(console, 'log')
        scooterApp.register(user)
        scooterApp.register(user)
        expect(logSpy).toHaveBeenCalledWith('User already registered')

    })

    test('Checks if a user is too young to register', () => {
        const logSpy = jest.spyOn(console, 'log')
        user.age = 17
        scooterApp.register(user)
        expect(logSpy).toHaveBeenCalledWith('Too young to register')
    })



    //log in function

    test('Checks if a user can log in with correct credidentials', () => {
        scooterApp.register(user)
        const logSpy = jest.spyOn(console, 'log')
        scooterApp.logIn(user.username, user.password)
        expect(logSpy).toHaveBeenCalledWith('Logged in successfully')
        expect(scooterApp.registeredUsers[user.username].loggedIn).toEqual(true)
    })

    test('Checks if a user cannot log in with incorrect credidentials', () => {
        const logSpy = jest.spyOn(console, 'log')
        scooterApp.register(user)
        scooterApp.logIn(user.username, 'pass1')
        expect(logSpy).toHaveBeenCalledWith('Username or password incorrect')
        expect(scooterApp.registeredUsers[user.username].loggedIn).toEqual(false)
    })

    //add scooter function

    test('Checks if a scooter can be added', () => {
        scooterApp.addScooter('Manhattan', scooter)
        expect(scooterApp.stations['Manhattan'].includes(scooter)).toEqual(true)
    })

    //remove scooter function

    test('Checks if a scooter can be removed that exists', () => {
        scooterApp.addScooter('Manhattan', scooter)
        expect(scooterApp.stations['Manhattan'].includes(scooter)).toEqual(true)
    })

    test('Checks if a scooter that doesnt exist cant be removed', () => {
        const logSpy = jest.spyOn(console, 'log')
        scooterApp.addScooter('Manhattan', scooter)
        scooterApp.removeScooter(scooter)
        expect(logSpy).toHaveBeenCalledWith('Scooter does not exist')
    })
})




// log in

// add scooter

// remove scooter
