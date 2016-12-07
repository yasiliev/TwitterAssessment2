export class AuthenticateService {

  /* @ngInject */
  constructor ($log, $http, $cookies, $stateService) {
    this.$log = $log
    this.$http = $http
    this.$cookies = $cookies
    this.profile = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone
    }
    this.incorrectUser = false
    this.invalidUsername = false
    this.$stateService = $stateService
    $log.debug('AuthenticateService created')
  }

  authenticate (state) {
    this.username = this.$cookies.get('username')
    this.password = this.$cookies.get('password')
    this.login(state)
  }

  login (state, initial) {
    if (initial === undefined) initial = false
    if (!this.username || !this.password) {
      this.$stateService.state['login']()
      return
    }
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + this.username + '/@' + this.password
    }).then(
      (response) => {
        this.$cookies.put('username', this.username)
        this.$cookies.put('password', this.password)
        this.profile = response.data.profile
        if (initial) {
          this.$stateService.state['home']()
        }
      },
      (error) => {
        this.$log.debug(error)
        this.$stateService.state['login']()
        this.incorrectUser = true
      }
    )
  }

  logout () {
    this.profile = undefined
    this.$cookies.remove('username')
    this.$cookies.remove('password')
    this.username = undefined
    this.password = undefined
    this.$stateService.state['login']()
  }

  validateUsername () {
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/validate/username/available/@' + this.username
    }).then(
      (response) => {
        this.invalidUsername = response.data
      },
      (error) => {
        this.$log.debug(error)
      }
    )
  }

  create () {
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/users',
      data: {
        'credentials': this.getCredentials(),
        'profile': this.profile
      }
    }).then(
      (response) => {
        this.profile = response.data.profile
        this.$cookies.put('username', this.username)
        this.$cookies.put('password', this.password)
        this.$stateService.state['home']()
      },
      (error) => {
        this.$log.debug(error)
      }
    )
  }

  update () {
    this.$http({
      method: 'PATCH',
      url: 'http://localhost:8080/users/@' + this.username,
      data: {
        'credentials': this.getCredentials(),
        'profile': this.profile
      }
    }).then(
      (response) => {
        this.$stateService.state['home']()
      },
      (error) => {
        this.$log.debug(error)
      }
    )
  }

  delete () {
    this.$http({
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      method: 'DELETE',
      url: 'http://localhost:8080/users/@' + this.username,
      data: this.getCredentials()
    }).then(
      (response) => {
        this.clearUserInfo()
        this.$stateService.state['login']()
      },
      (error) => {
        this.$log.debug(error)
      }
    )
  }

  getCredentials () {
    return {
      'username': this.username,
      'password': this.password
    }
  }

  clearUserInfo () {
    this.username = undefined
    this.password = undefined
    this.profile = undefined
  }
}
