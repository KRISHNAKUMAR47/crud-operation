const express = require("express");
const admin_route = express();

const session = require("express-session");
const config = require("../config/config");
admin_route.use(session({secret:config.sessionSecret}));

const bodyParser = require("body-parser");
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');

const multer =require('multer');
const path =require("path")

admin_route.use(express.static('public'))

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname, '../public/userimages'));
    },
    filename:function(req,file,cb){
    const name = Date.now()+'-'+file.originalname;
    cb(null,name);
    }
});
const upload = multer({storage:storage});

const auth = require("../middleware/adminAuth");

const adminController = require("../controllers/adminController");

admin_route.get('/',auth.islogout,adminController.loadlogin);

admin_route.post('/',adminController.verifyLogin);

admin_route.get('/home',auth.islogin,adminController.loadDashboard);

admin_route.get('/logout',auth.islogin,adminController.logout);

admin_route.get('/dashboard',adminController.adminDashboard);

admin_route.get('/new-user',auth.islogin,adminController.newUserLoad); 

admin_route.post('/new-user',upload.single('image'),adminController.addUser);

admin_route.get('/edit-user',auth.islogin,adminController.editUserLoad);

admin_route.post('/edit-user',adminController.updateUsers);

admin_route.get('/delete-user',adminController.deleteUser);

admin_route.get('*',function(req,res){

    res.redirect('/admin');

})

module.exports =  admin_route;