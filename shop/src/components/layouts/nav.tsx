import  React,{ useState } from "react";

type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Services",
    children: [
      { label: "Web Development", link: "/web-development" },
      { label: "Mobile App Development", link: "/mobile-app" },
    ],
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  const renderNavItem = (item: NavItem) => {
    return (
      <li className="relative group">
        <a
          href={item.link || "#"}
          className="block px-4 py-2 text-white hover:bg-gray-700"
        >
          {item.label}
        </a>
        {item.children && (
          <ul className="absolute left-0 hidden bg-gray-800 group-hover:block">
            {item.children.map((child, index) => (
              <li key={index} className="group relative">
                <a
                  href={child.link || "#"}
                  className="block px-4 py-2 text-white hover:bg-gray-700"
                >
                  {child.label}
                </a>
                {child.children && (
                  <ul className="absolute left-0 hidden bg-gray-800 group-hover:block">
                    {child.children.map((subChild, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href={subChild.link || "#"}
                          className="block px-4 py-2 text-white hover:bg-gray-700"
                        >
                          {subChild.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="bg-gray-800 p-4 mt-20">
      <ul className="flex space-x-4">
        {navItems.map((item, index) => (
          <React.Fragment key={index}>{renderNavItem(item)}</React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
