const e = require('express')
var express = require('express')
var router = express()
current_date = new Date().toJSON().slice(0, 10)
// let current_date = new Date(2021,09,20).toJSON().slice(0, 10)
var moment = require('moment')
const connection = require('../config/db')
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
const { requireAuth } = require('../middleware/authMiddelware')

router.get('/pds/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    var sql = "select a.* ,pt.Project_Type_Name as type,C.Company_name as company,b1.FullName,b2.Mobile,b3.email, ip1.industryguide_name as guide2,ip1.industryguide_email as guide2email,c1.College_Name as clg,dd1.Department_Name,d1.Domain_Name as dom1,d2.Domain_Name as dom2,d3.Domain_Name as dom3,d4.Domain_Name as dom4 from project_group a Join department dd1 on dd1.Department_id=a.Department_id  JOIN persons b1 on b1.Person_id=(select ins.Person_id from instructor ins where ins.Instructor_id=a.Instructor_id1) JOIN persons b2 on b2.Person_id=(select ins.Person_id from instructor ins where ins.Instructor_id=a.Instructor_id1) JOIN persons b3 on b3.Person_id=(select ins.Person_id from instructor ins where ins.Instructor_id=a.Instructor_id1) Join college c1 on c1.College_id=a.College_id Join project_domain d1 on d1.Domain_id=a.Domain_Pref_1 Join project_domain d2 on d2.Domain_id=a.Domain_Pref_2 Join project_domain d3 on d3.Domain_id=a.Domain_Pref_3 Join project_type pt on pt.Project_Type_id=a.Project_Type_id Join company C on C.Company_id=(select ip.Company_id from industryproject ip where ip.industry_project_id=a.industry_project_id) Join project_domain d4 on d4.Domain_id=a.final_domain JOIN industryproject ip1 ON ip1.industry_project_id = a.industry_project_id where a.Group_id=?"
    connection.query(sql, [gi], (err, task, fields) => {
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
router.post('/startingformpd/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    var proti = req.body.projecttitle;
    var obj = req.body.objectives;
    var sco = req.body.scopes;
    var plaph = req.body.planing;
    var desiph = req.body.design;
    var devlph = req.body.devlopment;
    var tesph = req.body.testing;
    var deplph = req.body.deployment;
    var sql = "Update project_group set Group_title=?,Objective=?,Scope=?,initial_Time=?,Design_Time=?,Devlopment_Time=?,Testing_Time=?,Deployment_Time=?,startDate=? where Group_id=?"
    connection.query(sql, [proti, obj, sco, plaph, desiph, devlph, tesph, deplph, current_date, gi], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {

            res.send("Updated Successfully")

        }

    });
})

router.get('/std/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    var allstudnet = [];
    let k = 0;
    let flag = 0;
    let errr = []
    var sql1 = "select lpr.Learner_id from learner_project_reg lpr where lpr.Group_id=?"
    connection.query(sql1, [gi], (err, person, fields) => {
        if (err) {
            errr[0] = err;
            console.log(err);
            flag = 1;
            return;
        }
        else {
            for (let i = 0, j = 1; i < person.length; i++, j++) {
                var sql = "Select * from persons p where p.Person_id=(select l.Person_id from learner l where l.learner_id=?) and (p.roleId=1 or p.roleId=2)"
                connection.query(sql, [person[i].Learner_id], (err, task, fields) => {
                    if (err) {
                        errr[j] = err
                        flag = 1;
                        console.log(err);
                    }
                    else {

                        allstudnet[k++] = task
                        while (Number(k) == Number(person.length)) {
                            if (flag == 1) {
                                res.send(errr);
                            }
                            else {
                                res.send(allstudnet);
                            }
                            return;
                        }
                    }

                });
            }
        }

    });
})

