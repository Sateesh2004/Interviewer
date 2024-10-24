"use client"
import React, { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Profile', href: '/profile' },
]

const NavBar = ({ check }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const path = usePathname()
    const router = useRouter()

    useEffect(() => {
        // If the user tries to access the dashboard without being authenticated, redirect them to sign-in page
        if (!check && path === '/dashboard') {
            router.push('/signin')
        }
    }, [check, path, router])

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <h3 className='font-bold text-[24px]'>QuestAI</h3>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.name === 'Dashboard' && check ? `/dashboard/${check}` : item.href}  
                            className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${path === item.href ? 'text-blue-600' : 'text-gray-900'} hover:bg-gray-50`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {check ? (
                        <div className="text-sm font-semibold leading-6 text-gray-900 border py-3 px-[20px] rounded-2xl bg-blue-500">{check[0].toUpperCase()}</div>
                    ) : (
                        <Link href="/signin" className="text-sm font-semibold leading-6 text-gray-900">
                            Sign in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${path === item.href ? 'text-blue-600' : 'text-gray-900'} hover:bg-gray-50`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                {check ? (
                                    <div className="text-sm font-semibold leading-6 text-gray-900 border py-3 px-[20px] rounded-2xl bg-blue-500">{check[0].toUpperCase()}</div>
                                ) : (
                                    <Link href="/signin" className="text-sm font-semibold leading-6 text-gray-900">
                                        Sign in <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default NavBar
