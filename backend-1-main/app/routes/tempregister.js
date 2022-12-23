var express = require('express')
var router = express()
const connection = require('../config/db')
const util = require('util');
current_date = new Date().toJSON().slice(0, 10)
const query = util.promisify(connection.query).bind(connection);
let lerid = []
var groupId = ""
const { requireAuth } = require('../middleware/authMiddelware')

router.get('/guide/:collegeId/:departmentId', requireAuth, (req, res, next) => {
    const collegeId = req.params.collegeId;
    const departmentId = req.params.departmentId;

    var sqlQuery = `select P.FullName as name , P.Person_id , ins.Instructor_id FROM persons P ,instructor ins  WHERE P.roleId = 3 and ins.Person_id = P.Person_id and P.college = ${collegeId} and P.department = ${departmentId}`;
    connection.query(sqlQuery, (err, guides) => {
        if (!err) {
            res.send(guides);
        }
        else {
            console.log(err);
            res.send(err);
        }

    });
});

router.get('/types/:cl', requireAuth, (req, res) => {
    var sqlQuery = "SELECT PT.Project_Type_id as id , PT.Project_Type_Name as actualtype FROM project_type as PT where PT.College_id = ?";
    connection.query(sqlQuery, [req.params.cl], (err, types) => {
        if (!err) {
            res.send(types);
        }
        else {
            console.log(err);
            res.send(err);
        }

    })

});

router.get('/getDomains/:cl/:dp', requireAuth, (req, res) => {
    var sqlQuery = "SELECT PD.Domain_id as id , PD.Domain_Name as name FROM project_domain as PD where PD.Department_id = ? AND PD.College_id = ?";
    connection.query(sqlQuery, [req.params.dp, req.params.cl], (err, domains) => {
        if (!err) {
            res.send(domains);
        }
        else {
            console.log(err);
            res.send(err);
        }

    })
});

router.get('/companies', requireAuth, (req, res) => {
    var sqlQuery = "SELECT * FROM `company` ";
    connection.query(sqlQuery, (err, companies) => {
        if (!err) {
            res.send(companies);
        }
        else {
            console.log(err);
            res.send(err);
        }

    })


});

router.get('/testinsert', requireAuth, async (req,res) => {
    var sqlptcompany = " INSERT INTO `industryproject` (`industry_project_id`, `Company_id`, `DueDate`, `Description`, `FacultyRef`, `Links`, `College_id`, `visible`) VALUES (NULL,?, '', 'Uploading indus_id....', '1', 'www.jjb.com',?, '1'); "
    const result = await query(sqlptcompany,[11, 11]);
    res.send(result)


})

