import templateUrl from './newuser.component.html'

/* @ngInject */
class NewUserController {
  constructor ($log, $authenticateService, $stateService) {
    this.$authenticateService = $authenticateService
    this.$stateService = $stateService
    $log.debug('NewUserController instantiated')
  }

  create () {
    this.$authenticateService.create()
    if (this.$authenticateService.username)
      this.stateService.state['home']()
  }

  validateUsername () {
    this.$authenticateService.validateUsername()
  }
}

export const newuser = {
  templateUrl,
  controller: NewUserController,
  controllerAs: '$newuser'
}
