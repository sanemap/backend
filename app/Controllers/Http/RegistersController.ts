import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services/UserServices'
import User from 'App/Models/User'

export default class RegistersController {
  public async store({ request, response }: HttpContextContract) {
    const nome = request.input('nome') as string
    const email = request.input('email') as string
    const password = request.input('password') as string
    const cpf = request.input('cpf') as string
    const telefone = request.input('telefone') as string

    const existingUser = await User.findBy('email', email)
    const existingCpf = await User.findBy('cpf', cpf)
    const existingTelefone = await User.findBy('telefone', telefone)

    if (existingUser) {
      return response.status(400).json({ message: 'E-mail já cadastrado' })
    }

    if (existingCpf) {
      return response.status(400).json({message:'CPF já cadastrado.'})
    }

    if (existingTelefone) {
      return response.status(400).json({message:'Telefone já cadastrado.'})
    }

    const user = new UserService()

    const userResponse = await user.create({
      nome: nome,
      email: email,
      password: password,
      cpf: cpf,
      telefone: telefone,
      avatar: ""
    })

    return userResponse
  }
}
