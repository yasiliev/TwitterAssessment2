export class StateService {

  /* @ngInject */
  constructor ($log, $state, $cookies) {
    this.$log = $log
    this.$state = $state
    this.$cookies = $cookies
    this.$log.debug('StateService instantiated')
    this.currentState = $state.current.component
    this.currentTab = this.currentState === 'home' ? 'feed' : 'tweets'

    this.state = {
      'login': (refresh) => { this.loadState(refresh, 'login', 'login') },
      'home': (refresh) => { this.loadState(refresh, 'mainpage.page.home', 'home', 'feed') },
      'profile': (currentProfileName, refresh) => { this.loadState(refresh, 'mainpage.page.profile', 'profile', 'tweets', currentProfileName) },
      'edit': (refresh) => { this.loadState(refresh, 'mainpage.edit', 'edit') },
      'search': (refresh) => { this.loadState(refresh, 'mainpage.search', 'search') }
    }
  }

  loadState (refresh, name, componentName, tabName, currentProfileName) {
    this.$state.go(name, {currentProfile: currentProfileName}, {reload: refresh, inherit: false, notify: true})
    this.currentState = componentName
    this.currentTab = tabName
    this.currentProfileName = currentProfileName
    this.$cookies.put('currentState', this.currentState)
  }
}
