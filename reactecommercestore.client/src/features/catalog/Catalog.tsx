import { Grid, Typography } from "@mui/material";
import AppPagination from "../../app/components/AppPagination";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import { setPageNumber } from "./catalogSlice";
import Filters from "./Filters";
import ProductList from "./ProductList";

export default function Catalog() {
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading: isLoadingProducts } = useFetchProductsQuery(productParams);
  const { data: filters, isLoading: isLoadingFilters } = useFetchFiltersQuery();
  const dispatch = useAppDispatch();

  if (isLoadingProducts || !data || isLoadingFilters || !filters) return <LoadingComponent message="Loading products..." />;

  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Filters filters={filters} />
      </Grid>
      <Grid size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList products={data.items} />
            <AppPagination
              metaData={data.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <Typography variant="h5">No products match this filter</Typography>
        )}
        
      </Grid>
    </Grid>
  );
}
