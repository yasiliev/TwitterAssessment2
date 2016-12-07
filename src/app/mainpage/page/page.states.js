export const home = {
  name: 'mainpage.page.home',
  url: '/home',
  component: 'home'
}

export const profile = {
  name: 'mainpage.page.profile',
  url: '/profile/:currentProfile',
  params: {
    currentProfile: 'currentProfileName'
  },
  component: 'profile'
}
