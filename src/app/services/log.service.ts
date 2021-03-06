import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({id: null, text: null, log_date: null});
  selctedLog = this.logSource.asObservable();
  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [
      {id: '1', text: 'Generate', log_date: new Date('12/26/2017 12:34:34')},
      {id: '2', text: 'create login button', log_date: new Date('12/27/2017 1:34:34')},
      {id: '3', text: 'create my home', log_date: new Date('12/28/2017 4:14:34')}
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setForm(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

  }

  clearState() {
    this.stateSource.next(true);
  }

}
