const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthJwt = require('../middleware/AuthJwt');

router.post('/UserSignup', AuthController.Signup);
router.post('/UserLogin', AuthController.Login);
router.post('/ownerlogin',AuthController.OwnerLogin);
router.post('/ownersignup',AuthController.OwnerSignup);

router.use(AuthJwt);
router.post('/guesthousedata',AuthController.HouseData);
router.get('/getguesthome/:id', AuthController.getguesthouse);
router.get('/getallhouses', AuthController.getallhouse);
router.post('/Book', AuthController.Book);
router.delete('/delete/:id', AuthController.Delete);
router.post('/Edits', AuthController.Edits);
router.post('/getbooking', AuthController.GetBooking);
module.exports = router;