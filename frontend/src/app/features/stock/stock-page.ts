import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { LucideAngularModule, PackageCheck, PackageX, TriangleAlert } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductService } from '../../core/services/product';
import { AuthStore } from '../../core/stores/auth-store';
import { Product, SlotId } from '../../core/models/product';

const REQUIRED_SLOTS: SlotId[] = [
  'water-cleanser',
  'toner',
  'treatment-serum',
  'moisturizer',
  'spf',
];

@Component({
  selector: 'app-stock-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, TranslatePipe],
  templateUrl: './stock-page.html',
  styleUrl: './stock-page.css',
})
export class StockPage implements OnInit {
  private productService = inject(ProductService);
  private authStore = inject(AuthStore);

  readonly PackageCheckIcon = PackageCheck;
  readonly PackageXIcon = PackageX;
  readonly AlertIcon = TriangleAlert;

  readonly products = signal<Product[]>([]);
  readonly loading = signal<boolean>(true);

  readonly inStockProducts = computed(() => this.products().filter((p) => p.in_stock));
  readonly outOfStockProducts = computed(() => this.products().filter((p) => !p.in_stock));

  readonly missingSlots = computed<SlotId[]>(() => {
    const covered = new Set(this.inStockProducts().map((p) => p.slot_id));
    return REQUIRED_SLOTS.filter((slot) => !covered.has(slot));
  });

  ngOnInit(): void {
    const uid = this.authStore.uid();
    if (!uid) {
      this.loading.set(false);
      return;
    }

    this.productService.getByUser(uid).subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  toggleStock(product: Product): void {
    const next = !product.in_stock;
    // optimista: actualitzem el signal localment sense esperar resposta
    this.products.update((list) =>
      list.map((p) => (p.id === product.id ? { ...p, in_stock: next } : p))
    );
    this.productService.toggleStock(product.id, next).subscribe();
  }
}
