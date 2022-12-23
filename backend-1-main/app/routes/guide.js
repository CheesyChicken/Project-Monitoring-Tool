var express = require('express')
var router = express()
current_date = new Date().toJSON().slice(0, 10)
// let current_date = new Date(2021,9,9).toJSON().slice(0, 10)
const connection = require('../config/db')
var moment = require('moment')
const util = require('util');
const { group } = require('console')
const query = util.promisify(connection.query).bind(connection);
const { requireAuth } = require('../middleware/authMiddelware')

router.get('/home/:gi', requireAuth,  (req, res, next) => {
    var gi = req.params.gi;
    console.log(gi);
    var errr = [];
    var data = [];
    var flag;
    var k = 0;
    var j = 0;
    var sql = "Select Group_id from project_group where Instructor_id1 = (select Instructor_id from instructor where Person_id=(select Person_id from persons where grno_EmpCode=?)) AND startDate IS NOT NULL "
    connection.query(sql, [gi], (err, person, fields) => {

        if (err) {
            errr[0] = err
            console.log(err);
            flag = 1;
            return;
        }
        else {
            for (let i = 0; i < person.length; i++) {
                let group_id = person.Group_id;
                var sql1 = "select g.Group_id as gid,g.Group_Name as gna,g.group_title as gti,s.Status_Name as gst,(select count(*) from project_task t1 where t1.Group_id =? and t1.Status='Done') as Complete,(select count(*)  from project_task t2 where t2.Group_id =? and t2.Status='Waiting') as Waiting  from project_group g Join status s on s.Status_id=g.Status_id where g.Group_id =?"
                connection.query(sql1, [person[i].Group_id, person[i].Group_id, person[i].Group_id], async (err, home, fields) => {
                    if (err) {
                        errr[j] = err;
                        console.log(err);
                        j++;
                        flag = 1;
                        return;
                    }
                    else {
                        console.log("group_id " + home[0]["gid"]);
                        var Query = `select Objective, FullName as leader from project_group pg JOIN persons p  ON pg.creator = p.Person_id where Group_id = ${home[0]["gid"]}`
                        try {
                            var objective = await query(Query);
                            home[0] = {...home[0],...objective[0]};
                        } catch (error) {
                            console.log(error);
                        }
                        data[k] = home;
                        k = k + 1;
                        while (Number(k) == Number(person.length)) {
                            if (flag == 1) {
                                res.send(errr);
                            }
                            else {
                                res.send(data);
                            }
                            return;
                        }
                    }
                });
            }
        }
    });
})

router.get('/guideprofile/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    var sql = "Select p.*, d.Department_Name,c.College_Name from persons p Join department d on d.Department_id=p.department Join college c on c.College_id=p.college where p.Person_id=?"
    connection.query(sql, [gi], (err, profile, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            res.send(profile)
        }

    });
})

/*router.get('/guideprofile/:gi', (req, res, next) => {
    var gi = req.params.gi;
    var sql = "Select g.Group_title,g.Group_Name,P.FullName as FaultyGuide,g.Project_Type_id, d.Department_Name,c.College_Name from project_group g Join department d on d.Department_id=g.Department_id Join college c on c.College_id=g.College_id Join persons P on P.Person_id=g.Instructor_id1 where g.Group_id=?"
    connection.query(sql, [gi], (err, profile, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            res.send(profile)
        }

    });
})*/
router.get('/person/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    var sql = "Select g.* from project_group g where g.Instructor_id1=(select Instructor_id from instructor where Person_id=?) "
    connection.query(sql, [gi], (err, person, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            res.send(person);


        }
    });
})

// router.get('/noweek/:gi', (req, res, next) => {

//     var gi = req.params.gi
//     var gid = [];
//     var std1 = [];
//     var dud1 = [];
//     var SN;
//     var std;
//     var dud;
//     var errr = [];
//     var data = [];
//     var datas = [];
//     var flag;
//     var flags = 0;
//     var k = 0;
//     var kk = 0;
//     var i = 0;
//     var h = 0;
//     var sql = "Select Group_id from project_group where Instructor_id1 = (select Instructor_id from instructor where Person_id=(select Person_id from persons where grno_EmpCode=?)) "
//     connection.query(sql, [gi], (err, person, fields) => {

