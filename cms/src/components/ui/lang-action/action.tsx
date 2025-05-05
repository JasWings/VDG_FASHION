import ActionButtons from '@/components/common/action-buttons';
import { Config } from '@/config';
import LanguageAction from './language-switcher';
import { useRouter } from 'next/router';

export type LanguageSwitcherProps = {
  record: any;
  slug: string;
  deleteModalView?: string | any;
  routes: any;
  className?: string | undefined;
  id:any
  showEditIcon?: boolean; // Add this prop
};

export default function LanguageSwitcher({
  record,
  slug,
  deleteModalView,
  routes,
  id,
  className,
  showEditIcon = true, // Default to true
}: LanguageSwitcherProps) {
  const { enableMultiLang } = Config;
  const {
    query: { shop },
  } = useRouter();
  return (
    <>
      {enableMultiLang ? (
        <LanguageAction
          slug={slug}
          record={record}
          deleteModalView={deleteModalView}
          routes={routes}
          className={className}
        />
      ) : (
        <ActionButtons
          id={id ? id : record?.uuid}
          editUrl={showEditIcon ? routes.editWithoutLang(slug, shop) : undefined} // Conditionally pass editUrl
          deleteModalView={deleteModalView}
        />
      )}
    </>
  );
}
