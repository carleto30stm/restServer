import express, { Router } from 'express';
import http from 'http';
import path from 'path';


interface ServerOptions {
  port: number;
  publicPath?: string;
  router: Router;
}

export class Server {

  private app: express.Application;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;
  private readonly server: http.Server;

  constructor(options: ServerOptions) {
    const { port, publicPath = 'public' , router } = options;
    this.app = express();
    this.port = port;
    this.publicPath = publicPath;
    this.server = http.createServer(this.app);
    this.router = router;
  }

  public start(): void {
    this.app.use(express.json());
    
    this.app.use(express.static(this.publicPath));

    this.app.use(this.router);

    this.app.get('*', (req, res) => {
   const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
   res.sendFile(indexPath);
    return;
});
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}