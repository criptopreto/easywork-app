"use client";
import { useSidebar } from "@/hooks/useCommon";
import { usePathname } from "next/navigation";
import Tag from "@/components/Tag";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SliderOverShort from "@/components/SliderOverShort";

export default function Email() {
  const [modal, setModal] = useState(false);

  const emails = [
    {
      name: "Gmail",
      src: "/icons/emails/gmail.svg",
      click: () => setModal(true),
    },
    {
      name: "ICloud",
      src: "/icons/emails/icloud.svg",
      click: "",
    },
    {
      name: "Outlook",
      src: "/icons/emails/outlook.svg",
      click: "",
    },
    {
      name: "Exchange",
      src: "/icons/emails/exchange.svg",
      click: "",
    },
    {
      name: "Yahoo!",
      src: "/icons/emails/yahoo.svg",
      click: "",
    },
    {
      name: "Office 365",
      src: "/icons/emails/office365.svg",
      click: "",
    },
    {
      name: "IMAP",
      src: "/icons/emails/imap.svg",
      click: "",
    },
  ];

  return (
    <div className="rounded-2xl px-2 flex justify-center items-center flex flex-col">
      <div className="w-full rounded-xl text-easywork-main mb-4">
        <h1 className="ml-3 py-3 font-medium">Integración del buzón</h1>
      </div>
      <div className="w-full bg-white rounded-xl drop-shadow-md text-easywork-main mb-4">
        <h1 className="ml-3 w-full py-5 text-center font-medium">
          Use y gestione su buzón
        </h1>
      </div>
      <div className="w-full bg-white rounded-xl drop-shadow-md sm:p-3 px-20 py-10 flex items-center flex-col gap-4">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-4 my-3">
          {emails.map((item, index) => (
            <div
              className="flex flex-col justify-center bg-gray-100 px-10 py-7 rounded-lg"
              key={index}
              onClick={item.click}
            >
              <div className="flex justify-center items-center bg-white overflow-hidden rounded-full mb-4 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6">
                <Image
                  width={30}
                  height={30}
                  src={item.src}
                  alt={item.name}
                  className="object-cover object-center"
                />
              </div>
              <div className="text-center">
                <h1>{item.name}</h1>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <SliderOverShort openModal={modal}>
        <Tag onclick={() => setModal(false)} className="bg-green-500" />
        <div className="bg-gray-300 w-full rounded-l-2xl overflow-y-auto h-screen">
          <div className="m-3 font-medium text-lg">
            <h1>Gestionar buzón</h1>
          </div>
          <div className="m-3 p-5 pr-8 bg-gray-100 rounded-2xl">
            <div>
              <h1 className="font-medium">IMAP</h1>
              <h2 className="font-semibold">E-mail</h2>
              <h3>Armandoalbb@gmail.com</h3>
              <p className="text-xs">Último revisado Hace 10 minutos Éxito</p>
            </div>
            <div className="text-xs">
              <div className="mt-2">
                <p className="ml-2">Dirección del servidor IMAP</p>
                <input type="password" className="rounded-md border-0 w-full" />
              </div>
              <div className="flex mt-3">
                <div className="w-20">
                  <p className="ml-2">Puerto</p>
                  <input
                    type="number"
                    className="w-full rounded-md border-0 w-full"
                  />
                </div>
                <div className="flex mt-4 ml-2">
                  <input type="checkbox" />
                  <p className="ml-1">Usar SSL</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="ml-2">Iniciar Sesión</p>
                <input type="password" className="rounded-md border-0 w-full" />
              </div>
              <div className="mt-2">
                <p className="ml-2">Contraseña</p>
                <input type="password" className="rounded-md border-0 w-full" />
              </div>
              <p className="mt-2 underline text-violet-800">
                Configurar carpetas para la sincronización
              </p>
              <div className="mt-2">
                <p className="ml-2">Nombre del buzón</p>
                <input type="password" className="rounded-md border-0 w-full" />
              </div>
              <div className="mt-2">
                <p className="ml-2">Nombre del remitente</p>
                <input type="password" className="rounded-md border-0 w-full" />
              </div>
              <div className="mt-2">
                <p className="ml-2">
                  URL de la interfaz web del servidor de correo electrónico
                </p>
                <input type="password" className="rounded-md border-0 w-full" />
              </div>
              <div className="m-3 text-xs my-4 w-80">
                <h1 className="font-bold text-lg">Acceso al buzón</h1>
                <p className="bg-gray-300 p-2">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient
                </p>
              </div>
              <div className="flex justify-around">
                <button
                  type="button"
                  className="hover:bg-primaryhover bg-primary text-white font-bold py-2 px-4 rounded-md"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="hover:bg-gray-800 bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Inhabilitar
                </button>
                <button
                  type="button"
                  className="hover:bg-gray-800 bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </SliderOverShort>
    </div>
  );
}
