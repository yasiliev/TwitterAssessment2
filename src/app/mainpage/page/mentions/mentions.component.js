import templateUrl from './mentions.component.html'

/* @ngInject */
class MentionsController {
  constructor ($log, $searchService) {
    this.$log = $log
    this.$searchService = $searchService
    $log.debug('MentionsController instantiated')
  }

  getMentioned () {
    return this.$searchService.mentioned.list
  }
}

export const mentions = {
  templateUrl,
  controller: MentionsController,
  controllerAs: '$mentions'
}
