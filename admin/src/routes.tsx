import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import {SlUserFollow,SlUser} from "react-icons/sl"
import { IRoute } from '@/types/navigation';
import { FaPlus, FaTags, FaFolder, FaGlobe, FaTag,FaQuestion } from 'react-icons/fa';
import {BsBox2} from "react-icons/bs"
import { FaBriefcase} from 'react-icons/fa'; 
import {LuLayoutDashboard} from "react-icons/lu"
import {AiOutlineContacts} from "react-icons/ai"



const routes: IRoute[] = [
  {
    name: 'Dashboard',
    layout: '/Admin',
    path: '/Dashboard',
    icon: <Icon as={LuLayoutDashboard} width="20px" height="20px" color="inherit" />,
    nested: false,
    children:[]
  },
  {
    name: 'Orders',
    layout: '/Admin',
    path: '/Orders',
    icon: <Icon as={BsBox2} width="20px" height="20px" color="inherit" />,
    nested: false,
    children:[]
  },
  {
    name: 'Products',
    layout: '/Admin',
    path: '/Products/productListing',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    nested:true,
    children:[
    ],
    secondary: true,
  },
  {
    name: 'Add Product',
    layout: '/Admin',
    path: '/AddProducts',
    icon: (
      <Icon
        as={FaPlus}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    nested:false,
    children:[
    ],
  },
  {
    name: 'Category',
    layout: '/Admin',
    path: '/Category',
    icon: (
      <Icon
        as={FaFolder}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    nested:false,
    children:[],
  },
  {
    name:"Tag",
    layout:"/Admin",
    path:"/Tag",
    icon: (
      <Icon
        as={FaTag}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    nested:false,
    children:[],
  },
  {
    name: 'Brand',
    layout: '/Admin',
    path: '/Brand',
    icon: <Icon as={FaBriefcase} width="20px" height="20px" color="inherit" />,
    nested: false,
    children:[]
  },
  {
    name: 'Country',
    layout: '/Admin',
    path: '/Country',
    icon: <Icon as={FaGlobe} width="20px" height="20px" color="inherit" />,
    nested: false,
    children:[]
  },
  {
    name: 'Users',
    layout: '/Admin',
    path: '/Users',
    icon: <Icon as={SlUser} width="20px" height="20px" color="inherit" />,
    nested: false,
    children:[]
  },
  {
    name: 'User Roles',
    layout: '/Admin',
    path: '/UserRoles',
    icon: <Icon as={SlUserFollow} width="20px" height="20px" color="inherit" />,
    nested: false,
    children:[]
  },
  {
    name: 'Support List',
    layout: '/Admin',
    path: '/Contacts',
    icon: <Icon as={AiOutlineContacts} width="20px" height="20px" color="inherit" />,
    nested: false,
    children:[]
  },
  {
    name: 'Faq',
    layout: '/Admin',
    path: '/Faq',
    icon: <Icon as={FaQuestion} width="20px" height="20px" color="inherit" />,
    nested: false,
    children:[]
  }
];

export default routes;
