import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import AttributeList from '@/components/attribute/attribute-list';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SortOrder } from '@/types';
import { useState } from 'react';
import { adminOnly } from '@/utils/auth-utils';
import LinkButton from '@/components/ui/link-button';

import { useRouter } from 'next/router';
import { useAttributesQuery } from '@/data/attributes';

export default function AttributePage() {
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { locale } = useRouter();

  const { attributes, loading, error } = useAttributesQuery({
    orderBy,
    sortedBy,
    language: locale,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  console.log(attributes)
  return (
    <>
      <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-xl font-semibold text-heading">
            {t('common:sidebar-nav-item-attributes')}
          </h1>
        </div>
        <div className="flex w-full flex-col items-center ms-auto md:w-3/4 md:flex-row xl:w-2/4">
            <LinkButton
              href={`/attributes/create`}
              className="mt-5 h-12 w-full md:mt-0 md:w-auto md:ms-auto"
            >
              <span>
                + {t('form:button-label-add')} {t('common:attribute')}
              </span>
            </LinkButton>

        </div>
      </Card>
      <AttributeList
        attributes={attributes?.data}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}

AttributePage.authenticate = {
  permissions: adminOnly,
};

AttributePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
