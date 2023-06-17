import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { useThemeStore } from "../../stores/themeStore";

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
