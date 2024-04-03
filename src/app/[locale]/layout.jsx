import { Inter } from "next/font/google";
import "./globals.css";
import AppContextProvider from "@/context/app/provider";
import CrmContextProvider from "@/context/crm/provider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Easywork",
  description: "Generated by create next app",
};

const i18nNamespaces = ['contacts', 'common', 'tools'];
export default async function RootLayout({ children, params: { locale } }) {
  
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang={locale} className="h-full">
      <body className={inter.className}>        
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <AppContextProvider>
            <CrmContextProvider>{children}</CrmContextProvider>
            <ToastContainer />
          </AppContextProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
