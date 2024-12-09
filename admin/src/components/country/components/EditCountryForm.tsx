import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";


interface EditCountryFormProps {
  country: {
    max_amount: string;
    description:string;
    max_weight_kg: string;
    min_amount: string;
    min_weight_kg: string;
    max_weight_per_product_kg: string;
    currency_name: string;
    currency_symbol: string;
    currency_code:string;
    country_code: string;
    pin_code_regex: string;
    display_order: number;
    identity: string;
  };
  onUpdate: (updatedCountry: any) => void;
  onClose: () => void;
}

const EditCountryForm: React.FC<EditCountryFormProps> = ({ country, onUpdate, onClose }) => {
  const [editedCountry, setEditedCountry] = useState(country);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedCountry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedCountry);
  };

  return (
    <form onSubmit={handleSubmit}>
     <FormControl>
        <FormLabel>Country Name</FormLabel>
        <Input
          type="text"
          name="identity"
          value={editedCountry.identity}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
         <FormLabel>Description</FormLabel>
         <Input
           type="text"
           name="description"
           value={editedCountry.description || ""}
           onChange={handleInputChange}
         />
       </FormControl>
      <FormControl>
        <FormLabel>Max Amount</FormLabel>
        <Input
          type="text"
          name="max_amount"
          value={editedCountry.max_amount}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Max Weight (kg)</FormLabel>
        <Input
          type="text"
          name="max_weight_kg"
          value={editedCountry.max_weight_kg}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Min Amount</FormLabel>
        <Input
          type="text"
          name="min_amount"
          value={editedCountry.min_amount}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Min Weight (kg)</FormLabel>
        <Input
          type="text"
          name="min_weight_kg"
          value={editedCountry.min_weight_kg}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Max Weight Per Product (kg)</FormLabel>
        <Input
          type="text"
          name="max_weight_per_product_kg"
          value={editedCountry.max_weight_per_product_kg}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Currency Name</FormLabel>
        <Input
          type="text"
          name="currency_name"
          value={editedCountry.currency_name}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Currency Symbol</FormLabel>
        <Input
          type="text"
          name="currency_symbol"
          value={editedCountry.currency_symbol}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Currency Code</FormLabel>
        <Input
          type="text"
          name="currency_code"
          value={editedCountry?.currency_code}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Country Code</FormLabel>
        <Input
          type="text"
          name="country_code"
          value={editedCountry.country_code}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Pin Code Regex</FormLabel>
        <Input
          type="text"
          name="pin_code_regex"
          value={editedCountry.pin_code_regex}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Display Order</FormLabel>
        <Input
          type="number"
          name="display_order"
          value={editedCountry.display_order.toString()}
          onChange={handleInputChange}
        />
      </FormControl>
      <Box mt={4}>
        <Button
          colorScheme="brand"
          _hover={{bg:"#399f7f"}}
          borderRadius={"8px"}
          size={"md"}
          mr={"10px"}
          type="submit"
        >
          Save
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

export default EditCountryForm;

