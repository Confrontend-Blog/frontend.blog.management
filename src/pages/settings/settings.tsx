import { useState } from "react";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

export default function Settings() {
  const [isDark, setIsDark] = useState(false);

  const handleThemeChange = () => {
    setIsDark(!isDark);
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={isDark} onChange={handleThemeChange} />}
        label={isDark ? "Dark Mode" : "Light Mode"}
      />
    </div>
  );
}
