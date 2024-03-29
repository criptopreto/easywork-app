"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function SlideOver({ openModal, setOpenModal, children }) {

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0' sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen w-max-full md:max-w-4xl lg:max-w-4xl xl:max-w-7xl">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
