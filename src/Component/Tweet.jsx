import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TweetDisplay from './TweetDisplay';
import TwitterTrendsBox from './TwitterTrendsBox';
import SearchBar from './SearchBar';

function Tweet() {
  const [content, setContent] = useState('');
  const [tweet, setTweet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tone, setTone] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleSearch = async (query) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://31.220.84.206:3001/searchArticles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const articleData = await response.json();
      setOriginalContent(articleData.articlesContent); // Save the original content
  
      // Request summary
      const summaryResponse = await fetch('https://31.220.84.206:3001/generateSummary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: articleData.articlesContent }),
      });
  
      const summaryData = await summaryResponse.json();
      setContent(summaryData.summary); // Set the summary in the text area
  
    } catch (error) {
      console.error('Error:', error);
      setContent('Failed to fetch or summarize articles.');
    }
    setIsLoading(false);
  };

  const handleGenerateTweet = async () => {
    if (error) {
      alert(error);
      return;
    }
    setIsLoading(true);
    try {
      // Replace with your actual backend endpoint that generates tweets using GPT-4
      const response = await fetch('https://31.220.84.206:3001/generateTweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, tone }), // Send the content of the text area to GPT-4
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTweet(data.tweet); // Set the generated tweet
    } catch (error) {
      console.error('Error:', error);
      setTweet('Failed to generate tweet.');
    }
    setIsLoading(false);
  };

  const handleTrendSelection = (trend) => {
    setSearchQuery(trend); // Only update the search query
  };
  // Function to toggle the dialog
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setContent(text);
    // Use a regex to split by whitespace and punctuation, filtering out empty strings
    const words = text.match(/\b(\w+)\b/g);
    setWordCount(words ? words.length : 0);
    if (words && words.length > 9999) {
      setError('Content length exceeds the limit of 9999 words.');
    } else {
      setError('');
    }
  };
  return (
    <div className="App" >
          <Typography 
      variant="h2" 
      sx={{
        textTransform: 'uppercase',
        fontSize: '5rem',
        fontWeight: 'bold',
        marginY: '80px', // Top and bottom margin

      }}
    >
      Tweet <span style={{
        background: 'linear-gradient(45deg, blue, orange, magenta)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        animation: 'fadeInOut 3s ease-in-out infinite',
        '@keyframes fadeInOut': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      }}>Generator</span>
    </Typography>
      <Grid container spacing={2} sx={{ padding: '8px', margin: '0 8px', maxWidth: 'calc(100% - 16px)' }}>
        <Grid item xs={12} md={4}>
          <TwitterTrendsBox className='twitter-trends-box' onTrendClick={handleTrendSelection} />
        </Grid>

        <Grid item xs={12} md={7} sx={{ padding: '8px', margin: '0.22rem 2.9rem'}}>
        <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
            Search Content
          </Typography>
          <SearchBar className="search-bar" onSearch={handleSearch} query={searchQuery} />
          {isLoading ? <p>Loading...</p> : (
            <div>
                <TextField
                  multiline
                  rows={10}
                  value={content}
                  onChange={handleTextChange}
                  placeholder="The content will appear here..."
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    mb: 1,
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.23)', // Customized border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main', // Hover state
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main', // Focus state
                      },
                    },
                    '& .MuiInputBase-inputMultiline': {
                      padding: '12px',
                    },
                  }}
                />
                <Typography variant="caption" display="block" gutterBottom sx={{ color: 'text.secondary', mt: '-8px' }}>
                  Word Count: {wordCount}
                </Typography>
                {error && <Typography variant="body2" color="error">{error}</Typography>}
                  {/* See All button */}
                      <Button variant="outlined" onClick={toggleDialog} sx={{ marginTop: '20px',marginLeft: '1rem' }}>
                        See All
                      </Button>

                      {/* Dialog for showing original content */}
                      <Dialog open={isDialogOpen} onClose={toggleDialog} maxWidth="lg" fullWidth>
                        <DialogTitle>Original Content</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            {originalContent}
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>
            </div>
          )}
              <div>
                <Typography variant="subtitle1" gutterBottom>Select tweet tone:</Typography>
                <Grid container spacing={1} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                    {['for', 'funny', 'sarcatic', 'professional', 'informational', 'casual', 'against'].map((toneOption) => (
                      <Grid item xs={6} sm={3} md={3} lg={2} key={toneOption}>
                        <Button
                          fullWidth
                          variant={tone === toneOption ? "contained" : "outlined"}
                          onClick={() => setTone(toneOption)}
                          sx={{
                            borderRadius: '20px',
                            textTransform: 'capitalize',
                            boxShadow: 'none',
                            '&:hover': {
                              boxShadow: 'none',
                            },
                            height: '56px', // Ensuring all buttons are of the same height
                          }}
                        >
                          {toneOption}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                    </div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateTweet}
              disabled={!(content?.trim() || '')}
              sx={{
                backgroundColor: '#1DA1F2', // Twitter's blue color
                color: '#ffffff', // White text color
                padding: '10px 10px', // Comfortable padding
                fontSize: '16px', // Readable font size
                fontWeight: 'bold', // Bold text
                textTransform: 'none', // Normal text casing
                boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                marginTop: '0.9rem',
                '&:hover': {
                  backgroundColor: '#1991db', // Slightly darker blue on hover
                },
                '&:disabled': {
                  backgroundColor: '#ddd', // Greyed out when disabled
                  color: '#aaa',
                },
                width: '100%', // Full width
              }}
            >
              Tweet
            </Button>
        </Grid>
      </Grid>
      <TweetDisplay tweet={tweet} />
    </div>
  );
}

export default Tweet;
