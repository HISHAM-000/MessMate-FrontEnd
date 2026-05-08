import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessService } from 'src/app/core/services/mess.service';

@Component({
  selector: 'app-mess-details',
  templateUrl: './mess-details.component.html',
  styleUrls: ['./mess-details.component.css']
})
export class MessDetailsComponent implements OnInit {

  messId!: number;
  mess: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messService: MessService
  ) {}

  ngOnInit(): void {
    this.messId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMess();
  }

  loadMess() {
    this.messService.getMessById(this.messId).subscribe({
      next: (res: any) => {
        this.mess = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔙 Back
  goBack() {
    this.router.navigate(['/admin/mess/approved']);
  }
}