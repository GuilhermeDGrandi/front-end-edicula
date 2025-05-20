import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function MyRoute({ element, isClosed }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  if (isClosed && !isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ prevPath: location.pathname }}
      />
    );
  }

  return element;
}

MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isClosed: PropTypes.bool,
};
