const nodeCMD = require('node-cmd');
const os = require('os-utils');

const serverInfo = {
	cpuUsage: 0,
	gpuUsage: 0,
	freeMem: 0,
	totalMem: 0,
  usedMem: 0,
}

/**
 * 获取系统内存情况
 */
function getMem() {
  const freeMem = os.freemem();
  const totalMem = os.totalmem();
	serverInfo.freeMem = freeMem;
  serverInfo.usedMem = totalMem - freeMem;
	serverInfo.totalMem = totalMem;
}

/**
 * 获取系统cpu利用率
 */
async function getCPUUsage() {
	let promise = new Promise((resolve, reject) => {
		os.cpuUsage(function(v){
			resolve(v)
		});
	});
	
	serverInfo.cpuUsage = await promise
}

/**
 * 获取系统gpu(nvidia)利用率
 */
async function getGPUUsage() {
	let promise = new Promise(resolve => {
		nodeCMD.get('nvidia-smi -q -d UTILIZATION', (e, b, c) => {
			if (!e) {
				let a = b.split('\r\n').find(s => s.indexOf('Gpu') >= 0 && s.indexOf('%') >= 0)
				let start = a.indexOf(':')+2
				let end = a.indexOf('%')-1
				let ss = a.substring(start, end)
				resolve(ss)
			}
		})
	})
	serverInfo.gpuUsage = await promise
}




function monitor() {
  getCPUUsage()
    // getGPUUsage()
    getMem()
    console.log(serverInfo);

}

function main() {
  monitor();
  setInterval(() => {
    monitor();
  }, 5 * 1000)
}
module.exports = main;

