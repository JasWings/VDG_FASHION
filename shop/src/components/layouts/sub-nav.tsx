import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGroups } from '@/framework/group';

interface Category {
  name: string;
}

const categories: Category[] = [
  { name: 'FASHION' },
  { name: 'TOYS' },
  { name: 'RIDDERS' },
  { name: 'BOOKS' },
  { name: 'STATIONARY' },
  { name: 'PLAY AREA' },
  { name: 'ACCESSORIES' },
];

const Navbar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { groups } = useGroups();
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    const selectedGroup = groups?.filter((group: any) => group.slug === slug);
    const currentQuery = { ...router.query };

    const updatedQuery = {
      ...currentQuery,
      group: selectedGroup?.[0]?._id,
    };

    router.push({
      pathname: '/',
      query: updatedQuery,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 transition-all duration-300 bg-white border-b-2 border-t-2 border-gray-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 px-4 py-2">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className={`relative text-gray-600 p-2 sm:p-4 text-sm sm:text-base font-medium cursor-pointer group hover:text-rose-600 hover:border-b-2 border-rose-600 ${
              selectedCategory === category.name ? 'text-rose-600 border-b-2 border-rose-600' : ''
            }`}
          >
            <span className="px-1 sm:px-2 transition-all duration-300">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
