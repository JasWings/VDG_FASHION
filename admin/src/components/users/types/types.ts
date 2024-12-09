interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

interface UserListTableProps {
    users: User[];
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
  }
  
  