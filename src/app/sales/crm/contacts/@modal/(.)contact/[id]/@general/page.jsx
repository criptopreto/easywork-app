import React from "react";
import { PencilSquareIcon, UserIcon, VideoCameraIcon } from "@heroicons/react/20/solid";
import ProfileImageInput from "../../../../components/create_contact/ProfileImageInput";
import SelectInput from "../../../../components/create_contact/SelectInput";
import TextareaLabel from "../../../../components/TextareaLabel";
import ContactActivityPanel from "../../../../components/ContactActivityPanel";
import clsx from "clsx";
import { getContact } from "@/lib/api";
import ActivityHeader from "../../../../components/ActivityHeader";
import CardTask from "../../../../components/CardTask";
import TextInputLocal from "../../../../components/create_contact/TextInputLocal";
import { getURLContactPhoto } from "@/lib/common";

async function useContact({ contactID }) {
  const response = await getContact(contactID);
  return response;
}

export const revalidate = 3600;

const timeline = [
  {
    id: 1,
    child: ActivityHeader,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Advanced to phone screening by",
    child: CardTask,
    target: "Bethany Blake",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: VideoCameraIcon,
    iconBackground: "bg-blue-500",
  },
];

const sexoOptions = [
  { id: 1, name: "Masculino" },
  { id: 2, name: "Femenino" },
  { id: 3, name: "Otro" },
];


export default async function Page({params: { id },}) {
  const contactInfo = await useContact({ contactID: id });
  const editMode = false;

  if (!contactInfo) return <div>Loading...</div>;

  return (
    <div
      className={clsx(
        "flex flex-col sm:flex-row h-full bg-zinc-100 mx-4 rounded-lg",
        editMode && "pb-[13.5rem]"
      )}
    >
      {/* Menu Izquierda */}
      <div className="sm:w-1/2 bg-transparent p-4 overflow-y-scroll">
        <h1 className="bg-zinc-200 py-4 px-4 rounded-md flex justify-between">
          Datos del Contratante
          <button>
            <span className="sr-only">Editar</span>
            <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-indigo-400" />
          </button>
        </h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:max-w-xl sm:grid-cols-6 h-full px-1 lg:px-12 mx-auto">
          <ProfileImageInput selectedProfileImage={getURLContactPhoto(contactInfo)} />
          <TextInputLocal label="Nombres" id="nombre" value={contactInfo.nombre} />
          <TextInputLocal
            label="Apellidos"
            id="apellidos"
            value={contactInfo.apellidos}
          />
          <TextInputLocal label="Cargo" id="cargo" value={contactInfo.cargo} />
          <TextInputLocal label="CURP" id="curp" value={contactInfo.cargo} hidden />
          <TextInputLocal
            label="Teléfono"
            id="telefono"
            value={contactInfo.telefono}
          />
          <TextInputLocal
            label="Email"
            id="email"
            type="email"
            value={contactInfo.email}
          />
          <TextInputLocal
            label="Fecha de Nacimiento"
            id="nacimiento"
            type="date"
            value={contactInfo.nacimiento}
          />
          <SelectInput label="Sexo" id="sexo" options={sexoOptions} />
          <TextInputLocal label="RFC" id="rfc" value={contactInfo.rfc} />
          <TextInputLocal
            label="Código Postal"
            id="postal"
            value={contactInfo.postal}
          />
          <TextareaLabel
            label="Dirección"
            id="direccion"
            value={contactInfo.direccion}
          />
          <SelectInput
            label="Tipo de Contacto"
            id="contactType"
            options={sexoOptions}
          />
          <SelectInput
            label="Responsable"
            id="responsible"
            options={sexoOptions}
          />
          <TextInputLocal label="Agente" id="agente" value={contactInfo.agente} />
          <TextInputLocal
            label="Sub-Agente"
            id="subAgente"
            value={contactInfo.subAgente}
          />
          <SelectInput
            label="Origen"
            id="contactSource"
            options={sexoOptions}
          />
        </div>
      </div>

      <ContactActivityPanel editing={false} timeline={timeline} />
    </div>
  );
}
