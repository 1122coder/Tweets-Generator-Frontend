import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Select, MenuItem } from '@mui/material';

const TrendsBox = ({ onTrendClick }) => {
  const [trends, setTrends] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('global');
  useEffect(() => {
    const fetchTrends = async () => {
      const endpoint = `api/trends/${selectedCountry}`;
      const response = await fetch(`https://31.220.84.206:3001/${endpoint}`);
      const data = await response.json();
      setTrends(data.slice(0, 40));
    };

    fetchTrends();
  }, [selectedCountry]);

  const countries = ['global', 'pakistan', 'united-states', 'argentina', 'india', 'japan', 'canada'];

  const gradientBorder = {
    background: 'linear-gradient(90deg, rgba(131,58,180,1) 20%, rgba(253,29,29,1) 60%, rgba(252,176,69,1) 20%)',
    borderRadius: 5,
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '0 30px',
    color: 'white',
    height: 48,
  };

  return (
    <Paper elevation={3} sx={{
      ...gradientBorder,
      width: '100%',
      maxWidth: '400px',
      height: '600px',
      overflowY: 'auto',
      padding: '16px',
      '&::-webkit-scrollbar': {
        width: '6px'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius: '10px'
      }
    }}>
      <Select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        {countries.map(country => (
          <MenuItem key={country} value={country}>
            {country.replace('-', ' ').toUpperCase()}
          </MenuItem>
        ))}
      </Select>
      {trends.map((trend, index) => (
        <Box key={index} sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
          cursor: 'pointer',
          padding: '6px 12px',
          borderRadius: '20px',
          backgroundColor: 'transparent',
          color: 'inherit',
          '&:hover': {
            backgroundColor: 'rgba(255, 105, 135, .1)',
            transform: 'scale(1.02)',
            transition: 'all 0.3s ease-in-out'
          }
        }} onClick={() => onTrendClick(trend.trend)}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {trend.trend}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {trend.volume}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default TrendsBox;
