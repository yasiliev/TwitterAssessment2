import { page } from './page.component'
import { follow } from './follow/follow.component'
import { FollowService } from './follow/follow.service'
import { configure } from './page.config'
import { home } from './home/home.component'
import { profile } from './profile/profile.component'
import { mentions } from './mentions/mentions.component'

export default
  angular
    .module('twitter-page', [])
    .component('page', page)
    .component('follow', follow)
    .service('$followService', FollowService)
    .component('home', home)
    .component('profile', profile)
    .component('mentions', mentions)
    .config(configure)
    .name
