import Layout from '@/components/layouts/admin';
import CreateOrUpdateCategoriesForm from '@/components/category/category-form';
import { useRouter } from 'next/router';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCategoryQuery } from '@/data/category';
import { useOfferQuery } from '@/data/offer';
import { Config } from '@/config';
import CreateOrUpdateOfferForm from '@/components/offers/offer-form';

export default function UpdateOfferPage() {
  const { query, locale } = useRouter();
  console.log(query)
  const { t } = useTranslation();
  const {
    offer,
    isLoading: loading,
    error,
  } = useOfferQuery({
    slug: query.offerSlug as string,
    language:
      query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  console.log(offer)
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-category')}
        </h1>
      </div>

      <CreateOrUpdateOfferForm 
      initialValues={
      offer
    }
      />
    </>
  );
}

UpdateOfferPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
