//弹出层
import {SendRedmineDialog} from '../complaint/sendredmine.dialog.component';
import {IgnoreDialog} from '../complaint/ignore.dialog.component';
export class DiaglogService {
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
}