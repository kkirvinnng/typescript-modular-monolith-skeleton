import Server from './Server'

export class BackendApp {
    server: Server

    start() {
        const port = process.env.PORT || '5001'
        this.server = new Server()
        return this.server.listen(port)
    }

    async stop() {

        return this.server.stop()
    }
}
