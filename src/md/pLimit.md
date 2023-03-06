# p-limit 源码

## 执行流程

1. `pLimit`函数的入参`concurrency`是最大并发数，变量`activeCount`表示当前在执行的异步函数的数量，调用`pLimit`函数会生成一个限制并发的函数`generator`，多个`generator`函数会共用一个队列
2. `pLimit`函数依据队列的`equeue`和`dequeue`方法， `generator`函数执行会将一个函数推入队列，当`activeCount`小于`concurrency`时，则调用`dequeue`方法弹出一个函数并执行
3. 被推入队列的函数不是原始函数，而是经过`run`函数处理的函数
4. 执行`run`函数，`activeCount + 1`，执行异步函数，并将结果传递给`resolve`，为了保证`next`的顺序，采用了`await result`后调用`next`函数
5. 执行`next`函数，`activeCount - 1`，当队列还有元素时，弹出一个函数并执行

> 通过函数enqueue、run、next，pLimit生成了一个限制大小但不断消耗的异步函数执行队列，从而达到限流的作用。

## 参考

1. [若川视野 x 源码共读](https://juejin.cn/post/7087592414814142472)
2. [若川视野 x 源码共读-p-limit](https://juejin.cn/post/7090072797397352462)
3. [实现并发控制](https://juejin.cn/post/7197246543208071205)
4. [Node.js 并发能力](https://mp.weixin.qq.com/s/6LsPMIHdIOw3KO6F2sgRXg)
5. [链表](https://github.com/sindresorhus/yocto-queue)
