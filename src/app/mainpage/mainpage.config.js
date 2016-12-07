import { mainpage, edit, page, search } from './mainpage.states'

/* @ngInject */
export function configure ($stateProvider) {
  $stateProvider
    .state(mainpage)
    .state(edit)
    .state(page)
    .state(search)
}
