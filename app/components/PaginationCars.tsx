import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationCars() {
  return (
    <div className="py-4 px-8 lg:px-28 lg:py-4 my-8">
      <div className="flex justify-center">
        <Stack spacing={2}>
          <Pagination count={10} color="primary" />
        </Stack>
      </div>
    </div>
  );
}