import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-send-to-app',
  templateUrl: './send-to-app.component.html',
  styleUrls: ['./send-to-app.component.css']
})
export class SendToAppComponent  {
constructor(private messageService: MessageService) { }
sendMessage(): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage('Message from Sender Component to App Component!');
}

clearMessages(): void {
    this.messageService.clearMessages();
}


}
