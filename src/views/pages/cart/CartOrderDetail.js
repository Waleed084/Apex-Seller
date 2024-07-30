import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import PropTypes from 'prop-types';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import PhoneInput from 'react-phone-number-input';
import FlagsSelect from 'react-flags-select';
import 'react-phone-number-input/style.css';
import './CartOrderDetail.scss'; // Import SCSS file

countries.registerLocale(enLocale);

const CartOrderDetail = ({ item, onBack }) => {
  const [quantity, setQuantity] = useState(item ? item.quantity || 1 : 1);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    country: '',
    postalCode: ''
  });
  const [countryCode, setCountryCode] = useState('');

  const handleCustomerDetailChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCountryChange = (code) => {
    const countryName = countries.getName(code, 'en');
    setCustomerDetails({
      ...customerDetails,
      country: countryName
    });
    setCountryCode(code);
  };

  const handleCheckout = async () => {
    const orderDetails = {
      ...item,
      quantity,
      price,
      customerDetails
    };

    try {
      await axios.post('/api/allorders', orderDetails); // Adjust the endpoint as needed
      setMessage('Order placed successfully!');
      setTimeout(() => {
        setMessage('');
        onBack(); // Go back to the cart after checkout
      }, 2000);
    } catch (error) {
      console.error('Error deleting order:', error);
      setError('Error Placing order. Please try again.');
    }
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(`/api/cart/delete/${item._id}`);
      setMessage('Order deleted successfully!');
      setTimeout(() => {
        setMessage('');
        onBack();
      }, 2000);
    } catch (error) {
      console.error('Error deleting order:', error);
      setError('Error deleting order. Please try again.');
    }
  };

  if (!item) {
    return <Typography>No item details available</Typography>;
  }

  return (
    <div>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={onBack} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography variant="h3" gutterBottom sx={{ marginLeft: 2, marginTop: 0.1, paddingTop: '7px', color: 'secondary.dark' }}>
          Checkout Details
        </Typography>
      </Box>
      {message && (
        <Box mb={3}>
          <Typography variant="h4" color="success.main">
            {message}
          </Typography>
        </Box>
      )}
      {error && (
        <Box mb={3}>
          <Typography variant="h4" color="error.main">
            {error}
          </Typography>
        </Box>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Customer Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Customer Name"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleCustomerDetailChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Customer Address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleCustomerDetailChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="custom-select">
                    <FlagsSelect
                      selected={countryCode}
                      onSelect={handleCountryChange}
                      countries={Object.keys(countries.getNames('en'))}
                      customLabels={countries.getNames('en')}
                      showSelectedLabel={true}
                      showOptionLabel={true}
                      placeholder="Select Country"
                      className="custom-flag-select"
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="custom-phone-input">
                    <PhoneInput
                      country={countryCode}
                      value={customerDetails.phoneNumber}
                      onChange={(value) => setCustomerDetails({ ...customerDetails, phoneNumber: value })}
                      international
                      withCountryCallingCode
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Customer Email"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleCustomerDetailChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Postal Code"
                    name="postalCode"
                    value={customerDetails.postalCode}
                    onChange={handleCustomerDetailChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Order Details
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {item.type} by {item.company}
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        inputProps={{ min: 1, max: 50 }}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth />
                    </TableCell>
                  </TableRow>
                  {item.properties &&
                    Object.entries(item.properties).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell colSpan={2}>{value}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
        <Button variant="contained" color="error" onClick={deleteOrder}>
          Delete
        </Button>
      </Box>
    </div>
  );
};

// Define prop types for validation
CartOrderDetail.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    quantity: PropTypes.number,
    type: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    properties: PropTypes.object
  }).isRequired,
  onBack: PropTypes.func.isRequired
};

export default CartOrderDetail;
