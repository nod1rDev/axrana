import React, { useState } from "react";
import TextField from "@mui/material/TextField";

interface ValidatedInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
  id,
  label,
  value,
  onChange,
  maxLength,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setError(null);
    } else {
      setError(`Max length is ${maxLength} characters`);
    }
    onChange(e);
  };

  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={handleInputChange}
      error={!!error}
      helperText={error || `Max ${maxLength} characters`}
      variant="outlined"
      fullWidth
      inputProps={{ maxLength }}
      autoComplete="off"
    />
  );
};

export default ValidatedInput;
