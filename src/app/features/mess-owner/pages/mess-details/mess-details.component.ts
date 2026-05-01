import { Component, OnInit } from '@angular/core';
import { MessService } from '../../services/mess.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mess-details',
  templateUrl: './mess-details.component.html',
  styleUrls: ['./mess-details.component.css']
})
export class MessDetailsComponent implements OnInit{
  mess : any;
  isLoading = true;

  constructor(private messService : MessService,
    private toastr : ToastrService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.loadMess();
  }

  loadMess(){
    this.messService.getMyMess().subscribe({
      next : (res : any) =>{
        this.mess = res.data || res;
        this.isLoading = false;
      },
      error : (err) =>{
        console.error(err);
        this.toastr.error("Failed to load mess");
        this.isLoading = false;
      }
    })
  }

  showDeleteModal = false;

openModal() {
  this.showDeleteModal = true;
}

closeModal() {
  this.showDeleteModal = false;
}

confirmDelete() {
  if (!this.mess?.id) return;

  this.messService.deleteMess(this.mess.id).subscribe({
    next: () => {
      this.toastr.success("Mess deleted successfully");
      this.closeModal();
      this.router.navigate(['/owner/dashboard']);
    },
    error: (err: any) => {
      console.error(err);
      this.toastr.error(err?.error?.message || "Delete failed");
    }
  });
}
}
