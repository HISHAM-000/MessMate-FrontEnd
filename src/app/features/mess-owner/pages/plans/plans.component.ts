import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  plans : any[] = [];
  
  constructor(private planService : PlanService){}

  ngOnInit(){
    this.loadPlans();
  }
  loadPlans(){
    this.planService.getPlans().subscribe({
      next : (res: any) =>{
        console.log("plans",res);
        this.plans = res.data || res;
      },
      error : (err) =>{
        console.error("Error",err);
      }
    });
  }
}
