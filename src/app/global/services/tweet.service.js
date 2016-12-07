export class TweetService {

  /* @ngInject */
  constructor ($http, $authenticateService, $log, $homeService, $profileService, $mdDialog, $searchService, $stateService) {
    this.$log = $log
    this.$http = $http
    this.$authenticateService = $authenticateService
    this.$homeService = $homeService
    this.$profileService = $profileService
    this.$stateService = $stateService
    this.$mdDialog = $mdDialog
    this.$searchService = $searchService
  }

  postTweet (content) {
    const tweet = {
      'content': content,
      'credentials': this.$authenticateService.getCredentials()
    }
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/tweets',
      data: tweet
    }).then((response) => {
      this.refreshStateContents()
    })
  }

  deleteTweet (tweet) {
    this.$http({
      headers: {
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      },
      method: 'DELETE',
      url: 'http://localhost:8080/tweets/' + tweet.id,
      data: this.$authenticateService.getCredentials()
    }).then((response) => {
      this.refreshStateContents()
    })
  }

  showTweetPrompt ($event, id) {
    let confirm = this.$mdDialog.prompt()
      .title('Post a tweet!')
      .clickOutsideToClose(true)
      .placeholder('Post content')
      .initialValue('')
      .targetEvent($event)
      .ok('Post!')
      .cancel('Close')

    this.$mdDialog.show(confirm)
      .then((result) => {
        this.replyTweet(result, id)
      }, () => {
      })
  }

  replyTweet (content, id) {
    const tweet = {
      'content': content,
      'credentials': this.$authenticateService.getCredentials()
    }

    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/tweets/' + id + '/reply',
      data: tweet
    }).then((response) => {
      this.refreshStateContents()
    })
  }

  repostTweet (id) {
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/tweets/' + id + '/repost',
      data: this.$authenticateService.getCredentials()
    }).then((response) => {
      this.refreshStateContents()
    })
  }

  likeTweet (item) {
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/tweets/' + item.id + '/like',
      data: {
        username: this.$authenticateService.username,
        password: this.$authenticateService.password
      }
    }).then(
          (response) => {
            item.liked = true
          },
          (error) => {
            this.$log.debug(error)
          }
        )
  }

  unlikeTweet (item) {
    this.$http({
      method: 'POST',
      url: 'http://localhost:8080/tweets/' + item.id + '/unlike',
      data: {
        username: this.$authenticateService.username,
        password: this.$authenticateService.password
      }
    }).then(
          (response) => {
            item.liked = false
          },
          (error) => {
            this.$log.debug(error)
          }
        )
  }

  refreshStateContents () {
    if (this.$stateService.currentState === 'profile') {
      this.$profileService.refreshProfile(this.$profileService.username)
    } else if (this.$stateService.currentState === 'home') {
      this.$homeService.refreshFeed(this.$authenticateService.username)
    } else if (this.$stateService.currentState === 'search') {
      this.$searchService.search()
    }
  }
}
