'use client';
import React, { useState } from "react";
import ContactsHeader from "./components/ContactsHeader";
import { useTranslation } from "react-i18next";
import Header from "../../../../../../components/header/Header";
import HeaderCrm from "../HeaderCrm";
import useCrmContext from "../../../../../../context/crm";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LayoutContact({ children }) {
    const { t } = useTranslation();
    const { contacts } = useCrmContext();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();  

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (Number(params.get('page')) === 0 || !params.get('page')) {
            params.set('page', 1); 
            replace(`${pathname}?${params.toString()}`);
        }
    }, [pathname, replace, searchParams])
    
    const options = [
        {
            id: 1,
            name: t("contacts:create:tabs:policies"),
        },
        {
            id: 2,
            name: t("contacts:create:tabs:activities"),
        },
        {
            id: 3,
            name: t("contacts:create:tabs:reports"),
        },
        {
            id: 4,
            name: t("contacts:create:tabs:documents"),
        }
    ]
    return (
        <div className="bg-gray-100 h-full p-2 rounded-xl relative">
            <Header />
            <div className="flex flex-col w-full">
                <HeaderCrm options={options}/>
                <ContactsHeader/>
                {children}
            </div>  
        </div>
    );
}
