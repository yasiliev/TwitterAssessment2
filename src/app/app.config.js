/* @ngInject */
export function configure ($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/login')
  $locationProvider.html5Mode(true)
}
