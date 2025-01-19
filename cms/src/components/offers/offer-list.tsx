import Pagination from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { SortOrder } from '@/types';
import { useIsRTL } from '@/utils/locals';
import { useTranslation } from 'next-i18next';
import { Config } from '@/config';
import Link from '@/components/ui/link';
import LanguageSwitcher from '@/components/ui/lang-action/action';
import { Routes } from '@/config/routes';

export type IProps = {
  offers: any[] | undefined; 
  paginatorInfo: any | null; 
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const OfferList = ({
  offers,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation();
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
          title={'Title'}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'offerTitle'
          }
          isActive={sortingObj.column === 'offerTitle'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'offerTitle',
      key: 'offerTitle',
      align: alignLeft,
      width: 150,
      onHeaderCell: () => onHeaderClick('offerTitle'),
    },
    {
      title: t('Discount Type'),
      dataIndex: 'discountType',
      key: 'discountType',
      align: 'center',
      width: 150,
    },
    {
      title: t('buy quantity'),
      dataIndex: 'buyQuantity',
      key: 'buyQuantity',
      align: 'center',
      width: 100,
    },
    {
      title: t('get quantity'),
      dataIndex: 'getQuantity',
      key: 'getQuantity',
      align: 'center',
      width: 100,
    },
    {
      title: t('eligible products'),
      dataIndex: 'eligibleProducts',
      key: 'eligibleProducts',
      align: alignLeft,
      width: 180,
      render: (products: any[]) =>
        products?.map((product) => product.name || product.title || product._id).join(', ') || '—',
    },
    {
      title: t('free products'),
      dataIndex: 'freeProducts',
      key: 'freeProducts',
      align: alignLeft,
      width: 180,
      render: (products: any[]) =>
        products?.map((product) => product.name || product.title || product._id).join(', ') || '—',
    }
    ,
    {
      title: t('minimum purchase'),
      dataIndex: 'minimumPurchaseAmount',
      key: 'minimumPurchaseAmount',
      align: 'center',
      width: 120,
      render: (amount: number) =>
        `${'₹'}${amount.toFixed(2)}`,
    },
    // {
    //   title: t('usage restrictions'),
    //   dataIndex: 'usageRestrictions',
    //   key: 'usageRestrictions',
    //   align: 'center',
    //   width: 180,
    //   render: (restrictions: { perUser: number | null; globalLimit: number | null }) =>
    //     `Per User: ${restrictions?.perUser || '—'}, Global: ${restrictions?.globalLimit || '—'}`,
    // },
    {
      title: t('table:table-item-actions'),
      dataIndex: '_id',
      key: 'actions',
      align: alignRight,
      width: 290,
      render: (_id: string, record: any) => (
        <LanguageSwitcher
          slug={_id}
          record={record}
          deleteModalView="DELETE_OFFER"
          routes={Routes.offers}
        />
      ),
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={offers}
          rowKey="id"
          scroll={{ x: 1000 }}
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

export default OfferList;
