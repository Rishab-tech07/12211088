import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useUrlContext } from '../context/UrlContext';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const { urls, registerClick } = useUrlContext();

  useEffect(() => {
    const match = urls.find((url) => url.shortCode === shortcode);

    if (!match) return;

    const now = new Date();
    const expiry = new Date(match.expiresAt);
    if (now <= expiry) {
      registerClick(shortcode, document.referrer);
      window.location.href = match.originalUrl;
    } else {
      alert('This short link has expired.');
    }
  }, [shortcode, urls, registerClick]);

  return null;
};

export default RedirectPage;
