export class Zendesk {
    via : Via;
    events : any;
    metadata : any;
    author_id : number;
    created_at : string;
    ticket_id : number;
    id : string;
    changes : Array < Change >;
    creates : Array < Create >;
    comment : Comment;
    notification : Notification;
}

export class Via {
    source : any;
    channel : string;
}

// export class Eventcontent {     metadata : Metadata;     changes : Array <
// change >;     recipients : Array < any >;     type : string;     body :
// string;     public : boolean;     author_id : number;     attachmennts :
// Array < any >; }

export class Change {
    field_name : string;
    id : number;
    previous_value : string;
    value : string;
}

export class Create {
    field_name : string;
    id : number;
    value : string;
}

export class Notification {
    body : string;
    id : number
    recipients : Array < any >;
    subject : string
    via : Via;
}

export class Comment {
    attachments : Array < string >;
    audit_id : number
    author_id : number
    body : string;
    html_body : string;
    id : number;
    plain_body : string;
    public : boolean;
}
export class Metadata {
    longitude : string;
    latitude : string;
    location : string;
    ip_address : string;
    client : string;
}