export class ProfileService {

  /* @ngInject */

  constructor ($log, $http, $stateService, $authenticateService, $followService, $searchService, $tweetListService) {
    this.$authenticateService = $authenticateService
    this.$log = $log
    this.$http = $http
    this.$stateService = $stateService
    this.$followService = $followService
    this.$searchService = $searchService
    this.$tweetListService = $tweetListService
    this.tweets = { list: [] }
    $log.debug('ProfileService created')
  }

  refreshProfile (username) {
    this.username = username
    this.$searchService.getMentions(username)
    this.refreshFollow(username)
    this.$tweetListService.getTweetList(this.tweets, 'users/@' + username + '/tweets')
  }

  followProfile (username) {
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/users/@' + username + '/follow',
      data: {
          username: this.$authenticateService.username,
          password: this.$authenticateService.password
          }
    }).then( () => {
      this.refreshFollow(username)
    })

  }

  unfollowProfile (username) {
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/users/@' + username + '/unfollow',
      data: {
        username: this.$authenticateService.username,
        password: this.$authenticateService.password
      }
    }).then( () => {
      this.refreshFollow(username)
    })
  }

  refreshFollow (username) {
    this.$followService.getFollower(username)
    this.$followService.getFollowing(username)
  }

  goToProfile = (name) => {
    this.$stateService.state['profile'](name)
    this.refreshProfile(name)
  }
}
