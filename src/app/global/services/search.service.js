export class SearchService {

  /* @ngInject */
  constructor ($log, $http, $state, $authenticateService, $tweetListService) {
    this.$log = $log
    this.$http = $http
    this.$state = $state
    this.$authenticateService = $authenticateService
    this.$tweetListService = $tweetListService
    this.tweets = { list: [] }
    this.users = undefined
    this.hashtags = undefined
    this.mentioned = { list: [] }
    this.searchText = ''
    $log.debug('SearchService created')
  }

  getMentions (username) {
    this.$tweetListService.getTweetList(this.mentioned, 'users/@' + username + '/mentions')
  }

  search () {
    this.users = undefined
    this.hashtags = undefined
    this.mentioned = { list: [] }
    this.tweets = { list: [] }
    this.searchText = this.inputText
    this.$tweetListService.getTweetList(this.mentioned, 'users/@' + this.searchText + '/mentions/partial')
    this.$tweetListService.getTweetList(this.tweets, 'tags/' + this.searchText + '/partial')
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/users/@' + this.searchText + '/partial'
    }).then(
      (response) => {
        this.users = response.data
      },
      (error) => {
        this.$log.debug(error)
      }
    )
    this.$http({
      method: 'GET',
      url: 'http://localhost:8080/tags/partialtag/' + this.searchText
    }).then(
      (response) => {
        this.hashtags = response.data
      },
      (error) => {
        this.$log.debug(error)
      }
    )
  }
}
