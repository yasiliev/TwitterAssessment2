import templateUrl from './home.component.html'

/* @ngInject */
class HomeController {

  constructor ($scope, $log, $state, $homeService, $authenticateService, $cookies) {
    $cookies.put('currentState', 'home')
    this.$log = $log
    this.$homeService = $homeService
    this.$authenticateService = $authenticateService
    $log.debug('feedController instantiated')
    $authenticateService.authenticate('home')
    $homeService.refreshFeed($authenticateService.username)
  }

  getFeed () {
    return this.$homeService.feed.list
  }
}

export const home = {
  templateUrl,
  controller: HomeController,
  controllerAs: '$home'
}
