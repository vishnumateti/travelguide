import './index.css'

const TravelPlaces = props => {
  const {placesDetails} = props
  const {name, imageUrl, description} = placesDetails

  return (
    <li className="list-container">
      <img src={imageUrl} alt={name} className="image" />
      <div className="name-desc-container">
        <h1 className="name">{name}</h1>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}

export default TravelPlaces
