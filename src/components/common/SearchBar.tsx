import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../redux/hooks";
interface MenuItem {
    id: number;
    label: string;
    icon: string;
}

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const menuItems = [
        { id: 1, label: 'All', icon: 'fa-magnifying-glass' },
        { id: 2, label: 'Title', icon: 'fa-sharp fa-solid fa-film' },
        { id: 3, label: 'TV Episodes', icon: ' fa-tv  ' },
        { id: 4, label: 'Celebs', icon: ' fa-user-group' },
        { id: 5, label: 'Companies', icon: ' fa-city' },
        { id: 6, label: 'Keywords', icon: 'fa-delete-left fa-rotate-180' },
    ];

    const handleMenuItemClick = (item: MenuItem) => {
        setSelectedItem(item);
        setIsOpen(false);
        console.log(selectedItem)
    };
    const filteredItems = menuItems.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // const dispatch = useAppDispatch();
    // let navigate = useNavigate();

    return (
        <div className="relative flex text-left z-40 w-full">
            <div className="relative  text-left flex-grow-0 ">
                <button
                    type="button"
                    className="justify-center whitespace-nowrap w-full h-full border border-gray-300 shadow-sm bg-white px-4 py-2 text-sm 
                    font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                     focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-haspopup="true"
                    aria-expanded={isOpen ? 'true' : 'false'}
                >
                    {selectedItem ? (
                        <span className="flex items-center">
                            {selectedItem.label}
                            {isOpen ? <i className={`fa-solid fa-sort-up ml-2 text-black`} /> :
                                <i className={`fa-solid fa-sort-down ml-2 text-black`} />}
                        </span>
                    ) : (
                        <span>All</span>
                    )}
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="py-1" role="none">
                            {filteredItems.map((item) => (
                                <a
                                    href="#"
                                    key={item.id}
                                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${selectedItem && selectedItem.id === item.id ? 'bg-yellow-100 text-yellow-700' : ''}`}
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={() => handleMenuItemClick(item)}
                                >
                                    <i className={`fa-solid ${item.icon}  mr-2`} />
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="relative flex-grow">
                <input type="text" name="price" id="price"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-full border-0 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search IMDb..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <div className="flex items-center mr-3">
                        <i className="fa-solid fa-search text-gray-500" />
                    </div>
                </div>
            </div>
        </div>
    )
}