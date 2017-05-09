import {Injectable} from '@angular/core';
import {redmineEnums} from '../models/enums/redmine'
import {Headers, Http} from '@angular/http';
import {Redmine} from '../models/redmine';
import {Member} from '../models/member';
import 'rxjs/add/operator/toPromise';
import {baseApiUrl} from '../config/app.config';
class SelectObject {
    value : string;
    viewValue : string;
}
@Injectable()
export class RedmineService {
    constructor(private http : Http) {}

    /**
     *
     * 获取redmine枚举中的一组对象
     * @param {string} name
     * @returns {*}
     *
     * @memberOf RedmineService
     */
    getRedmineEnumsbyName(name : string) : any {return redmineEnums[name]};

    /**
     * 获取redmine枚举中的一组对象，返回SelectObject数组
     *
     * @param {string} name
     * @returns {SelectObject[]}
     *
     * @memberOf RedmineService
     */
    getRedmineEnumsArraybyName(name : string) : SelectObject[] {
        let enumsArray : SelectObject[] = [];

        let enums = this.getRedmineEnumsbyName(name);

        Object
            .keys(enums)
            .map((key, index) => {
                let objSelectObject : SelectObject = new SelectObject();
                objSelectObject.value = enums[key];
                objSelectObject.viewValue = key.toString();
                enumsArray.push(objSelectObject);

            });
        console.log(enumsArray);
        return enumsArray;
    };

    /**
     *
     * 获取redmine枚举中的一组对象，返回SelectObject类型
     * @param {string} name
     * @returns {SelectObject[]}
     *
     * @memberOf RedmineService
     */
    getRedmineKeybyName(name : string) : SelectObject[] {
        let enumsArray : SelectObject[] = [];

        let enums = this.getRedmineEnumsbyName(name);

        Object
            .keys(enums)
            .map((key, index) => {
                let objSelectObject : SelectObject = new SelectObject();
                objSelectObject.value = key;
                objSelectObject.viewValue = key.toString();
                enumsArray.push(objSelectObject);

            });

        return enumsArray;
    };

    private baseApiUrl = baseApiUrl;

    formatDate = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10
            ? '0' + m
            : m;
        var d = date.getDate();
        d = d < 10
            ? ('0' + d)
            : d;
        return y + '-' + m + '-' + d;
    };

    /**
     *
     * 发送到redmine
     * @param {*} objFrom
     *
     * @memberOf RedmineService
     */
    sendToRedmine(objFrom : any) : Promise < string > {
        console.log(objFrom);
        const issue = {
            "issue": {
                "project_id": objFrom.projectId,
                "subject": objFrom.subject.length > 30
                    ? objFrom
                        .subject
                        .substr(0, 30) + '...'
                    : objFrom.subject,
                "priority_id": 2,
                "status_id": 1,
                "author_id": 183,
                "assigned_to_id": objFrom.member,
                "description": objFrom.description,
                "tracker_id": objFrom.issueTags,
                "custom_fields": [
                    {
                        "id": 44,
                        "name": "客诉时间",
                        "value": objFrom.rewDate.length > 11
                            ? objFrom
                                .rewDate
                                .substring(0, 10)
                            : objFrom.rewDate

                    }, {
                        "id": 46,
                        "name": "客诉接收时间",
                        "value": this.formatDate(new Date())
                    }, {
                        "id": 47,
                        "name": "客诉接收人",
                        "value": objFrom.receiver
                    }, {
                        "id": 42,
                        "name": "客诉来源",
                        "value": objFrom.orgin
                    }, {
                        "id": 43,
                        "name": "客诉产品型号",
                        "value": objFrom.productModel
                    }, {
                        "id": 45,
                        "name": "客诉处理部门",
                        "value": objFrom.department
                    }, {
                        "id": 25,
                        "name": "App版本",
                        "value": objFrom.version
                    }, {
                        "id": 11,
                        "name": "测试方法",
                        "value": "手动测试"
                    }, {
                        "id": 12,
                        "name": "测试设备",
                        "value": ""
                    }, {
                        "id": 13,
                        "name": "复现概率",
                        "value": "100%"
                    }, {
                        "id": 26,
                        "name": "Zendesk编号",
                        "value": ""
                    }, {
                        "id": 27,
                        "name": "手机型号",
                        "value": ""
                    }, {
                        "id": 28,
                        "name": "手机系统版本",
                        "value": ""
                    }, {
                        "id": 29,
                        "name": "下位机型号",
                        "value": ""
                    }, {
                        "id": 30,
                        "name": "下位机版本",
                        "value": ""
                    }, {
                        "id": 31,
                        "name": "责任归属",
                        "value": ""
                    }, {
                        "id": 32,
                        "name": "结论",
                        "value": ""
                    }, {
                        "id": 33,
                        "name": "地区",
                        "value": objFrom.region
                    }, {
                        "id": 34,
                        "name": "模块",
                        "value": ""
                    }, {
                        "id": 35,
                        "name": "版本",
                        "value": objFrom.version
                    }, {
                        "id": 36,
                        "name": "代码优化",
                        "value": ""
                    }, {
                        "id": 37,
                        "name": "Bug分类",
                        "value": ""
                    }, {
                        "id": 39,
                        "name": "层",
                        "multiple": true,
                        "value": [objFrom.layer]
                    }, {
                        "id": 48,
                        "name": "orginId",
                        "value": objFrom.id
                    }
                ]

            }

        }
        return new Promise < string > ((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            console.log('issue', JSON.stringify(issue));
            this
                .http
                .post(this.baseApiUrl + 'redmine/insert', {
                    'issue': issue,
                    'id': objFrom.id
                }, {headers: headers})
                .subscribe(data => {
                    resolve('ok');
                }, error => {
                    reject(JSON.stringify(error.json()));
                });
        });
    }

    ignore(_id, reason, type) : Promise < string > {

        const data = {
            "_id": _id,
            "ingnoreRes": reason,
            "state": type
        };
        console.log(data);
        return new Promise < string > ((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this
                .http
                .post(this.baseApiUrl + 'ignore', data, {headers: headers})
                .subscribe(data => {
                    resolve('ok');
                }, error => {
                    reject(JSON.stringify(error.json()));
                });
        })

    }

    reduction(_id) : Promise < string > {

        const data = {
            "_id": _id,
            "state": 0
        };
        console.log(data);
        return new Promise < string > ((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this
                .http
                .post(this.baseApiUrl + 'ignore', data, {headers: headers})
                .subscribe(data => {
                    resolve('ok');
                }, error => {
                    reject(JSON.stringify(error.json()));
                });
        })

    }

    getRedmineState(pids : Array < number >) : Promise < string > {
        return new Promise < string > ((resolve, reject) => {
            console.log('refresh redmine state');
            let data = {
                'pids': pids
            }
            this
                .http
                .post(`${this.baseApiUrl}redmine/list`, data)
                .subscribe(data => {
                    resolve('ok');
                    console.log('ok');
                }, error => {
                    reject(JSON.stringify(error.json()));
                });

        });
    }

    getRedmineMemberByPid(pid : number) : Promise < Member[] > {
        return new Promise < Member[] > ((resolve, reject) => {
            this
                .http
                .get(`${this.baseApiUrl}redmine/member?pid=${pid}`)
                .toPromise()
                .then(data => {
                    let memberships = data
                        .json()
                        .data
                        .memberships as Member[];
                    resolve(memberships);
                }, error => {
                    reject(JSON.stringify(error.json()));
                });
        });
    }

    // sendToRedmine()

}