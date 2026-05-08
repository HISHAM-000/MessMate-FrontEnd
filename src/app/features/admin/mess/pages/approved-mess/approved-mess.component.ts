import { Component, OnInit } from '@angular/core';
import { MessService } from 'src/app/core/services/mess.service';

@Component({
  selector: 'app-approved-mess',
  templateUrl: './approved-mess.component.html',
  styleUrls: ['./approved-mess.component.css']
})
export class ApprovedMessComponent implements OnInit {

  messes: any[] = [];
  loading = true;

  constructor(private messService: MessService) {}

  ngOnInit(): void {
    this.loadMesses();
  }

  loadMesses() {
    this.loading = true;

    this.messService.getAllMess().subscribe({
      next: (res: any) => {
        this.messes = res.data || res || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
