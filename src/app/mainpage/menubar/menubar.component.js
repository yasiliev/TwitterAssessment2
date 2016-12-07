import templateUrl from './menubar.component.html'

/* @ngInject */
class MenubarController {

  constructor ($log, $state, $authenticateService, $searchService, $mdDialog, $tweetService, $profileService, $stateService, $homeService, $followService, $scope) {
    $log.debug('menuBar instantiated')

    this.$log = $log
    this.$searchService = $searchService
    this.$stateService = $stateService
    this.$authenticateService = $authenticateService
    this.$state = $state
    this.$tweetService = $tweetService
    this.$profileService = $profileService
    this.$homeService = $homeService
    this.$followService = $followService
    this.$scope = $scope
    this.openMenu = function ($mdOpenMenu, ev) {
      this.originatorEv = ev
      $mdOpenMenu(ev)
    }

    this.home = () => {
      this.$followService.getFollower($authenticateService.username)
      this.$followService.getFollowing($authenticateService.username)
      this.$homeService.refreshFeed(this.$authenticateService.username, this.$scope)
      this.$stateService.state['home']()
    }

    this.editProfile = () => {
      this.$stateService.state['edit']()
    }

    this.search = () => {
      this.$searchService.search()
      this.$stateService.state['search']()
    }

    this.logout = () => {
      this.$authenticateService.logout()
    }

    this.setTweetElement = ($event) => {
      this.tweetElement = $event.target
    }

    this.viewProfile = () => {
      this.$profileService.refreshProfile(this.$authenticateService.username)
      this.$stateService.state['profile'](this.$authenticateService.username)
    }

    this.showTweetPrompt = ($event) => {
      let confirm = $mdDialog.prompt()
        .title('Post a tweet!')
        .clickOutsideToClose(true)
        .placeholder('Post content')
        .initialValue('')
        .targetEvent($event)
        .ok('Post!')
        .cancel('Close')

      $mdDialog.show(confirm)
        .then((result) => {
          this.$tweetService.postTweet(result)
        }, () => {
          console.log('tweet didn\'t have contents')
        })
    }

    this.getUsername = () => {
      return this.$authenticateService.username
    }

    this.mouseOnTweet = ($event) => {
      if ($event.target.id !== 'tweetButtonIcon') {
        $event.target.setAttribute('stroke', 'rgba(231,236,238,.5)')
      }
    }

    this.mouseOffTweet = ($event) => {
      if ($event.target.id !== 'tweetButtonIcon') {
        $event.target.setAttribute('stroke', 'white')
      }
    }
  }
}

export const menubar = {
  templateUrl,
  controller: MenubarController,
  controllerAs: '$menubar'
}
