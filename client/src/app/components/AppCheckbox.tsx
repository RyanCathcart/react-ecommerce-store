import { Checkbox, FormControlLabel } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface AppCheckboxProps extends UseControllerProps {
  label: string;
  disabled: boolean;
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
          disabled={props.disabled}
        />
      }
      label={props.label}
    />
  );
}