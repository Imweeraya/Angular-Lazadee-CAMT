import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'store',
  templateUrl: 'store.component.html',
})
export class StoreComponent {
    selectedCategory: string | undefined;
    productsPerPage = 4;
    selectedPage = 1;

  constructor(private repository: ProductRepository,
    private cart: Cart,
    private router: Router) {}

  get products(): Product[] {
    //return this.repository.getProducts();
    //return this.repository.getProducts(this.selectedCategory); //เลือก catagory
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.repository
      .getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
    this.changePage(this.selectedPage); //check page if more than pageNumbers it will be turn to page 1
  }

  changePage(newPage: number) {
    if(newPage <= this.pageNumbers.length){
      this.selectedPage = newPage;
    }else{
      this.selectedPage = 1;
    }
      
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize); //ต้อง convert to number ก่อน เพราะค่าที่ได้รับมาจาก html เป็น string เสมอ
    this.changePage(1);
  }

  get pageNumbers(): number[] {
    return Array(
      Math.ceil(
        this.repository.getProducts(this.selectedCategory).length /
          this.productsPerPage
      )
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  addProductToCart(product:Product){
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }


}