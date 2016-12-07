import ngAnimate from 'angular-animate'
import ngAria from 'angular-aria'
import ngMaterial from 'angular-material'
import ngMessages from 'angular-messages'
import uiRouter from 'angular-ui-router'
import ngCookies from 'angular-cookies'
import twitterLogin from './login/login.module'
import mainpage from './mainpage/mainpage.module'
import { TweetService } from './global/services/tweet.service.js'
import { ProfileService } from './global/services/profile.service.js'
import { HomeService } from './global/services/home.service.js'
import { StateService } from './global/services/state.service.js'
import { app } from './app.component'
import { configure } from './app.config'
import { visualizeRouting } from './app.run'
import { AuthenticateService } from './global/services/auth.service.js'
import { SearchService } from './global/services/search.service.js'
import { EmbedService } from './global/services/embed.service.js'
import { TweetListService } from './global/services/tweetList.service.js'

export default
  angular
    .module('twitter-app', [
      ngAnimate,
      ngAria,
      ngMaterial,
      ngMessages,
      uiRouter,
      ngCookies,
      twitterLogin,
      mainpage

    ])
    .directive('compile', ['$compile', function ($compile) {
      return function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
            // watch the 'compile' expression for changes
            return scope.$eval(attrs.compile)
          },
          function(value) {
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.html(value)

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(element.contents())(scope)
          }
        )
      }
    }])
    .component('app', app)
    .service('$authenticateService', AuthenticateService)
    .service('$stateService', StateService)
    .service('$searchService', SearchService)
    .service('$tweetService', TweetService)
    .service('$profileService', ProfileService)
    .service('$homeService', HomeService)
    .service('$embedService', EmbedService)

    .service('$tweetListService', TweetListService)
    .config(configure)
    .run(visualizeRouting)
    .name
