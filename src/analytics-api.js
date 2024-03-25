/**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */
export const trackPageview = (params) => {
  console.log(`--> Tracking Pageview: ${params}`);
};

export const trackConvertedUsers = (params, urlEndPoint) => {
  if (urlEndPoint !== undefined) {
    /**
        This block would create a PUT/POST request that stores and keeps
        track of the subscriptions related to the specific variation the
        user was interacting at.
     */
    console.log(
      `user converted, sending metrics to: api-endpoint/${urlEndPoint}`,
    );
  } else {
    console.log(`--> Tracking Converted users: ${params}`);
  }
};

/**
 * Tracks an event to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL and an event name are probably a good start though.
 */
export const trackEvent = (params) => {
  console.log(`--> Tracking Event: ${params}`);
};
