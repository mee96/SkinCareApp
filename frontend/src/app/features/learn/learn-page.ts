import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideAngularModule, Search, ListOrdered, FlaskConical, Sun, ChevronLeft, type LucideIconData } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';

type ArticleFormat = 'checklist-groups' | 'numbered-groups' | 'groups' | 'prose';

interface Article {
  id: string;
  icon: LucideIconData;
  key: string;
  format: ArticleFormat;
  itemCount: number; // quants ítems/paràgrafs/grups té
}

const ARTICLES: Article[] = [
  { id: 'skin-type', icon: Search, key: 'skinType', format: 'checklist-groups', itemCount: 5 },
  { id: 'routine-steps', icon: ListOrdered, key: 'routineSteps', format: 'numbered-groups', itemCount: 6 },
  { id: 'ingredients-by-concern', icon: FlaskConical, key: 'ingredientsByConcern', format: 'groups', itemCount: 7 },
  { id: 'spf-importance', icon: Sun, key: 'spfImportance', format: 'prose', itemCount: 3 },
];

@Component({
  selector: 'app-learn-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, TranslatePipe],
  templateUrl: './learn-page.html',
  styleUrl: './learn-page.css',
})
export class LearnPage {
  readonly articles = ARTICLES;
  readonly selected = signal<Article | null>(null);
  readonly ChevronLeftIcon = ChevronLeft;
  readonly iconSize = 20;

  itemIndexes(article: Article): number[] {
    return Array.from({ length: article.itemCount }, (_, i) => i);
  }

  open(article: Article): void {
    this.selected.set(article);
  }

  closeArticle(): void {
    this.selected.set(null);
  }
}