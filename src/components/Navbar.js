import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Tooltip from '@mui/material/Tooltip';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'

const pages = ['Products', 'My orders', 'Add Item', 'List Users'];
const roleBuyer = "7832c0fe-d0f0-425a-8d36-d32693c57aff";
const roleAdmin = "cbe5ea52-0edb-4d2e-a883-1488f1520b20";

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [isAdmin, setIsAdmin] = React.useState(true)
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleProductsNavMenu = () => {
        navigate("Products")
    };

    const handleMyOrdersNavMenu = () => {
        navigate("MyOrders")
    };

    const handleAddItemNavMenu = () => {
        navigate("AddItem")
    };

    const handleListClientsNavMenu = () => {
        navigate("ListUsers")
    };

    const handlerLogoutMenu = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("webToken");
        navigate("/")
    }

    const userRole = async () => {
        var currentUser = await JSON.parse(localStorage.getItem("currentUser"))
        var currentRole = await currentUser.role.roleId

        if (currentRole === roleBuyer) {
            setIsAdmin(false)
            console.log("cliente")
        } else if (currentRole === roleAdmin) {
            setIsAdmin(true)
            console.log("admin")
        }
    }
    setTimeout(()=>{
        userRole(); 
    }, 2000)
    

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        JCStore
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key={"products"}
                            onClick={handleProductsNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            products
                        </Button>
                        <Button
                            key={"myOrders"}
                            onClick={handleMyOrdersNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            MyOrders
                        </Button>
                        {
                            isAdmin ?
                                <div className='div-admin-function'>
                                    <Button
                                        key={"addProduct"}
                                        onClick={handleAddItemNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Add Products
                                    </Button>
                                    <Button
                                        key={"listClients"}
                                        onClick={handleListClientsNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        List Clients
                                    </Button>
                                </div>
                                :
                                null
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Add to car">
                            <IconButton size="medium" sx={{ p: 0, color: "white" }}>
                                <AddShoppingCartIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ flexGrow: 0, paddingLeft: 2 }}>
                        <Tooltip title="Log out">
                            <IconButton size="medium" onClick={handlerLogoutMenu} sx={{ p: 0, color: "white" }}>
                                <LogoutIcon></LogoutIcon>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;