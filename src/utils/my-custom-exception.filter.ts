/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ExceptionFilter, ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { Request, Response } from "express";


@Catch(HttpException)
export class MyCustomExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        res.status(exception.getStatus())
            .json({
                timestamp: new Date().toLocaleString(),
                message: exception.message,
                path: req.url,
                statusCode: exception.getStatus()
            });
    };
}