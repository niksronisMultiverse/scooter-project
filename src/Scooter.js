class Scooter{
  constructor(station, user){
    this.station = station
    this.user = user
    this.serial = Math.round((Math.random()*1000))
    this.charge = Math.round((Math.random()*100))
    this.isBroken = false
    this.docked = true
  }

  rent (){
    if(!this.isBroken && this.charge > 20) {
      this.docked = false
      console.log('Enjoy the ride!')
    }
    else if (this.charge <= 20) {
      console.log('Scooter low on battery, please charge.')
    }
    else {
      console.log('Scooter is broken, please send a repair request')
    }
  }

  dock(station) {
    this.station = station
    this.docked = true
    this.user = ''
  }

  async recharge() {
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100
  }


  async requestRepair() {
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.isBroken = false
    console.log('Repair complete')

  }
}


module.exports = Scooter
