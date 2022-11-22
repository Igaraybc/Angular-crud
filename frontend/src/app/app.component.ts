import { Component } from '@angular/core';
import { AutoLogoutService } from './services/auto-logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    // Inject service
    private autoLogout: AutoLogoutService
  ) { }

  ngOnInit(){
    this.autoLogout;
  }
}
