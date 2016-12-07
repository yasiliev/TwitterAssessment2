import templateUrl from './app.component.html'

/* @ngInject */
class AppController {
  constructor ($log) {
    $log.debug('AppController instantiated')
  }
}

export const app = {
  templateUrl,
  controller: AppController,
  controllerAs: '$app'
}
