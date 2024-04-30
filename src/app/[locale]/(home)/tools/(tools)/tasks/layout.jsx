"use client";
import ToolHeader from "@/components/ToolHeader";
import React, { Suspense, useEffect } from "react";
import { Cog8ToothIcon, TrashIcon } from "@heroicons/react/20/solid";
import TaskSubMenu from "./components/TaskSubMenu";
import { useTranslation } from "react-i18next";
import { useTasks } from "@/hooks/useCommon";
import IconDropdown from "@/components/SettingsButton";
import FiltersTasks from "./components/filters/FiltersTasks";
import LoaderSpinner from "@/components/LoaderSpinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header/Header";

export default function TaskLayout({ children, table }) {
  const { t } = useTranslation();
  const { optionsSettings, optionsTrash } = useTasks();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	// useEffect(() => {
	// 	if (Number(params.get('page')) === 0 || !params.get('page')) {
	// 		params.set('page', 1);
	// 		replace(`${pathname}?${params.toString()}`);
	// 	}
	// }, []);
  
  return (
    <div className="flex flex-col flex-grow h-full">
			{/* <Header /> */}
      <ToolHeader
        title={t('tools:tasks:name')}
        route="/tools/tasks/task"
        Filters={FiltersTasks}
        toolButtons={(
          <>
            <IconDropdown
              icon={<TrashIcon className="h-8 w-8 text-primary" aria-hidden="true" />}
              options={optionsTrash}
              width="w-72"
            />
            <IconDropdown
              icon={<Cog8ToothIcon className="h-8 w-8 text-primary" aria-hidden="true" />}
              options={optionsSettings}
              width="w-[340px]"
              colorIcon="text-green-100"
              excel={t('leads:header:excel:export')}
            />
          </>
        )}
      >
        <div className="flex-none items-center justify-between  border-gray-200 py-4 hidden lg:flex">
          <TaskSubMenu />
        </div>
      </ToolHeader>
      <Suspense fallback={<LoaderSpinner/>}>
        {table}
        {children}
      </Suspense>
    </div>
  );
}
