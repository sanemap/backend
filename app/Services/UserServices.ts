import User from "App/Models/User";
import { DateTime } from "luxon";


export class UserService{
    /**
     * name
     */
    public async create( data:{
        nome: string, 
        email: string,
        cpf: string,
        telefone: string,
        avatar: string, 
    } ):Promise <User> {

        const user = await User.create({
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            telefone: data.telefone,
            avatar: data.avatar
          })
          return user
    }
}