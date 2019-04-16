import serverless from 'serverless-http';
import app from './app';

const serverlessApp = serverless(app as any);

export const handler = async (event: any, context: any) => {
    return await serverlessApp(event, context);
};
