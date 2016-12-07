import { home, profile } from './page.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(home)
    .state(profile)
}
