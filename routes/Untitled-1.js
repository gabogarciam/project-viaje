// router.post('/:id/flight', (req, res, next) => {
//   const airline = req.body.airline;
//   const flightNumber = req.body.flightNumber;
//   const departingAirport = req.body.departingAirport;
//   const arrivingAirport = req.body.arrivingAirport;
//   const departureTime = req.body.departureTime;
//   const arrivalTime = req.body.arrivalTime;

//   const id = req.params.id;
//   console.log(airline);
//   Trip.findByIdAndUpdate(id, {
//     $set: {
//       flights: {airline: 'hola'} }
//   }
//   )
//     .then((result) => {
//       res.redirect('/profile');
//     })
//     .catch(error => {
//       next(error);
//     });

//   // Trip.update
// });
