import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Container, Typography } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import RedirectPage from './pages/RedirectPage';
import { UrlProvider } from './context/UrlContext';

function App() {
  return (
    <UrlProvider>
      <Router>
        <CssBaseline />
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
          <Typography variant="h4" gutterBottom align="center">
            URL Shortener App
          </Typography>
          <Routes>
            <Route path="/shorten" element={<ShortenerPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/:shortcode" element={<RedirectPage />} />
            <Route path="*" element={<Navigate to="/shorten" />} />
          </Routes>
        </Container>
      </Router>
    </UrlProvider>
  );
}

export default App;