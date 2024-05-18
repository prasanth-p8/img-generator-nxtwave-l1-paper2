import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import { FaSearchengin } from "react-icons/fa6";

import './App.css';

const apiConstants = {
  initial:"INITIAL",
  inProgress:"IN_PROGRESS",
  success:"SUCCESS",
  failure:"FAILURE"
}

function App() {

  const [apiStatus, setApiStatus] = useState({
    apiCallStatus:apiConstants.initial,
    data:null,
    error:null
  })

  const [searchValue, setSearchValue] = useState("")
  const [searchedHeading, setSearchedHeading] = useState("")


  const generateImage = async() => {
    setApiStatus({
      apiCallStatus:apiConstants.inProgress,
    data:null,
    error:null
    })

    let url 

    if(searchValue === ""){
      url =`https://api.unsplash.com//search/photos?page=1&client_id=5qrsX1nWZ9EuYUmHeKH2ayZG2cxZnO6DxrC6XUTdBpA&query=search` 
    }else{
      url =`https://api.unsplash.com//search/photos?page=1&client_id=5qrsX1nWZ9EuYUmHeKH2ayZG2cxZnO6DxrC6XUTdBpA&query=${searchValue}`
    }

   
    


      const respone = await fetch(url)
      const responseData = await respone.json()

      if(respone.ok){
        const updateData = responseData.results

        const formattedData = updateData.map(eachData => ({
          id:eachData.id,
          imgAlt:eachData.alt_description,
          description:eachData.description,
          imgUrl:eachData.urls.regular
        }))


setSearchedHeading(searchValue)
        setApiStatus({
          apiCallStatus:apiConstants.success,
        data:formattedData,
        error:null
        })
      }else{
        setApiStatus({
          apiCallStatus:apiConstants.failure,
        data:null,
        error:responseData.errors[0]
        })
      }

    }


  useEffect(() => {
    generateImage()
  },[])

  const userSearchValue = event => {
    setSearchValue(event.target.value)
  }

  const suggestedSearchValue = event => {
    setSearchedHeading(event.target.value)
    setSearchValue(event.target.value)
  }

  const enterPressed = event => {
    console.log(event.key)
    if(event.key==="Enter"){
    setSearchedHeading(event.target.value)
    setSearchValue(event.target.value)
    }
  }


  const renderSuccessPage = () => {
const {data} = apiStatus

const displayData = () => {
  if(data.length !== 0){
    return(
      <ul className='image-list-container'>
          {data.map(eachData => <li key={eachData.id} className='image-list-items'>
                <img src={eachData.imgUrl} alt={eachData.imgAlt} className='generated-image'/>
                <p className='image-description'>{eachData.description}</p>
          </li>)}
          
        </ul>
    )
  }
  return(
    <div className='no-data-found-container'>
      <img className='no-data-found-img' src="https://img.freepik.com/premium-vector/no-data-found-illustration-sites-banner-design-vector-illustration_620585-1690.jpg" alt='no data to show'/>
      <p className='no-data-found-description'>oops! we cannot find the image you are searching, try some suggested search showing above.</p>
    </div>
  )
}

return (
    <div className='main-container'>
      <div className='website-logo-container'>
        <img src='https://icongeneratorai.com/static/logo.png' alt='website logo' className='website-logo' />
        <h1 className='website-heading'>Img Generator</h1>
      </div>
      <div className='search-container'>
      <div className="search-input-container">
        <input value={searchValue} onChange={userSearchValue} onKeyDown={enterPressed} type='search' className="search-input" placeholder='Search for image you need...' />
        <button className="search-button" onClick={suggestedSearchValue} >
        <FaSearchengin size={20}/>
        </button>
      </div>
      </div>
        <ul className="suggested-search-list">
          <li>
            <button className="each-search-button" value="Mountain" onClick={suggestedSearchValue}>
              Mountain
            </button>
          </li>
          <li>
            <button className="each-search-button" value="Flowers" onClick={suggestedSearchValue}>
              Flowers
            </button>
          </li>
          <li>
            <button className="each-search-button" value="Beaches" onClick={suggestedSearchValue}>
              Beaches
            </button>
          </li>
          <li>
            <button className="each-search-button" value="Cities" onClick={suggestedSearchValue}>
              Cities
            </button>
          </li>
        </ul>
        <div>
          <h1 className='heading-app'>{searchedHeading === "" ? "Generate A Image" : `Search Results for ${searchedHeading}`}</h1>
        </div>
        {displayData()}
      </div>
  )
}

  const renderLoadingPage = () => (
    <div className='loading-container'>
        <Loader type="ThreeDots" color="blue" height={50} width={50} />
    </div>
  )
  const renderFailurePage = () => {
        const {error} = apiStatus
    return(
    <div className='failure-container'>
      <div>
        <img src='https://siteefy.com/wp-content/uploads/2022/11/Why-Websites-Fail.png' className='failure-view-image' alt='failure view' />
        <h1>{error}</h1>
      </div>
    </div>)
  }


  const renderImgGenerator = () => {
    const {apiCallStatus} = apiStatus

    switch(apiCallStatus){
        case apiConstants.inProgress:
          return renderLoadingPage()
          
        case apiConstants.success:
          return renderSuccessPage()
          
        case apiConstants.failure:
          return renderFailurePage()
          
        default:
          return null
    }
  }


  return(
    <div>
      {renderImgGenerator()}
    </div>
  )
}

export default App;
