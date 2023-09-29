// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCars } from '../../redux/CarsSlice';

import Input from './Input';

const Form = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isdisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    model: '',
    user_id: currentUser ? currentUser.id : 1,
    // user_id: currentUser.id,
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormInputs = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const {
      name, image, description, model, price,
    } = formData;

    if (name && image && description && model && price) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  const formSubmission = (e) => {
    e.preventDefault();
    dispatch(createCars(formData));
    setFormData({
      name: '',
      image: '',
      description: '',
      price: '',
      model: '',
      user_id: currentUser ? currentUser.id : 1,
      // user_id: 1,
    })
    navigate('/')
  }

  const {
    name, image, description, model, price,
  } = formData;

  return (
    <form onSubmit={formSubmission}>
      <Input
        name="name"
        value={name}
        placeholder="Car Name"
        type="text"
        handleInput={handleFormInputs}
      />
      <Input
        name="image"
        value={image}
        placeholder="Image Link"
        type="text"
        handleInput={handleFormInputs}
      />
      <Input
        name="model"
        value={model}
        placeholder="Car Model"
        type="text"
        handleInput={handleFormInputs}
      />
      <Input
        name="price"
        value={price}
        placeholder="Price"
        type="number"
        handleInput={handleFormInputs}
        step="0.01"
      />
      <textarea
        name="description"
        value={description}
        required
        onChange={handleFormInputs}
        placeholder="Description"
      />
      <div className="submit-btn">
        <button type="submit" disabled={isdisabled}>
          CREATE
        </button>
      </div>
    </form>
  );
};

export default Form;
