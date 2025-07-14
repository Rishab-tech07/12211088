import React, { createContext, useContext, useReducer } from 'react';
import { generateShortcode, getLocationFromIP } from '../utils/helpers';
import { logEvent } from '../utils/logger';

const UrlContext = createContext();

const initialState = {
  urls: []
};

const urlReducer = (state, action) => {
  switch (action.type) {
    case 'SHORTEN_URLS': {
      const newUrls = action.payload.map((form) => {
        const now = new Date();
        const shortCode = form.shortcode || generateShortcode();
        const minutes = parseInt(form.validity, 10) || 30;
        const expiresAt = new Date(now.getTime() + minutes * 60000);

        return {
          originalUrl: form.longUrl,
          shortCode,
          createdAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          clickStats: []
        };
      });

      logEvent('SHORTEN_URLS', newUrls);
      return { ...state, urls: [...state.urls, ...newUrls] };
    }

    case 'REGISTER_CLICK': {
      const { shortCode, referrer, timestamp, location } = action.payload;
      const updatedUrls = state.urls.map((url) => {
        if (url.shortCode === shortCode) {
          return {
            ...url,
            clickStats: [
              ...url.clickStats,
              { timestamp, referrer, location }
            ]
          };
        }
        return url;
      });
      logEvent('REGISTER_CLICK', action.payload);
      return { ...state, urls: updatedUrls };
    }

    default:
      return state;
  }
};

export const UrlProvider = ({ children }) => {
  const [state, dispatch] = useReducer(urlReducer, initialState);

  const shortenUrls = (forms) => {
    dispatch({ type: 'SHORTEN_URLS', payload: forms });
  };

  const registerClick = async (shortCode, referrer) => {
    const location = await getLocationFromIP();
    dispatch({
      type: 'REGISTER_CLICK',
      payload: {
        shortCode,
        referrer,
        timestamp: new Date().toISOString(),
        location
      }
    });
  };

  return (
    <UrlContext.Provider value={{ ...state, shortenUrls, registerClick }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrlContext = () => useContext(UrlContext);
