import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';


function SearchBar({ onSearch, query: initialQuery }) {
  const [localQuery, setLocalQuery] = useState(initialQuery || '');

  useEffect(() => {
    setLocalQuery(initialQuery || '');
  }, [initialQuery]);

  const handleInputChange = (event) => {
    setLocalQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(localQuery.trim());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        margin: 'auto',
        boxShadow: 3,
        borderRadius: '50px',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        p: 2
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={localQuery}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" color="primary" onClick={handleSubmit}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            },
            '& .MuiOutlinedInput-input': {
              padding: '10px 14px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey.400',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey.500',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey.500',
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default SearchBar;
