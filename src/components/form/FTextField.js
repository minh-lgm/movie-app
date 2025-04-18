import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import PropTypes from 'prop-types';

function FTextField({ name, label, rules, helperText, required, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          fullWidth
          required={required}
          error={!!error}
          helperText={error?.message || helperText}
          FormHelperTextProps={{
            sx: { mx: 0, mt: 1 }
          }}
          {...other}
        />
      )}
    />
  );
}

FTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  helperText: PropTypes.string,
  required: PropTypes.bool,
};

FTextField.defaultProps = {
  helperText: "",
  required: false,
};

export default FTextField;