router.get('/profile/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    var sql = "Select g.Group_title,g.Group_Name,P.FullName as FaultyGuide ,P1.FullName as IndustryFaultyGuide , P1.Mobile as IndustryFaultyGuideMo ,pt.Project_Type_Name as type, d.Department_Name,c.College_Name , cp.Company_name , cp.Company_id from project_group g Join department d on d.Department_id=g.Department_id Join project_type pt on pt.Project_Type_id=g.Project_Type_id Join college c on c.College_id=g.College_id Join persons P on P.Person_id=(select ins.Person_id from instructor ins where ins.Instructor_id=g.Instructor_id1) Join persons P1 on P1.Person_id=(select ins.Person_id from instructor ins where ins.Instructor_id=g.Instructor_id_industry) JOIN company cp on cp.Company_id = (SELECT indus.Company_id FROM industryproject indus WHERE indus.industry_project_id = g.industry_project_id) where g.Group_id=?"
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




router.get('/getstartdate/:gi', requireAuth, (req, res, next) => {
    var gi = req.params.gi;
    var sql = "select g.*,(select f.FullName from persons f where f.Person_id=(select ins.Person_id from instructor ins where ins.instructor_id=(select gr.Instructor_id1 from project_group gr where gr.Group_id=(select lrp.Group_id from learner_project_reg lrp where lrp.Learner_id=(select le.Learner_id from learner le where le.Person_id=?))))) as FullName from project_group g where g.Group_id=(select lr.Group_id from learner_project_reg lr where lr.Learner_id=(select l.Learner_id  from learner l where l.Person_id=?))"
    connection.query(sql, [gi, gi], (err, person, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            res.send(person)
        }

    });
})

router.post('/student/updateprofile', requireAuth, (req, res, next) => {
    var data = req.body;
    console.log("data ")
    console.log(data);

    var sql = "Update persons set FullName=?,Mobile=?,email=?,grno_EmpCode=? where Person_id=?"
    connection.query(sql, [data.fullName, data.mobile, data.email, data.grno, data.personId], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {

            res.send("Updated Successfully")

        }

    });
})


