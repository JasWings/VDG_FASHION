import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import { useTranslation } from 'next-i18next';
import DrawerWrapper from '@/components/ui/drawer/drawer-wrapper';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';

const headerLinks = [
  // { href: Routes.shops, label: 'nav-menu-shops' },
  // { href: Routes.manufacturers, label: 'text-manufacturers' },
  // { href: Routes.authors, label: 'text-authors' },
  { href: Routes.coupons, label: 'Offers' },
  { href: Routes.help, label: 'FAQ' },
  { href: Routes.contactUs, label: 'Contact' },
];

export default function MobileMainMenu() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [_, closeSidebar] = useAtom(drawerAtom);

  function handleClick(path: string) {
    router.push(path);
    closeSidebar({ display: false, view: '' });
  }

  return (
    <DrawerWrapper>
      <ul className="grow">
        {headerLinks.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <button
              onClick={() => handleClick(href)}
              className="flex cursor-pointer items-center py-3 px-5 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent md:px-8"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </DrawerWrapper>
  );
}
