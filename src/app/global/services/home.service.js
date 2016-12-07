export class HomeService {

  /* @ngInject */
  constructor ($log, $profileService, $searchService, $tweetListService) {
    this.$log = $log
    this.$profileService = $profileService
    this.$searchService = $searchService
    this.$tweetListService = $tweetListService
    this.feed = { list: [] }
    this.$log.debug('HomeService instantiated')
  }

  refreshFeed (username) {
    this.$searchService.getMentions(username)
    this.$profileService.refreshFollow(username)
    this.$tweetListService.getTweetList(this.feed, 'users/@' + username + '/feed')
  }
}
