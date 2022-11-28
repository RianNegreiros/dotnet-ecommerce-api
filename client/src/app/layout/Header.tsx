import React from "react";
import { Badge, AppBar, IconButton, List, ListItem, Switch, Toolbar, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";

interface Props {
  darkMode: boolean;
  handleDarkMode: () => void;
}

const midLinks = [
  {title:'catalog', path:'/catalog'},
  {title:'about', path:'/about'},
  {title:'contact', path:'/contact'},
]

const rightLinks = [
  {title:'login', path:'/login'},
  {title:'register', path:'/register'},
]

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500',
  },
  '&.active': {
    color: 'text.secondary',
  },
}

export default function Header({darkMode, handleDarkMode}: Props) {
  return (
    <AppBar position="static" sx={{md: 4}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

      <Box display='flex' alignItems='center'>
        <Typography variant="h6"
          component={NavLink}
          to="/"
          exact
          sx={navStyles}
          >
            Aliquet Store
        </Typography>
        <Switch checked={darkMode} onChange={handleDarkMode} />
      </Box>

        <List sx={{display: 'flex'}}>
          {midLinks.map(({title, path}) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
              >
                {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton size="large" sx={{color: 'inherit'}}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{display: 'flex'}}>
            {rightLinks.map(({title, path}) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
                >
                  {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

      </Toolbar>
    </AppBar>
  )
}