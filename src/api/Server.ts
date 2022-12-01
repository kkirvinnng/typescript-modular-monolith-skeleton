import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import * as http from 'http'

export default class Server {
    private _express: express.Express
    private httpServer?: http.Server

    constructor() {

        this._express = express()
        this._express.use(express.json())
        this._express.use(helmet())
        this._express.use(cors())
        this._express.use((req: Request, _: Response, next: NextFunction) => {
            console.log(`${req.method} ${req.url} 🚧🚦`)
            next()
        })
    }

    getExpress() {
        return this._express
    }

    listen(port: string) {
        this.httpServer = this._express.listen(port, () => {
            console.log(`Node process: ${process.pid}`)
            console.log(`Running at http://localhost:${port}`)
        })
    }

    getHTTPServer() {
        return this.httpServer
    }

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.close(error => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve()
                })
            }
            return resolve()
        })
    }
}