import Pagination from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { getIcon } from '@/utils/get-icon';
import * as categoriesIcon from '@/components/icons/category';
import { SortOrder } from '@/types';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Category, MappedPaginatorInfo } from '@/types';
import { Config } from '@/config';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import LanguageSwitcher from '@/components/ui/lang-action/action';
import { getImageURL } from '@/utils/image';

export type IProps = {
  categories: Category[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const CategoryList = ({
  categories,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const { alignLeft, alignRight } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 60,
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-title')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
          }
          isActive={sortingObj.column === 'name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'identity',
      key: 'identity',
      align: alignLeft,
      width: 150,
      onHeaderCell: () => onHeaderClick('name'),
    },
    // {
    //   title: t('table:table-item-details'),
    //   dataIndex: 'details',
    //   key: 'details',
    //   ellipsis: true,
    //   align: alignLeft,
    //   width: 200,
    // },
    {
      title: t('table:table-item-image'),
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 180,

      render: (image: any, { name }: { name: string }) => {
        if (!image) return null;

        return (
          <div className="relative mx-auto h-10 w-10">
            <Image
              src={ getImageURL(image) ?? '/'}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw"
              className="overflow-hidden rounded object-fill"
            />
          </div>
        );
      },
    },
    // {
    //   title: t('table:table-item-icon'),
    //   dataIndex: 'icon',
    //   key: 'icon',
    //   align: 'center',
    //   width: 120,
    //   render: (icon: string) => {
    //     if (!icon) return null;
    //     return (
    //       <span className="flex items-center justify-center">
    //         {getIcon({
    //           iconList: categoriesIcon,
    //           iconName: icon,
    //           className: 'w-5 h-5 max-h-full max-w-full',
    //         })}
    //       </span>
    //     );
    //   },
    // },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-slug')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'slug'
          }
          isActive={sortingObj.column === 'slug'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'slug',
      key: 'slug',
      align: alignLeft,
      width: 150,
      onHeaderCell: () => onHeaderClick('slug'),
    },
    {
      title: t('table:table-item-group'),
      dataIndex: 'type_id',
      key: 'type',
      align: 'center',
      width: 120,
      render: (type_id: any) => (
        <div
          className="overflow-hidden truncate whitespace-nowrap"
          title={type_id?.name}
        >
          {type_id?.name}
        </div>
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: '_id',
      key: 'actions',
      align: alignRight,
      width: 290,
      render: (_id: string, record: Category) => (
        <LanguageSwitcher
          slug={_id}
          record={record}
          deleteModalView="DELETE_CATEGORY"
          routes={Routes?.category}
        />
      ),
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={categories}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => ' ',
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default CategoryList;
