import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCarDetails } from "../../redux/CarsSlice";
import { Link } from "react-router-dom";
import { FaAngleRight, FaSun, FaArrowAltCircleRight} from 'react-icons/fa'
import multicolor from '../../assets/multicolor.png';
import '../../Style/carDetails.css';
import Navbar from "../Navbar";

const CarDetails = () => {
  
  const trStyle= {
    textAlign: 'center',
    fontWeight: '400',
    fontStyle: 'italic'
  }
  const { id } = useParams();
  const dispatch = useDispatch();
  const carDetails = useSelector((state) => state.cars.carDetails)
  const loading = useSelector((state) => state.cars.loading);
  const hasErrors = useSelector((state) => state.cars.hasErrors);
 const cars = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCarDetails(id));
  }, [id]);

  if (hasErrors) {
    return <div>There was an error fetching car details.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carDetails) {
    return <div className="not-found">Car details not found.</div>;
  }


const carPrice = carDetails.price;
const depositAmount = 350; 
const financeRate = 0.059; 
const optionToPurchaseFee = 249; 
const loanDurationMonths = 48; 

const monthlyInterestRate = financeRate / 12;
const financeFee = (carPrice - depositAmount) * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanDurationMonths)));

const totalAmountPayable = financeFee * loanDurationMonths + depositAmount + optionToPurchaseFee;

const totalInterestPaid = totalAmountPayable - carPrice;
const annualPercentageRate = (totalInterestPaid / carPrice) / (loanDurationMonths / 12) * 100;
  return (
    <>
    <Navbar />
    <div className="car-details-wrapper">
      <div className="car-image">
        <img src={carDetails.image} alt={carDetails.name} />
      </div>
      <div className="car-details">
        <div>
        <h2 style={{fontWeight: 'bold', paddingTop: '15px'}}>{carDetails.name}</h2>
        <p style={{padding: '0 0 16px 0', fontWeight: '600', fontSize: '12px'}}>-£350 deposit upon any visa purchase </p>
      </div>

      <div className="car-details-table">

        <table>
          <tbody>
              <tr>
                  <td>Finance Fee</td>
                    <td style={trStyle}>
                        £{financeFee.toFixed(2)}
                    </td>
              </tr>
              <tr>
                  <td>Option to purchase fee</td>
                  <td style={trStyle}>£ 
                      {optionToPurchaseFee}
                  </td>
              </tr>
              <tr>
                  <td>Total Amount Payable</td>
                  <td style={trStyle}>£ 
                      {totalAmountPayable.toFixed(2)}
                  </td>
              </tr>
              <tr>
                  <td>Duration</td>
                  <td style={trStyle}>
                      {loanDurationMonths} Months
                  </td>
              </tr>
          </tbody>
        </table>

        <p><strong style={{ fontSize: '1rem', padding: '0.5rem'}}
        > {annualPercentageRate.toFixed(2)}% APR</strong><em>Representative</em></p>
      </div>

    <div className="discover-more">
      <p style={{fontWeight: '600', padding: '0 0.5rem', fontSize: '12px'}}> DISCOVER MORE MODELS
        <span>
            <a href="#">  <FaAngleRight /> </a>
        </span>
      </p>
      <img src={multicolor} alt="multicolor" className="multicolor" />
    </div>
    <div className="car-details-button">
    <Link to="/reservationForm" state={{carDetails: carDetails, cars: cars
    }} >
    <button>
        <span style={{paddingRight: '15px', color: 'white'}}> <FaSun /> </span>
        Reserve
        <span style={{paddingLeft: '15px'}}><FaArrowAltCircleRight /></span>
        </button>
    </Link>
    </div>
    </div>
    </div>
    </>
  );
};

export default CarDetails;
