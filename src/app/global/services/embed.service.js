export class EmbedService {

  /* @ngInject */
  construct ($log) {
    this.$log = $log
  }

  embed (content) {
    console.log(content)
    content = content
      .split(' ')
      .map(word => {
        let temp = word.replace(/[^a-z0-9]/gmi, '')
        return (word.substring(0, 1) === '@')
                 ? '<md-button class="tweet" ng-click="goToProfile(' + "'" + temp + "'" + ')"><text>' + word + '</text></md-button>'
                 : (word.substring(0, 1) === '#')
                   ? '<md-button class="tweet" ng-click="search(' + "'" + temp + "'" + ')"><text>' + word + '</text></md-button>'
                   : word
      })
      .join(' ')
    return content
  }

  embedLinks (tweet) {
    if (tweet.content === null)
      tweet.content = ''

    tweet.content = this.embed(tweet.content)

    if (tweet.inReplyTo !== null) {
      tweet.inReplyTo.content = this.embed(tweet.inReplyTo.content)
    }
    if (tweet.repostOf !== null) {
      tweet.repostOf.content = this.embed(tweet.repostOf.content)
    }

    return tweet
  }
}
