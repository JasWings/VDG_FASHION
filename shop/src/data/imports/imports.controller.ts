import { ImportDto } from './dto/create-import.dto';

// Define a function for importing attributes
export function importAttributes(importAttributesDto: ImportDto) {
  console.log(importAttributesDto);
  return true;
}

// Define a function for importing products
export function importProducts(importProductsDto: ImportDto) {
  console.log(importProductsDto);
  return true;
}

// Define a function for importing variation options
export function importVariationOptions(importVariationOptionsDto: ImportDto) {
  console.log(importVariationOptionsDto);
  return true;
}
