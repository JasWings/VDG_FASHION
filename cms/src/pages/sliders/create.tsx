import Layout from '@/components/layouts/admin';
import CreateOrUpdateTypeForm from '@/components/group/group-form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import CreateOrUpdateSliderForm from '@/components/sliders/slider-form';

export default function CreateSliderPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Create New Slider
        </h1>
      </div>
      <CreateOrUpdateSliderForm />
    </>
  );
}
CreateSliderPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
