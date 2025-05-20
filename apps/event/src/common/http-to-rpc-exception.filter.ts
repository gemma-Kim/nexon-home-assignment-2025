import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

@Catch()
export class HttpToRpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const rpcException = new RpcException({
        statusCode: exception.getStatus(),
        message: exception.message,
      });
      return super.catch(rpcException, host);
    }

    const rpcException = new RpcException({
      statusCode: 500,
      message: exception?.message || 'Internal Server Error',
    });
    return super.catch(rpcException, host);
  }
}
