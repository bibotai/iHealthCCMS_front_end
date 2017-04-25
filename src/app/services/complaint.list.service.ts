import {Injectable} from '@angular/core';

import {Complaint} from '../models/complaint';
import {ComplaintDisplay} from '../models/complaintdisplay';

@Injectable()
export class ComplaintListService {

    getComplaintsDisplay(complaints : Complaint[]) : ComplaintDisplay[] {
        let complaintsDisplayArr : ComplaintDisplay[] = [];
        complaints.forEach((complaint, index) => {
            let complaintDisplay = new ComplaintDisplay();
            complaintDisplay.id = (index + 1).toString();
            complaintDisplay._id = complaint._id;
            complaintDisplay.appname = complaint.appName;
            complaintDisplay.orgin = complaint.orgin;
            //complaintDisplay.raw = complaint; state，0未处理,1处理中,2已处理,3已忽略
            let state = '';
            let objButtonShow = {}
            switch (complaint.state) {
                case 0:
                    state = '未处理';
                    objButtonShow = {
                        isSendShow: true,
                        isIgnoreShow: true,
                        isFollowShow: true
                    }
                    complaintDisplay.raw = Object.assign(complaint, objButtonShow);
                    // console.log(complaintDisplay.raw);  {     isSendShow: true,     isIgnoreShow:
                    // false,     ...complaint }
                    break;
                case 1:
                    state = '处理中';

                    objButtonShow = {
                        isSendShow: false,
                        isIgnoreShow: false
                    }
                    complaintDisplay.raw = Object.assign(complaint, objButtonShow);
                    // complaintDisplay.raw = {     ...complaint,     isSendShow: false,
                    // isIgnoreShow: false }
                    break;
                case 2:
                    state = '已处理';
                    objButtonShow = {
                        isSendShow: false,
                        isIgnoreShow: false
                    }
                    complaintDisplay.raw = Object.assign(complaint, objButtonShow);
                    break;
                case 3:
                    state = '已忽略';
                    objButtonShow = {
                        isSendShow: false,
                        isIgnoreShow: false,
                        isReductionShow: true
                    }
                    complaintDisplay.raw = Object.assign(complaint, objButtonShow);
                case 4:
                    state = '需跟进';
                    objButtonShow = {
                        isSendShow: false,
                        isIgnoreShow: false,
                        isReductionShow: true
                    }
                    complaintDisplay.raw = Object.assign(complaint, objButtonShow);

            }
            complaintDisplay.state = state;
            let subject : string = complaint.content['rewTitle'];
            if (!complaint.content['rewTitle']) 
                subject = complaint.content['rewContent'];
            complaintDisplay.subject = subject.length > 18
                ? subject.substr(0, 18) + '...'
                : subject;

            complaintsDisplayArr.push(complaintDisplay);
        });
        // console.log(complaintsDisplayArr);
        return complaintsDisplayArr;

    }
    getTitleSid(action) : object {
        let titleSid = {
            title: '',
            sid: ''
        }
        if (action == 'all') {
            titleSid.title = '全部列表';
            titleSid.sid = '';
        } else if (action == 'notprocessed') {
            titleSid.title = '未处理列表';
            titleSid.sid = '0';

        } else if (action == 'processed') {
            titleSid.title = '已处理列表';
            titleSid.sid = '2';
        } else if (action == 'processing') {
            titleSid.title = '处理中列表';
            titleSid.sid = '1';
        } else if (action == 'ignored') {
            titleSid.title = '已忽略列表';
            titleSid.sid = '3';
        } else if (action == 'followup') {
            titleSid.title = '需跟进列表';
            titleSid.sid = '4';
        }

        return titleSid;

    }
}