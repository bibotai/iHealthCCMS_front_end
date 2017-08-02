import {Observable} from 'rxjs/Rx';
import {SendRedmineDialog} from '../complaint/sendredmine.dialog.component';
import {IgnoreDialog} from '../complaint/ignore.dialog.component';
import {ConfirmDialog} from '../utilcomponent/confirmdialog.component';
import {MdDialogRef, MdDialog, MdDialogConfig} from '@angular/material';
export class DiaglogService {
    // constructor(private dialog : MdDialog) {};
    openRedmineDialog(dialog, raw, callback) : void {
        let dialogRef = dialog.open(SendRedmineDialog);
        dialogRef.componentInstance.data = raw;
        dialogRef
            .afterClosed()
            .subscribe((data) => {
                if (data) {
                    if (data == 'ok') 
                        callback();
                    }
                });

    }

    openIgnoreDialog(dialog, raw, type, callback) : void {
        let dialogRef = dialog.open(IgnoreDialog);
        dialogRef.componentInstance.data = Object.assign(raw, {ignoretype: type});
        console.log(dialogRef.componentInstance.data);
        dialogRef
            .afterClosed()
            .subscribe(data => {
                if (data) {
                    if (data == 'ok') 
                        callback();
                    }
                });
    }

    public confirm(dialog, title : string, message : string) : Observable < boolean > {

        let dialogRef: MdDialogRef < ConfirmDialog >;

        dialogRef = dialog.open(ConfirmDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}