import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import alertActions from '../_actions/alert';

import './Alert.scss';
import siteConstants from '../_constants/site';

const Alert = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const clearAlert = useCallback(() => {
    if (alert != null) {
      dispatch(alertActions.clear());
    }
  }, [alert, dispatch]);

  useEffect(() => {
    if (alert != null) {
      const clearAlertTimeout = setTimeout(() => {
        clearAlert();
      }, siteConstants.ALERT_FADEOUT);
      return () => clearTimeout(clearAlertTimeout);
    }
  }, [alert, clearAlert]);

  const handleAlertClick = (event) => {
    event.preventDefault();
    clearAlert();
  };

  return (
    <>
      {alert && (
        <div className="Alert">
          <div className={`alert ${alert.type}`}>
            <div className="row">
              <div className="col-11">{alert.message}</div>
              <div className="col-1 align-self-center">
                <Link to="!#" onClick={handleAlertClick}>
                  <FontAwesomeIcon icon={faTimes} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
