"use client";
import useAppContext from "../../../../../../context/app";
import CalendarHeader from "./components/CalendarHeader";
import Link from "next/link";
import { useCommon } from "../../../../../../hooks/useCommon";
import Modal from "./@modal/page";

export default function CalendarLayout({
  children,
  day,
  week,
  month,
  programar,
}) {
  const { calendarView } = useAppContext();
  const { calendarViews } = useCommon()

  return (
    <>
      <div className="flex flex-col flex-grow">
        <Modal />
        <CalendarHeader />
        <div className="h-[63vh] mb-10 overflow-auto">
          {children}
          {calendarView === calendarViews[0]
            ? day
            : calendarView === calendarViews[1]
            ? week
            : calendarView === calendarViews[2]
            ? month
            : programar}
          </div>
      </div>
    </>
  );
}
