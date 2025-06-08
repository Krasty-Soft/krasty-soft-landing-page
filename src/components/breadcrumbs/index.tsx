'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nameMap: Record<string, string> = {
  blog: 'Blog',
  'case-studies': 'Case Studies',
  about: 'About us',
  careers: 'Careers',
  industries: 'Industries',
  services: 'Services',
};

export function Breadcrumbs({ isDark = false } : { isDark?: boolean }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { name: 'Krasty Soft', href: '/' },
    ...segments.map((segment, i) => {
      const href = '/' + segments.slice(0, i + 1).join('/');
      const isLast = i === segments.length - 1;
      const label = nameMap[segment] ?? decodeURIComponent(segment).replace(/-/g, ' ');
      return { name: label, href, isLast };
    }),
  ];

  return (
    <div aria-label="Breadcrumb">
      <ol className="flex text-sm text-gray-600 gap-1 overflow-x-auto">
        {breadcrumbs.map((crumb, index) => {
          const isActive = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center gap-1">
              {index > 0 && <span>/</span>}
              {isActive ? (
                <span className="text-dark-grey whitespace-nowrap">{crumb.name}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className={`${isDark ? 'text-white' : 'text-black'} hover:underline whitespace-nowrap`}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
