// frontend/src/components/BirthdayPost.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import { useLocation } from 'react-router-dom';

const BirthdayPost = () => {
  const location = useLocation();
  const [metadata, setMetadata] = useState({
    title: 'Loading...',
    description: 'Loading...',
    image: 'https://example.com/loading.jpg',
    url: 'http://localhost:3000' + location.pathname,
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get('http://localhost:3003/metadata', {
          params: { url: location.pathname },
        });
        setMetadata(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, [location.pathname]);

  const shareUrl = window.location.href;

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
      </Helmet>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <h1>{metadata.title}</h1>
        <p>{metadata.description}</p>
        <img src={metadata.image} alt="Birthday" style={{ maxWidth: '100%', height: 'auto' }} />
        <div style={{ marginTop: '20px' }}>
          <FacebookShareButton url={shareUrl} quote={metadata.title} hashtag="#HappyBirthday">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={metadata.title} hashtags={['HappyBirthday']}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} title={metadata.title} summary={metadata.description} source={shareUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      </div>
    </>
  );
};

export default BirthdayPost;
