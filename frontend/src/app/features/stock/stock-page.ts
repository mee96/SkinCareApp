import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product';
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-stock-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stock-page.html',
  styleUrl: './stock-page.css',
})
export class StockPage implements OnInit {
  private productService = inject(ProductService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal<boolean>(true);

  ngOnInit(): void {
    this.productService.getByUser('test-uid-001').subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}