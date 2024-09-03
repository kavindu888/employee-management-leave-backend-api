
const { models: { LeaveType } } = require('../module');
const { models: { Leave } } = require('../module');

module.exports = {
    ADDLEAVE: async (req, res, next) => {
        const data = req.body;
   
        if (!data.type) {
            res.status(202).send({ msg: 'Enter All data' })
        } else {
            try {
         
                const [leaveType, created] = await LeaveType.findOrCreate({
                    where: {
                        type: data.type
                    },
                    defaults: {
                        type: data.type
                    }
                });

                if (created) {
                    console.log(created);
                    res.status(200).send({ msg: 'done' });
                } else {
                    console.log(created);
                    res.status(303).send({ msg: 'This leave type already registered' });
                }
            } catch (error) {
                console.log("error",error.message)
                res.status(400).send({ msg: error.message });
            }
        }

    },

    TYPELEAVE: async (req, res, next) => {


        try {

            const type = await LeaveType.findAll();

            if (type === null) {
                res.status(303).send("user not found");
            } else {

                res.status(200).send({ data: type });
            }
        } catch (error) {
            res.status(303).send(error.message)
        }

    },

    NEWLEAVE: async (req, res, next) => {
        try {
            const data = req.body;

            if (!data.leaveDate  || !data.empId || !data.leaveId ||!data.month) {
                res.status(202).send({ msg: 'Enter All data' })
            } else {
console.log(data)
                try {
                    const [leave, created] = await Leave.findOrCreate({
                        where: {
                            leave_date: data.leaveDate,
                            employeeId: data.empId,

                         },
                 defaults: {
                        leave_date: data.leaveDate,
                        status: data.status,
                        employeeId: data.empId,
                        leaveTypeId: data.leaveId,
                        month:data.month,
                        year:data.year,
                        remark:data.remark
                         }
                    });

                    if (created) {

                        res.status(200).send({ data: leave });
                    } else {

                        res.status(303).send({ msg: 'arly applyed' });
                    }
                } catch (error) {
console.log(error.message)
                    res.status(400).send({ msg: error.message });
                }


            }
        } catch (error) {

        }
    },
    APPROVELEAVE:async (req,res,next)=>{
        try {
            let leaveId=req.query.id;
           if(leaveId){
            await Leave.update(
                { status: 1 },
                {
                  where: {
                    id: leaveId,
                  },
                },
              ).then(data=>{
                if(data){
                    res.status(200).send({ data });
                }
              })
           }else{

           }
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    },
    REJECTLEAVE:async (req,res,next)=>{
        try {
            let leaveId=req.query.id;
           if(leaveId){
            await Leave.update(
                { status: 2 },
                {
                  where: {
                    id: leaveId,
                  },
                },
              ).then(data=>{
                if(data){
                    res.status(200).send({ data });
                }
              })
           }else{

           }
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }

    
}