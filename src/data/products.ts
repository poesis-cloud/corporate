export interface Product {
  href: string;
  label: string;
}

export const products: Product[] = [
  { href: '/standard', label: 'GSM' },
  { href: '/sie', label: 'Systemic Intelligence Engine' },
  { href: '/itip', label: 'IT Intelligence Platform' },
  { href: '/framework', label: 'SAFe Agentic Framework' },
];
