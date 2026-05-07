import { Component, OnInit } from '@angular/core';
import { Mess } from 'src/app/shared/models/mess.model';
import { Plan } from 'src/app/shared/models/menu.model';
import { ActivatedRoute } from '@angular/router';
import { MessService } from 'src/app/core/services/mess.service';
import { PlanService } from 'src/app/core/services/plan.service';


@Component({
  selector: 'app-mess-detail',
  templateUrl: './mess-detail.component.html',
  styleUrls: ['./mess-detail.component.css']
})
export class MessDetailComponent implements OnInit {
   messId!: number;
  mess: any;
  plans: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private messService: MessService,
    private planService: PlanService
  ) { }

  ngOnInit(): void {
    this.messId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadMess();
    this.loadPlans();
  }
loadMess() {
    this.messService.getMessById(this.messId).subscribe({
      next: (res: any) => {
        this.mess = res.data; 
        console.log(this.mess);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  loadPlans() {
  this.planService.getPlansByMessId(this.messId).subscribe({
    next: (res: any) => {
      this.plans = res.data;
      console.log(this.plans);
    },
    error: (err) => console.error(err)
  });
}

}
