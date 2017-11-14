const http = require('http')
const httpProxy = require('http-proxy')
const mime = require('mime')
const fs = require('fs')
const path = require('path')
const version = require('../package').version
const config = require('../server')

function Request(req, res, options) {
    this.req = req
    this.res = res
    this.file = null
    this.index = ''
    this.status = 200
    this.log = ''
    this.isHit = false
    this.base = options.base
    this.fallback = options.fallback || ''
    this.rewrite = options.rewrite || {}
    this.root = options.root || {}
    this.proxy = options.proxy || {}

    var tmp = req.url.split('?')
    this.target = this.reqPath = tmp[0]
    this.reqQuery = tmp[1]
}

function sendText(status, text, req, res) {
    res.writeHead(status, {
        'Content-Type': 'text/plain'
    })
    res.end(text)
}

Request.prototype = {
    sendText: function(text) {
        sendText(this.status, text, this.req, this.res)
        return true
    },
    sendFile: function() {
        fs.exists(this.file, exists => {
            if (!exists) {
                if (this.fallback) {
                    fs.exists(this.fallback, fallbackExists => {
                        if (!fallbackExists) {
                            this.status = 404
                            return this.sendText('404 - not found')
                        }
                        this.file = this.fallback
                        return this.sendFile()
                    })
                } else {
                    if (this.req.url === '/favicon.ico') {
                        this.file = path.join(__dirname, 'favicon.ico')
                        return this.sendFile()
                    }
                    this.status = 404
                    return this.sendText('404 - not found')
                }
                return
            }
            fs.stat(this.file, (err, stat) => {
                if (err) {
                    this.status = 500
                    return this.sendText('500 - internal error')
                }
                if (stat.isDirectory()) {
                    if (this.index) {
                        this.file = path.join(this.file, this.index)
                        fs.exists(this.file, indexExists => {
                            if (!indexExists) {
                                this.status = 403
                                return this.sendText('403 - forbidden')
                            }
                            return this.sendFile()
                        })
                    } else {
                        this.status = 403
                        return this.sendText('403 - forbidden')
                    }
                } else {
                    var type = mime.lookup(this.file)
                    this.res.writeHead(200, {
                        'Content-Type': type,
                        'Server': 'Front-Server/' + version
                    })
                    fs.createReadStream(this.file).pipe(this.res)
                }
            })
        })
        return true
    },
    rewriteUrl: function() {
        var target = this.reqPath
        try {
            for (let key in this.rewrite) {
                let pattern = new RegExp(key)
                if (pattern.test(this.reqPath)) {
                    target = this.reqPath.replace(pattern, this.rewrite[key])
                    break
                }
            }
            this.target = target
        } catch (error) {
            console.error(error)
        }
    },
    checkProxy: function(proxyServer) {
        for (let key in this.proxy) {
            let pattern = new RegExp(key)
            if (pattern.test(this.target)) {
                this.isHit = true
                this.req.url = this.target
                if (this.reqQuery) {
                    this.req.url = `${this.target}?${this.reqQuery}`
                }
                console.log(`${this.log} -> ${this.proxy[key]}${this.req.url}`)
                proxyServer.web(this.req, this.res, {
                    changeOrigin: true,
                    target: this.proxy[key]
                })
                return true
            }
        }
    },
    checkRoot: function() {
        for (let key in this.root) {
            let pattern = new RegExp(key)
            if (pattern.test(this.target)) {
                this.isHit = true
                let [targetPath, index] = this.root[key].split(' ')
                this.index = index
                this.file = path.join(targetPath, this.target)
                return this.sendFile()
            }
        }
    },
    checkBase: function() {
        if (this.isHit !== true && this.base) {
            let [targetPath, index] = this.base.split(' ')
            this.index = index
            this.file = path.join(targetPath, this.target)
            return this.sendFile()
        }
    }
}

function createServer(options) {
    if (!options.base) {
        console.error('base path is required')
        return
    }

    const proxyServer = httpProxy.createProxyServer({})

    proxyServer.on('proxyRes', function(proxyRes, req, res) {
        if (!proxyRes.headers['content-type']) {
            proxyRes.headers['content-type'] = 'text/plain; charset=utf-8'
        }
    })

    proxyServer.on('error', (err, req, res) => {
        console.error(err)
        sendText(500, '500 - proxy error', req, res)
    })

    const httpServer = http.createServer((req, res) => {
        const request = new Request(req, res, options)
        request.rewriteUrl()

        request.log = `${req.method} - ${req.url}`
        if (request.target != request.reqPath) {
            request.log += ` -> ${request.target}`
            if (request.query) {
                request.log += `?${request.query}`
            }
        }

        if (request.checkProxy(proxyServer)) return

        console.log(request.log)

        if (request.checkRoot()) return
        if (request.checkBase()) return

        request.status = 404
        request.sendText('404 - not found')
    })

    httpServer.on('error', err => {
        console.error(err)
    })

    httpServer.listen(options.port)

    console.log(`Front-Server listening on 127.0.0.1:${options.port}`)

    return {
        httpServer,
        proxyServer
    }
}

config.base = config.base || path.join(__dirname, '../web') + ' index.html'
config.fallback = config.fallback ? path.join(__dirname, '../', config.fallback) : ''

createServer(config)