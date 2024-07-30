import React, { useState, useEffect } from 'react';
import { Typography, Grid, Avatar, Box, CardActionArea } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import PropTypes from 'prop-types';
import CartOrderDetail from './CartOrderDetail';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 220,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 230,
    height: 220,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/api/cart-data`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the cart items!', error);
      });
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      {selectedItem ? (
        <CartOrderDetail item={selectedItem} onBack={() => setSelectedItem(null)} />
      ) : (
        <>
          <Typography variant="h4" gutterBottom sx={{ mb: 2, color: theme.palette.secondary.dark }}>
            Your Cart
          </Typography>
          <Grid container spacing={3}>
            {cartItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CardActionArea onClick={() => handleCardClick(item)}>
                  <CardWrapper>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ mr: 2, bgcolor: theme.palette.warning.main }}>{item.type[0]}</Avatar>
                      <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
                        {item.type} by {item.company}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {item.properties &&
                        Object.entries(item.properties).map(([key, value]) => (
                          <Box key={key} display="flex">
                            <Typography variant="body2" color="textPrimary" sx={{ mr: 1 }}>
                              {key}:
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {value}
                            </Typography>
                          </Box>
                        ))}
                    </Typography>
                  </CardWrapper>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

Cart.propTypes = {
  isLoading: PropTypes.bool
};

export default Cart;
