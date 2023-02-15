import { EventEmitter } from 'events';
import { Client as SSHClient } from 'ssh2'
import path from 'path'
import fs from 'fs'

export class ScpClient extends EventEmitter {
  remotePathSep = path.posix.sep;
  sftpWrapper = null;
  sshClient = null;

  constructor(config) {
    super()
    this.config = config;
    this.init()
  }

  uploadFile(sourcePath, targetPath, options = {}) {
    return new Promise((resolve, reject) => {
      this.sftpWrapper.fastPut(sourcePath, targetPath, options, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  stat(remotePath) {
    return new Promise((resolve, reject) => {
      this.sftpWrapper.stat(remotePath, (err, stats) => {
        if (err) {
          reject(err)
        } else {
          resolve(stats)
        }
      })
    })
  }

  async checkExist(remotePath) {
    try {
      const stats = await this.stat(remotePath);
      if (stats.isDirectory()) {
        return 'd'
      }
      if (stats.isSymbolicLink()) {
        return 'l'
      }
      if (stats.isFile()) {
        return '-'
      }
      return ''
    } catch (e) {
      return ''
    }
  }

  mkdir(remotePath, attributes) {
    return new Promise((resolve, reject) => {
      this.sftpWrapper.mkdir(remotePath, attributes, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  async uploadDirectory(src, dest) {
    const isExist = await this.checkExist(dest);
    if (!isExist) {
      await this.mkdir(dest)
    }
    const dirEntries = fs.readdirSync(src, {
      encoding: 'utf-8',
      withFileTypes: true,
    })
    for(const d of dirEntries) {
      if (d.isDirectory()) {
        const newSrc = path.join(src, d.name);
        const newDst = this.normalizeFilePath(dest, d.name)
        await this.uploadDirectory(newSrc, newDst)
      } else if (d.isFile()) {
        const newSrc = path.join(src, d.name);
        const newDst = this.normalizeFilePath(dest, d.name)
        await this.uploadFile(newSrc, newDst)
      }
    }
  }

  exec(command, cwd) {
    return new Promise((resolve, reject) => {
      this.sshClient?.exec(`cd ${cwd} && ${command}`, {}, (err, channel) => {
        if (err) {
          reject(err)
        }
        channel.on('exit', () => {
          resolve()
        })
      })
    })
  }

  close() {
    if (this.sshClient && this.sftpWrapper) {
      this.sshClient.end();
      this.sshClient = null;
      this.sftpWrapper = null;
    }
  }

  waitForReady(cb = () => null) {
    return new Promise((resolve, reject) => {
      const resolveFn = async () => {
        await cb();
        resolve()
      }

      if (this.sftpWrapper) resolveFn()
      this.on('ready', resolveFn)
      this.on('close', reject)
      this.on('error', reject)
    })
  }

  init() {
    const ssh = new SSHClient();

    ssh.on('connect', () => {
      this.emit('connect');
    })

    ssh.on('ready', () => {
      ssh.sftp((err, sftp) => {
        if (err) {
          throw err;
        }
        this.sftpWrapper = sftp;
        this.emit('ready');
      })
    })

    ssh.on('error', (err) => {
      this.emit('error', err);
    })

    ssh.on('end', () => {
      this.emit('end')
    })

    ssh.on('close', () => {
      this.sftpWrapper = null;
      this.emit('close')
    })

    ssh.connect(this.config);
    this.sshClient = ssh;
    if (this.config.remoteOsType === 'win32') {
      this.remotePathSep = path.win32.sep;
    }
  }

  normalizeFilePath(...args) {
    if (this.remotePathSep === path.win32.sep) {
      return path.win32.join(...args)
    }
    return path.posix.join(...args)
  }
}