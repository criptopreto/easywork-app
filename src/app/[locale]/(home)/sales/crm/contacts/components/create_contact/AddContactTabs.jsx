"use client"
import Button from "@/components/form/Button";
import useAppContext from "@/context/app";
import { contactDetailTabs } from "@/lib/common";
import { ArrowDownTrayIcon, Cog8ToothIcon, DocumentTextIcon, PlusIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import IconDropdown from "../SettingsButton";

export default function AddContactTabs() {
  const { t } = useTranslation();
  const {setContactDetailTab, contactDetailTab} = useAppContext();
  const tabs = [
    { name: t("contacts:create:tabs:general"), value: 0 },
    { name: t("contacts:create:tabs:policies"), value: 1 },
    { name: t("contacts:create:tabs:activities"), value: 2 },
    { name: t("contacts:create:tabs:reports"), value: 3 },
    { name: t("contacts:create:tabs:documents"), value: 4 },
  ];

  const settings = [
    {
      value: 0,
      name: t("contacts:create:download"),
      onclick: () => {},
      icon: ArrowDownTrayIcon
    },
    {
      value: 0,
      name: t("contacts:create:print"),
      onclick: () => {},
      icon: DocumentTextIcon
    }
  ]

  return (
    <div className="bg-white px-4 w-full rounded-lg">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          {t("contacts:create:select-page")}
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={tabs.find((tab) => tab.value).name}
        >
          {tabs.map((tab) => (
            <option className="text-gray-400" key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="flex justify-between items-center">
          <nav className="-mb-px flex space-x-8 p-2" aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => setContactDetailTab(contactDetailTabs[tab.value])}
                className={clsx(
                  tab.value === contactDetailTabs.indexOf(contactDetailTab)
                    ? "border-indigo-500 text-white bg-blue-100 rounded-md"
                    : tab.disabled
                    ? "border-transparent text-gray-300 cursor-default"
                    : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap p-2 text-sm font-medium cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </div>
            ))}
            <Button
              label={t("contacts:create:add")}
              buttonStyle="primary"
              icon={<PlusIcon className="h-4 w-4 text-white"/>}
            />
          </nav>
          <div>
            <IconDropdown
              icon={<Cog8ToothIcon className="h-8 w-8 text-primary" aria-hidden="true"/>}
              options={settings} 
              width="w-44" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}