import { Tabs, Tab, Box } from "@mui/material";

interface Props {
  value: number;
  onChange: (newValue: number) => void;
}

const SectionButtons = ({ value, onChange }: Props) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        centered
      >
        <Tab label="Active" />
        <Tab label="Completed" />
      </Tabs>
    </Box>
  );
};

export default SectionButtons;
