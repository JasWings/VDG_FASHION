import CheckboxGroup from './checkbox-group';
import { useState, useEffect, useMemo } from 'react';
import Checkbox from '@/components/ui/forms/checkbox/checkbox';
import { useRouter } from 'next/router';
import Scrollbar from '@/components/ui/scrollbar';
import { useTranslation } from 'next-i18next';
import { useCategories } from '@/framework/category';
import ErrorMessage from '@/components/ui/error-message';
import Spinner from '@/components/ui/loaders/spinner/spinner';

interface Props {
  categories: any[];
}

const CategoryFilterView = ({ categories }: Props) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const category = router.query.parent as string;
  const selectedValue = useMemo(
    () => router.query.category || '',
    [router.query.category]
  );
  const [state, setState] = useState<string>(selectedValue);

  useEffect(() => {
    if (selectedValue !== state) {
      setState(selectedValue);
    }
  }, [selectedValue]);

  function handleChange(value: string) {
    if (value !== state) {
      setState(value); // Update state to reflect selection
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          category: value,
        },
      });
    }
  }

  return (
    <div className="relative -mb-5 after:absolute after:bottom-0 after:flex after:h-6 after:w-full after:bg-gradient-to-t after:from-white ltr:after:left-0 rtl:after:right-0">
      <Scrollbar style={{ maxHeight: '400px' }} className="pb-6">
        <span className="sr-only">{t('text-categories')}</span>
        <div className="grid grid-cols-1 gap-4">
          <CheckboxGroup value={state} onChange={handleChange}>
            {categories.map((plan) => {
              if (plan.parent === null) return null;
              if (category && category !== plan.parent) return null;
              return (
                <Checkbox
                  key={plan._id}
                  label={plan.identity}
                  name={plan.identity}
                  value={plan._id}
                  theme="secondary"
                />
              );
            })}
          </CheckboxGroup>
        </div>
      </Scrollbar>
    </div>
  );
};


const CategoryFilter: React.FC<{ type?: any }> = ({ type }) => {
  const { query, locale } = useRouter();

  const { categories, isLoading, error } = useCategories({
    ...(type ? { type } : { type: query.searchType }),
    limit: 1000,
    type_id: query.group,
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-5">
        <Spinner className="h-6 w-6" simple={true} />
      </div>
    );
  return <CategoryFilterView categories={categories} />;
};

export default CategoryFilter;
