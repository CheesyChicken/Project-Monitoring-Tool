var express = require('express')
var router = express()
var moment = require('moment')
current_date = new Date().toJSON().slice(0, 10)
// let current_date = new Date(2021,09,20).toJSON().slice(0, 10)
const util = require('util');
const connection = require('../config/db')
const query = util.promisify(connection.query).bind(connection);
const { requireAuth } = require('../middleware/authMiddelware')


router.get('/pending/:gi', requireAuth, async (req, res, next) => {
    var gi = req.params.gi;

    var sql = "Select start_date, due_date from week_status where group_id = ?";
    const weeks = await query(sql, [gi]);
    let startdate, duedate;
    const today = moment(current_date).format('YYYYMMDD')

    for (let week of weeks) {
        startdate = week.start_date;
        duedate = week.due_date;
        let startdatenum = moment(new Date(startdate)).format('YYYYMMDD');
        let duedatenum = moment(new Date(duedate)).format('YYYYMMDD');

        if(today >= startdatenum && today <= duedatenum)
        {
            break;
        }
    }


    var sql1 = "Select pt.*, persons.FullName from project_task pt JOIN persons ON pt.Alloted_To = persons.Person_id where Group_id=? AND Approved_Date is NULL AND Due_date < ? AND Status != 'Deleted' "
    connection.query(sql1, [gi,startdate], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            for(let t of task)
            {
                if(t.Start_date)
                {
                    t.Start_date = moment(t.Start_date).format("DD/MM/YYYY");
                }
                else
                {
                    t.Start_date = "Not Started"
                }
                
            }
            res.send(task);
        }
    });
})

// router.post('/deletes', (req, res, next) => {
//     var SN = req.body.SerialName;
//     var dd = req.body.DueDate;
//     var sql = "update project_task set Status='None',Start_date=?,Due_Date=? where Task_id= ?";
//     connection.query(sql, [current_date, dd, SN], (err, task) => {
//         if (err) {
//             res.status(400).json({
//                 status: 'error',
//                 error: err,
//             });
//             console.log(err);
//         }
//         else {
//             res.send(task)
//         }
//     });
// })
module.exports = router


