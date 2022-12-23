var express = require('express')
var router = express()
current_date = new Date().toJSON().slice(0, 10)
// let current_date = new Date(2021,09,20).toJSON().slice(0, 10)
const connection = require('../config/db')
var moment = require('moment')
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const { requireAuth } = require('../middleware/authMiddelware')

//Get All Tasks
// router.get('/task/:gi', (req, res, next) => {
//     var gi = req.params.gi;
//     var std1;
//     var dud1;
//     var du1;
//     var st1;
//     var boole;
//     var tasks = [];
//     var sql = "select ws.* from week_status ws where ws.group_id=?";
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
//             var sql1 = "Select T.*,p.FullName from project_task T join persons p on p.Person_id=T.Alloted_To where T.Group_id=? AND T.Status='None' AND T.Due_Date between ? AND ?"
//             connection.query(sql1, [gi, st1, du1], (err, task, fields) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     if (task.length > 0) {
//                         tasks[0] = true
//                         tasks[1] = task
//                         tasks[2] = std1
//                         tasks[3] = dud1
//                         res.send(tasks)
//                     }
//                     else {
//                         var sql12 = "Select T.*,p.FullName from project_task T join persons p on p.Person_id=T.Alloted_To where T.Group_id=? AND  T.Status='None' AND T.Due_Date between ? AND ?"
//                         connection.query(sql12, [gi, std1, dud1], (err, tass, fields) => {
//                             if (err) {
//                                 res.status(400).json({
//                                     status: 'error',
//                                     error: err,
//                                 });
//                                 console.log(err);
//                             }
//                             else {

//                                 tasks[0] = false
//                                 tasks[1] = tass;
//                                 tasks[2] = std1
//                                 tasks[3] = dud1
//                                 res.send(tasks)
//                             }
//                         });

//                     }

//                 }
//             });
//              }

//     });
// })


router.get('/task/:gi', requireAuth, async (req, res, next) => {
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

        if (today >= startdatenum && today <= duedatenum) {
            break;
        }
    }


    var sql1 = "Select pt.*, persons.FullName from project_task pt JOIN persons ON pt.Alloted_To = persons.Person_id where Group_id=? AND Submitted_Date is NULL AND Due_date BETWEEN ? AND ? AND Status != 'Deleted' "
    connection.query(sql1, [gi, startdate, duedate], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            for (let t of task) {
                if (t.Start_date) {
                    t.Start_date = moment(t.Start_date).format("DD/MM/YYYY");
                }
                else {
                    t.Start_date = "Not Started"
                }

            }
            res.send(task);
        }
    });
})

// SELECT * , ((Due_Date < NOW() AND Submitted_Date is NULL) || (Submitted_Date is NOT NULL AND Submitted_Date > Due_Date)) as lagging ,(Due_Date >= NOW() || (Submitted_Date is NOT NULL AND Submitted_Date = Due_Date)) as ontime ,(Submitted_Date is NOT NULL AND Submitted_Date < Due_Date) as lagging FROM `project_task` WHERE 1

