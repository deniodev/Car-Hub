import PropTypes from "prop-types";
import SocialIcons from "./SocialIcons";

const CarsModel = ({ car }) => (
  <div className="card" key={car.id}>
    <div className="img-cont">
      <img src={car.image} alt={car.name} className="img" />
    </div>
    <h5 className="card-title">{car.name}</h5>
    <p className="card-text">{car.description}</p>
    <SocialIcons className="home-details-links" />
  </div>
);

CarsModel.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarsModel;
