import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const IconDropdown = ({options, width, icon, colorIcon = "text-primary", disabled, excel, children}) => {
    return (
        <Menu as="div" className="relative inline-block text-left mt-1">
            <div>
                <Menu.Button className="inline-flex w-full focus:ring-0 outline-none focus:outline-none">
                    {icon}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className={`absolute right-0 mt-2 rounded-md  shadow-lg ring-1 ring-black/5 focus:outline-none z-50 ${width} ${disabled ? "bg-gray-200" : "bg-white"}`}>
                    <div className="px-1 py-1 ">
                        {excel && (
                            <div className='pl-2 mb-1'><p className='text-sm font-bold text-primary'>{excel}</p></div>
                        )}
                        {options && options.map((opt, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <button
                                        className={`group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm ${
                                            active ? (opt.disabled ? 'bg-gray-200 text-white' : 'bg-easy-600 text-white') : 'text-primary'
                                        }`}
                                        disabled={disabled}
                                    >
                                        {opt.icon && <opt.icon className={`h-4 w-4 ${active ? "text-white" : `${colorIcon}`}`}/>}
                                        {opt.name}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                        {children}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default IconDropdown