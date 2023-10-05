import User from 'App/Models/User'


export class UserService{
    /**
     * name
     */
    public async create( data:{
        nome: string,
        email: string,
        password: string,
        cpf: string,
        telefone: string,
        avatar: string,
    } ):Promise <User> {

        const user = await User.create({
            nome: data.nome,
            email: data.email,
            password: data.password,
            cpf: data.cpf,
            telefone: data.telefone,
            avatar: data.avatar
          })
          return user
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await User.findBy('email', email)
        return user || null
    }
}
