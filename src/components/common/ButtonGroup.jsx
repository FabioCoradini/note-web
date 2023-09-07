import { Button } from "@mui/material";

const ButtonGroup = ({ actions }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
    {actions.map((action, index) => (
      <Button
        key={index}
        color={action.color}
        variant="contained"
        style={{ marginLeft: index > 0 ? "1rem" : "0", ...action.style }}
        onClick={action.onClick}
      >
        {action.label}
      </Button>
    ))}
  </div>
);

export default ButtonGroup;
