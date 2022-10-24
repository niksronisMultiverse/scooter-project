const User = require('./User')
const Scooter = require('./Scooter')


class ScooterApp {
  constructor() {
    this.stations =  {
      Manhattan : [],
      Brooklynn : [],
      Queens : [],
      Bronx : [],
      StatenIsland : []
    }
    
    this.registeredUsers = {}
  }

  register(user) {
    if(this.registeredUsers[user.username] != null) {
      console.log('User already registered')
    }

    else if(user.age <= 17) {
      console.log('Too young to register')
    }

    else {
      const username = user.username
      this.registeredUsers[username] = {password: user.password, age: user.age, loggedIn: false, accountChange: 0}

      console.log('User has been registered')
    }

  }

  logIn(username, pass) {
    if(this.registeredUsers[username].password == pass) {
      this.registeredUsers[username].loggedIn = true
      console.log('Logged in successfully')
    }
    else {
      console.log('Username or password incorrect')
    }
  }

  addScooter(location, scooter) {
    scooter.station = location
    this.stations[location].push(scooter)
  }

  removeScooter(scooterToRemove) {
    for (const station in this.stations) {
      const temp = this.stations
      this.stations[station].forEach(function(currentValue, index) {
        console.log(`${currentValue} index: ${index}`)
        if(scooterToRemove.serial == currentValue.serial) {
          temp[station].splice(index, 1)
          return true
        }
      })
    }
    console.log('Scooter does not exist')
  }
}

user = new User('John', 'pass', 22)
scooter = new Scooter ('Bronx', user)
testApp = new ScooterApp()


testApp.addScooter('Bronx', scooter)

testApp.removeScooter(scooter)
module.exports = ScooterApp
