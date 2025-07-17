import { createRequire } from 'module';
import type { Request, Response, NextFunction } from 'express';

const require = createRequire(import.meta.url);
const jsonServer = require('json-server'); // ✅ Esto sí funciona con la versión 0.17.3

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware para convertir id a number si viene como string
server.use(jsonServer.bodyParser);
server.use((req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    if (typeof req.body.id === 'string' && !isNaN(Number(req.body.id))) {
      req.body.id = Number(req.body.id);
    }

    if (Array.isArray(req.body)) {
      req.body = req.body.map((item) => {
        if (item.id && typeof item.id === 'string' && !isNaN(Number(item.id))) {
          item.id = Number(item.id);
        }
        return item;
      });
    }
  }

  next();
});

server.use(router);
server.listen(3001, () => {
  console.log('✅ Servidor JSON corriendo en http://localhost:3001');
});
