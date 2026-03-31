import { Link } from 'react-router-dom';
import Logo from './Logo';

const REPO_URL = 'https://github.com/narainkarthikv/ownlyst';

const links = {
  project: [
    { label: 'Open app', to: '/app', kind: 'internal' as const },
    { label: 'GitHub repo', href: REPO_URL, kind: 'external' as const },
    {
      label: 'Issues & roadmap',
      href: `${REPO_URL}/issues`,
      kind: 'external' as const,
    },
  ],
  community: [
    {
      label: 'Contributing',
      href: `${REPO_URL}/blob/develop/CONTRIBUTING.md`,
      kind: 'external' as const,
    },
    {
      label: 'Code of conduct',
      href: `${REPO_URL}/blob/develop/CODE_OF_CONDUCT.md`,
      kind: 'external' as const,
    },
    {
      label: 'Security policy',
      href: `${REPO_URL}/blob/develop/SECURITY.md`,
      kind: 'external' as const,
    },
  ],
  legal: [
    {
      label: 'MIT License',
      href: `${REPO_URL}/blob/develop/MIT-LICENSE.txt`,
      kind: 'external' as const,
    },
    {
      label: 'Documentation',
      href: `${REPO_URL}/blob/develop/README.md`,
      kind: 'external' as const,
    },
    {
      label: 'Release notes',
      href: `${REPO_URL}/releases`,
      kind: 'external' as const,
    },
  ],
};

function FooterLink({
  item,
}: {
  item:
    | { label: string; to: string; kind: 'internal' }
    | { label: string; href: string; kind: 'external' };
}) {
  const className =
    'text-gray-400 hover:text-white transition-colors text-sm inline-flex w-fit';

  if (item.kind === 'internal') {
    return (
      <Link className={className} to={item.to}>
        {item.label}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={item.href}
      target='_blank'
      rel='noopener noreferrer'>
      {item.label}
    </a>
  );
}

function FooterSection({
  title,
  items,
}: {
  title: string;
  items: Array<
    | { label: string; to: string; kind: 'internal' }
    | { label: string; href: string; kind: 'external' }
  >;
}) {
  return (
    <div className='space-y-3'>
      <h4 className='text-xs font-semibold tracking-widest text-gray-300 uppercase'>
        {title}
      </h4>
      <ul className='space-y-2'>
        {items.map((item) => (
          <li key={item.label}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className='bg-gray-900 dark:bg-black text-white py-12 px-4 md:px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10'>
          <div className='space-y-4 max-w-md'>
            <div className='flex items-center'>
              <Logo size={32} />
              <div className='ml-2'>
                <div className='text-blue-400 text-xl font-bold'>Ownlyst</div>
                <div className='text-gray-400 text-sm'>
                  Privacy-first notes that actually respect you.
                </div>
              </div>
            </div>

            <div className='text-gray-400 text-sm space-y-1'>
              <p>✓ No accounts, ever</p>
              <p>✓ No tracking, never</p>
              <p>✓ No data mining, not even a little</p>
            </div>
          </div>

          <nav
            aria-label='Footer'
            className='grid grid-cols-2 sm:grid-cols-3 gap-8 w-full lg:w-auto lg:min-w-[520px]'>
            <FooterSection title='Project' items={links.project} />
            <FooterSection title='Community' items={links.community} />
            <FooterSection title='Legal' items={links.legal} />
          </nav>
        </div>

        <div className='border-t border-gray-700 pt-6 mt-10'>
          <p className='text-gray-400 text-xs text-center'>
            © 2026 Ownlyst. Made with 💚 by people who care about your privacy.
          </p>
        </div>
      </div>
    </footer>
  );
}
