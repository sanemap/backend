import Publication from 'App/Models/Publication'

export class PublicationService {
 async create(
    description: string,
    location: string,
    status: string,
    userId: number,
  ): Promise<Publication>      {
   return await Publication.create({
     description,
     location,
     status,
     userId
   })
  }
}
