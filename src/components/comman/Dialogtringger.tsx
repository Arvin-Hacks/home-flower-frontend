// src/components/Dialog.tsx
import React, { ReactNode } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, description, children, footer }) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <HeadlessDialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessDialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              {title && (
                <HeadlessDialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </HeadlessDialog.Title>
              )}
              {description && (
                <HeadlessDialog.Description as="p" className="mt-2 text-sm text-gray-500">
                  {description}
                </HeadlessDialog.Description>
              )}

              <div className="mt-4">{children}</div>

              {footer && <div className="mt-4">{footer}</div>}
            </div>
          </Transition.Child>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

export default Dialog;
