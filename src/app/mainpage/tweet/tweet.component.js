import templateUrl from './tweet.component.html'

/* @ngInject */
class TweetController {
  constructor ($log, $scope, $searchService, $profileService, $tweetService, $stateService, $contextService, $mdDialog, $authenticateService) {
    this.$log = $log
    this.$scope = $scope
    this.$searchService = $searchService
    this.$profileService = $profileService
    this.$stateService = $stateService
    this.$tweetService = $tweetService
    this.$authenticateService = $authenticateService
    this.$scope.goToProfile = this.goToProfile
    this.$scope.search = this.search
    this.$mdDialog = $mdDialog
    this.$contextService = $contextService
    $log.debug('TweetController instantiated')
  }

  search = (searchText) => {
    this.$searchService.inputText = searchText
    this.$searchService.search()
    this.$stateService.state['search']()
    this.$mdDialog.hide()
  }

  goToProfile = (username) => {
    this.$profileService.goToProfile(username)
    this.$mdDialog.hide()
  }

  showContext = (ev, tweet) => {
    this.$contextService.getContext(tweet)
    this.$mdDialog.show({
      template: '<context></context>',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.$scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then((answer) => {
      // this.$scope.status = 'You said the information was "' + answer + '".'
    }, () => {
      // this.$scope.status = 'You cancelled the dialog.'
    })
  }
}

export const tweet = {
  templateUrl,
  controller: TweetController,
  controllerAs: '$tweet',
  bindings: {
    tweet: '='
  }
}
