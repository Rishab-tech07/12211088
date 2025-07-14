import React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useUrlContext } from '../context/UrlContext';

const StatisticsPage = () => {
  const { urls } = useUrlContext();

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h6" gutterBottom>
        Shortened URL Statistics
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Expires At</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url.shortCode}>
              <TableCell><a href={`/${url.shortCode}`} target="_blank" rel="noreferrer">{window.location.origin}/{url.shortCode}</a></TableCell>
              <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
              <TableCell>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {url.clickStats.length}
                  </AccordionSummary>
                  <AccordionDetails>
                    {url.clickStats.length === 0 ? (
                      <Typography>No clicks yet.</Typography>
                    ) : (
                      url.clickStats.map((click, idx) => (
                        <Typography key={idx}>
                          {new Date(click.timestamp).toLocaleString()} - {click.referrer || 'Direct'} - {click.location}
                        </Typography>
                      ))
                    )}
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StatisticsPage;
