
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

interface NavbarProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setActiveComponent }) => {
  const handleButtonClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Excel Data Upload and Display
        </Typography>
        <Button color="inherit" onClick={() => handleButtonClick('Upload')}>
          Upload Excel File
        </Button>
        <Button color="inherit" onClick={() => handleButtonClick('Display')}>
          Display Data
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
