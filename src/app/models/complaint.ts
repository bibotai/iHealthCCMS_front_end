// 客诉对象  {         "_id": "586db5aa6c89f27631d12790",         "orginId":
// "gp:AOqpTOEqf07zw7u4-Fl4mESYE6YQxDpoY3J2F2N6QFH14z7rfxGRGQCwmCztmbM8MguTl2V_-
// Z -gR-3IcHs14g",         "orgin": "googlePlay",         "appName":
// "MyVitals",        "appVersion": "3.4.0",         "lang": "it_IT", "rewDate":
// "2017-01-05",         "__v": 0,         "ignoreRes": 0, "redminState": 0,
// "state": 0,         "flag": 0,         "content": { "tranContentZh":
// "甚至更少把天平上困扰我的网，因为如果WiFi
// SSD名是隐藏不连接，如果没有连接它，你不能进行测量。规模也给出一起去的应用“透过Runtastic英镑”，但不应该是。", "tranContent":
// "Even less to put the balance on the net I troubled, because if the WiFi SSD
// name is hidden does not connect, and if it is not connected you can not make
// the measurements. The scale is also given to go with the app &quot;runtastic
// pounds&quot; of, but should not be.",             "star": "1", "authorName":
// "Roberto Guerri",             "rewContent": "Anche meno\tPer mettere la
// bilancia in rete ho tribolato, perché se il nome SSD della WiFi è nascosto
// non si collega, e se non è collegata non si può fare le misurazioni. La
// bilancia è data anche per andare con la app \"runtastic libra\" di, ma non
// va."         },         "deviceInfo": { "device": "trlte",             "OS":
// "23",             "version": "27"  },         "saveDate":
// "2017-01-06T01:28:02.000Z"     },
export class Complaint {
    _id : string;
    orginId : string;
    orgin : string;
    appName : string;
    appVersion : string;
    rewDate : string;
    ignoreRes : Number;
    redminState : Number;
    state : Number;
    flag : Number;
    content : Object;
    deviceInfo : Object;
    saveDate : string;

}