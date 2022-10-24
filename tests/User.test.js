const User = require('../src/User')

describe('Testing User class', () => {

    user = new User('John', 'pass', 22)


    test('Check if username exists', () => {
        expect(user.username).toBe('John')
    })

    test('Check if password exists', () => {
        expect(user.password).toBe('pass')
    })

    test('Check if age exists', () => {
        expect(user.age).toBe(22)
    })


})

