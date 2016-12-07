import templateUrl from './context.component.html'

/* @ngInject */
class ContextController {
  constructor ($log, $contextService) {
    this.$log = $log
    this.$contextService = $contextService
    this.tweet = $contextService.tweet
    $log.debug('MentionsController instantiated')
  }

  getTweet () {
    return this.$contextService.tweet
  }

  getAfter () {
    return this.$contextService.after
  }

  getBefore () {
    return this.$contextService.before
  }

}

export const context = {
  templateUrl,
  controller: ContextController,
  controllerAs: '$context'
}
