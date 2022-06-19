import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface AppSelectListProps extends UseControllerProps {
  label: string;
  items: string[];
}

export default function AppSelectList(props: AppSelectListProps) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select value={field.value} label={props.label} onChange={field.onChange}>
        {props.items.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
