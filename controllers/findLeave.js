
const { Model, where } = require('sequelize');
const { models: { Leave, LeaveType, Emp } } = require('../module');



module.exports = {
    ALLLEAVES: async (req, res, next) => {
        let empId = req.query.id;
        let year = req.query.year;
        let sid = req.query.sid;
        let leaveDate = req.query.date;
        let month = req.query.month;
        let search = {}

        if (empId && month) {
            search = {
                month: month,
                employeeId: empId
            }
        } else if (empId && leaveDate) {
            search = {
                leave_date: leaveDate,
                employeeId: empId

            }

        } else if (leaveDate) {
            search = {
                leave_date: leaveDate
            }
        } else if (empId) {
            search = {
                employeeId: empId
            }
        } else if (month) {
            search = {
                year:year,
                month: month
            }
        } else if (sid) {
            console.log('sid', sid)

  
            const data = await Emp.findOne({
                where: {
                    system_id: sid
                },

            })
            if (data) {
                search = {
                    employeeId: data.id
                }
            } else {
                search = {
                    employeeId: -1
                }
            }

        }



        try {
            const type = await Leave.findAll({
                where: search,
                order: [
                    ['id', 'DESC'],
                ],
                include: [{
                    model: LeaveType,
                    attributes: ['type'],
                    require: true
                }, {
                    model: Emp,
                    attributes: ['F_name', 'L_name','system_id'],
                    require: true
                }]
            })

            if (type) {
                res.status(200).send({ data: type })
            } else {
                res.status(303).send({ msg: "not found" })
            }
        } catch (error) {
            res.status(303).send({ msg: error.massage })
        }



    }
}