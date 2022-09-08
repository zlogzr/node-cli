import Router from 'koa-router'
const router = new Router()

router.prefix('/api')

router.get('/list', (ctx: any, next: any) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

export default router
