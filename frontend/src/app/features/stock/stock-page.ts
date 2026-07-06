import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, PackageCheck, PackageX, TriangleAlert, Plus } from 'lucide-angular';
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
  imports: [FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './stock-page.html',
  styleUrl: './stock-page.css',
})
export class StockPage implements OnInit {
  private productService = inject(ProductService);
  private authStore = inject(AuthStore);

  readonly PackageCheckIcon = PackageCheck;
  readonly PackageXIcon = PackageX;
  readonly AlertIcon = TriangleAlert;
  readonly PlusIcon = Plus;

  readonly products = signal<Product[]>([]);
  readonly loading = signal<boolean>(true);

  // formulari d'afegir producte
  readonly showForm = signal<boolean>(false);
  readonly formName = signal<string>('');
  readonly formBrand = signal<string>('');
  readonly scannedSlot = signal<SlotId | null>(null);
  readonly formLoading = signal<boolean>(false);
  readonly formError = signal<string | null>(null);
  readonly scanLoading = signal<boolean>(false);

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

  openForm(): void {
    this.formName.set('');
    this.formBrand.set('');
    this.scannedSlot.set(null);
    this.formError.set(null);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
  }

  saveProduct(): void {
    const name = this.formName().trim();
    if (!name) {
      this.formError.set('Cal indicar un nom.');
      return;
    }
    const uid = this.authStore.uid();
    if (!uid) return;

    this.formError.set(null);
    this.formLoading.set(true);

    const scanned = this.scannedSlot();
    if (scanned) {
      // ja tenim el slot de la foto -> desem directament
      this.persistProduct(uid, name, scanned);
      return;
    }

    // sense foto -> demanem a la IA que classifiqui pel nom + marca
    this.productService.classifyProduct(name, this.formBrand().trim() || null).subscribe({
      next: (result) => this.persistProduct(uid, name, result.slot_id),
      error: () => {
        this.formError.set('No s\'ha pogut classificar el producte.');
        this.formLoading.set(false);
      },
    });
  }

  private persistProduct(uid: string, name: string, slot: SlotId): void {
    this.productService.addProduct(uid, name, this.formBrand().trim(), slot).subscribe({
      next: (product) => {
        this.products.update((list) => [...list, product]);
        this.formLoading.set(false);
        this.closeForm();
      },
      error: () => {
        this.formError.set('No s\'ha pogut desar el producte.');
        this.formLoading.set(false);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.scanLoading.set(true);
    this.formError.set(null);

    const reader = new FileReader();
    reader.onload = () => {
      // readAsDataURL retorna "data:image/jpeg;base64,XXXX" -> ens quedem la part base64
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1] ?? '';
      this.productService.scanImage(base64, file.type).subscribe({
        next: (result) => {
          if (result.name) this.formName.set(result.name);
          if (result.brand) this.formBrand.set(result.brand);
          // guardem el slot detectat per la foto per no tornar a classificar al desar
          this.scannedSlot.set(result.slot_id);
          this.scanLoading.set(false);
        },
        error: () => {
          this.formError.set('No s\'ha pogut analitzar la imatge.');
          this.scanLoading.set(false);
        },
      });
    };
    reader.onerror = () => {
      this.formError.set('No s\'ha pogut llegir el fitxer.');
      this.scanLoading.set(false);
    };
    reader.readAsDataURL(file);

    // permet tornar a seleccionar el mateix fitxer
    input.value = '';
  }
}
