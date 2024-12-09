import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { languageMenu } from '@/utils/locals';
import { ToggleIcon } from '@/components/icons/toggle-icon';
import {
  offset,
  flip,
  autoUpdate,
  useFloating,
  shift,
} from '@floating-ui/react-dom-interactions';
import ActionButtons from '@/components/common/action-buttons';
import LanguageListbox from './lang-list-box';
import PopOver from '@/components/ui/popover';

export type LanguageSwitcherProps = {
  record: any;
  slug: string;
  deleteModalView?: string | any;
  routes: any;
  className?: string | undefined;
};

const LanguageSwitcher = ({
  record,
  slug,
  deleteModalView,
  routes,
  className = '',
}: LanguageSwitcherProps) => {
  const router = useRouter();
  const { locales, locale } = router;

  let filterItem = [...languageMenu]?.filter((element) =>
    locales?.includes(element?.id)
  );

  let options = [...filterItem]?.filter(
    (filter) =>
      !record?.translated_languages?.find(
        (translated: any) => translated === filter?.value
      )
  );

  let filterTranslatedItem = [...languageMenu]
    ?.filter((element) => record?.translated_languages?.includes(element?.id))
    .filter((item: any) => !locale?.includes(item?.id));

  const { x, y, reference, floating, strategy, update, refs } = useFloating({
    strategy: 'fixed',
    placement: 'bottom',
    middleware: [offset(20), flip(), shift()],
  });

  // This one is for recalculating the position of the floating element if no space is left on the given placement
  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update]);

  return (
    <div className={`flex w-full items-center justify-end gap-5 ${className}`}>
      <ActionButtons
        id={record?.id}
        editUrl={routes.editWithoutLang(slug)}
        deleteModalView={deleteModalView}
      />
      {router.locale && (
        // <Popover className="relative inline-block">
        //   <Popover.Button
        //     className="p-2 text-base opacity-80 transition duration-200 hover:text-heading"
        //     ref={reference}
        //   >
        //     <ToggleIcon width={20} />
        //   </Popover.Button>
        //   <div
        //     ref={floating}
        //     style={{
        //       position: strategy,
        //       top: y ?? '',
        //       left: x ?? '',
        //       zIndex: 1,
        //     }}
        //   >
        //     <Popover.Panel className="w-[18rem] max-w-[20rem] overflow-hidden rounded bg-[#F7F8F9] px-4 shadow-translatePanel sm:px-0">
        //       {options?.length ? (
        //         <LanguageListbox
        //           title={t('text-non-translated-title')}
        //           items={options}
        //           translate="false"
        //           slug={slug}
        //           id={record?.id}
        //           routes={routes}
        //         />
        //       ) : (
        //         ''
        //       )}
        //       {filterTranslatedItem?.length ? (
        //         <LanguageListbox
        //           title={t('text-translated-title')}
        //           items={filterTranslatedItem}
        //           translate="true"
        //           slug={slug}
        //           id={record?.id}
        //           routes={routes}
        //         />
        //       ) : (
        //         ''
        //       )}
        //     </Popover.Panel>
        //   </div>
        // </Popover>
        // <PopOver>
        //   {options?.length ? (
        //     <LanguageListbox
        //       title={t('text-non-translated-title')}
        //       items={options}
        //       translate="false"
        //       slug={slug}
        //       id={record?.id}
        //       routes={routes}
        //     />
        //   ) : (
        //     ''
        //   )}
        //   {filterTranslatedItem?.length ? (
        //     <LanguageListbox
        //       title={t('text-translated-title')}
        //       items={filterTranslatedItem}
        //       translate="true"
        //       slug={slug}
        //       id={record?.id}
        //       routes={routes}
        //     />
        //   ) : (
        //     ''
        //   )}
        // </PopOver>
        <div></div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
