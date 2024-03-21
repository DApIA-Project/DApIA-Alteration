export class ApiRoutes {
  static alteration() {
    return '/recording/alteration'
  }

  static streamRecording() {
    return '/recording/stream'
  }

  static createScenario() {
    return '/scenario/create'
  }

  static updateScenario() {
    return '/scenario/update'
  }

  static deleteScenario() {
    return '/scenario/delete'
  }

  static findScenario() {
    return '/scenario/find'
  }

  static listScenario() {
    return '/scenario/list'
  }

  static listUserScenario() {
    return '/scenario/user/list'
  }

  static createUser() {
    return '/user/create'
  }

  static updateUser() {
    return '/user/update'
  }

  static deleteUser() {
    return '/user/delete'
  }

  static listUser() {
    return '/user/list'
  }

  static updatePassword() {
    return '/user/update/password'
  }

  static findUserByEmail() {
    return '/user/findByEmail'
  }

  static findUserByToken() {
    return '/user/findByToken'
  }

  static findUser() {
    return '/user/find'
  }

  static login() {
    return '/user/login'
  }
}
