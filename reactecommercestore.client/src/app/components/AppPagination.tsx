import { Box, Pagination, Typography } from "@mui/material";
import type { Pagination as PaginationType } from "../models/pagination";

interface Props {
  metaData: PaginationType;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { totalCount, pageSize, currentPage, totalPages } = metaData;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={3}>
      <Typography>
        Displaying {startItem}-{endItem} of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
      />
    </Box>
  );
}
