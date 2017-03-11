export class Redmine {
    issue : {
        project_id: number,
        subject: string,
        priority_id: number,
        status_id: number,
        author_id: number,
        assigned_to_id: number,
        description: string,
        custom_fields: Object
    }

}