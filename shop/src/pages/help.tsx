import Accordion from '@/components/ui/accordion';
import { faq } from '@/framework/static/faq';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { useEffect,useState } from 'react';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import client from '@/framework/client';
import Link from 'next/link';
import { HomeIconNew } from '@/components/icons/home-icon-new';

export default function HelpPage() {
       const [FaqList,setFaq]=useState([])
       const [isLoading,setIsLoading]=useState(true)

       useEffect(()=>{
        const getFaqList=async()=>{
            try {
              const data:any=await client?.faq?.get()
              setFaq(data)
              setIsLoading(false)
            } catch (error) {
            }
        }
        if(FaqList?.length===0){
           getFaqList()
        }
       },[])

       if(isLoading || FaqList?.length===0){
         return <Spinner />
       }

  return (
    <>
      <Seo title="Help" url="help" />
      <section className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <div className="w-full max-w-screen-lg mx-auto">
          <Link
            href={"/"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
          >
            <HomeIconNew />
            {"Back to Home"}
          </Link>
        </div>
        <header className="mb-8 text-center">
          <h1 className="text-xl font-bold md:text-2xl xl:text-3xl">
            FAQ
          </h1>
        </header>
        <div className="mx-auto w-full max-w-screen-lg">
          <Accordion items={FaqList} translatorNS="faq" />
        </div>
      </section>
    </>
  );
}

HelpPage.getLayout = getLayout;

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale!, ['common', 'faq'])),
//     },
//   };
// };
