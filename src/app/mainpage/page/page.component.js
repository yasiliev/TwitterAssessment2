import templateUrl from './page.component.html'

/* @ngInject */
class PageController {
  constructor ($log, $stateService) {
    $log.debug('page instantiated')
    this.$stateService = $stateService  // NEEDED FOR HTML
  }
}

export const page = {
  templateUrl,
  controller: PageController,
  controllerAs: '$page'
}
