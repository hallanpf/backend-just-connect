import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';
import { userRegisterSchema } from '../../schemas/userSchemas';
import { CreateUserData } from '../../interfaces/user/UserTypes';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userData: CreateUserData = userRegisterSchema.parse(request.body)
      
      const createUserService = new CreateUserService()
      const user = await createUserService.execute(userData)

      return response.status(201).json(user)

    } catch (error) {
      const errorMessages = Array.isArray(error.errors)
        ? error.errors.map((err: any) => ({
            message: err.message,
            field: err.path.join('.')
          }))
        : [ error ]

      return response.status(400).json({ error: errorMessages })
    }
  }
}

export { CreateUserController };