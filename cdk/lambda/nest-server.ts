import { Callback, Context, Handler } from 'aws-lambda';

// @ts-ignore
import * as app from '../../dist/main.js';

let server: Handler;

export const nestServer = async (
  event: any,
  context: Context,
  callback: Callback,
): Promise<void> => {
  server = server ?? (await app.bootstrap());
  return server(event, context, callback);
};
