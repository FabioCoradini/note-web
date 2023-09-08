// import ReactGA from "react-ga";
import ReactGA from "react-ga4";

const REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID = "G-PLZMQ7DP7Q";
export const initGA = () => {
  ReactGA.initialize(REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.send(window.location.pathname + window.location.search);
};

export const trackApiCall = (action, label) => {
  trackEvent("API", action, label);
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