router.post('/submitgrp', requireAuth, async (req, res) => {
    var projectname = req.body.projectname;
    var instructerid2 = req.body.instructerid2;
    var year = req.body.year;
    var instructerid1 = req.body.instructerid1;
    var Instructor_id_industry = req.body.Instructor_id_industry;
    var Department_id = req.body.Department_id;
    var College_id = req.body.College_id;
    var final_domain = req.body.final_domain;
    var Project_Type_id = req.body.Project_Type_id;
    var industryid = req.body.finalindusid;
    let usergrarray = req.body.userarray;
    var count = 0;

    /*     console.log(industryid);
        console.log(projectname,instructerid1,instructerid2,Instructor_id_industry,Department_id,College_id,final_domain,Domain_Pref_1,Domain_Pref_2,Domain_Pref_3,Status_id,Project_Type_id,Companyid,industryid)
        console.log(current_date); */
    var getcntQ = ` SELECT COUNT(pg.Department_id) as tcount FROM project_group pg WHERE pg.Department_id = ${Department_id} AND pg.College_id = ${College_id} AND pg.Year = "${year}" `;
    try {
        var count = await query(getcntQ);
        console.log(count[0].tcount);
    } catch (error) {
        console.log(error);
    }
    //var count = await query(getcntQ);
    console.log(count[0].tcount);
    var getdepname = ` SELECT dep.Department_Name from department dep where dep.College_id = ${College_id} AND dep.Department_id = ${Department_id}  `;
    var depname = await query(getdepname);
    //console.log(depname)
    let newcount = count[0].tcount + 1;
    var Prjname = year + "-" + depname[0].Department_Name + "-PRJ-21-22-" + newcount;
    //console.log(Prjname);

    var mainQ = " INSERT INTO project_group (Group_id,Group_Name, Group_title,Year, Instructor_id2, Instructor_id1, Instructor_id_industry, initial_Time, Design_Time, Devlopment_Time, Testing_Time, Deployment_Time, Department_id, College_id, final_domain, Domain_Pref_1, Domain_Pref_2, Domain_Pref_3, Status_id, Project_Type_id, industry_project_id,Objective, Scope, createDate,startDate) VALUES (NULL ,?, 'NOT STARTED YET' ,?, '?' , '?' , ?, '0' , '0' , '0' , '0' , '0' , ? , ? , ? , '9', '10' , '11', '2' , ? , ? , NULL,NULL, ? , NULL)";
    let parameters = [Prjname, year, instructerid2, instructerid1, Instructor_id_industry, Department_id, College_id, final_domain, Project_Type_id, industryid, current_date]

    var insertion = await query(mainQ, parameters);
    console.log("INSERTED INTO PROJECTS");
    for await (const i of usergrarray) {
        var get_lerid = "SELECT L.Learner_id from persons P , learner L where P.grno_EmpCode = ? and P.Person_id = L.Person_id";
        var ans = await query(get_lerid, i);
        lerid.push(ans[0].Learner_id);
    }
    console.log("GOT LEARNER'S ID'S ");
    //GET GROUP ID
    var grpidQ = "select PG.Group_id  from project_group PG ORDER BY PG.Group_id  DESC LIMIT 1;"
    var grpiid = await query(grpidQ);
    groupId = grpiid[0].Group_id;


    console.log(groupId);
    console.log("Before 2nd for");
    //INSERT THE ABOVE ELEMENTS
    for (j = 0; j < lerid.length; j++) {
        console.log("HMM");
        var insinReg = "INSERT INTO `learner_project_reg` (`Learner_Reg_id`, `Group_id`, `Learner_id`, `registered`) VALUES (NULL, ?, ?, '1');";
        await query(insinReg, [groupId, lerid[j]])
    }
    lerid = []
    var groupId = ""

    console.log("DONE")
});

