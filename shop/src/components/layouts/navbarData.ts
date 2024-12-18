// Types for the Navbar Data (in TypeScript)
type NavItem = {
    label: string;
    link?: string;
    subItems?: NavItem[];
  };
  
  const navbarData: NavItem[] = [
    {
      label: "Women Ethnic",
      subItems: [
        {
          label: "All Women Ethnic",
          link: "/ethnicwear-women/pl/3tq",
        },
        {
          label: "Sarees",
          subItems: [
            { label: "All Sarees", link: "/sarees/pl/3iy" },
            { label: "Silk Sarees", link: "/silk-sarees/pl/3j4" },
            { label: "Cotton Silk Sarees", link: "/cotton-silk-sarees/pl/3jt" },
            { label: "Cotton Sarees", link: "/cotton-sarees/pl/3jh" },
            { label: "Georgette Sarees", link: "/georgette-sarees/pl/3m1" },
            { label: "Chiffon Sarees", link: "/chiffon-sarees/pl/3m0" },
            { label: "Satin Sarees", link: "/satin-sarees/pl/3k5" },
            { label: "Embroidered Sarees", link: "/embroidered-sarees/pl/3ju" },
          ],
        },
        {
          label: "Kurtis",
          subItems: [
            { label: "All Kurtis", link: "/women-kurtis/pl/3j0" },
            { label: "Anarkali Kurtis", link: "/anarkali-women-kurtis/pl/3jc" },
            { label: "Rayon Kurtis", link: "/rayon-women-kurtis/pl/3jz" },
            { label: "Cotton Kurtis", link: "/cotton-women-kurtis/pl/3jj" },
            { label: "Embroidered Kurtis", link: "/embroidered-women-kurtis/pl/3k0" },
          ],
        },
        {
          label: "Kurta Sets",
          link: "/kurta-sets-women/pl/3k9",
        },
        {
          label: "Suits & Dress Material",
          subItems: [
            { label: "All Suits & Dress Material", link: "/women-suits-dress-materials/pl/3iz" },
            { label: "Cotton Suits", link: "/cotton-women-suits-dress-materials/pl/3jk" },
            { label: "Embroidered Suits", link: "/embroidered-women-suits-dress-materials/pl/3k1" },
            { label: "Chanderi Suits", link: "/chanderi-suits-dress-materials/pl/3jv" },
          ],
        },
        {
          label: "Other Ethnic",
          subItems: [
            { label: "Blouses", link: "/blouses/pl/3l5" },
            { label: "Dupattas", link: "/dupattas/pl/3lz" },
            { label: "Lehanga", link: "/lehengas/pl/3l6" },
            { label: "Gown", link: "/gowns-women/pl/3l9" },
            { label: "Ethnic Bottomwear", link: "/ethnic-bottomwear-women/pl/3ta" },
          ],
        },
      ],
    },
    {
      label: "Women Western",
      link: "/women-western",
    },
    {
      label: "Men",
      link: "/men",
    },
    {
      label: "Kids",
      link: "/kids",
    },
    {
      label: "Home & Kitchen",
      link: "/home-kitchen",
    },
    {
      label: "Beauty & Health",
      link: "/beauty-health",
    },
    {
      label: "Jewellery & Accessories",
      link: "/jewellery-accessories",
    },
    {
      label: "Bags & Footwear",
      link: "/bags-footwear",
    },
    {
      label: "Electronics",
      link: "/electronics",
    },
  ];
  