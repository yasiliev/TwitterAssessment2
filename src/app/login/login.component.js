import templateUrl from './login.component.html'

/* @ngInject */
class LoginController {
  constructor ($log, $authenticateService, $cookies) {
    $cookies.put('currentState', 'login')
    this.$authenticateService = $authenticateService
    this.$authenticateService.incorrectUser = undefined
    $authenticateService.username = $cookies.get('username')
    $authenticateService.password = $cookies.get('password')
    $authenticateService.login('home', true)
    $log.debug('LoginController instantiated')
  }
}

export const login = {
  templateUrl,
  controller: LoginController,
  controllerAs: '$login'
}
