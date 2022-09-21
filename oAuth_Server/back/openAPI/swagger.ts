import swaggerJsdoc, {OAS3Options, OAS3Definition} from 'swagger-jsdoc';
import path from 'path'

const definition: OAS3Definition = {
    openapi: "3.0.0",	
    info: {
        title: "Oauth Back server API",	
        description: "Optional",
        version: "0.0.1",	
    }, 
    server:[{
        url: "http://localhost:8000"
    }],
    schema: ['http'],
};

//http://localhost:8000/api-docs/

const options: OAS3Options = {
	definition,
    apis:[path.join(__dirname, '../routers/**/*.ts')]
};

export const swaggerSpec = swaggerJsdoc(options);