//         if (err) {
//             errr[0] = err
//             console.log(err);
//             flag = 1;
//             return;
//         }
//         else {
//             for (let j = 0; i < person.length; i++) {
//                 // console.log(person[i].Group_id);
//                 gid[i] = person[i].Group_id;
//                 console.log("Group_id " + gid[i])
//                 var sql = "select * from week_status where group_id=?";
//                 connection.query(sql, [person[i].Group_id], (err, week) => {
//                     if (err) {
//                         errr[j] = err
//                         console.log(err);
//                         j = j + 1;
//                         flag = 1;
//                         return
//                     }
//                     else {
//                         for (let j = 0; j < week.length; j++) {
//                             console.log(week[j].start_date);
//                             std = new Date(week[j].start_date);
//                             dud = new Date(week[j].due_date);
//                             const stdate = moment(std).format('YYYYMMDD')
//                             const enddate = moment(dud).format('YYYYMMDD')
//                             console.log("week")
//                             console.log(week[j] + "\n")
//                             console.log("stdate " + stdate)
//                             console.log("enddate " + enddate)
//                             const tdtd = moment(current_date).format('YYYYMMDD')
//                             // const tdtd = "20210920"
//                             console.log("tddtd " + tdtd)
//                             if (tdtd >= stdate && tdtd <= enddate) {
//                                 SN = week[j].week_status_id;

//                                 std1 = moment(stdate).format()
//                                 dud1 = moment(enddate).format()
//                                 console.log(std1);

//                             }
//                         }
//                         console.log(std1.length);
//                         if (Number(std1.length) > 0) {
//                             var sql1 = "select count(*),(select count(t1.Task_id) from project_task t1 where t1.Due_Date between ? AND ? and t1.Group_id=? and t1.Status='Done') as done,(select count(t2.Task_id) from project_task t2 where t2.Due_Date between ? AND ? and t2.Group_id=? and t2.Status='Waiting') as waiting,(select count(t3.Task_id) from project_task t3 where t3.Due_Date between ? AND ? and t3.Group_id=? and not t3.Status='Deleted') as week from project_task t where t.Due_Date between ? AND ? and t.Group_id=?"
//                             connection.query(sql1, [std1, dud1, gid[h], std1, dud1, gid[h], std1, dud1, gid[h], std1, dud1, gid[h++]], (err, task) => {
//                                 if (err) {
//                                     console.log(err);
//                                 }
//                                 else {
//                                     data[k] = task;
//                                     k = k + 1;
//                                     while (Number(k) == Number(person.length)) {
//                                         if (flag == 1) {
//                                             res.send(errr);
//                                         }
//                                         else {

//                                             res.send(data);
//                                         }
//                                         return;
//                                     }

//                                 }

//                             });


//                         }
//                         else {
//                             datas[kk] = "00";
//                             kk = kk + 1;
//                             while (Number(kk) == Number(person.length)) {
//                                 if (flag == 1) {
//                                     res.send(errr);
//                                 }
//                                 else {

//                                     res.send(datas);
//                                 }
//                                 return;
//                             }

//                         }
//                     }
//                 });
//             }
//         }
//     })
// })

