import { Box, Button, Paper } from "@mui/material";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import Search from "./Search";

const sortOptions = [
  {value: "name", label: "Alphabetical"},
  {value: "priceDesc", label: "Price: High to low"},
  {value: "price", label: "Price: Low to high"},
]

interface Props {
  filters: {
    brands: string[],
    types: string[];
  };
}

export default function Filters({ filters }: Props) {
  const { orderBy, brands, types } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <Search />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <RadioButtonGroup
          selectedValue={orderBy}
          options={sortOptions}
          onChange={event => dispatch(setOrderBy(event.target.value))} />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <CheckboxButtons
          items={filters.brands}
          checked={brands}
          onChange={(items: string[]) => dispatch(setBrands(items))}
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <CheckboxButtons
          items={filters.types}
          checked={types}
          onChange={(items: string[]) => dispatch(setTypes(items))}
        />
      </Paper>

      <Button onClick={() => {
        dispatch(resetParams());
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}>
        Reset filters
      </Button>
    </Box>
  );
}