import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="bg-gray-800">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">
                        <a href="#">Logo</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            <li><Link className="text-white" to={"/"}>Home</Link></li>
                            <li><Link className="text-white" to={"/about"}>About</Link></li>
                            <li><Link className="text-white" to={"/catalog"}>Catalog</Link></li>
                            <li><Link className="text-white" to={"/contact"}>Contact</Link></li>
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button className="outline-none mobile-menu-button">
                            <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mobile-menu hidden md:hidden">
                    <ul className="mt-4 space-y-4">
                        <li><Link className="block px-4 py-2 text-white bg-gray-900 rounded" to={"/"}>Home</Link></li>
                        <li><Link className="block px-4 py-2 text-white bg-gray-900 rounded" to={"/about"}>About</Link></li>
                        <li><Link className="block px-4 py-2 text-white bg-gray-900 rounded" to={"/catalog"}>Catalog</Link></li>
                        <li><Link className="block px-4 py-2 text-white bg-gray-900 rounded" to={"/contact"}>Contact</Link></li>
                    </ul>
                </div>

            </nav>
        </header>
    );
};

export default Navbar;