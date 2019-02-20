var mongodb=require('mongodb');
var mongoose = require('mongoose');

var project=mongoose.Schema;
var projectconsruct=new project({
    projectname:{
        type:String
    },
    area:{
        type:String
    },
    students:[{
        type:String
    }],
    mentor:{
        type:String
    },
    link:{
        type:String
    }
},{collection:'project'});
var projectdata=mongoose.model('projectdata',projectconsruct);

var achive=mongoose.Schema;
var achiveconsruct=new achive({
    contest:{
        type:String
    },
    project:{
        type:String
    },
    domain:{
        type:String
    },
    level:{
        type:String
    },
    student:[{
        type:String
    }],
    mentor:{
        type:String
    }
},{collection:'achive'});
var achivedata=mongoose.model('achivedata',achiveconsruct);

var workshop=mongoose.Schema;
var workshopconstruct=new workshop({
    workshop:{
        type:String
    },
    name:{
        type:String
    },
    location:{
        type:String
    },
    start:{
        type:String
    },
    end:{
        type:String
    }
},{collection:'workshop'});
var workshopdata=mongoose.model('workshopdata',workshopconstruct);

var student=mongoose.Schema;
var studentconstruct=new student({
    year:{
        type:String
    },
    name:{
        type:String
    },
    number:{
        type:String
    },
    
},{collection:'student'});
var studentdata=mongoose.model('studentdata',studentconstruct);


var placement=mongoose.Schema;
var placementconstruct=new placement({
    company:{
        type:String
    },
    name:{
        type:String
    },
    package:{
        type:String
    },
    type:{
        type:String
    }
    
},{collection:'placement'});
var placementdata=mongoose.model('placementdata',placementconstruct);

exports.projectpush=function(data){
    
    var arr=data.student.split(";");
    var projectdetails={
        projectname:data.project,
        area:data.area,
        students:arr,
        mentor:data.mentor,
        link:data.link
    }
    var insert=new projectdata(projectdetails);
    insert.save();
}

exports.achivepush=function(data){
    var arr=data.students.split(";")
    var achivedetails={
        contest:data.contest,
        project:data.project,
        domain:data.area,
        level:data.level,
        student:arr,
        mentor:data.mentor

    }
    var insert=new achivedata(achivedetails);
    insert.save();
}

exports.workshoppush=function(data){
    var workdetails={
        workshop:data.workshop,
        name:data.name,
        location:data.location,
        start:data.startdate,
        end:data.enddate
    }
    var insert=new workshopdata(workdetails);
    insert.save();
}

exports.studentpush=function(data){
    var studentdetails={
        year:data.year,
        name:data.student,
        number:data.number

    }
    var insert= new studentdata(studentdetails);
    insert.save();
}

exports.placementpush=function(data){
    var placementdetails={
        company:data.company,
        name:data.name,
        package:data.package,
        type:data.type
    }
    var insert=new placementdata(placementdetails);
    insert.save();
}

exports.getproject=function(cb){
    projectdata.find(cb);
}

exports.getachive=function(cb){
    achivedata.find(cb);
}

exports.getworkshop=function(cb){
    workshopdata.find(cb);
}

exports.getstudent=function(cb){
    studentdata.find(cb);
}

exports.getplacement=function(cb){
    placementdata.find(cb);
}