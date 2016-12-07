export class ContextService {

  /* @ngInject */
  constructor ($log, $http, $authenticateService, $embedService) {
    this.$log = $log
    this.$http = $http
    this.$authenticateService = $authenticateService
    this.$embedService = $embedService
    this.tweet
    this.after
    this.before
    $log.debug('ContextService instantiated')
  }

  getContext (tweet) {
    this.tweet = tweet
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/tweets/' + tweet.id + '/context'
    }).then(
      (response) => {
        this.after = this.checkAllTweetLikes(response.data.after)
        this.after = this.after
          .map(tweet => this.$embedService.embedLinks(tweet))
        this.before = this.checkAllTweetLikes(response.data.before)
        this.before = this.before
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
