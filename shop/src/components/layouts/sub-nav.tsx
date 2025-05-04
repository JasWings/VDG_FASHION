import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGroups } from '@/framework/group';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

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
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string,cate:any) => {
    if (selectedCategory === category) return;
    setSelectedCategory(category);

    const slug = category.toLowerCase().replace(/\s+/g, '-');
    const selectedGroup = cate
    console.log(selectedCategory,category,"category")
    router.push({
      pathname: '/',
      query: { group: selectedGroup?._id },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 xl:top-22 z-10 transition-all duration-300 bg-white border-b-2 border-gray-200 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="relative flex  justify-center items-center bg-white px-4 py-2">
        {/* Left Scroll Button for Mobile */}
        {/* <button onClick={scrollLeft} className="hidden sm:flex items-center justify-center p-2 text-gray-600 hover:text-rose-600">
          <FiChevronLeft size={20} />
        </button> */}

        {/* Scrollable Categories */}
        <div ref={scrollRef} className="flex xl:justify-center overflow-x-auto scrollbar-hide gap-4 sm:gap-6 whitespace-nowrap w-full px-2">
          {groups?.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.name,category)}
              className={`relative text-gray-600 p-2 text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 ${
                selectedCategory === category.name ? 'text-rose-600 border-b-2 border-rose-600' : 'hover:text-rose-600'
              }`}
            >
              <span className="px-2">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Right Scroll Button for Mobile */}
        {/* <button onClick={scrollRight} className="hidden sm:flex items-center justify-center p-2 text-gray-600 hover:text-rose-600">
          <FiChevronRight size={20} />
        </button> */}
      </div>
    </header>
  );
};

export default Navbar;
