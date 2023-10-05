declare module '@ioc:Adonis/Core/Request' {
  import User2 from 'App/Models/User2'

  interface RequestContract {
    user: User2
  }
}