router.get('/noweek/:gi', requireAuth, (req, res, next) => {

    var gi = req.params.gi
    var gid = [];
    
    var sql = "Select Group_id,Status_id,startDate from project_group where Instructor_id1 = (select Instructor_id from instructor where Person_id=(select Person_id from persons where grno_EmpCode=?)) "
    connection.query(sql, [gi], async (err, person, fields) => {

        if (err) {
            errr[0] = err
            console.log(err);
            flag = 1;
            return;
        }
        else {
            const allprojects = {};
            for (let i = 0; i < person.length; i++) {
                
                const groupid = person[i].Group_id;
                console.log("Group Id"+groupid)
                const today = moment(current_date).format('YYYYMMDD');
                const startdate = moment(person[i].startDate).format('YYYYMMDD');
                const enddate = moment(person[i].endDate).format('YYYYMMDD');
                
                if(today < startdate)
                {
                    const obj = {};
                    obj.started = 0;
                    obj.startDate = moment(person[i].startDate).format('DD MMMM YYYY');
                    obj.endDate = moment(person[i].endDate).format('DD MMMM YYYY')
                    obj.duetasks = 0;
                    obj.approved = 0;
                    obj.pending = 0;
                    allprojects[groupid] = obj;
                }
                else if(today > enddate)
                {
                    const obj = {};
                    obj.started = 1;
                    obj.startDate = moment(person[i].startDate).format('DD MMMM YYYY');
                    obj.endDate = moment(person[i].endDate).format('DD MMMM YYYY')
                    obj.duetasks = 0;
                    obj.approved = 0;
                    obj.pending = 0;
                    allprojects[groupid] = obj;
                }
                else
                {
                    let sqlweek = "Select * from week_status where start_date <= Date(NOW()) AND due_date >= Date(NOW()) AND group_id = ?";
                    const week = await query(sqlweek,[groupid]);
                    let weekstart = week[0].start_date;
                    let weekend = week[0].due_date;

                    let weektaskssql = "Select count(*) as cnt from project_task where Group_id = ? AND Due_Date BETWEEN ? AND ? AND Deleted_Date is NULL";
                    let duetasks = await query(weektaskssql,[groupid,weekstart,weekend]);
                    duetasks  = duetasks[0].cnt;

                    let donetaskssql = "Select count(*) as cnt from project_task where Group_id = ? AND Due_Date BETWEEN ? AND ? AND Approved_Date is not NULL AND Deleted_Date is NULL";
                    let donetasks = await query(donetaskssql,[groupid,weekstart,weekend]);
                    donetasks  = donetasks[0].cnt;

                    let pendingtaskssql = "Select count(*) as cnt from project_task where Group_id = ? AND Due_Date BETWEEN ? AND ? AND Approved_Date is NULL AND Submitted_date is NOT NULL AND Deleted_Date is NULL";
                    let pendingtasks = await query(pendingtaskssql,[groupid,weekstart,weekend]);
                    pendingtasks  = pendingtasks[0].cnt;

                    let status = person[i].Status_id;

                    const obj = {};
                    obj.started = 2;
                    obj.startDate = moment(person[i].startDate).format('DD MMMM YYYY');
                    obj.endDate = moment(person[i].endDate).format('DD MMMM YYYY')
                    obj.duetasks = duetasks;
                    obj.approved = donetasks;
                    obj.pending = pendingtasks;
                    obj.status = (status == '1')?'Lagging':(status == '2')?'On Time':'Leading';
                    allprojects[groupid] = obj;


                    



                }



            };
            res.send(allprojects);
        }
    })
})

router.get('/guidegroupsprofile/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    var errr = [];
    var data = [];
    var flag;
    var k = 0;
    var i = 0;
    var sql = "Select Group_id from project_group where Instructor_id1 = (select Instructor_id from instructor where Person_id=?)"
    connection.query(sql, [gi], (err, person, fields) => {

        if (err) {
            errr[0] = err
            console.log(err);
            flag = 1;
            return;
        }
        else {
            for (let j = 0; i < person.length; i++) {
                var sql1 = "select g.Group_id as gid,g.Group_Name as gna,g.group_title as gti,g.Project_Type_id as gst , pt.Project_Type_Name as typname from project_group g JOIN project_type pt on pt.Project_Type_id = g.Project_Type_id where g.Group_id = ?"
                connection.query(sql1, [person[i].Group_id], (err, home, fields) => {
                    if (err) {
                        errr[j] = err;
                        console.log(err);
                        j++;
                        flag = 1;
                        return;
                    }
                    else {
                        data[k] = home;
                        k = k + 1;
                        while (Number(k) == Number(person.length)) {
                            if (flag == 1) {
                                res.send(errr);
                            }
                            else {
                                res.send(data);
                            }
                            return;
                        }
                    }
                });
            }
        }
    });
})

module.exports = router;