import { FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";

import { useThemeStore } from "../../stores/theme-store";

export default function Settings() {
  const isDark = useThemeStore((state) => state.isDark);

  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={isDark} onChange={toggleTheme} />}
        label={isDark ? "Dark Mode" : "Light Mode"}
      />
    </div>
  );
}