router.post('/creategroup', requireAuth, async (req, res) => {
    var projectname = req.body.projectname;
    var instructerid2 = req.body.instructerid2;
    var Instructor_id_industry = req.body.instructorid2;
    var year = req.body.year;
    var instructerid1 = req.body.instructerid1;
    var industryGuideName = req.body.industryGuideName;
    var industryGuideEmail = req.body.industryGuideEmail;
    var Department_id = req.body.Department_id;
    var College_id = req.body.College_id;
    var final_domain = req.body.final_domain;
    var Project_Type_id = req.body.Project_Type_id;
    var industryid = req.body.finalindusid;
    let grno = req.body.grno;
    var count = 0;
    var title = req.body.title;
    var objective = req.body.objective;
    var scope = req.body.scope;
    var phase1 = req.body.phase1;
    var phase2 = req.body.phase2;
    var phase3 = req.body.phase3;
    var phase4 = req.body.phase4;
    var phase5 = req.body.phase5;
    var creator = req.body.person_id;
    var startdate = req.body.startdate;
    var companyId = req.body.CompanyId;

    if(Project_Type_id == '2')
    {
        var sqlptcompany = " INSERT INTO `industryproject` (`industry_project_id`, `Company_id`, `industryguide_name`, `industryguide_email`) VALUES (NULL,?, ?, ?); "
        const result = await query(sqlptcompany,[companyId,industryGuideName,industryGuideEmail]);
        industryid = result.insertId;

        // var getindusid = "select `industry_project_id`  from industryproject ORDER BY `industry_project_id` DESC LIMIT 1;";
        // industryid = await query(getindusid);
        // industryid = industryid[0].industry_project_id;

        // var sqlindguide = " INSERT INTO `industry_guide` (`guide_id`, `guide_name`, `guide_email`) VALUES (NULL,?, ?); "
        // await query(sqlindguide,[industryGuideName, industryGuideEmail]);

        // var getiindguideid = "select `guide_id`  from industryproject ORDER BY `industry_project_id` DESC LIMIT 1;";
        // industryid = await query(getindusid);
        // industryid = industryid[0].industry_project_id;
        

    }
    else
    {
        industryid = "1";
    }

    var code = "FINISH";

    /*     console.log(industryid);
        console.log(projectname,instructerid1,instructerid2,Instructor_id_industry,Department_id,College_id,final_domain,Domain_Pref_1,Domain_Pref_2,Domain_Pref_3,Status_id,Project_Type_id,Companyid,industryid)
        console.log(current_date); */
    // var getcntQ = ` SELECT COUNT(pg.Department_id) as tcount FROM project_group pg WHERE pg.Department_id = ${Department_id} AND pg.College_id = ${College_id} AND pg.Year = "${year}" `;
    // try {
    //     var count = await query(getcntQ);
    //     console.log(count[0].tcount);
    // } catch (error) {
    //     console.log(error); 
    // }
    //var count = await query(getcntQ);
    // console.log(count[0].tcount);
    var getdepname = ` SELECT dep.Department_Name from department dep where dep.College_id = ${College_id} AND dep.Department_id = ${Department_id}  `;
    var depname = await query(getdepname);
    //console.log(depname)
    // let newcount = count[0].tcount+1;
    var getcount = `SELECT Dept_id FROM project_group WHERE Department_id = ? AND Year = ? ORDER BY Dept_id DESC LIMIT 1`;
    var countrow = await query(getcount, [Department_id, year]);
    var count = countrow[0] ? countrow[0].Dept_id : 0;
    var newcount = count + 1;

    var Prjname = year + "-" + depname[0].Department_Name + "-PRJ-21-22-" + newcount;
    //console.log(Prjname);

    var getcode = `SELECT group_code from group_codes where used = 0 LIMIT 1`;
    var coderow = await query(getcode);
    code = coderow[0].group_code;
    console.log("code " + code)
    var updatecode = `Update group_codes set used = 1 where group_code = ?`
    await query(updatecode, code);

    var mainQ = " INSERT INTO project_group (Group_id,Dept_id,Group_Name, Group_title,Year, Instructor_id2, Instructor_id1, Instructor_id_industry, initial_Time, Design_Time, Devlopment_Time, Testing_Time, Deployment_Time, Department_id, College_id, final_domain, Domain_Pref_1, Domain_Pref_2, Domain_Pref_3, Status_id, Project_Type_id, industry_project_id,Objective, Scope, createDate,startDate,code,creator) VALUES (NULL,? ,?, ? ,?, '?' , '?' , ?, ? , ? , ? , ? , ? , ? , ? , ? , '9', '10' , '11', '2' , ? , ? , ?,?, ? , ?, ?,?)";
    let parameters = [newcount, Prjname, title, year, instructerid2, instructerid1, Instructor_id_industry, phase1, phase2, phase3, phase4, phase5, Department_id, College_id, final_domain, Project_Type_id, industryid, objective, scope, current_date, startdate, code, creator]

    var insertion = await query(mainQ, parameters);
    console.log("INSERTED INTO PROJECTS");

    var get_lerid = "SELECT L.Learner_id from persons P , learner L where P.grno_EmpCode = ? and P.Person_id = L.Person_id";
    var ans = await query(get_lerid, grno);
    lerid.push(ans[0].Learner_id);

    console.log("GOT LEARNER'S ID'S ");
    //GET GROUP ID
    var grpidQ = "select PG.Group_id  from project_group PG ORDER BY PG.Group_id  DESC LIMIT 1;"
    var grpiid = await query(grpidQ);
    groupId = grpiid[0].Group_id;


    console.log(groupId);
    let gid = groupId;
    console.log("Before 2nd for");
    //INSERT THE ABOVE ELEMENTS
    for (j = 0; j < lerid.length; j++) {
        console.log("HMM");
        var insinReg = "INSERT INTO `learner_project_reg` (`Learner_Reg_id`, `Group_id`, `Learner_id`, `registered`) VALUES (NULL, ?, ?, '1');";
        await query(insinReg, [groupId, lerid[j]])
    }
    lerid = []
    var groupId = ""

    console.log("DONE")
    res.send(`${gid}`)
});


