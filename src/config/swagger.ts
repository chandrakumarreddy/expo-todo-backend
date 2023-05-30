import swaggerJsDoc from 'swagger-jsdoc'

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Node.js application'
    },
    basePath: '/'
  },
  apis: ['../routes/*.ts']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export { swaggerDocs }