router.get('/tasks/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    var sql = "Select T.*,((Due_Date < NOW() AND Submitted_Date is NULL) || (Submitted_Date is NOT NULL AND Submitted_Date > Due_Date)) as lagging ,(Due_Date >= NOW() || (Submitted_Date is NOT NULL AND Submitted_Date = Due_Date)) as ontime ,(Submitted_Date is NOT NULL AND Submitted_Date < Due_Date) as leading1,p.FullName from project_task T join persons p on p.Person_id=T.Alloted_To where T.Group_id=? AND T.Deleted_Date is NULL"
    connection.query(sql, [gi], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            var sql1 = "Select persons.Person_id ,Group_title,Group_Name from project_group JOIN instructor ON project_group.Instructor_id1 = instructor.Instructor_id JOIN persons on persons.Person_id = instructor.Person_id where Group_id = ?"
            connection.query(sql1, [gi], (err, data, fields) => {
                if (err) {
                    res.status(400).json({
                        status: 'error',
                        error: err,
                    });
                    console.log(err);

                }
                else {
                    for (let t of task) {
                        t.Due_Date = t.Due_Date ? moment(t.Due_Date).format("DD/MM/YYYY") : "";
                        t.Start_date = t.Start_date ? moment(t.Start_date).format("DD/MM/YYYY") : "Not Started";
                        t.Approved_Date = t.Approved_Date ? moment(t.Approved_Date).format("DD/MM/YYYY") : "Not Approved";
                        if(t.lagging == 1)
                        {
                            t.Task_status = "Lagging";
                        }
                        else if(t.ontime == 1)
                        {
                            t.Task_status = "Ontime";
                        }
                        else if(t.leading1 == 1)
                        {
                            t.Task_status = "Leading";
                        }

                    }
                    let obj = {};
                    obj.person_id = data[0].Person_id;
                    obj.Group_title = data[0].Group_title;
                    obj.Group_Name = data[0].Group_Name;
                    obj.tasks = task;
                    res.send(obj);
                }

            });
        }


    });
})

router.get('/profiletask/:pid', requireAuth, (req, res, next) => {
    var pid = req.params.pid;
    var sql = "Select Count(*) as total,(select Count(*) from project_task t1 where t1.Alloted_To=? and t1.Status='Done')as Completed,(select Count(*) from project_task t2 where t2.Alloted_To=? and not t2.Status='Done')as Remaining from project_task t where t.Alloted_To=? "
    connection.query(sql, [pid, pid, pid], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            res.send(task)
        }

    });
})

router.post('/task/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    const userData = {
        taskname: req.body.taskname,
        allotedTo: req.body.allotedTo,
        DueDate: req.body.DueDate
    }
    var Status = "None";
    if (!userData) {
        res.status(400)
        res.json({
            status: 'error',
            error: 'Bad Data'
        })
    } else {
        var sql = "insert into project_task(Group_id,Task_Name,Alloted_To,Due_Date,Status) value(?,?,?,?,?)"
        connection.query(sql, [gi, userData.taskname, userData.allotedTo, userData.DueDate, Status], (err, task) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
                console.log(err);
            }
            else {
                res.send(task)
            }
        })
    }
})



// Update Task
router.put('/task', requireAuth, (req, res, next) => {
    var SN = req.body.SerialName;
    var sql = "update project_task set Status='Deleted', Deleted_Date=?,Start_date=NULL,Task_Details = 'NA',Challenges='NA',Submitted_Date=NULL,Reason=NULL,Task_status=2,Rejected_count=0 where Task_id= ?";
    connection.query(sql, [current_date, SN], (err, task) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {

            res.send(task)

        }
    });
})


//Lagging Ontime  Leading Task Status 
router.get('/tasks/status/:gi', requireAuth, async(req, res, next) => {
    var group_id = req.params.gi;
    var sql = "Select count(*) as cnt from project_task where Group_id = ? AND Deleted_Date is NULL AND  ((Due_Date < NOW()  AND Submitted_Date is NULL) || (Submitted_Date > Due_Date));";
    let lagging = await query(sql, [group_id]);
    lagging = lagging[0].cnt;

    var sql1 = "Select count(*) as cnt from project_task where Group_id = ? AND Deleted_Date is NULL AND  ((Due_Date >= NOW()  AND Submitted_Date is NULL) || (Submitted_Date = Due_Date));";
    let ontime = await query(sql1, [group_id]);
    ontime = ontime[0].cnt;
    
    var sql2 = "Select count(*) as cnt from project_task where Group_id = ? AND Deleted_Date is NULL AND Approved_Date is NOT NULL AND (Submitted_Date < Due_Date);";
    let leading = await query(sql2, [group_id]);
    leading = leading[0].cnt;

    let obj = {};
    obj.lagging = lagging;
    obj.ontime = ontime;
    obj.leading = leading;

    res.send(obj)
    
    
    
})


module.exports = router

