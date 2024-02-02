import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelPlaces from './components/TravelPlaces'
import './App.css'

// Replace your code here

const apiStatusContants = {
  loading: 'IN_PROGRESS',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class App extends Component {
  state = {travelList: [], apiStatus: apiStatusContants.initial}

  componentDidMount() {
    this.travelGuidePackagesApiUrl()
  }

  travelGuidePackagesApiUrl = async () => {
    this.setState({apiStatus: apiStatusContants.loading})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        travelList: formattedData,
        apiStatus: apiStatusContants.success,
      })
    }
  }

  renderSuccessTravelData = () => {
    const {travelList} = this.state

    return (
      <ul className="places-list-container">
        {travelList.map(each => (
          <TravelPlaces key={each.id} placesDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-position">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelsData() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContants.success:
        return this.renderSuccessTravelData()
      case apiStatusContants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Travel Guide</h1>
        <hr className="separator" />
        {this.renderTravelsData()}
      </div>
    )
  }
}

export default App
