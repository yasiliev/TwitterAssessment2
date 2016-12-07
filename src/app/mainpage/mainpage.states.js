export const mainpage = {
  name: 'mainpage',
  url: '/main',
  component: 'mainpage',
  abstract: true
}

export const edit = {
  name: 'mainpage.edit',
  url: '/edit',
  component: 'edit'
}

export const page = {
  name: 'mainpage.page',
  url: '/page',
  component: 'page',
  abstract: true
}

export const search = {
  name: 'mainpage.search',
  url: '/search',
  component: 'search',
  onExit: ($searchService) => {
    'ngInject'
    $searchService.inputText = ''
  }
}
