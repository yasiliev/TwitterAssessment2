import templateUrl from './search.component.html'

/* @ngInject */
class SearchController {

  constructor ($scope, $log, $cookies, $searchService, $profileService, $stateService, $authenticateService) {
    $cookies.put('currentState', 'search')
    this.$scope = $scope
    this.$log = $log
    $scope.goToProfile = $profileService.goToProfile
    this.$searchService = $searchService
    this.$stateService = $stateService
    $log.debug('SearchController instantiated')
    $authenticateService.authenticate('search')
  }

  getTweets () {
    return this.$searchService.tweets.list
  }

  getMentioned () {
    return this.$searchService.mentioned.list
  }
}

export const search = {
  templateUrl,
  controller: SearchController,
  controllerAs: '$search'
}
