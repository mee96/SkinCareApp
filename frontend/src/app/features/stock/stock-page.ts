import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Plus,
  Trash2,
  ShoppingBag,
  Camera,
  ClipboardList,
  Star,
  PackagePlus,
} from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductService } from '../../core/services/product';
import { WishlistService } from '../../core/services/wishlist.service';
import { ProductReviewService } from '../../core/services/product-review.service';
import { AuthStore } from '../../core/stores/auth-store';
import { Product, SlotId } from '../../core/models/product';
import { WishlistItem } from '../../core/models/wishlist';
import { ProductReview } from '../../core/models/product-review';

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
  private wishlistService = inject(WishlistService);
  private productReviewService = inject(ProductReviewService);
  private authStore = inject(AuthStore);

  readonly PlusIcon = Plus;
  readonly Trash2Icon = Trash2;
  readonly WishlistIcon = ShoppingBag;
  readonly CameraIcon = Camera;
  readonly ClipboardIcon = ClipboardList;
  readonly StarIcon = Star;
  readonly PackagePlusIcon = PackagePlus;

  readonly stars = [1, 2, 3, 4, 5];

  readonly products = signal<Product[]>([]);
  readonly loading = signal<boolean>(true);

  // wishlist (llista de la compra)
  readonly wishlistItems = signal<WishlistItem[]>([]);

  // modal d'esborrar producte
  readonly showDeleteModal = signal<Product | null>(null);

  // popup de review
  readonly reviewProduct = signal<Product | null>(null);
  readonly reviewRating = signal<number>(0);
  readonly reviewNotes = signal<string>('');
  readonly currentReview = signal<ProductReview | null>(null);

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

    this.wishlistService.getByUser(uid).subscribe({
      next: (items) => this.wishlistItems.set(items),
    });
  }

  deleteProduct(product: Product): void {
    // optimista: traiem el producte del signal; si falla, el restaurem
    const previous = this.products();
    this.products.update((list) => list.filter((p) => p.id !== product.id));
    this.productService.delete(product.id).subscribe({
      error: () => this.products.set(previous),
    });
  }

  // --- Modal d'esborrar ---
  openDeleteModal(product: Product): void {
    this.showDeleteModal.set(product);
  }

  confirmDelete(): void {
    const product = this.showDeleteModal();
    if (!product) return;
    this.deleteProduct(product);
    this.showDeleteModal.set(null);
  }

  moveToWishlist(product: Product): void {
    const uid = this.authStore.uid();
    if (!uid) return;
    this.wishlistService.add(uid, product.name, product.brand, product.slot_id).subscribe({
      next: (item) => this.wishlistItems.update((list) => [...list, item]),
    });
    this.deleteProduct(product);
    this.showDeleteModal.set(null);
  }

  // --- Popup de review ---
  openReview(product: Product): void {
    const uid = this.authStore.uid();
    if (!uid) return;
    this.reviewProduct.set(product);
    this.reviewRating.set(0);
    this.reviewNotes.set('');
    this.currentReview.set(null);
    this.productReviewService.getForProduct(product.id, uid).subscribe({
      next: (review) => {
        this.currentReview.set(review);
        this.reviewRating.set(review.rating);
        this.reviewNotes.set(review.notes ?? '');
      },
      // si no existeix (404) deixem rating 0 i notes buides
      error: () => {},
    });
  }

  saveReview(): void {
    const uid = this.authStore.uid();
    const product = this.reviewProduct();
    if (!uid || !product) return;
    this.productReviewService
      .save(uid, product.id, this.reviewRating(), this.reviewNotes())
      .subscribe({
        next: (review) => {
          this.currentReview.set(review);
          this.closeReview();
        },
      });
  }

  closeReview(): void {
    this.reviewProduct.set(null);
  }

  // --- Wishlist ---
  addBackToStock(item: WishlistItem): void {
    const uid = this.authStore.uid();
    if (!uid) return;
    this.productService
      .addProduct(uid, item.product_name, item.brand ?? '', (item.slot_id as SlotId) ?? 'moisturizer')
      .subscribe({
        next: (product) => this.products.update((list) => [...list, product]),
      });
    this.removeFromWishlist(item.id);
  }

  removeFromWishlist(id: number): void {
    this.wishlistService.remove(id).subscribe({
      next: () => this.wishlistItems.update((list) => list.filter((w) => w.id !== id)),
    });
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
