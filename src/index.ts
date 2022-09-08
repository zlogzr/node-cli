import Koa from 'koa'
import onerror from 'koa-onerror'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import morgan from 'koa-morgan'
import path from 'path'
import fs from 'fs'
import index from './router'

const ENV = process.env.NODE_ENV
const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())

// logger
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(morgan('dev'))
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(
    morgan('combined', {
      stream: writeStream
    })
  )
}

// routes
app.use(index.routes())

app.listen(7001, () => {
  console.log('server is running')
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export default app
