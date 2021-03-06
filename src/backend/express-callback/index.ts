import { Handler } from 'express'
import { HttpRequest, HttpResponse } from '../controllers/types'

const makeExpressCallback: MakeExpressCallback = function (
  controller
) {
  return async (req, res) => {
    const httpRequest = {
      body: req.body || {},
      params: req.query || {},
      pathParams: req.params
    }
    const httpResponse = await controller(httpRequest)
    if (httpResponse['Content-Type']) {
      res.set('Content-Type', httpResponse['Content-Type'])
    } else {
      res.type('json')
    }
    res.status(httpResponse.statusCode).send(httpResponse.body)
  }
}

export { makeExpressCallback }

type MakeExpressCallback = (controller: Controller) => Handler
type Controller = (httpResponse: HttpRequest) => Promise<HttpResponse>
