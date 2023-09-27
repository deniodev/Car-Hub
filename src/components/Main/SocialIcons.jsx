// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Icon from './Icon';

// eslint-disable-next-line react/prop-types
const SocialIcons = ({ className }) => (
  <ul className={className}>
    <Icon icon={<FaTwitter />} />
    <Icon icon={<FaFacebookF />} />
    <Icon icon={<FaInstagram />} />
  </ul>
)

SocialIcons.propTypes = {
  className: PropTypes.string.isRequired,
}

export default SocialIcons;


