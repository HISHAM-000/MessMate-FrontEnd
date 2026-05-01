import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { MessService } from '../../services/mess.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-day',
  templateUrl: './menu-day.component.html',
  styleUrls: ['./menu-day.component.css']
})
export class MenuDayComponent implements OnInit {

  day!: string;
  messId!: number;
  menuId: number | null = null;

  isLoading = true;

  showModal = false;
  isEdit = false;
  editItemId!: number;

  menuItems: any[] = [];
  breakfast: any[] = [];
  lunch: any[] = [];
  dinner: any[] = [];

  form: any = {
    name: '',
    description: '',
    mealSlot: 0,
    isVeg: true,
    isAvailable: true
  };

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private messService: MessService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.day = this.route.snapshot.paramMap.get('day')!;
    this.loadMess();
  }

  loadMess() {
    this.messService.getMyMess().subscribe({
      next: (res: any) => {
        const mess = res.data || res;
        this.messId = mess.id;
        this.loadMenu();
      },
      error: () => {
        this.toastr.error("Failed to load mess");
      }
    });
  }

  loadMenu() {
    const dayNum = this.dayToNumber(this.day);

    this.menuService.getMenu(this.messId, dayNum).subscribe({
      next: (res: any) => {
        const data = res.data || res;

        console.log("MENU RESPONSE:", data);

        if (!data || (Array.isArray(data) && data.length === 0)) {
          this.menuId = null;
          this.menuItems = [];
        } else {
          this.menuId = data.id || data.menuId;
          this.menuItems = data.items || [];
        }

        this.groupMeals();
        this.isLoading = false;
      },
      error: () => {
        this.menuId = null;
        this.menuItems = [];
        this.isLoading = false;
      }
    });
  }

  createMenu() {
    const payload = {
      messId: this.messId,
      day: this.dayToNumber(this.day)
    };

    this.menuService.createMenu(payload).subscribe({
      next: () => {
        this.toastr.success("Menu created");
        this.loadMenu();
      },
      error: () => {
        this.toastr.error("Failed to create menu");
      }
    });
  }

  groupMeals() {
    this.breakfast = this.menuItems.filter(x => x.mealSlot === 0);
    this.lunch = this.menuItems.filter(x => x.mealSlot === 1);
    this.dinner = this.menuItems.filter(x => x.mealSlot === 2);
  }

  openAdd(slot: number) {

    if (!this.menuId) {
      this.toastr.warning("Create menu first");
      return;
    }

    this.showModal = true;
    this.isEdit = false;

    this.form = {
      name: '',
      description: '',
      mealSlot: slot + 1,
      isVeg: true,
      isAvailable: true
    };
  }

  openEdit(item: any) {
    this.showModal = true;
    this.isEdit = true;
    this.editItemId = item.id;

    this.form = {
      name: item.name,
      description: item.description,
      mealSlot: item.mealSlot,
      isVeg: item.isVeg,
      isAvailable: item.isAvailable
    };
  }

  saveItem() {
    if (this.isEdit) {
      this.updateItem();
    } else {
      this.addItem();
    }
  }

  addItem() {

  const payload = {
    menuId: this.menuId,
    name: this.form.name,
    description: this.form.description,
    mealSlot: this.form.mealSlot,
    isVeg: this.form.isVeg,
    isAvailable: this.form.isAvailable
  };

  console.log("ADD PAYLOAD:", payload);

  this.menuService.addItems(payload).subscribe({
    next: () => {
      this.toastr.success("Item added");
      this.afterSave();
    },
    error: (err) => {
      console.error(err);
      this.toastr.error("Failed to add item");
    }
  });
}

  updateItem() {
    const payload = {
      name: this.form.name,
      description: this.form.description,
      mealSlot: this.form.mealSlot,
      isVeg: this.form.isVeg,
      isAvailable: this.form.isAvailable
    };

    this.menuService.updateItem(this.editItemId, payload).subscribe({
      next: () => {
        this.toastr.success("Item updated");
        this.afterSave();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Update failed");
      }
    });
  }

  deleteItem(id: number) {
    this.menuService.deleteItem(id).subscribe({
      next: () => {
        this.toastr.success("Item deleted");
        this.loadMenu();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Delete failed");
      }
    });
  }

  afterSave() {
    this.showModal = false;
    this.loadMenu();
  }

  dayToNumber(day: string): number {
    const map: any = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    };
    return map[day];
  }
}