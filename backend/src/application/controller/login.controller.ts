import type { Request, Response} from 'express'

export const loginAuth = (req : Request, res: Response) => {
  res.send('Hola');
}