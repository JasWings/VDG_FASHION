import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { LangSwitcherIcon } from '@/components/icons/lang-switcher-icon';
import { languageMenu } from '@/lib/locals';
import Cookies from 'js-cookie';
import CountryFlag from "react-country-flag"
// import { useCountry } from '@/store/country/country.context';
import Icons from "rendered-country-flags"
import Image from 'next/image';
import client from '@/framework/client';
import { showToast } from './toast/toast';
import { authorizationAtom } from '@/store/authorization-atom';
import { useAtom } from 'jotai';
import { useModalAction } from './modal/modal.context';


export default function LanguageSwitcher() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { asPath, locale, locales } = router;
  // const {CountryList,selectedCountry,setSelectedCountry,updateCountry}=useCountry()
  const [isAuthorize]=useAtom(authorizationAtom)
  const {openModal}=useModalAction()

  let filterItem = languageMenu?.filter((element) =>
    locales?.includes(element?.id)
  );

  const currentSelectedItem = locale
    ? filterItem?.find((o) => o?.value === locale)!
    : filterItem[2];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);


  const changeCountryHandler=async(option:any)=>{
        if(isAuthorize){
          try {
            const response:any=await client.products.changeCountry({country_code:option.country_code})
            showToast(response.message,"success")
            window.location.reload()
          } catch (error) {
            showToast("something wrong try again","error")
          }
        }else{
          showToast("Login to continue","warning")
          openModal("LOGIN_VIEW")
        }

  }
  
  return (
    <Listbox >
      {({ open }) => (
        <div className="ms-2 lg:ms-0 relative z-10 xl:w-[130px]">
          <Listbox.Button className="relative flex h-full w-full cursor-pointer items-center rounded text-[13px] font-semibold focus:outline-0 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 xl:h-auto xl:w-full xl:border xl:border-solid xl:border-[#CFD3DA] xl:bg-white xl:py-2 xl:text-sm xl:text-heading xl:ltr:pl-3  xl:ltr:pr-7 xl:rtl:pl-7 xl:rtl:pr-3">
            <span className="relative block h-[38px] w-[38px] overflow-hidden rounded-full xl:hidden">
              <span className="relative top-[3px] block">
                {selectedItem.iconMobile}
              </span>
            </span>
            {/* <CountryFlag countryCode={"US"} svg style={{ marginRight: '8px' }} /> */}
            <span className="hidden items-center truncate xl:flex">
              <span className="text-xl ltr:mr-3 rtl:ml-3">
                {/* {selectedItem.icon} */}
               {/* {Icons[selectedCountry?.country_code]&&<Image 
                width={28}
                height={20}
                src={`${Icons[selectedCountry?.country_code]}`}
                alt={selectedCountry?.identity}
                />
               } */}
              </span>{' '}
              
            </span>
            <span className="pointer-events-none absolute inset-y-0 hidden items-center ltr:right-0 ltr:pr-2 rtl:left-0 rtl:pl-2 xl:flex">
              <LangSwitcherIcon className="text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className={`absolute mt-1 max-h-60 w-[130px] overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-0 ltr:right-0 rtl:left-0 xl:w-full`}
            >
              {CountryList?.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${active ? 'bg-gray-100 text-amber-900' : 'text-gray-900'}
												relative cursor-pointer select-none py-2 px-3`
                  }
                  value={option?.identity}
                  onClick={()=>changeCountryHandler(option)}
                >
                  {({ selected, active }) => (
                    <span className="flex items-center">
                      <span className="text-xl">{option.icon}</span>
                      <span
                        className={`${
                          option?.identity===""? 'font-medium' : 'font-normal'
                        } block truncate ltr:ml-1.5 rtl:mr-1.5`}
                      >
                        {option?.identity}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && 'text-amber-600'}
                                 absolute inset-y-0 flex items-center ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3`}
                        />
                      ) : null}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
