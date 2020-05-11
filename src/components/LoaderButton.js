import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import './LoaderButton.scss';

export default function LoaderButton({ isLoading, className = '', disabled = false, ...props }) {
  return (
    <Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
      {isLoading && <FontAwesomeIcon icon={faSyncAlt} />}
      {props.children}
    </Button>
  );
}