// router.get('/getindusid',(req,res)=>{
//     var getindusid = "select `industry_project_id`  from industryproject ORDER BY `industry_project_id` DESC LIMIT 1;";
// connection.query(getindusid,(err,id)=>{
//     if(!err){
//         res.send(id);
//     }

// });

// });

router.post('/postC&C/:cmp/:cl', requireAuth, (req, res) => {
    var sqlptcompay = " INSERT INTO `industryproject` (`industry_project_id`, `Company_id`, `DueDate`, `Description`, `FacultyRef`, `Links`, `College_id`, `visible`) VALUES (NULL,?, '', 'Uploading indus_id....', '1', 'www.jjb.com',?, '1'); "

    connection.query(sqlptcompay, [req.params.cmp, req.params.cl], (err, task, fields) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
            console.log(err);
        }
        else {
            var getindusid = "select `industry_project_id`  from industryproject ORDER BY `industry_project_id` DESC LIMIT 1;";
            connection.query(getindusid, (err, id) => {
                if (!err) {
                    res.send(id);
                }

            });

        }
    });

});

/* async function getlernerid() {
  let myPromise = new Promise(function(myResolve, myReject) {
    myResolve("I love You !!");
  });
  document.getElementById("demo").innerHTML = await myPromise;
}


 */

/* 
(async () => {
  try {
    const rows = await query('SELECT L.Learner_id from persons P , learner L where P.grno_EmpCode = "17u363" and P.Person_id = L.Person_id');
    console.log(rows);
  } finally {
    console.log("------------------------DONE------------------------");
  }
})() */

router.post('/getprlrid', requireAuth, async (req, res) => {
    /* let usergrarray = req.body.userarray;
    //GET LEARNER ID's
    //console.log(usergrarray);
    for await (const i of usergrarray){
        var get_lerid = "SELECT L.Learner_id from persons P , learner L where P.grno_EmpCode = ? and P.Person_id = L.Person_id" ;
        var ans = await query(get_lerid,i);
        lerid.push(ans[0].Learner_id);
    }
    console.log(lerid); */
    console.log("NOT NEEDED");


    /*  (err,ans)=>{
         if(!err){
             console.log(ans); 
             //res.send(ans);
             lerid.push(ans[0].Learner_id);
         }
         else{
             res.send(err);
         }
     }); */
    /* for (i=0;i<usergrarray.length;i++){
        
    }
 */
    //GET GROUP ID
    /* var grpidQ = "select PG.Group_id  from project_group PG ORDER BY PG.Group_id  DESC LIMIT 1;"
    var grpiid = await query(grpidQ);
    groupId = grpiid[0].Group_id;


    console.log(groupId);
    console.log("Before 2nd for");
    //INSERT THE ABOVE ELEMENTS
    for(j=0;j<lerid.length;j++){
        console.log("HMM");
        var insinReg = "INSERT INTO `learner_project_reg` (`Learner_Reg_id`, `Group_id`, `Learner_id`, `registered`) VALUES (NULL, ?, ?, '1');";
        await query(insinReg,[groupId,lerid[j]])
    }
 */

});









module.exports = router;