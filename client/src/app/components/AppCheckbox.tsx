import { Checkbox, FormControlLabel } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface AppCheckboxProps extends UseControllerProps {
  label: string;
}

export default function AppCheckbox(props: AppCheckboxProps) {
  const {field} = useController({...props, defaultValue: false});

  return (
    <FormControlLabel 
      control={
        <Checkbox
          {...field}
          checked={field.value}
          color="secondary"
        />
      }
      label={props.label}
    />
  );
}