"use client";
import useAppContext from "../../../../../../context/app";
import EmailHeader from "./components/EmailHeader";
import React, { useState, useEffect } from "react";
import CreateTaskButton from "./components/CreateTaskButton";
import {
  Cog8ToothIcon,
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  FolderIcon,
} from "@heroicons/react/20/solid";
import {
  ChevronUpIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  PauseCircleIcon,
  ExclamationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import TaskSubMenu from "./components/TaskSubMenu";
import { useTranslation } from "react-i18next";
import SliderOverEmail from "./components/SliderOverEmail";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WebmailLayout({ children, table }) {
  const router = useRouter();
  const { sidebarOpenEmail, setSidebarOpenEmail } = useAppContext();
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1023) {
      setTimeout(() => {
        setSidebarOpenEmail(true);
      }, 1000);
    } else {
     
    }
  }, [setSidebarOpenEmail]);
  
  function backButton() {
    setSidebarOpenEmail(false);
    router.push("/tools/tool/mails");
  }
  

  return (
    <div className="flex flex-col flex-grow">
      <EmailHeader
        title="Tareas"
        ActionButton={CreateTaskButton}
        ToolsButtons={
          <>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Cog8ToothIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            </button>
          </>
        }
      >
        <div className="flex-none items-center justify-between  border-gray-200 py-4 hidden lg:flex">
          <TaskSubMenu />
        </div>
      </EmailHeader>
      <SliderOverEmail>
        <div className="flex flex-col h-16 shrink-0 items-center mx-auto mt-10">
          <Link href="/">
            <Image
              width={72}
              height={72}
              className="h-16 w-auto"
              src="/img/Layer_2.svg"
              alt="EasyWork"
            />
          </Link>
          <div className="mt-3">
            {/* image */}
            <div className="flex items-center">
              <div className="flex border border-white p-1.5 rounded-lg text-white">
                <Image
                  width={45}
                  height={45}
                  alt="img"
                  className="rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />
                <div className="ml-2">
                  <h1 className="font-bold">Armando Graterol</h1>
                  <p className="text-xs">info</p>
                </div>
                <div className="flex items-center mb-1">
                  <ChevronUpIcon className="ml-2 h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-center ml-1.5 border border-white rounded-full">
                <ArrowPathIcon className="m-1 h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="w-full my-4">
            <p className="text-xs text-white text-left">
              HERRAMIENTAS - CORREO
            </p>
          </div>
          <div className="w-full">
            <button
              onClick={() => backButton()}
              className="w-full bg-white text-easywork-main py-2 rounded-lg"
            >
              volver
            </button>
            <button className="flex justify-between w-full bg-violet-500 py-3 rounded-lg my-2 text-white font-bold">
              <div className="flex">
                <ChevronDownIcon className="ml-2 h-5 w-5" />
                INBOX
              </div>
              <div>
                <PauseCircleIcon className="mr-2 h-6 w-6" />
              </div>
            </button>
          </div>
          <ul className="w-full">
            <li className="text-left text-white flex p-4">
              <BookmarkIcon className="h-6 w-6 text-white" />
              <h3 className="ml-4 text-md">Archivados</h3>
            </li>
            <li className="text-left text-white flex p-4">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
              <h3 className="ml-4 text-md">Enviados</h3>
            </li>
            <li className="text-left text-white flex p-4">
              <HeartIcon className="h-6 w-6 text-white" />
              <h3 className="ml-4 text-md">Guardados</h3>
            </li>
            <li className="text-left text-white flex p-4">
              <ExclamationCircleIcon className="h-6 w-6 text-white" />
              <h3 className="ml-4 text-md">Spam</h3>
            </li>
            <li className="text-left text-white flex p-4">
              <FolderIcon className="h-6 w-6 text-white" />
              <h3 className="ml-4 text-md">Borradores</h3>
            </li>
            <li className="text-left text-white flex p-4">
              <TrashIcon className="h-6 w-6 text-white" />
              <h3 className="ml-4 text-md">Basura</h3>
            </li>
          </ul>
        </div>
      </SliderOverEmail>
      {table}
      {children}
    </div>
  );
}
