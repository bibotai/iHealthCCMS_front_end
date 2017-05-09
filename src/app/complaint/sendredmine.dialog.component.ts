import {Component, OnInit, Optional} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {RedmineService} from '../services/redmine.service';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {redmineProjectIds} from '../config/app.config';
import {Member} from '../models/member';
import 'rxjs/add/operator/toPromise';

@Component({selector: 'sendredminedialog', templateUrl: './sendredmine.dialog.component.html', styleUrls: ['./sendredmine.dialog.component.css']})

export class SendRedmineDialog implements OnInit {
  constructor(@Optional()public dialog : MdDialog, public dialogRef : MdDialogRef < SendRedmineDialog >, private redmineService : RedmineService, private formbuilder : FormBuilder) {

    this.sendRedmineForm = this
      .formbuilder
      .group({
        issueTags: '',
        subject: '',
        description: '',
        receiver: '',
        department: '',
        productModel: '',
        region: '',
        version: '',
        layer: ''
      });

  };
  redmineProjectIds : any;
  issueTags : Object;
  receivers : Object;
  departments : Object;
  layers : Object;
  data : any;
  sendRedmineForm;
  disableButton : boolean = false;
  members : Member[];
  projectid : any;
  ngOnInit() : void {
    this.redmineProjectIds = this
      .redmineService
      .getRedmineEnumsArraybyName('redmineProjectIds');
    this.issueTags = this
      .redmineService
      .getRedmineEnumsArraybyName('issueTags');
    this.receivers = this
      .redmineService
      .getRedmineKeybyName("receiver");
    this.departments = this
      .redmineService
      .getRedmineKeybyName("department");
    this.layers = this
      .redmineService
      .getRedmineKeybyName("layer");
    this.data = this.dialogRef.componentInstance.data;
    console.log(this.data);
    //init 来源
    let src = '';

    src = '';
    if (this.data.orgin == "Itunes Connect") {
      src = 'Apple Store';
    } else if (this.data.orgin == "googlePlay") {
      src = 'Google Play';
    } else {
      src = 'FDA';
    }

    //项目
    if (src == "Apple Store" && this.data.appName == "GlucoSmart") 
      this.projectid = 1522;
    if (src == "Google Play" && this.data.appName == "GlucoSmart") 
      this.projectid = 1494;
    if (src == "Apple Store" && this.data.appName == "MyVitals") 
      this.projectid = 1545;
    if (src == "Google Play" && this.data.appName == "MyVitals") 
      this.projectid = 1546;
    
    //成员
    this.getRedmineMember(this.projectid);
    //描述
    let description = '';
    if (this.data.content.rewContent) {
      description += `原文：${this.data.content.rewContent}\n`;
    } else {
      description += `原文：${this.data.content.rewTitle}\n`
    }
    if (this.data.content.tranContentZh) {
      description += `中文翻译：${this.data.content.tranContentZh}\n`;
    }
    if (this.data.content.tranContent) {
      description += `英文翻译：${this.data.content.tranContent}\n`;
    }
    this.sendRedmineForm = this
      .formbuilder
      .group({
        issueTags: 9,
        subject: this.data.content.rewTitle
          ? this.data.content.rewTitle
          : this.data.content.rewContent,
        description: description,
        receiver: this.data.appName == 'MyVitals'
          ? '李澄'
          : '包磊',
        department: this.data.appName == 'MyVitals'
          ? 'iHealth MyVitals App'
          : 'iHealth iGluco App',
        productModel: '无',
        region: this.data.lang
          ? this.data.lang
          : '',
        version: this.data.appVersion
          ? this.data.appVersion
          : '未知版本',
        layer: 'app',
        rewDate: this.data.rewDate,

        orgin: src,
        orginId: this.data.orginId,
        id: this.data._id,
        projectId: this.projectid,
        //指派给
        member: this.data.appName == 'MyVitals'
          ? 110
          : 140
      })
  }

  getRedmineMember(pid) : void {
    console.log(pid);
    this
      .redmineService
      .getRedmineMemberByPid(pid)
      .then(members => {
        this.members = members
      });

  }

  sendRedmine() : void {
    this.disableButton = true;
    this
      .redmineService
      .sendToRedmine(this.sendRedmineForm.value)
      .then(data => {
        console.log(data);
        this
          .dialogRef
          .close(data);
      });

  }

}
