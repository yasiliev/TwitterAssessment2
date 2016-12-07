import { login } from './login.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(login)
}
