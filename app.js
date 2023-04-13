const cors = require('@koa/cors');
const serve = require('koa-static');
const Koa = require('koa');
const { koaBody  } = require('koa-body');
const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');

const app = new Koa();

app.use(cors());
app.use(koaBody ({
  multipart: true,
  urlencoded: true,
  formidable: {
    uploadDir: './public/uploads', // директория для сохранения загруженных файлов
    keepExtensions: true,    // сохранять расширения файлов
  }
}));

app.use(async (ctx, next) => {
  console.log('Request URL:', ctx.request.url);
  await next();
});

app.use(serve(path.join(__dirname, 'public'))); // предоставлять статические файлы из папки 'uploads'

router.get('/', async (ctx) => {
  ctx.body = 'Welcome to server!';
});

router.post('/', async (ctx) => {
  if (!ctx.request.files || !ctx.request.files.file) {
    ctx.throw(400, 'File not found');
  }

  const image = ctx.request.files.file;
  const name = image.originalFilename;
  ctx.body = {
    name: name,
    id: image.newFilename,
    url: `http://localhost:7070/uploads/${image.newFilename}`,
  };
})

router.delete('/uploads/:id', async (ctx) => {
  const id = ctx.params.id;
  const imagePath = path.join(__dirname, 'public', 'uploads', id);

  try {
    fs.unlinkSync(imagePath);
    ctx.status = 200;
    ctx.body = { message: 'Image successfully deleted' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Failed to delete image' };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 7070;
app.listen(port, function(){
  console.log('Server running on http://localhost:7070')
});