router.get('/college',  (req, res, next) => {
    var sql = "Select * from college"
    connection.query(sql, (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.send(task)
        }

    });
});
router.get('/groups/:gi', requireAuth, (req, res, next) => {
    var gid = req.params.gi
    var groupleader = [];
    var kk = 1;
    var sql = "Select Group_id,Group_title,Group_Name,startDate,endDate ,(select p6.FullName from persons p6 where p6.roleId=3 and p6.Person_id=(select ins.Person_id from instructor ins where ins.Instructor_id=(select gp.Instructor_id1 from project_group gp where gp.Group_id=? limit 1))) as Guidename from project_group where Group_id=?"
    connection.query(sql, [gid, gid], (err, group, fields) => {
        if (err) {
            res.send(err)
            console.log(err);
        }
        else {
            // console.log(group);
            groupleader[0] = group;
            var sql2 = "select lpr.Learner_id from learner_project_reg lpr where lpr.Group_id=?"
            connection.query(sql2, [gid], (err, learner) => {
                if (err) {
                    res.send(err)
                    console.log(err);
                }
                else {
                    console.log(learner);
                    console.log("leaner" + learner.length);
                    for (let k = 0; k < learner.length; k++) {

                        sql3 = "select l.Person_id from learner l where l.learner_id=?"
                        connection.query(sql3, [learner[k].Learner_id], (err, person) => {
                            if (err) {
                                res.send(err)
                                console.log(err);
                            }
                            else {

                                for (let l = 0; l < person.length; l++) {
                                    console.log(person[l].Person_id);
                                    var sql4 = "select p.FullName as leadername,p.Mobile as leadermobile, p.email as leaderemail from persons p where p.Person_id=? and p.roleId=1"
                                    connection.query(sql4, [person[l].Person_id], (err, leader) => {
                                        if (err) {
                                            res.send(err);
                                            console.log(err);
                                        }
                                        else {


                                            while (Number(kk) <= Number(person.length) + 1) {
                                                console.log("k " + kk);
                                                if (leader[0]) {
                                                    groupleader[kk++] = leader;
                                                    // res.send(groupleader)

                                                }
                                                if (Number(kk) == Number(person.length) + 1) {
                                                    // groupleader[0]=group
                                                    console.log(groupleader);
                                                    res.send(groupleader)
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        })
                    }
                }
            })
        }
    })
})



router.get('/department/:clg',  (req, res, next) => {
    var clgs = req.params.clg;
    var sql = "Select * from department where College_id=?"
    connection.query(sql, [clgs], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.send(task)
        }

    });
})

router.get('/verify/:faculty_name/:access_code',  (req, res, next) => {
    var faculty_name = req.params.faculty_name;
    var access_code = req.params.access_code;

    var sql = "Select * from faculty_access where faculty_name=? AND access_code=?"
    connection.query(sql, [faculty_name, access_code], (err, data, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.send(data)
        }

    });
})


router.get('/getproject/:person_id', requireAuth, (req, res, next) => {
    var person_id = req.params.person_id;

    var sql = "Select pg.*, persons.FullName as guide from  learner l JOIN learner_project_reg lpr  ON l.Learner_id = lpr.Learner_id JOIN project_group pg ON lpr.Group_id = pg.Group_id JOIN instructor ins on pg.Instructor_id1 = ins.Instructor_id JOIN persons on ins.Person_id = persons.Person_id where l.Person_id = ?"
    connection.query(sql, [person_id], (err, data, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            for(let item of data)
            {
                console.log("item.start_date"+item.startDate)
            }
            res.send(data)
        }

    });
})

router.post('/joinproject', requireAuth, async (req, res, next) => {
    var person_id = req.body.person_id;
    var code = req.body.code;

    var getlearner = "SELECT Learner_id from learner where Person_id = ?"
    var learner = await query(getlearner, person_id);
    var learner_id = learner[0].Learner_id;

    console.log("Learner " + learner_id)


    var sql = "Select Group_id from project_group where code = ?"
    connection.query(sql, [code], async (err, data, fields) => {
        // console.log("data " + data.length)
        if (data.length == 0) {
            res.send("Entered Joining Code Doesnot Exist. Please Verify");
        }
        else if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            var getcount = "SELECT count(*) as cnt from learner_project_reg where Group_id = ?"
            var count = await query(getcount, data[0].Group_id);
            // console.log("count "+count[0].cnt)

            if (count[0].cnt >= 4) {
                res.send("Group Already consists of 4 members.Please Try another group")
                return;
            }
            else {
                var sql1 = " INSERT INTO learner_project_reg (Learner_Reg_id,Group_id,Learner_id, registered) VALUES (NULL ,?, ? ,1)";
                let parameters = [data[0].Group_id, learner_id];
                var insertion = await query(sql1, parameters);
                res.send("Group Joined Successfully")
            }


        }

    });

})

router.post('/leaveproject', requireAuth, async (req, res, next) => {
    let person_id = req.body.person_id;
    let group_id = req.body.group_id;

    var getlearner = "SELECT Learner_id from learner where Person_id = ?"
    var learner = await query(getlearner, person_id);
    var learner_id = learner[0].Learner_id;

    var leavegroup = "DELETE from learner_project_reg where Learner_id = ?";
    await query(leavegroup,learner_id);

    res.send("Group Left successfully");

})

router.post('/deleteproject', requireAuth, async (req, res, next) => {
    let group_id = req.body.group_id;

    var deletegroup = "DELETE from project_group where Group_id = ?";
    await query(deletegroup,group_id);

    var deletelearnerproj = "DELETE from learner_project_reg where Group_id = ?";
    await query(deletelearnerproj,group_id);

    var deletetasks = "DELETE from project_task where Group_id = ?";
    await query(deletetasks,group_id);

    var deleteweeks = "DELETE from week_status where group_id = ?";
    await query(deleteweeks,group_id);

    res.send("Group Deleted successfully");

})


router.post('/accesscodeused',  (req, res, next) => {
    var accesscode = req.body.accesscode;
    console.log("accessCode ")
    console.log(accesscode);

    var sql = "Update faculty_access set used = 1 where access_code = ?"
    connection.query(sql, [accesscode], (err, data, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {

            res.send("Updated Successfully")

        }

    });
})

router.get('/verifyuser/:gi', (req, res, next) => {
    var gi = req.params.gi;
    var sql = "Select l.Person_id from learner_project_reg  lg JOIN learner l ON lg.Learner_id = l.Learner_id  where lg.Group_id = ?"
    connection.query(sql, [gi], (err, data, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            let obj = {};
            obj.group = data;
            var sql1 = "Select persons.Person_id, persons.department from project_group JOIN instructor ON project_group.Instructor_id1 = instructor.Instructor_id JOIN persons on persons.Person_id = instructor.Person_id where Group_id = ?"
            connection.query(sql1, [gi], (err, data1, fields) => {
                if (err) {
                    res.status(400).json({
                        status: 'error',
                        error: err,
                    });
                    console.log(err);

                }
                else {
                    obj.guide = data1[0].Person_id;
                    obj.department = data1[0].department;
                    res.send(obj);
                }

            });
        }

    });
})


module.exports = router