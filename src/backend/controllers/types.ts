export interface HttpRequest {
  body: any
  params: any
  pathParams: any
}

export interface HttpResponse {
  body?: any
  statusCode: number
  'Content-Type'?: string
}
