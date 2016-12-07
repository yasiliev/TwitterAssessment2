export class TweetListService {

  /* @ngInject */
  constructor ($log, $http, $authenticateService, $embedService) {
    this.$log = $log
    this.$http = $http
    this.$embedService = $embedService
    this.$authenticateService = $authenticateService
    $log.debug('TweetListService instantiated')
  }

  getTweetList (list, method) {
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/' + method
    }).then(
      (response) => {
        list.list = this.checkAllTweetLikes(response.data)
        list.list = list.list
          .map(tweet => this.$embedService.embedLinks(tweet))
      },
      (error) => {
        this.$log.debug(error)
      }
    )
  }

  checkAllTweetLikes (tweets) {
    tweets.forEach(tweet => {
      this.$http({
        method: 'GET',
        url: 'http://localhost:8080/tweets/' + tweet.id + '/likes',
        data: {
          username: this.$authenticateService.username,
          password: this.$authenticateService.password
        }
      }).then(
            (response) => {
              tweet.liked = false
              response.data.forEach(user => {
                if (user.username === this.$authenticateService.username) tweet.liked = true
              })
            },
            (error) => {
              this.$log.debug(error)
            }
          )
    })
    return tweets
  }

}
