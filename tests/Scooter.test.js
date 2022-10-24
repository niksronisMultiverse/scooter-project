const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('Scooter parameters', () => {

  user = new User('John', 'pass', 22)

  scooter = new Scooter ('Bronx', user)

  test('Checks the station parameter exists', () => {
    expect(scooter.station).toBe('Bronx')
  })

  test('Checks the user parameter exists', () => {
    expect(scooter.user).toBe(user)
  })

  test('Checks the serial parameter exists', () => {
    expect(scooter.serial).toBeGreaterThanOrEqual(0)
    expect(scooter.serial).toBeLessThanOrEqual(1000)
  })

  test('Checks the charge parameter exists', () => {
    expect(scooter.charge).toBeGreaterThanOrEqual(0)
    expect(scooter.charge).toBeLessThanOrEqual(100)
  })

  test('Checks the isBroken parameter exists', () => {
    expect(scooter.isBroken).toEqual(false)
  })

  test('Checks the docked parameter exists', () => {
    expect(scooter.docked).toEqual(true)
  })
})

//Method tests
describe('Scooter methods', () => {

  user = new User('John', 'pass', 22)

  scooter = new Scooter ('Bronx', user)

  test('Checks if the scooter can be rented when its not broken and has enough charge', () => {
    scooter.charge = 100
    const logSpy = jest.spyOn(console, 'log')
    scooter.rent()
    expect(logSpy).toHaveBeenCalledWith('Enjoy the ride!')
  })

  test('Checks if the scooter can be rented when it is broken but has enough charge', () => {
    scooter.charge = 100
    scooter.isBroken = true
    const logSpy = jest.spyOn(console, 'log')
    scooter.rent()
    expect(logSpy).toHaveBeenCalledWith('Scooter is broken, please send a repair request')
  })

  test('Checks if the scooter can be rented when its not broken but does not have enough charge', () => {
    scooter.charge = 20
    const logSpy = jest.spyOn(console, 'log')
    scooter.rent()
    expect(logSpy).toHaveBeenCalledWith('Scooter low on battery, please charge.')
  })



  test('Checks if the scooter can be docked', () => {
    scooter.dock('Queens')

    expect(scooter.station).toBe('Queens')
    expect(scooter.docked).toEqual(true)
    expect(scooter.user).toBe('')
  })

  test('Checks if the scooter can be repaired', async () =>{
    scooter.isBroken = true
    const logSpy = jest.spyOn(console, 'log')
    scooter.requestRepair()
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(logSpy).toHaveBeenCalledWith('Repair complete')
    expect(scooter.isBroken).toEqual(false)

  })

  test('Checks if the scooter can be recharged', async () =>{
    scooter.charge = 10
    scooter.recharge()
    await new Promise(resolve => setTimeout(resolve, 2000))
    expect(scooter.charge).toBe(100)

  })

})
