var express = require('express')
var router = express()
current_date = new Date().toJSON().slice(0, 10)
// let current_date = new Date(2021,09,20).toJSON().slice(0, 10)
const connection = require('../config/db')
var moment = require('moment')
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const { requireAuth } = require('../middleware/authMiddelware')
// Get All Tasks'

// router.get('/submit/:gi', (req, res, next) => {
//     var gi = req.params.gi;
//     var std1;
//     var dud1;
//     var du1;
//     var st1;
//     var tasks = [];
//     var sql = "select * from week_status where group_id=?";
//     connection.query(sql, [gi], (err, week) => {
//         if (err) {
//             console.log(err);

//         }
//         else {
//             for (let j = 0; j < week.length; j++) {
//                 if (false) {
//                     std = new Date(week[j].start_date);
//                     dud = new Date(week[j].due_date);
//                     st = new Date(week[j - 1].start_date);
//                     du = new Date(week[j - 1].due_date);
//                     const stdate = moment(std).format('YYYYMMDD')
//                     const enddate = moment(dud).format('YYYYMMDD')
//                     const tdtd = moment(current_date).format('YYYYMMDD')
//                     if (tdtd >= stdate && tdtd <= enddate) {
//                         SN = week[j].week_status_id;
//                         std1 = moment(stdate).format()
//                         dud1 = moment(enddate).format()
//                         st1 = new Date(st);
//                         du1 = new Date(du);
//                     }
//                 }
//                 else{
//                     std = new Date(week[j].start_date);
//                     dud = new Date(week[j].due_date);
//                     const stdate = moment(std).format('YYYYMMDD')
//                     const enddate = moment(dud).format('YYYYMMDD')
//                     const tdtd = moment(current_date).format('YYYYMMDD')
//                     if (tdtd >= stdate && tdtd <= enddate) {
//                         SN = week[j].week_status_id;
//                         std1 = moment(stdate).format()
//                         dud1 = moment(enddate).format()
//                     }

//                 }
//             }
//                     var sql1 = "Select T.*,p.FullName from project_task T join persons p on p.Person_id=T.Alloted_To where T.Group_id=? AND T.Status='Waiting' AND Due_Date between ? AND ?"
//                     connection.query(sql1, [gi, st1, du1], (err, task, fields) => {
//                         if (err) {
                           
//                             console.log(err);
//                         }
//                         else {
//                             if (task.length > 0) {
//                                 tasks[0] = true
//                                 tasks[1] = task
//                                 res.send(tasks)
//                             }
//                             else {
//                                 var sql12 = "Select T.*,p.FullName from project_task T join persons p on p.Person_id=T.Alloted_To where T.Group_id=? AND  T.Status='Waiting' AND Due_Date between ? AND ?"
//                                 connection.query(sql12, [gi, std1, dud1], (err, tass, fields) => {
//                                     if (err) {
//                                         res.status(400).json({
//                                             status: 'error',
//                                             error: err,
//                                         });
//                                         console.log(err);
//                                     }
//                                     else {
//                                         tasks[0] = false
//                                         tasks[1] = tass;
//                                         res.send(tasks)
//                                     }
//                                 });

//                             }

//                         }
//                     });
//                 }
//                   });
// })



router.get('/submit/:gi', requireAuth, async (req, res, next) => {
    var gi = req.params.gi;

    // var sql = "Select start_date, due_date from week_status where group_id = ?";
    // const weeks = await query(sql, [gi]);
    // let startdate, duedate;
    // const today = moment(current_date).format('YYYYMMDD')

    // for (let week of weeks) {
    //     startdate = week.start_date;
    //     duedate = week.due_date;
    //     let startdatenum = moment(new Date(startdate)).format('YYYYMMDD');
    //     let duedatenum = moment(new Date(duedate)).format('YYYYMMDD');

    //     if(today >= startdatenum && today <= duedatenum)
    //     {
    //         break;
    //     }
    // }


    var sql1 = "Select pt.*, persons.FullName from project_task pt JOIN persons ON pt.Alloted_To = persons.Person_id where Group_id=? AND Approved_Date is NULL AND Submitted_Date is NOT NULL AND Status != 'Deleted' "
    connection.query(sql1, [gi], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {

            res.send(task);
        }
    });
})


router.post('/submit/:gi', requireAuth, (req, res, next) => {
    var SN = req.body.SerialName;
    var td = req.body.TaskDetails;
    var chl = req.body.Challenges;
    var cn = '';
    if (chl)
        cn = chl;
    else
        cn = "NA";

    var sql = "update project_task set Status='Waiting',Task_Details=?,Challenges=?,Submitted_Date=? where Task_id= ? ";
    connection.query(sql, [td, cn, current_date, SN], (err, task) => {
        if (err) {
            res.send('error:' + err)
            console.log(err);
        }
        else {
            res.send('Task Deleted')
        }
    });
})

module.exports = router