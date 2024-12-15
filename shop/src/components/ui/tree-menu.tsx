import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { ExpandLessIcon } from '@/components/icons/expand-less-icon';
import { ExpandMoreIcon } from '@/components/icons/expand-more-icon';
import { getIcon } from '@/lib/get-icon';
import * as CategoryIcons from '@/components/icons/category';
import { useEffect, useState } from 'react';
import { drawerAtom } from '@/store/drawer-atom';
import { useAtom } from 'jotai';

interface TreeMenuItemProps {
  item: any;
  className?: string;
  depth?: number;
  filterLoading:any;
  setFilterLoading:any
}
const TreeMenuItem: React.FC<TreeMenuItemProps> = ({
  className,
  item,
  depth = 0,
  filterLoading,
  setFilterLoading
}) => {
  const router = useRouter();
  const active = router?.query?.category;
  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { slug, identity , children: items, icon } = item;
  const [{ display }, setDrawerState] = useAtom(drawerAtom);
  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  function onClick() {
    setFilterLoading(true)
    const { pathname, query } = router;
    const navigate = () =>
      router.push(
        {
          pathname,
          query: {  category: slug },
        },
        undefined,
        {
          scroll: false,
        }
      )
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
      // setFilterLoading(false)
      navigate();
    } else {
      navigate();
      display && setDrawerState({ display: false, view: '' });
      // setFilterLoading(false)
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <ExpandLessIcon className="h-3 w-3" />
    ) : (
      <ExpandMoreIcon className="h-3 w-3" />
    );
  }
  
  return (
    <>
      <motion.li
        initial={false}
        animate={{ backgroundColor: '#ffffff' }}
        onClick={onClick}
        className="rounded-md py-1"
      >
        <button
          className={cn(
            'flex w-full items-center py-2 font-semibold text-body-dark outline-none transition-all ease-in-expo  focus:text-accent focus:outline-0 focus:ring-0 ltr:text-left rtl:text-right',
            isOpen ? 'text-accent' : 'text-body-dark',
            className ? className : 'text-sm'
          )}
        >
          { (
            <span className="flex h-5 w-5 items-center justify-center ltr:mr-4 rtl:ml-4">
              {getIcon({
                iconList: CategoryIcons,
                iconName: icon,
                className: 'h-full w-full',
              })}
            </span>
          )}
          <span>{identity}</span>
          <span className="ltr:ml-auto ltr:mr-4 rtl:ml-4 rtl:mr-auto">
            {expandIcon}
          </span>
        </button>
      </motion.li>
      <AnimatePresence initial={false}>
        {Array.isArray(items) && isOpen ? (
          <li>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="text-xs ltr:ml-4 rtl:mr-4"
            >
              {items.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <TreeMenuItem
                    key={`${currentItem.identity}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn('text-sm text-body ltr:ml-5 rtl:mr-5')}
                    filterLoading={filterLoading}
                    setFilterLoading={setFilterLoading}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
      </AnimatePresence>
    </>
  );
};
interface TreeMenuProps {
  items: any[];
  className?: string;
  filterLoading:any;
  setFilterLoading:any
}

function TreeMenu({ items, className,filterLoading,setFilterLoading }: TreeMenuProps) {
  
  return (
    <ul className={cn('text-xs', className)}>
      {items?.map((item: any) => (
        <TreeMenuItem filterLoading={filterLoading} setFilterLoading={setFilterLoading} key={`${item.identity}${item.slug}`} item={item} />
      ))}
    </ul>
  );
}

export default TreeMenu;
