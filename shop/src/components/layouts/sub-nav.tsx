import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useGroups } from '@/framework/group';

interface Category {
  name: string;
}

const categories: Category[] = [
  { name: 'KIDS' },
  { name: 'TOYS' },
  { name: 'RIDDERS' },
  { name: 'BOOKS' },
  { name: 'STATIONARY' },
  { name: 'PLAY AREA' },
  { name: 'ACCESSORIES' },
];

const Navbar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { groups, isLoading, error } = useGroups()
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    const selectedGroup = groups?.filter((group:any) => group.slug === slug)
   console.log(selectedGroup)
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

  return (
    <header className="sticky top-22 z-10">
      <div className="flex justify-center items-center gap-8 bg-white border-b-[2px] border-t-[2px] border-gray-200 z-50">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className={`relative text-gray-600 p-4 text-base font-medium cursor-pointer group hover:text-rose-600 hover:border-b-2 border-rose-600 ${
              selectedCategory === category.name ? 'text-rose-600 border-b-2 border-rose-600' : ''
            }`}
          >
            <span
              className={`px-2 transition-all duration-300 ${
                selectedCategory === category.name ? '' : ''
              }`}
            >
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
