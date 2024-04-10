'use client';
import React from "react";
import { ChevronDownIcon, Cog8ToothIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ContactSubMenu from "./ContactSubMenu";
import { useTranslation } from "react-i18next";
import Button from "@/components/form/Button";
import useAppContext from "@/context/app";
import IconDropdown from "./SettingsButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FaMagnifyingGlass } from "react-icons/fa6";
import FiltersContact from "./FiltersContact";

export default function ContactsHeader() {
  const { t } = useTranslation();
  const { setOpenModal } = useAppContext();

  const settings = [
    {
      value: 0,
      name: t("contacts:header:settings:vcard"),
      onclick: () => {},
    },
    {
      value: 1,
      name: t("contacts:header:settings:gmail"),
      onclick: () => {},
    },
    {
      value: 2,
      name: t("contacts:header:settings:outlook"),
      onclick: () => {},
    },
    {
      value: 3,
      name: t("contacts:header:settings:yahoo"),
      onclick: () => {},
    },
    {
      value: 4,
      name: t("contacts:header:settings:import"),
      onclick: () => {},
    },
    {
      value: 5,
      name: t("contacts:header:settings:crm"),
      onclick: () => {},
    },
    {
      value: 6,
      name: t("contacts:header:settings:csv"),
      onclick: () => {},
    },
    {
      value: 7,
      name: t("contacts:header:settings:excel"),
      onclick: () => {},
    },
    {
      value: 8,
      name: t("contacts:header:settings:export"),
      onclick: () => {},
    },
    {
      value: 9,
      name: t("contacts:header:settings:control"),
      onclick: () => {},
    },
    {
      value: 10,
      name: t("contacts:header:settings:search"),
      onclick: () => {},
    },
    {
      value: 11,
      name: t("contacts:header:settings:entity"),
      onclick: () => {},
    },
  ]

  const trash = [
    {
      value: 0,
      name: t("contacts:header:delete:remove"),
      icon: XMarkIcon,
      onclick: () => {},
    },
    {
      value: 1,
      icon: TrashIcon,
      name: t("contacts:header:delete:trash"),
      onclick: () => {},
    },

  ]

  return (
    <header className="flex flex-col">
      <div className="lg:px-6 px-2 flex gap-3 items-center bg-white py-4 rounded-md flex-wrap">
        <h1 className="text-2xl font-semibold leading-6 text-gray-900 hidden md:block">          
          {t('contacts:header:contact')}
        </h1>
        <Button 
          label={t('contacts:header:create')}
          type="button"
          onclick={() => setOpenModal(true)}
          buttonStyle={"primary"}
          icon={<ChevronDownIcon className="ml-2 h-5 w-5 text-white"/>}
          className="px-3 py-2"
        />
        <div className="flex-grow">
          <div className="flex border px-1 py-1 bg-gray-300 items-center rounded-md gap-x-2">
            <FiltersContact/>
            <div className="flex items-center w-full">
              <FaMagnifyingGlass className="h-4 w-4 text-primary"/>
              <input
                type="search"
                name="search"
                id="search-cal"
                className="block w-full py-1.5 text-primary placeholder:text-primary sm:text-sm border-0 focus:ring-0 bg-gray-300"
                placeholder={t('contacts:header:search')}
              />
            </div>
          </div>
        </div>
        
        <IconDropdown 
          icon={<TrashIcon className="h-8 w-8 text-primary" aria-hidden="true"/>}
          options={trash} 
          width="w-72"
        />
        <IconDropdown 
          icon={<Cog8ToothIcon className="h-8 w-8 text-primary" aria-hidden="true"/>}
          options={settings} 
          width="w-[340px]"
        />
      </div>
      <div className="flex-none items-center justify-between  border-gray-200 py-4 hidden lg:flex">
        <ContactSubMenu />
      </div>
    </header>
  );
}