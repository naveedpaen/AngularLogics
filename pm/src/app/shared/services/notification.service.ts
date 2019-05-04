import { Injectable } from '@angular/core';
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';
import * as Enums from './enum.service';




@Injectable()
export class NotificationService {
  constructor(private toastyService: ToastyService) { }
  addToast(_title: string, _body: string, _messagetype?: Enums.messageType, _timeout?: number) {
    let toastTime = 5000;
    if (_timeout != null) {
      toastTime = _timeout;
    }
    const toastOptions: ToastOptions = {
      title: _title,
      msg: _body,
      showClose: true,
      timeout: toastTime,
      theme: 'default',
      onAdd: (toast: ToastData) => {
      },
      onRemove: function (toast: ToastData) {
        // console.log('Toast ' + toast.id + ' has been removed!');
      }
    };

    switch (_messagetype) {
      case Enums.messageType.default: this.toastyService.default(toastOptions); break;
      case Enums.messageType.Info: this.toastyService.info(toastOptions); break;
      case
      ce.wait(toastOptions); break;
      case Enums.messageType.Error: this.toastyService.error(toastOptions); break;
      case Enums.messageType.Warning: this.toastyService.warning(toastOptions); break;
      default: this.toastyService.success(toastOptions);
        break;
    }
  }
}

