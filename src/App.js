import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { FaSearchengin } from "react-icons/fa6";

import "./App.css";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

function App() {
  const [apiStatus, setApiStatus] = useState({
    status: apiConstants.initial,
    data: null,
    error: null,
  });

  const [searchValue, setSearchValue] = useState("");
  const [showError, setShowError] = useState(false);

  const generateImage = async (value) => {
    setApiStatus({
      status: apiConstants.inProgress,
      data: null,
      error: null,
    });

    const url = `https://api.unsplash.com//search/photos?page=1&client_id=5qrsX1nWZ9EuYUmHeKH2ayZG2cxZnO6DxrC6XUTdBpA&query=${value}`;

    const respone = await fetch(url);
    const responseData = await respone.json();

    if (respone.ok) {
      const updateData = responseData.results;

      const formattedData = updateData.map((eachData) => ({
        id: eachData.id,
        imgAlt: eachData.alt_description,
        description: eachData.description,
        imgUrl: eachData.urls.regular,
      }));

      setApiStatus({
        status: apiConstants.success,
        data: formattedData,
        error: null,
      });
    } else {
      setApiStatus({
        status: apiConstants.failure,
        data: null,
        error: responseData.errors[0],
      });
    }
  };

  const userSearchValue = (event) => {
    setSearchValue(event.target.value);
    setShowError(false);
  };

  const searchUserInput = () => {
    if (searchValue !== "") {
      generateImage(searchValue);
    } else {
      setShowError(true);
    }
  };

  const suggestedSearchValue = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    generateImage(query);
  };

  const enterPressed = (event) => {
    if (event.key === "Enter") {
      if (searchValue !== "") {
        generateImage(searchValue);
      } else {
        setShowError(true);
      }
    }
  };

  const renderSuccessPage = () => {
    const { data } = apiStatus;

    const displayData = () => {
      if (data.length !== 0) {
        return (
          <ul className="image-list-container">
            {data.map((eachData) => (
              <li key={eachData.id} className="image-list-items">
                <img
                  src={eachData.imgUrl}
                  alt={eachData.imgAlt}
                  className="generated-image"
                />
                <p className="image-description">{eachData.description}</p>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <div className="no-data-found-container">
          <img
            className="no-data-found-img"
            src="https://img.freepik.com/premium-vector/no-data-found-illustration-sites-banner-design-vector-illustration_620585-1690.jpg"
            alt="no data to show"
          />
          <p className="no-data-found-description">
            oops! we cannot find the image you are searching, try some suggested
            search showing above.
          </p>
        </div>
      );
    };

    return displayData();
  };

  const renderLoadingPage = () => (
    <div className="loading-container">
      <Loader type="ThreeDots" color="blue" height={50} width={50} />
    </div>
  );
  const renderFailurePage = () => {
    const { error } = apiStatus;
    console.log(error);
    return (
      <div className="failure-container">
        <div>
          <img
            src="https://siteefy.com/wp-content/uploads/2022/11/Why-Websites-Fail.png"
            className="failure-view-image"
            alt="failure view"
          />
          <h1>{error}</h1>
        </div>
      </div>
    );
  };

  const renderImgGenerator = () => {
    const { status } = apiStatus;

    switch (status) {
      case apiConstants.inProgress:
        return renderLoadingPage();

      case apiConstants.success:
        return renderSuccessPage();

      case apiConstants.failure:
        return renderFailurePage();

      default:
        return null;
    }
  };

  const { data } = apiStatus;
  return (
    <div className="main-container">
      <div className="website-logo-container">
        <img
          src="https://icongeneratorai.com/static/logo.png"
          alt="website logo"
          className="website-logo"
        />
        <h1 className="website-heading">Img Generator</h1>
      </div>
      <div className="search-container">
        <div className="search-input-container">
          <input
            value={searchValue}
            onChange={userSearchValue}
            onKeyDown={enterPressed}
            type="search"
            className="search-input"
            placeholder="Search for image you need..."
          />
          <button className="search-button" onClick={searchUserInput}>
            <FaSearchengin size={20} />
          </button>
        </div>
        {showError && (
          <p className="show-error">*Enter a input value to search</p>
        )}
      </div>
      <ul className="suggested-search-list">
        <li>
          <button
            className="each-search-button"
            value="Mountain"
            onClick={suggestedSearchValue}
          >
            Mountain
          </button>
        </li>
        <li>
          <button
            className="each-search-button"
            value="Flowers"
            onClick={suggestedSearchValue}
          >
            Flowers
          </button>
        </li>
        <li>
          <button
            className="each-search-button"
            value="Beaches"
            onClick={suggestedSearchValue}
          >
            Beaches
          </button>
        </li>
        <li>
          <button
            className="each-search-button"
            value="Cities"
            onClick={suggestedSearchValue}
          >
            Cities
          </button>
        </li>
      </ul>
      <div>
        <h1 className="heading-app">
          {data === null
            ? "Search for a Image"
            : `Search Results for ${searchValue}`}
        </h1>
        {data === null && (
          <div className="start-your-search-container">
            <img
              src="https://res.cloudinary.com/dlefoxknm/image/upload/v1719216733/start_your_search_image_om8pb0.png"
              alt="start a search"
              className="start-your-search"
            />
          </div>
        )}
      </div>
      <div>{renderImgGenerator()}</div>
    </div>
  );
}

export default App;
