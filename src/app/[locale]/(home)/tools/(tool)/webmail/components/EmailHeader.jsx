import React from "react";
import { useTranslation } from "react-i18next";

export default function ToolHeader({
  title,
  ActionButton,
  ToolsButtons,
  children,
}) {
  const { t } = useTranslation();
  return (
    <header className="flex flex-col">
      <div className="lg:px-6 px-2 flex justify-between items-center bg-gray-300 py-4 rounded-md">
        {/* <h1 className="text-2xl font-semibold leading-6 text-gray-900 hidden md:block">
          {title}
        </h1> */}
        <div className="flex gap-3 items-center">
          {ActionButton}
          <div className="bg-white flex justify-around rounded-md py-2 px-4">
            <button className="bg-easywork-main flex text-white rounded-md px-2">
              Filtros <span className="ml-1 font-semibold">INBOX</span>
            </button>
            <p className="text-easywork-main ml-2">Busqueda</p>
          </div>
        </div>
        {/* <div className="flex-grow">
          <label htmlFor="search" className="sr-only">
            {t('tools:tasks:search')}
          </label>
          <input
            type="search"
            name="search"
            id="search-cal"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={t('tools:tasks:search')}
          />
        </div> */}
        {ToolsButtons}
      </div>

      {children}
    </header>
  );
}
