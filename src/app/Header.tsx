import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import Link from "next/link";
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { MdClose, MdMenu } from 'react-icons/md';
import { FadeAndSlideScrollTriggerAnimation } from '@/libs/ScrollTriggerAnimations/FadeAndSlideScrollTriggerAnimation';

export const menuItems = [
    { href: "/", label: "TOP" },
    { href: "/about", label: "ABOUT", },
    { href: "/works", label: "WORKS" },
    { href: "/contacts", label: "CONTACT" },
];

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="flex items-center sticky top-0 mt-0 md:mt-12 bg-paper1/60 backdrop-blur-lg z-20 border-b border-black/5">
                {/* Desktop */}
                <nav className="hidden w-full md:flex gap-6 justify-end py-8 px-20">

                    <div className='ml-auto' />
                    {menuItems.map((item, index) => {
                        return (
                            <div className="relative group" key={index} >
                                <Link
                                    href={item.href}
                                    className="text-navigation py-2 group-hover:text-color3 group-hover:border-b-2 border-color3 transition duration-300"
                                >
                                    {item.label}
                                </Link>

                            </div>
                        )
                    })}
                </nav>

                {/* Mobile */}
                <nav className="flex md:hidden w-full gap-6 justify-end py-2">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="flex items-center justify-center p-2 w-12 h-12 rounded-full text-color3 hover:bg-color3/10">
                        <MdMenu size={48} />
                    </button>

                    <Drawer isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
                </nav>
            </header>
        </>
    );
};

interface Props {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Drawer = ({ isOpen, setIsOpen, children }: React.PropsWithChildren<Props>) => {
    const close = () => setIsOpen(false);

    return (

        <Dialog transition open={isOpen} as="div"
            className="relative z-50 focus:outline-none transition duration-300 ease-out data-[closed]:opacity-0"
            onClose={close}>
            <div className="fixed inset-0 z-50">
                <DialogPanel className="relative bg-white/80 backdrop-blur-lg w-full h-screen p-4 flex flex-col items-center">

                    <h1 className='py-6 text-title2 font-asterdam text-color3'>Match Bond</h1>

                    <nav className="flex flex-col gap-6 h-full justify-center items-start">
                        {menuItems.map((item, index) => (
                            <FadeAndSlideScrollTriggerAnimation  key={item.href} delay={index * 50}>
                                <Link
                                    onClick={() => setIsOpen(false)}
                                    key={index}
                                    href={item.href}
                                    className="text-navigation hover:text-color3 transition duration-300"
                                >
                                    {item.label}
                                </Link>
                                {/* {
                                    item.child?.length && (
                                        item.child?.map(
                                            (child, index) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="ml-4 text-navigation hover:text-color3 transition duration-300"
                                                >
                                                    {child.label}
                                                </Link>
                                            )
                                        )
                                    )
                                } */}
                            </FadeAndSlideScrollTriggerAnimation>
                        ))}
                    </nav>

                    <button data-collapse-toggle="navbar-hamburger"
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="absolute top-4 right-4 inline-flex items-center justify-center p-2 w-12 h-12 text-sm rounded-full text-color3 hover:bg-color3/10"
                    >
                        <MdClose size={24} />
                    </button>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
