import { RequestHandler } from 'express'

const streamRecording: RequestHandler = async (req, res) => {
  const { message } = req.body
  console.log('Message reçu :', message)
  res.sendStatus(200)
}

export default streamRecording
