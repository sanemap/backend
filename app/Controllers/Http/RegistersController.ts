import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services/UserServices'

export default class RegistersController {

  public async store({request}: HttpContextContract) {
    const nome = request.input('nome') as string
    const email = request.input('email') as string
    const cpf = request.input('cpf') as string
    const telefone = request.input('telefone') as string

    const user = new UserService()
    
    const userResponse = await user.create({nome: nome, email: email, cpf: cpf, telefone: telefone, avatar:""})
    
    return userResponse 

  }
}
