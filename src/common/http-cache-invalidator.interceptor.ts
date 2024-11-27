import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { concatMap } from 'rxjs';

export const ENTITY_MANAGER_KEY = 'ENTITY_MANAGER';

@Injectable()
export class HttpCacheInvalidatorInterceptor implements NestInterceptor {
  constructor(
    private httpAdapterHost: HttpAdapterHost,
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      // concatMap gets called when route handler completes successfully
      concatMap(async (data) => {
        const path = this.reflector.getAllAndOverride('HTTP_PATH', [
          context.getClass(),
          context.getHandler(),
        ]);

        const request = context.switchToHttp().getRequest();
        const { httpAdapter } = this.httpAdapterHost;

        const endpoint: string = httpAdapter.getRequestUrl(request);
        const baseEndpoint = endpoint.split('/').slice(0, 4).join('/');
        const resultingEndpoint = path
          ? `${baseEndpoint}/${path}`
          : baseEndpoint;
        await this.cacheManager.del(resultingEndpoint);
        return data;
      }),
    );
  }
}
