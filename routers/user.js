const express=require('express');
const {signUp} = require('../controllers');


const router=express.Router();
router.post('/signUp',signUp.SIGNUP);
router.post('/login',signUp.LOGIN);
router.post('/login',signUp.LOGIN);
router.post('/changePassword',signUp.CHANGEPASSWORD);
router.get('/empAccount',signUp.PENDINGACCOUNTS);
router.get('/approveAccount',signUp.APPREVEACCOUNT);
router.get('/rejectAccount',signUp.REJECTACCOUNT);


module.exports=router;