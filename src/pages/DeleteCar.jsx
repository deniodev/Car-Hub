import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
import { getCars, delCarItems } from '../redux/CarsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

export default function DeleteCar() {
  const { cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(delCarItems(id));
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="delete-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Car</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Price&nbsp;($)</TableCell>
                <TableCell align="left">Model</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow
                  key={car.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="car">
                    {car.name}
                  </TableCell>
                  <TableCell align="left" className="car-img-table">
                    <img src={car.image} alt="car-image" />
                  </TableCell>
                  <TableCell align="left">{car.description}</TableCell>
                  <TableCell align="left">{car.price}</TableCell>
                  <TableCell align="left">{car.model}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      // color="error"
                      sx={{ color: 'blue' }}
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

// import React, { useState } from 'react'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import Paper from '@mui/material/Paper'
// import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'
// import SaveIcon from '@mui/icons-material/Save'
// import Navbar from '../components/Navbar'
// import { getCars, delCarItems, updateCarItem } from '../redux/CarsSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { Button, Input } from '@mui/material'

// export default function DeleteCar() {
//   const { cars } = useSelector((state) => state.cars)
//   const dispatch = useDispatch()

//   React.useEffect(() => {
//     dispatch(getCars())
//   }, [dispatch])

//   // Use state to track editing status
//   const [editingCar, setEditingCar] = useState(null)

//   const handleDelete = (id) => {
//     dispatch(delCarItems(id))
//   }

//   const startEditing = (id) => {
//     setEditingCar(id)
//   }

//   const cancelEditing = () => {
//     setEditingCar(null)
//   }

//   const updateItem = (id, updatedData) => {
//     dispatch(updateCarItem({ id, updatedData }))
//     setEditingCar(null)
//   }

//   return (
//     <>
//       <div>
//         <Navbar />
//       </div>
//       <div className="delete-table">
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Car</TableCell>
//                 <TableCell align="left">Image</TableCell>
//                 <TableCell align="left">Description</TableCell>
//                 <TableCell align="left">Price&nbsp;($)</TableCell>
//                 <TableCell align="left">Model</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cars.map((car) => (
//                 <TableRow
//                   key={car.id}
//                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="car">
//                     {editingCar === car.id ? (
//                       <Input
//                         defaultValue={car.name}
//                         onChange={(e) => car.setName(e.target.value)}
//                       />
//                     ) : (
//                       car.name
//                     )}
//                   </TableCell>
//                   <TableCell align="left" className="car-img-table">
//                     <img src={car.image} alt="car-image" />
//                   </TableCell>
//                   <TableCell align="left">
//                     {editingCar === car.id ? (
//                       <Input
//                         defaultValue={car.description}
//                         onChange={(e) => car.setDescription(e.target.value)}
//                       />
//                     ) : (
//                       car.description
//                     )}
//                   </TableCell>
//                   <TableCell align="left">
//                     {editingCar === car.id ? (
//                       <Input
//                         defaultValue={car.price}
//                         onChange={(e) => car.setPrice(e.target.value)}
//                       />
//                     ) : (
//                       car.price
//                     )}
//                   </TableCell>
//                   <TableCell align="left">
//                     {editingCar === car.id ? (
//                       <Input
//                         defaultValue={car.model}
//                         onChange={(e) => car.setModel(e.target.value)}
//                       />
//                     ) : (
//                       car.model
//                     )}
//                   </TableCell>
//                   <TableCell align="center">
//                     {editingCar === car.id ? (
//                       <>
//                         <Button
//                           variant="contained"
//                           size="small"
//                           startIcon={<SaveIcon />}
//                           onClick={() => updateItem(car.id, car)}
//                           style={{ marginRight: '8px', marginBottom: '8px' }}
//                         >
//                           Save
//                         </Button>
//                         <Button
//                           variant="contained"
//                           size="small"
//                           startIcon={<DeleteIcon />}
//                           onClick={cancelEditing}
//                           style={{ marginBottom: '8px' }}
//                         >
//                           Cancel
//                         </Button>
//                       </>
//                     ) : (
//                       <Button
//                         variant="contained"
//                         size="small"
//                         startIcon={<EditIcon />}
//                         onClick={() => startEditing(car.id)}
//                         style={{ marginRight: '8px' }}
//                       >
//                         Edit
//                       </Button>
//                     )}
//                     <Button
//                       variant="contained"
//                       size="small"
//                       startIcon={<DeleteIcon />}
//                       onClick={() => handleDelete(car.id)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </>
//   )
// }

