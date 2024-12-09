// import React, { useState } from "react";
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   Box,
// } from "@chakra-ui/react";

// interface AddCountryFormProps {
//   onAdd: (newCountry: any) => void; 
//   onClose:()=>void;
// }

// const AddCountryForm: React.FC<AddCountryFormProps> = ({ onAdd,onClose }) => {
//   const initialNewCountry = {
//     identity: "",
//     currency_name: "",
//     description:""
//   };

//   const [newCountry, setNewCountry] = useState(initialNewCountry);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewCountry((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onAdd(newCountry);
//     setNewCountry(initialNewCountry);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <FormControl isRequired mb={"10px"}>
//         <FormLabel>Country Name</FormLabel>
//         <Input
//           type="text"
//           name="identity"
//           value={newCountry.identity}
//           onChange={handleInputChange}
//           placeholder="Country name"
//         />
//       </FormControl>
//       <FormControl isRequired mb={"10px"}>
//         <FormLabel>Currency Name</FormLabel>
//         <Input
//           type="text"
//           name="currency_name"
//           value={newCountry.currency_name}
//           onChange={handleInputChange}
//           placeholder="Currency name"
//         />
//       </FormControl>
//       <FormControl isRequired mb={"10px"}>
//         <FormLabel>Description</FormLabel>
//         <Input
//           type="text"
//           name="description"
//           value={newCountry.description}
//           onChange={handleInputChange}
//           placeholder="description"
//         />
//       </FormControl>
//       <Box mt={4}>
//         <Button colorScheme="blue" borderRadius={"8px"} mr={"10px"}  size={"md"} type="submit">
//           Add
//         </Button>
//         <Button size={"md"} borderRadius={"8px"} bg={"#9DA5B1"} onClick={onClose} >
//           Cancel
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default AddCountryForm;
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";

interface AddCountryFormProps {
  onAdd: (newCountry: any) => void;
  onClose: () => void;
}

const AddCountryForm: React.FC<AddCountryFormProps> = ({ onAdd, onClose }) => {
  const initialNewCountry = {
    max_amount: "",
    max_weight_kg: "",
    min_amount: "",
    min_weight_kg: "",
    max_weight_per_product_kg: "",
    currency_name: "",
    currency_symbol: "",
    currency_code:"",
    country_code: "",
    pin_code_regex: "",
    display_order: "",
    identity: "",
    description:""
  };

  const [newCountry, setNewCountry] = useState(initialNewCountry);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCountry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newCountry);
    setNewCountry(initialNewCountry);
  };

  return (
    <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={"10px"}>
        <FormLabel>Country Name</FormLabel>
        <Input
          type="text"
          name="identity"
          value={newCountry.identity}
          onChange={handleInputChange}
          placeholder="Country Name"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
         <FormLabel>Description</FormLabel>
         <Input
           type="text"
           name="description"
           value={newCountry.description}
           onChange={handleInputChange}
           placeholder="description"
         />
       </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Max Amount</FormLabel>
        <Input
          type="number"
          name="max_amount"
          value={newCountry.max_amount}
          onChange={handleInputChange}
          placeholder="Max Amount"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Max Weight (kg)</FormLabel>
        <Input
          type="number"
          name="max_weight_kg"
          value={newCountry.max_weight_kg}
          onChange={handleInputChange}
          placeholder="Max Weight (kg)"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Min Amount</FormLabel>
        <Input
          type="number"
          name="min_amount"
          value={newCountry.min_amount}
          onChange={handleInputChange}
          placeholder="Min Amount"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Min Weight (kg)</FormLabel>
        <Input
          type="number"
          name="min_weight_kg"
          value={newCountry.min_weight_kg}
          onChange={handleInputChange}
          placeholder="Min Weight (kg)"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Max Weight Per Product (kg)</FormLabel>
        <Input
          type="number"
          name="max_weight_per_product_kg"
          value={newCountry.max_weight_per_product_kg}
          onChange={handleInputChange}
          placeholder="Max Weight Per Product (kg)"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Currency Name</FormLabel>
        <Input
          type="text"
          name="currency_name"
          value={newCountry.currency_name}
          onChange={handleInputChange}
          placeholder="Currency Name"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Currency Symbol</FormLabel>
        <Input
          type="text"
          name="currency_symbol"
          value={newCountry.currency_symbol}
          onChange={handleInputChange}
          placeholder="Currency Symbol"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Currency Code</FormLabel>
        <Input
          type="text"
          name="currency_code"
          value={newCountry?.currency_code}
          onChange={handleInputChange}
          placeholder="Currency Code"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Country Code</FormLabel>
        <Input
          type="text"
          name="country_code"
          value={newCountry.country_code}
          onChange={handleInputChange}
          placeholder="Country Code"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Pin Code Regex</FormLabel>
        <Input
          type="text"
          name="pin_code_regex"
          value={newCountry.pin_code_regex}
          onChange={handleInputChange}
          placeholder="Pin Code Regex"
        />
      </FormControl>
      <FormControl isRequired mb={"10px"}>
        <FormLabel>Display Order</FormLabel>
        <Input
          type="text"
          name="display_order"
          value={newCountry.display_order}
          onChange={handleInputChange}
          placeholder="Display Order"
        />
      </FormControl>
      <Box mt={4}>
        <Button
          colorScheme="brand"
          _hover={{bg:"#399f7f"}}
          borderRadius={"8px"}
          mr={"10px"}
          size={"md"}
          type="submit"
        >
          Add
        </Button>
        <Button
          size={"md"}
          borderRadius={"8px"}
          bg={"#9DA5B1"}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default AddCountryForm;
