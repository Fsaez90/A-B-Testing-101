import React, { useState } from "react";
import hero_image from "./images/hero_image.jpg";
import {
  trackPageview,
  trackConvertedUsers,
  trackEvent,
} from "./analytics-api";

export default function App() {
  const [convertedUsersCount, setConvertedUsersCount] = useState(0);
  const [variationSelected, setVariationSelected] = useState();

  window.onload = () => {
    // on every page load we call the handler to keep track of the users events
    updatePageLoadCount();
    // onloading the page, first we define the variation to be displayed
    getRandomVariation();
  };

  const updatePageLoadCount = () => {
    let loads = localStorage.getItem("LoadCounts");
    let clicks = localStorage.getItem("ClickCounts");
    let convertedUsers = localStorage.getItem("ConvertedUsers");
    let loadsParsed = !isNaN(parseInt(loads)) ? parseInt(loads) : 0;
    let clicksParsed = !isNaN(parseInt(clicks)) ? parseInt(clicks) : 0;
    let convertedUsersParsed = !isNaN(parseInt(convertedUsers))
      ? parseInt(convertedUsers)
      : 0;
    let variation = localStorage.getItem("variation");

    if (loadsParsed >= 4 && clicksParsed >= 8) {
      setConvertedUsersCount(convertedUsersParsed + 1);
      localStorage.setItem("LoadCounts", 0);
      localStorage.setItem("ClickCounts", 0);
      localStorage.setItem("ConvertedUsers", convertedUsersParsed + 1);
      trackConvertedUsers(convertedUsersCount);
      trackPageview(0);
      trackEvent(0);
    } else if (loadsParsed < 4 && clicksParsed < 9) {
      localStorage.setItem("LoadCounts", loadsParsed + 1);
      localStorage.setItem("ClickCounts", clicksParsed);
      localStorage.setItem("ConvertedUsers", convertedUsersParsed);
      trackConvertedUsers(convertedUsersParsed);
      trackPageview(loadsParsed + 1, variation);
      trackEvent(clicksParsed);
    } else {
      localStorage.setItem("LoadCounts", loadsParsed + 1);
      trackConvertedUsers(convertedUsersCount);
      trackPageview(loadsParsed + 1);
      trackEvent(clicksParsed);
    }
  };

  // function triggered on the whole div component
  const onClickHandleEvent = () => {
    let loads = localStorage.getItem("LoadCounts");
    let clicks = localStorage.getItem("ClickCounts");
    let convertedUsers = localStorage.getItem("ConvertedUsers");
    let variation = localStorage.getItem("variation");
    let loadsParsed = !isNaN(parseInt(loads)) ? parseInt(loads) : 0;
    let clicksParsed = !isNaN(parseInt(clicks)) ? parseInt(clicks) : 0;
    let convertedUsersParsed = !isNaN(parseInt(convertedUsers))
      ? parseInt(convertedUsers)
      : 0;

    if (loadsParsed >= 3 && clicksParsed >= 9) {
      localStorage.setItem("LoadCounts", 0);
      localStorage.setItem("ClickCounts", 0);
      localStorage.setItem("ConvertedUsers", convertedUsersParsed + 1);
      trackConvertedUsers(convertedUsersParsed + 1, variation);
      trackPageview(0);
      trackEvent(0);
    } else if (loadsParsed < 4 && clicksParsed < 9) {
      localStorage.setItem("LoadCounts", loadsParsed);
      localStorage.setItem("ClickCounts", clicksParsed + 1);
      localStorage.setItem("ConvertedUsers", convertedUsersParsed);
      trackConvertedUsers(convertedUsersCount);
      trackPageview(loadsParsed);
      trackEvent(clicksParsed + 1);
    } else {
      localStorage.setItem("ClickCounts", clicksParsed + 1);
      trackConvertedUsers(convertedUsersCount);
      trackPageview(loadsParsed);
      trackEvent(clicksParsed + 1);
    }
  };

  // function triggered everytime a user is converted via signup
  const onSignUpHandle = () => {
    let convertedUsers = localStorage.getItem("ConvertedUsers");
    let variation = localStorage.getItem("variation");
    let convertedUsersParsed = !isNaN(parseInt(convertedUsers))
      ? parseInt(convertedUsers)
      : 0;
    localStorage.setItem("LoadCounts", 0);
    localStorage.setItem("ClickCounts", 0);
    localStorage.setItem("ConvertedUsers", convertedUsersParsed + 1);
    trackConvertedUsers(convertedUsersParsed + 1, variation);
    trackPageview(0);
    trackEvent(0);
  };

  // function used for getting the variation randomly
  const getRandomVariation = () => {
    let variation = localStorage.getItem("variation");
    if (!variation) {
      const classNames = ["control-variation", "test-variation"];
      const randomIndex = Math.floor(Math.random() * classNames.length);
      const randomVariation = classNames[randomIndex];
      setVariationSelected(randomVariation);
      localStorage.setItem("variation", randomVariation);
    } else {
      localStorage.getItem("variation", variation);
    }
  };

  return (
    <div className="App" onClick={onClickHandleEvent}>
      <h1>Check out the Blinkist app</h1>
      <img width="300" src={hero_image} alt="Check out the Blinkist app" />
      {variationSelected === "control-variation" ? (
        <div>
          {/* <!-- Control variation --> */}
          Meet the app that revolutionized reading.
        </div>
      ) : (
        <div>
          {/* <!-- Test variation --> */}
          Meet the app that has 18 million users.
        </div>
      )}
      <div>
        Thanks a lot for reading the article!{" "}
        <button onClick={onSignUpHandle}>SIGN UP</button> for Blinkist.
      </div>
    </div>
  );
}
