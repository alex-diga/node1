import { createWriteStream, createReadStream } from 'node:fs';
import { parse, fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import http from 'node:http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logger = createWriteStream(join(__dirname, './log.txt'), {
  //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
  flags: 'w', 
});

function pipeFileToResponse(res, file, type) {
  if (type) {
    res.writeHead(200, {
      'Content-Type': type,
    });
  }
  createReadStream(join(__dirname, file)).pipe(res);
}

function filePrefix(path, filename) {
  return `${path}${filename}`;
}

const server = http.createServer(function (req, res) {
  req.setEncoding('utf-8');
  const parsed = parse(req.url, true);
  let pathname = parsed.pathname;

  const urlList = ['/index.html', '/imgs/robot.png', '/imgs/snow.webp', '/index.css'];
  const log = `[${new Date()}] ${req.method} ${pathname}\n`;
  logger.write(log);
  console.log(log);
  if (pathname === '/') {
    pathname = '/index.html';
  }
  if (pathname === '/api') {
    pipeFileToResponse(res, './result.json');
  } else if (pathname === '/json') {
    pipeFileToResponse(res, './result.json');
  } else if (urlList.includes(pathname)) {
    pipeFileToResponse(res, filePrefix('../html', pathname));
  } else {
    res.writeHead(404);
    res.end('<h1>404 Not Found</h1>');
  }
});

const PORT = 3600;

server.listen(PORT, console.log(`Listening on localhost:${PORT}...`));
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Address localhost:${PORT} in use please retry when the port is available!`);
    server.close();
  }
  logger.write(`[${new Date()}] Abnormal program exit`);
  logger.end();
});
