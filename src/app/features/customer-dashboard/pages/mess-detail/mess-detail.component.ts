import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mess } from 'src/app/shared/models/mess.model';
import { Plan } from 'src/app/shared/models/menu.model';
import { MessService } from 'src/app/core/services/mess.service';
import { PlanService } from 'src/app/core/services/plan.service';

@Component({
  selector: 'app-mess-detail',
  templateUrl: './mess-detail.component.html',
  styleUrls: ['./mess-detail.component.css']
})
export class MessDetailComponent implements OnInit {
  mess: Mess | undefined;
  plans: Plan[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messService: MessService,
    private planService: PlanService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.messService.getMessById(id).subscribe(mess => {
        this.mess = mess;
      });
      this.planService.getPlansByMessId(id).subscribe(plans => {
        this.plans = plans;
      });
    }
  }

  viewPlan(planId: number): void {
    this.router.navigate(['/customer/plan-detail', planId]);
  }

  goBack(): void {
    this.router.navigate(['/customer/browse-mess']);
  }
}
