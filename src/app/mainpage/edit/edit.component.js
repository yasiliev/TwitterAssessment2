import templateUrl from './edit.component.html'

/* @ngInject */
class EditController {
  constructor ($log, $authenticateService, $cookies, $mdDialog) {
    $cookies.put('currentState', 'edit')
    this.$authenticateService = $authenticateService
    $log.debug('EditController instantiated')
    $authenticateService.authenticate('edit')
    this.$mdDialog = $mdDialog
    this.$log = $log
  }

  update () {
    this.$authenticateService.update()
  }

  delete () {
    this.$authenticateService.delete()
  }

  showConfirm (ev) {
    let confirm = this.$mdDialog.confirm()
          .title('Delete Your Account?')
          .textContent('Are you sure you want to delete your account?')
          .targetEvent(ev)
          .clickOutsideToClose(true)
          .ok('Please do it!')
          .cancel('Don\'t do it!')
    this.$mdDialog.show(confirm).then(() => {
      this.delete()
    })
  }
}

export const edit = {
  templateUrl,
  controller: EditController,
  controllerAs: '$edit'
}
