export type ArticleVisualKind =
  | 'hierarchy' | 'compare' | 'choices' | 'memory' | 'target' | 'journey'
  | 'states' | 'empty' | 'checkout' | 'checklist' | 'type' | 'colour'
  | 'spacing' | 'responsive' | 'tokens' | 'themes' | 'feedback' | 'motion'
  | 'direction' | 'handoff' | 'roles' | 'research' | 'dashboard' | 'pricing'
  | 'pipeline' | 'permissions' | 'report' | 'scope';

export interface ArticleVisual {
  kind: ArticleVisualKind;
  title: string;
  caption: string;
  labels: string[];
}
