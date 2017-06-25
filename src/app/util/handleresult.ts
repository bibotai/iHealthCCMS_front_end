import {Result} from '../models/result';
import {Injectable} from '@angular/core';
import {Token} from '../models/token'

/**
 * 处理结果类
 *
 * @export
 * @class HandleResult
 */
@Injectable()
export class HandleResult {

    /**
     * 处理结果
     *
     * @template T 要将body转换的泛型
     * @param {any} data api返回的data数据
     * @returns {Result} 返回Result类型
     * @memberof HandleResult
     */
    handleResult < T > (data) : Result {

        let objResult = new Result();
        let body = JSON.parse(data['_body']);
        if (body['success']) {

            objResult.content = body["data"]as T;
            objResult.success = true
        } else {
            objResult.success = false;
            objResult.errCode = Number(body['code']);
            objResult.errMessage = body['message'];
        }
        return objResult;

    }
    /**
     * 处理Token相关的结果
     *
     * @template T 要将body转换的泛型
     * @param {any} data api返回的data数据
     * @returns {Result} 返回Result类型
     * @memberof HandleResult
     */
    handleTokenResult < T > (data) : Result {

        let objResult = new Result();
        let body = JSON.parse(data['_body']);
        if (body['success']) {

            objResult.content = body as T;
            objResult.success = true
        } else {
            objResult.success = false;
            objResult.errCode = Number(body['code']);
            objResult.errMessage = body['message'];
        }
        return objResult;

    }
}