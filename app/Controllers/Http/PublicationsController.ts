import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PublicationService } from 'App/Services/PublicationService'
import Application from '@ioc:Adonis/Core/Application'
import PublicationImage from 'App/Models/PublicationImage'
import Publication from 'App/Models/Publication'


export default class PublicationsController {

  public async show({params, response}: HttpContextContract) {
    const publication  = await Publication.find(params.id)

    if (!publication) {
      return response.status(404).json({ message: 'Publication not found' })
    }

    await publication?.preload('images')
    return response.status(200).json(publication)
  }

  public async store({auth, request, response}: HttpContextContract) {
    const { description, location } = request.all()
    const images = request.files('images')
    const user = auth.user

    const publication = new PublicationService()
    const publicationResponse = await publication.create(description, location, 'open', Number(user?.id))

    for (let image of images) {
      await image.move(Application.tmpPath('uploads'))
await PublicationImage.create({
        publicationId: publicationResponse.id,
        path: image.filePath,
        name: image.fileName,
        type: image.type,
        size: image.size
})
    }

    return response.status(201).json(publicationResponse)
  }
}
