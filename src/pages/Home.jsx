// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {
  scrollLeft,
  scrollRight,
  handleScroll,
} from '../components/Main/scrollUtilis';
import { getCars } from '../redux/CarsSlice';
import CarsModel from '../components/Main/CarsModel';
import Navbar from "../components/Navbar";

import '../Style/home.css';


const Home = () => {
  const { cars, err, isLoading } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [isLastVisible, setIsLastVisible] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const container = document.querySelector('.cars');

  useEffect(() => {
    dispatch(getCars())
  }, [dispatch])

  useEffect(() => {
    setIsPrevDisabled(isFirstVisible);
    setIsNextDisabled(isLastVisible);
    }, [isFirstVisible, isLastVisible]);
  
  return (
    <>
      <div className="home-cont">
        <Navbar />

        <div className="home">
          {isLoading && <div className="loading" />}
          {cars && cars.length === 0 && !isLoading && (
            <div className="none">
              No cars is available. A car(s) can be added by clicking the
              &quot;Add Car&quot; button.
            </div>
          )}

          {cars && cars.length > 0 && (
            <div className="contr">
              <div className="header">
                <h1 className="header-title">LATEST MODELS</h1>
                <p className="header-subtitle">
                  The most recent models of our cars
                </p>
              </div>
              <div className="wrap">
                <button
                  type="button"
                  className={`prev btn ${isPrevDisabled ? 'disabled' : ''}`}
                  onClick={() => scrollLeft(container)}
                  disabled={isPrevDisabled}
                  ref={prevBtnRef}
                >
                  <BiLeftArrow />
                </button>
                <div
                  className="cars"
                  onScroll={() =>
                    handleScroll(container, setIsFirstVisible, setIsLastVisible)
                  }
                >
                  {cars.map((car) => (
                    <Link to={`cars/${car.id}`} key={car.id} className="cardlink">
                      <CarsModel car={car} />
                    </Link>
                  ))}
                </div>
                <button
                  type="button"
                  className={`next btn ${isNextDisabled ? 'disabled' : ''}`}
                  onClick={() => scrollRight(container)}
                  disabled={isNextDisabled}
                  ref={nextBtnRef}
                >
                  <BiRightArrow />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {err && <div className="error">{err}</div>}
    </>
  )
};

export default Home;
