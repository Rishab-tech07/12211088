import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Alert, Stack } from '@mui/material';
import { useUrlContext } from '../context/UrlContext';

const ShortenerPage = () => {
  const [urlForms, setUrlForms] = useState([{ longUrl: '', validity: '', shortcode: '', error: '' }]);
  const { shortenUrls } = useUrlContext();

  const handleChange = (index, field, value) => {
    const updated = [...urlForms];
    updated[index][field] = value;
    updated[index].error = '';
    setUrlForms(updated);
  };

  const addUrlForm = () => {
    if (urlForms.length < 5) {
      setUrlForms([...urlForms, { longUrl: '', validity: '', shortcode: '', error: '' }]);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    let valid = true;
    const updated = urlForms.map((form) => {
      if (!form.longUrl || !validateUrl(form.longUrl)) {
        valid = false;
        return { ...form, error: 'Invalid or empty URL' };
      }
      if (form.validity && (!Number.isInteger(+form.validity) || +form.validity <= 0)) {
        valid = false;
        return { ...form, error: 'Validity must be a positive integer' };
      }
      return { ...form, error: '' };
    });
    setUrlForms(updated);
    if (!valid) return;

    shortenUrls(updated);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h6" gutterBottom>Shorten URLs (up to 5 at once)</Typography>
      <Stack spacing={3}>
        {urlForms.map((form, idx) => (
          <Grid container spacing={2} key={idx}>
            <Grid item xs={12} sm={6}>
              <TextField label="Long URL" value={form.longUrl} onChange={(e) => handleChange(idx, 'longUrl', e.target.value)} fullWidth error={!!form.error} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField label="Validity (mins)" value={form.validity} onChange={(e) => handleChange(idx, 'validity', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField label="Custom Shortcode" value={form.shortcode} onChange={(e) => handleChange(idx, 'shortcode', e.target.value)} fullWidth />
            </Grid>
            {form.error && (
              <Grid item xs={12}>
                <Alert severity="error">{form.error}</Alert>
              </Grid>
            )}
          </Grid>
        ))}
        <Button variant="outlined" onClick={addUrlForm} disabled={urlForms.length >= 5}>+ Add Another URL</Button>
        <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>
      </Stack>
    </Paper>
  );
};

export default ShortenerPage;