import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function TweetDisplay({ tweet }) {
  if (!tweet) return null; // Don't render the component if there's no tweet
  return (
    <div>
      <h1>Generated Tweet</h1>
      <Card sx={{
      maxWidth: 700,
      mx: 'auto', // Centers the card horizontally
      my: 4, // Margin top and bottom
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
      '&:hover': {
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
      },
      borderRadius: '10px', // Rounded corners
    }}>
      <CardContent>
        <Typography variant="body1" component="p" sx={{
          whiteSpace: 'pre-wrap', // Preserves spaces and line breaks
          color: '#444', // Dark grey text for better readability
          fontSize: '1rem',
        }}>
          {tweet}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}

export default TweetDisplay;
