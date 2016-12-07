import { login } from './login.component'
import { configure } from './login.config'

import { current } from './current/current.component'
import { newuser } from './newUser/newuser.component'

export default
  angular
    .module('twitter-login', [])
    .component('twitterLogin', login)
    .component('current', current)
    .component('newuser', newuser)
    .config(configure)
    .name
