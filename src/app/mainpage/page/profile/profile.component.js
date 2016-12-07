import templateUrl from './profile.component.html'

/* @ngInject */
class ProfileController {
  constructor ($log, $cookies, $profileService, $authenticateService, $followService, $tweetService, $stateParams) {
    $cookies.put('currentState', 'profile')
    this.$log = $log
    this.$profileService = $profileService
    this.$followService = $followService
    this.$authenticateService = $authenticateService
    this.$tweetService = $tweetService
    $authenticateService.authenticate('profile')
    this.$profileService.refreshProfile($stateParams.currentProfile || '')

    $log.debug('TweetController instantiated')
  }

  followuser (username) {
    this.$profileService.followProfile(username)
  }
  unfollowuser (username) {
    this.$profileService.unfollowProfile(username)
  }

  checkfollower () {
    let checkUser = this.$authenticateService.username
    if (this.$followService.arrfollower.length > 0 && this.$followService.arrfollower.filter(function (follower) { return follower.username === checkUser }).length === 1) {
      return this.$followService.arrfollower.filter(function (follower) { return follower.username === checkUser })[0].username === checkUser
    } else {
      return false
    }
  }

  getTweets () {
    return this.$profileService.tweets.list
  }
}

export const profile = {
  templateUrl,
  controller: ProfileController,
  controllerAs: '$profile'
}
