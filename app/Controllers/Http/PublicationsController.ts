import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PublicationService } from 'App/Services/PublicationService'
import Application from '@ioc:Adonis/Core/Application'
import PublicationImage from 'App/Models/PublicationImage'
import Publication from 'App/Models/Publication'


export default class PublicationsController {

  public async index({ auth, request, response }: HttpContextContract) {
    const type = request.input('type', 'newest')

    let publications: Publication[] = []

    if (type === 'oldest') {
      publications = await Publication.query()
        .orderBy('created_at', 'asc')
        .preload('images')
        .preload('user')
      return response.status(200).json(publications)
    } else if (type === 'newest') {
      publications = await Publication.query()
        .orderBy('created_at', 'desc')
        .preload('images')
        .preload('user')
      return response.status(200).json(publications)
    }else if (type === 'me') {
      publications = await Publication.query()
        .where('user_id', Number(auth.user?.id))
        .orderBy('created_at', 'desc')
        .preload('images')
        .preload('user')
      return response.status(200).json(publications)
    }

    else {
      return response.status(400).json({ message: 'Tipo de ordenação inválido' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const publication = await Publication.find(params.id)

    if (!publication) {
      return response.status(404).json({ message: 'Publicação não encontrada' })
    }

    await publication?.preload('images')
    return response.status(200).json(publication)
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const { description, location } = request.all()
    const images = request.files('images')
    const user = auth.user

    const publication = new PublicationService()
    const publicationResponse = await publication.create(description, location, 'open', Number(user?.id))

    for (let image of images) {

      const fileName = `${Date.now()}-${image.clientName}`

      await image.move(
        Application.tmpPath('uploads'),
        {
          name: fileName
        }
      )
      await PublicationImage.create({
        publicationId: publicationResponse.id,
        path: image.filePath,
        name: fileName,
        type: image.type,
        size: image.size,
      })
    }

    return response.status(201).json(publicationResponse)
  }
}
