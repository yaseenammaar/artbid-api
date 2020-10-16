import { APIGatewayProxyHandler } from 'aws-lambda';
import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
import * as cookieParser from "cookie-parser";
import appAfterAuth from "./appAfterAuth/appAfterAuth";
import appBeforeAuth from "./appBeforeAuth/appBeforeAuth";



/*export const hello: APIGatewayProxyHandler = async (event, _context) => {

  // @ts-ignore
  return {
    statusCode: 200,
    body: {
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }
  };
}*/

// Express instances
const mainApp = express();

//main.use(cors({origin:true}))

mainApp.use(cookieParser)

mainApp.use('/authApi', appBeforeAuth)
mainApp.use('/postAuthApi', appAfterAuth)

mainApp.get('/', (req: Request, res: Response) => {
    console.log(req)
    res.send({ message: 'Welcome to ARTBID' });
});

// @ts-ignore
export const webApi:APIGatewayProxyHandler = serverless(mainApp);
