import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bike,
  CalendarDays,
  Clock3,
  MapPin,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  Copy,
  CreditCard,
  FileText,
  FolderGit2,
  Inbox,
  Layers,
  ListTree,
  LoaderCircle,
  Maximize2,
  MessageCircle,
  Moon,
  Palette,
  Settings,
  Sparkles,
  Sun,
  Terminal,
  X,
  ZoomIn,
  type LucideProps,
} from 'lucide-react';

// One visual language for server-rendered pages and interactive components.
// Icons are decorative: their neighbouring text or control supplies the label.
const icons = {
  'alert-triangle': AlertTriangle,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'book-open': BookOpen,
  bike: Bike,
  calendar: CalendarDays,
  clock: Clock3,
  'map-pin': MapPin,
  check: Check,
  'check-circle': CheckCircle2,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  compass: Compass,
  copy: Copy,
  'credit-card': CreditCard,
  'file-text': FileText,
  'folder-git': FolderGit2,
  inbox: Inbox,
  layers: Layers,
  'list-tree': ListTree,
  'loader-circle': LoaderCircle,
  maximize: Maximize2,
  'message-circle': MessageCircle,
  moon: Moon,
  palette: Palette,
  settings: Settings,
  sparkles: Sparkles,
  sun: Sun,
  terminal: Terminal,
  x: X,
  'zoom-in': ZoomIn,
} as const;

const sizes = { sm: 20, md: 24, lg: 28, xl: 40 } as const;

export type IconName = keyof typeof icons;
type IconProps = Omit<LucideProps, 'name' | 'ref' | 'size' | 'width' | 'height' | 'strokeWidth' | 'absoluteStrokeWidth' | 'children'> & {
  name: IconName;
  size?: keyof typeof sizes;
};

export function Icon({ name, size = 'md', className, ...props }: IconProps) {
  const LucideIcon = icons[name];
  return (
    <LucideIcon
      {...props}
      className={['site-icon', className].filter(Boolean).join(' ')}
      size={sizes[size]}
      strokeWidth={3}
      aria-hidden="true"
      focusable="false"
      data-icon={name}
    />
  );
}
