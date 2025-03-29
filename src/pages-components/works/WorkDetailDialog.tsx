import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { WorkItem } from '@/api/works';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import WorkDetailContent from './WorkDetailContent';

interface WorkDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    work: WorkItem | null;
    loading: boolean;
}

export const WorkDetailDialog = ({ isOpen, onClose, work, loading }: WorkDetailDialogProps) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-8 shadow-xl w-full max-h-[90vh] overflow-y-auto">
                            {loading ? (
                                <LoadingIndicator />
                            ) : !work ? (
                                <ErrorMessage message="作品情報の取得に失敗しました" />
                            ) : (
                                <WorkDetailContent work={work} onClose={onClose} />
                            )}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default WorkDetailDialog;