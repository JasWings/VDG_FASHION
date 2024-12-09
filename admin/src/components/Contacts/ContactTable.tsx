// components/ContactTable.js
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const ContactTable = ({ contacts }) => {
  return (
    <Box>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contacts.map((contact) => (
            <Tr key={contact.id}>
              <Td>{contact.name}</Td>
              <Td>{contact.email}</Td>
              <Td>{contact.phone_number || "N/A"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ContactTable;
