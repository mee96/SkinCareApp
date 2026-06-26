import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideAngularModule, Search, ListOrdered, FlaskConical, Sun, ChevronLeft, type LucideIconData } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';

interface Article {
  id: string;
  icon: LucideIconData;
  key: string; // arrel dins de learn.articles.* al JSON
  contentLength: number; // quants paràgrafs té (per iterar-los)
}

const ARTICLES: Article[] = [
  { id: 'skin-type', icon: Search, key: 'skinType', contentLength: 6 },
  { id: 'routine-steps', icon: ListOrdered, key: 'routineSteps', contentLength: 6 },
  { id: 'ingredients-by-concern', icon: FlaskConical, key: 'ingredientsByConcern', contentLength: 7 },
  { id: 'spf-importance', icon: Sun, key: 'spfImportance', contentLength: 4 },
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

  paragraphIndexes(article: Article): number[] {
    return Array.from({ length: article.contentLength }, (_, i) => i);
  }

  open(article: Article): void {
    this.selected.set(article);
  }

  closeArticle(): void {
    this.selected.set(null);
  }
}