import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { MessageService } from './shared/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ideal';

  // receives msg
  messages: any[] = [];
  subscription: Subscription;
  
  constructor(private messageService: MessageService) {
      // subscribe to home component messages
      this.subscription = this.messageService.getMessage().subscribe(message => {
     debugger
        if (message) {
          this.messages.push(message);
        } else {
          // clear messages when empty message received
          this.messages = [];
        }
      });
  }
  
  ngOnDestroy() {
    debugger
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }
  
}
