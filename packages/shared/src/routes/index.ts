export class ApiRoutes {
  static alteration() {
    return '/recording/alteration'
  }

  static streamRecording() {
    return '/recording/stream'
  }

  static scenarios() {
    return '/scenarios'
  }

  static listUserScenario() {
    return '/scenarios/filters'
  }

  static findScenario() {
    return `/scenarios/:scenarioId`
  }

  static users() {
    return '/users'
  }

  static updatePassword() {
    return '/users/password'
  }

  static findUserByToken() {
    return '/users/:token'
  }

  static login() {
    return '/login'
  }
}
