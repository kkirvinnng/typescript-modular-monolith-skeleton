import 'reflect-metadata'
import dotenv from 'dotenv'

import { BackendApp } from './BackendApp'

dotenv.config()

const backend = new BackendApp()

const app = backend.server.getExpress()

backend.start()

export default app


