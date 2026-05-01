import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mess } from 'src/app/shared/models/mess.model';
import { MessService } from 'src/app/core/services/mess.service';

@Component({
  selector: 'app-browse-mess',
  templateUrl: './browse-mess.component.html',
  styleUrls: ['./browse-mess.component.css']
})
export class BrowseMessComponent implements OnInit {
  messes: Mess[] = [];

  constructor(private messService: MessService, private router: Router) { }

  ngOnInit(): void {
    this.messService.getAllMesses().subscribe(messes => {
      this.messes = messes;
    });
  }

  viewMess(id: number): void {
    this.router.navigate(['/customer/mess-detail', id]);
  }
}
