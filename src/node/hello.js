// import http from 'node:http';

// const server = http.createServer(function (req, res) {
//   res.end('hello world');
// });

// const PORT = 3600;

// server.listen(PORT, console.log(`Listening on localhost:${PORT}...`));

const oncePromise =
(fn, p = null) =>
(...arg) =>
p ? p : (p = fn(...arg).finally(() => (p = null)));

const fn = oncePromise(print);
fn(666);
fn(999);
setTimeout(() => {
fn("ok");
}, 1100);

async function print(y) {
console.log("y:", y);
await new Promise((resolve, reject) => {
setTimeout(() => {
resolve();
}, 1000);
});
}