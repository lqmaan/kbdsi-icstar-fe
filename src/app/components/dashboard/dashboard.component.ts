import { Component } from '@angular/core';

  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  handleButtonClick(buttonNumber: number) {
    alert(`Tombol ${buttonNumber} diklik!`);
    // Tambahkan logika atau tindakan khusus di sini
  }
  
}

