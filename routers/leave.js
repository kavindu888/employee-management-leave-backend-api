const express = require('express');
const { leave } = require('../controllers');
const { find } = require('../controllers');


const router = express.Router();
router.post('/newLeaveType', leave.ADDLEAVE);
router.get('/leaveType', leave.TYPELEAVE);
router.post('/leave', leave.NEWLEAVE);
router.get('/employeeLeave', find.ALLLEAVES);
router.get('/approve', leave.APPROVELEAVE);
router.get('/reject', leave.REJECTLEAVE);




module.exports = router;