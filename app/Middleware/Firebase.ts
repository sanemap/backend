import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FirebaseService } from 'App/Services/FirebaseService'

export default class Firebase {
  public async handle({
                        request,
                        response,
                      }: HttpContextContract, next: () => Promise<void>) {

    // bearer token
    const token = request.header('authorization')?.replace('Bearer ', '')

    // verify token
    if (token != null) {
      try {
        await FirebaseService.auth().verifyIdToken(token)
        await next()
      } catch (error) {
        return response.unauthorized({ error: 'Invalid token' })
      }

    } else {
      return response.unauthorized({ error: 'No token provided' })
    }

  }
}
