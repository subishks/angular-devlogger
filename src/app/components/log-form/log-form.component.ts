import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  log_text: string;
  log_date: any;
  is_new: boolean=true;



  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.selctedLog.subscribe(log => {
      if (log.id !== null) {
        this.id = log.id;
        this.is_new = false;
        this.log_text = log.text;
        this.log_date = log.log_date;
      }
    });
  }

  onSubmit() {
    if(this.is_new) {
      const newLog = {
        id: this.generateID(),
        text: this.log_text,
        log_date: new Date()
      };
      this.logService.addLog(newLog);

    } else {
      const updLog = {
        id: this.id,
        text: this.log_text,
        log_date: new Date()
      };
      this.logService.updateLog(updLog)

    }
    this.clearState();

  }

  clearState() {
    this.is_new=true;
    this.id=null;
    this.log_text = null;
    this.log_date = null;
    this.logService.clearState();
  }


  generateID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

}
