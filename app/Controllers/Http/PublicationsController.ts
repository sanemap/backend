import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PublicationService } from 'App/Services/PublicationService'


export default class PublicationsController {

  public async store({request, response}: HttpContextContract) {
    const { description, location } = request.all()
    const user = request.user

    const publication = new PublicationService()
    const publicationResponse = await publication.create(description, location, 'open', user.id)

    return response.status(201).json(publicationResponse)
  }
}
