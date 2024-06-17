"use client";
import LoaderSpinner from "@/src/components/LoaderSpinner";
import IconDropdown from "@/src/components/SettingsButton";
import {
  Cog8ToothIcon,
  ExclamationTriangleIcon,
  FireIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import OptionsTask from "../../components/OptionsTask";
import DropdownSelect from "../../components/DropdownSelect";
import Button from "@/src/components/form/Button";
import ButtonMore from "../../components/ButtonMore";
import TabsTask from "../../components/Tabs/TabsTask";
import moment from "moment";
import TaskEditor from "../TaskEditor";
import { putTaskCompleted } from "@/src/lib/apis";
import { toast } from "react-toastify";
import { handleApiError } from "@/src/utils/api/errors";
import { useTask } from "@/src/lib/api/hooks/tasks";
import { useTasksConfigs } from "@/src/hooks/useCommon";
import { useSWRConfig } from "swr";
import { formatDate } from "@/src/utils/getFormatDate";
import DatePicker from 'react-datepicker';
import { formatISO, parseISO } from "date-fns";
import { Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';
import clsx from "clsx";
import useAppContext from "@/src/context/app";

export default function TaskView({ id }) {
  const { task, isLoading, isError } = useTask(id);
  const { lists } = useAppContext();
  const { t } = useTranslation();
  const { settings } = useTasksConfigs();
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(true);
  const [value, setValueText] = useState(task ? task.description : "");
  const [openEdit, setOpenEdit] = useState(null);
  const { mutate } = useSWRConfig();

  const handleDateChange = (date) => {
    console.log('Nueva fecha:', date);
  };

  const getValues = (name) => {
    // Simulación de obtención de valores (puede ser desde un formulario)
    return console.log(name);
  };

  const setValue = (name, value, options) => {
    // Simulación de establecimiento de valores (puede ser desde un formulario)
    console.log(`Setting ${name} to`, value, options);
  };

  const field = {}; // Pasar props adicionales del campo si es necesario
  const errors = {}; // Pasar errores de validación si es necesario


  const getCompletedTask = async () => {
    try {
      setLoading(true);
      await putTaskCompleted(task.id);
      toast.success(t("tools:tasks:completed-success"));
      setLoading(false);
      await mutate(`/tools/tasks/${task.id}`);
    } catch (error) {
      setLoading(false);
      handleApiError(error.message);
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col h-screen relative w-full overflow-y-auto">
        <div
          className={`flex flex-col flex-1 bg-gray-600 opacity-100 shadow-xl text-black rounded-tl-[35px] rounded-bl-[35px] p-2 sm:p-4 h-full overflow-y-auto`}
        >
          <LoaderSpinner />
        </div>
      </div>
    );
  if (isError) return <>Error al cargar la tarea</>;
  return (
    <div className="flex flex-col h-screen relative w-full overflow-y-auto">
      {loading && <LoaderSpinner />}
      <div
        className={`flex flex-col flex-1 bg-gray-600 opacity-100 shadow-xl text-black rounded-tl-[35px] rounded-bl-[35px] p-2 sm:p-4 h-full overflow-y-auto`}
      >
        {openEdit?.mode !== "copy" && <div className="flex justify-between items-center py-2">
          <h1 className="text-xl font-medium">{task?.name}</h1>
          <IconDropdown
            icon={
              <Cog8ToothIcon
                className="h-8 w-8 text-primary"
                aria-hidden="true"
              />
            }
            options={settings}
            width="w-44"
          />
        </div>}
        <div className="w-full flex gap-2 sm:gap-4 sm:flex-row flex-col h-full">
          {openEdit ? (
            <TaskEditor edit={openEdit.mode === "edit" && task} copy={openEdit.mode === "copy" && task} />
          ) : (
            <div className={`w-full ${!openEdit ? "sm:w-9/12" : "sm:w-full"}`}>
              <div className="bg-white rounded-lg">
                <div className="flex justify-between gap-2 items-center bg-gray-300 p-2">
                  <p className="text-xs">
                    {t("tools:tasks:task")} -{" "}
                    {t(`tools:tasks:status:${task?.status}`)}
                  </p>
                  <div className="flex gap-2 items-center">
                    <FireIcon
                      className={`h-5 w-5 ${check ? "text-red-500" : "text-gray-200"
                        }`}
                    />
                    <p className="text-sm">{t("tools:tasks:new:high")}</p>
                  </div>
                </div>
                <div className="p-2 sm:p-4">
                  <OptionsTask
                    edit={task}
                    setValueText={setValueText}
                    value={value}
                    disabled={task ? true : false}
                  />
                </div>
                {/* CRM */}
                {task?.crm?.length > 0 && (
                  <div className="flex flex-cols items-end flex-col p-2 sm:p-4 gap-2">
                    {task.crm[0]?.type === "contact" && <div className="bg-blue-100 p-2 rounded-lg flex justify-between w-52">
                      <p className="text-sm text-white">
                        {t("tools:tasks:edit:contact")}:
                      </p>
                      <p className="text-sm text-white">{task.crm[0].contact.fullName}</p>
                    </div>}
                    {task.crm[0]?.type === "poliza" && <div className="bg-blue-100 p-2 rounded-lg flex justify-between w-52">
                      <p className="text-sm text-white">
                        {t("tools:tasks:edit:policy")}:
                      </p>
                      <p className="text-sm text-white">{task.crm[0].poliza.noPoliza}</p>
                    </div>}
                  </div>
                )}
                <div className="p-2 sm:p-4">
                  <div className="flex gap-2 flex-wrap">
                    {/* {!task.isCompleted && (
                      <Button
                        label={t("tools:tasks:edit:init")}
                        buttonStyle="green"
                        className="px-3 py-2"
                        fontSize="text-xs"
                      />
                    )} */}
                    {!task.isCompleted && (
                      <Button
                        label={t("tools:tasks:edit:end")}
                        buttonStyle="green"
                        className="px-3 py-2"
                        fontSize="text-xs"
                        onclick={() => getCompletedTask()}
                      />
                    )}
                    <ButtonMore
                      setOpenEdit={setOpenEdit}
                      openEdit={openEdit}
                      data={task}
                    />
                    {/* <div className="flex gap-2 items-center">
                      <BsStopwatchFill className="h-4 w-4 text-easy-400" />
                      <p className="text-easy-400 text-xs">00:00:00</p>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="mt-2 sm:mt-4 w-full relative">
                <TabsTask data={task} />
              </div>
            </div>
          )}
          {!openEdit && (
            <div className="w-full sm:w-3/12 bg-white rounded-lg h-full">
              <div className="bg-primary rounded-t-lg p-4 text-center">
                <TaskHeaderStatus task={task} />
              </div>
              <div className="p-2 sm:p-4">
                <TaskDeadLine task={task} onDateChange={handleDateChange} t={t} />
                <BannerStatus task={task} />
                <div className="flex justify-between mb-2 border-b-[1px] border-slate-300/40 py-2">
                  <p className="text-sm text-black">
                    {t("tools:tasks:edit:created-the")}
                  </p>
                  <p className="text-sm text-black">
                    {task?.createdAt
                      ? moment(task?.createdAt).format("DD/MM/YYYY")
                      : ""}
                  </p>
                </div>
                <div className="flex justify-between mb-2 border-b-[1px] border-slate-300/40 py-2">
                  <p className="text-sm text-black">
                    {t("tools:tasks:edit:duration")}:
                  </p>
                  <p className="text-sm text-black">00:00:00</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-black border-b-[1px] border-slate-300/40 pt-2 pb-1">
                    {t("tools:tasks:edit:created-by")}
                  </p>
                  <div className="flex gap-2 items-center mt-3">
                    <Image
                      className="h-8 w-8 rounded-full object-contain"
                      width={50}
                      height={50}
                      src={task.createdBy?.avatar || "/img/avatar.svg"}
                      alt=""
                      objectFit="cover"
                    />
                    <p className="font-semibold text-blue-800 text-sm">
                      {task.createdBy?.name || task.createdBy?.username}
                    </p>
                  </div>
                </div>
                <TaskResponsible
                  task={task}
                  lists={lists}
                  getValues={getValues}
                  setValue={setValue}
                  field={field}
                  errors={errors}
                  t={t}
                />
                <div className="mb-4">
                  <div className="flex justify-between border-b-[1px] border-slate-300/40 pt-2 pb-1">
                  <p className="text-sm text-black">
                    {t("tools:tasks:edit:participants")}
                  </p>
                  <p className="text-xs text-slate-400 cursor-pointer hover:text-slate-500">
                      {t('tools:tasks:edit:add')}
                    </p>
                  </div>
                  
                  {task?.participants?.length > 0 &&
                    task.participants.map((part, index) => (
                      <div className="flex gap-2 items-center mt-3" key={index}>
                        <Image
                          className="h-8 w-8 rounded-full object-fill"
                          width={50}
                          height={50}
                          src={part?.avatar || "/img/avatar.svg"}
                          alt=""
                          objectFit="cover"
                        />
                        <p className="font-semibold text-blue-800 text-sm">
                          {part?.username}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="mb-4">
                  <div className="flex justify-between border-b-[1px] border-slate-300/40 pt-2 pb-1">
                    <p className="text-sm text-black">
                      {t("tools:tasks:edit:observers")}
                    </p>
                    <p className="text-xs text-slate-400 cursor-pointer hover:text-slate-500">
                      {t('tools:tasks:edit:add')}
                    </p>
                  </div>
                  {task?.observers?.length > 0 &&
                    task.observers.map((obs, index) => (
                      <div className="flex gap-2 items-center mt-3" key={index}>
                        <Image
                          className="h-8 w-8 rounded-full object-cover"
                          width={50}
                          height={50}
                          src={obs?.avatar || "/img/avatar.svg"}
                          alt=""
                          objectFit="contain"
                        />
                        <p className="font-semibold text-blue-800 text-sm">
                          {obs?.name}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="mb-4">
                  <div className="flex justify-between border-b-[1px] border-slate-300/40 pt-2 pb-1">
                  <p className="text-sm text-black">
                    {t("tools:tasks:edit:tags")}
                  </p>
                  <p className="text-xs text-slate-400 cursor-pointer hover:text-slate-500">
                      {task?.tags?.length > 0 ? t('tools:tasks:edit:editTag') : t('tools:tasks:edit:addTag')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task?.tags?.length > 0 &&
                      task.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="px-2 py-1 rounded-md bg-gray-200"
                        >
                          <p className="text-sm">#{tag.name}</p>
                        </div>
                      ))}
                  </div>
                  {/* <div className="mt-2 flex gap-2 items-center cursor-pointer">
										<PlusIcon className="h-3 w-3" />
										<p className="text-xs text-black">{t('tools:tasks:edit:addTag')}</p>
									</div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TaskDeadLine = ({task, onDateChange, t, onDateRemove})=>{
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedDate, setSelectedDate] = useState(task?.deadline ? parseISO(task.deadline) : new Date());
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsEditing(false);
    onDateChange(formatISO(date));
  };

  const handleDateRemove = () => {
    setSelectedDate(null);
    onDateRemove();
  };


  const handleDateClick = (e) => {
    if (task.completedTime) return;
    setIsEditing(true);
    const containerRect = containerRef.current.getBoundingClientRect();
    setPosition({ top: e.clientY - containerRect.top, left: e.clientX - containerRect.left });
  };

   return (
    <div className="relative" ref={containerRef}>
      <div className="flex justify-between mb-2 border-b-[1px] border-slate-300/40 py-2">
        <p className="text-sm text-black">
          {t("tools:tasks:edit:limit-date")}:
        </p>
        <div className="flex items-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}>
          <p
          className={clsx(!task.completedTime && "underline decoration-dotted cursor-pointer font-semibold", "text-sm text-black")}
          onClick={handleDateClick}
        >
          {task?.deadline ? formatDate(task?.deadline, 'dd/MM/yyyy hh:mm a') : 'Ninguna'}
        </p>
          {task?.deadline && (
            <FaTimes 
              className={`ml-2 text-red-500 hover:text-red-700 cursor-pointer ${isHovering ? 'visible' : 'invisible'}`}
              onClick={handleDateRemove}
            />
          )}
        </div>
      </div>
       <Transition
        show={isEditing}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className="absolute z-10 bg-white shadow-lg rounded-md"
          style={{ top: position.top + 20, left: 'auto', right: `calc(90% - ${position.left}px)` }}
        >
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            onClickOutside={() => setIsEditing(false)}
            inline
          />
        </div>
      </Transition>
    </div>
  );
}

const TaskResponsible = ({task, lists, getValues, setValue, field, errors, t})=>{
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleEditClick = (e) => {
    setIsEditing(true);
    const containerRect = containerRef.current.getBoundingClientRect();
    setPosition({ top: e.clientY - containerRect.top, left: e.clientX - containerRect.left });
  };

  const handleDateRemove = (id) => {
    const updatedResponsible = getValues('responsible').filter((res) => res.id !== id);
    setValue('responsible', updatedResponsible, { shouldValidate: true });
  };


  return (
    <div className="relative mb-4" ref={containerRef}>
      <div className="flex justify-between border-b-[1px] border-slate-300/40 pt-2 pb-1">
        <p className="text-sm text-black">
          {t("tools:tasks:edit:responsible")}
        </p>
        <p
          className="text-xs text-slate-400 cursor-pointer hover:text-slate-500"
          onClick={handleEditClick}
        >
          {t('tools:tasks:edit:change')}
        </p>
      </div>
      {task?.responsible?.length > 0 &&
        task.responsible.map((resp, index) => (
          <div
            className="flex gap-2 items-center mt-3"
            key={index}
            onMouseEnter={() => setIsHovering(index)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Image
              className="h-8 w-8 rounded-full object-cover"
              width={50}
              height={50}
              src={resp?.avatar || "/img/avatar.svg"}
              alt=""
              objectFit="cover"
            />
            <p className="font-semibold text-blue-800 text-sm">
              {resp?.name || resp?.username}
            </p>
            {isHovering === index && (
              <FaTimes
                className="ml-2 text-red-500 cursor-pointer"
                onClick={() => handleDateRemove(resp.id)}
              />
            )}
          </div>
        ))}
      <Transition
        show={isEditing}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute w-full z-50 bg-white shadow-lg rounded-md"
        style={{ top: position.top + 20, left: 'auto', right: `auto` }}>
          <DropdownSelect
            {...field}
            options={lists?.users || []}
            getValues={getValues}
            setValue={setValue}
            name="responsible"
            error={errors.responsible}
            isOpen={isEditing}
            setIsOpen={setIsEditing}
          />
        </div>
      </Transition>
    </div>
  );
}

const TaskHeaderStatus = ({ task }) => {
  const { t } = useTranslation();
  if (task.status === "pending") {
    return <p className="text-white font-medium text-sm">
      {t("tools:tasks:edit:pending-since", {
        date: moment(task?.createdAt).format("DD-MM-YYYY"),
      })}
    </p>
  } else if (task.status === "completed" || task?.status === "pending_review") {
    return <p className="text-white font-medium text-sm">{t("tools:tasks:edit:completed-since", {
      date: moment(task?.completedTime).format("DD-MM-YYYY"),
    })}</p>
  }
};


const BannerStatus = ({ task }) => {
  const { t } = useTranslation();
  if (task?.status === "pending") {
    // Verificar si la tarea está vencida
    if (task?.deadline) {
      const today = new Date();
      const deadline = new Date(task.deadline);
      if (deadline < today) {
        return <div className="w-ful bg-red-100 rounded-md flex justify-center gap-2 p-1 my-3">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-800" />
          <p className="text-red-800">{t("tools:tasks:edit:task-overdue")}</p>
        </div>
      }
    }
  }
}