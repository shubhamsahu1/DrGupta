
var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');

/*
	ESTABLISH DATABASE CONNECTION
*/

var dbName = process.env.DB_NAME || 'node-login';
var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017;

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
db.open(function(e, d){
	if (e) {
		console.log(e);
	} else {
		if (process.env.NODE_ENV == 'live') {
			db.authenticate(process.env.DB_USER, process.env.DB_PASS, function(e, res) {
				if (e) {
					console.log('mongo :: error: not authenticated', e);
				}
				else {
					console.log('mongo :: authenticated and connected to database :: "'+dbName+'"');
				}
			});
		}	else{
			console.log('mongo :: connected to database :: "'+dbName+'"');
		}
	}
});

var accountsCounter = db.collection('accountsCounter');

var accountsComOpt = db.collection('accountsComOpt');
var AdminAccounts = db.collection('AdminAccounts');
var departments = db.collection('departments');
var diagnosis = db.collection('diagnosis');
var doctors = db.collection('doctors');Users
var Users = db.collection('Users');
/*Department DB methords --------------------------------*/
exports.updateDepartment = function(newDept, callback)
{
	departments.findOne({_id: getObjectId(newDept._id)}, function(e, o) {
		if (o){
			console.log('Department found '+  JSON.stringify(newDept));
			//delete newDept['_id'];
			console.log('Department update after Deleting ID parameter'+ JSON.stringify(newDept));
			departments.update({_id: getObjectId(newDept._id)},{$set:{"deptName":newDept.deptName,"deptID":newDept.deptID}},{upsert:false}, callback);
		}	else{
			callback('Department Not exist');
		}
	});
}
exports.addNewDepartment = function(newDept, callback)
{
	departments.findOne({deptName:newDept.deptName}, function(e, o) {
		if (o){
			callback('Department name Already exist');
		}	else{
			departments.findOne({deptID:newDept.deptID}, function(e, o) {
				if (o){
					callback('Department ID Already exist');
				}	else{
					
						newDept.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						departments.insert(newDept, {safe: true}, callback);
					
				}
			});
		}
	});
}

exports.getDepartment = function(callback)
{
	departments.find().toArray(function(err, items) {
		if (items){
			console.log("department found"+items)
			callback(null,items);
		}	else{
			callback(err);
			
		}    
		
        });
}
exports.deleteDepartment = function(Dept,callback)
{
	console.log("department ID to be deleted "+"-----"+Dept._id);
	departments.remove({_id: getObjectId(Dept._id)},function(err, items) {
		if (items){
			console.log("department deleted"+"-----"+JSON.stringify(items));
			callback(null,items);
		}	else{
			console.log("department delete process not successfull")
			callback(err);
			
		}    
		
        });
}
/*Department DB methords --------------------------------*/

/*Diagnosis DB methords --------------------------------*/
exports.updateDiagnosis = function(Diag, callback)
{
	diagnosis.findOne({_id: getObjectId(Diag._id)}, function(e, o) {
		if (o){
			console.log('Diagnosis found '+  JSON.stringify(Diag));
			var _id  = Diag._id;
			delete Diag['_id'];
			console.log('Diagnosis update after Deleting ID parameter'+ JSON.stringify(Diag));
			diagnosis.update({_id: getObjectId(_id)},{$set:Diag},{upsert:false}, callback);
		}	else{
			callback('Diagnosis Not exist');
		}
	});
}
exports.addNewDiagnosis = function(newDiag, callback)
{
	diagnosis.findOne({diagName:newDiag.deptName}, function(e, o) {
		if (o){
			callback('Diagnosis name Already exist');
		}	else{
			newDiag.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			diagnosis.insert(newDiag, {safe: true}, callback);
		}
	});
}

exports.getDiagnosis = function(query,callback)
{
	diagnosis.find(query).toArray(function(err, items) {
		if (items){
			console.log("Diagnosis found"+items)
			callback(null,items);
		}	else{
			callback(err);
			
		}    
		
        });
}
exports.deleteDiagnosis = function(query,callback)
{
	console.log("Diagnosis ID to be deleted "+"-----"+JSON.stringify(query));
	diagnosis.remove({_id: getObjectId(query.diagID)},function(err, items) {
		if (items){
			console.log("Diagnosis deleted"+"-----"+JSON.stringify(items));
			callback(null,items);
		}	else{
			console.log("Diagnosis delete process not successfull")
			callback(err);
			
		}    
		
        });
}
/*Diagnosis DB methords --------------------------------*/

/*Doctor DB methords --------------------------------*/
exports.updateDoctor = function(Doc, callback)
{
	doctors.findOne({_id: getObjectId(Doc._id)}, function(e, o) {
		
		if (o){
			console.log('doctor found '+  JSON.stringify(Doc));
			var _id  = Doc._id;
			delete Doc['_id'];
			console.log('doctor update after Deleting ID parameter'+ JSON.stringify(Doc));
			Doc.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			doctors.update({_id: getObjectId(_id)},{$set:Doc},{upsert:false}, callback);
		}	else{
			callback('doctor Not exist');
		}
	});
}
exports.addNewDoctor = function(newDoc, callback)
{
	doctors.findOne({diagName:newDoc.docName}, function(e, o) {
		if (o){
			callback('doctor name Already exist');
		}	else{
			newDoc.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			doctors.insert(newDoc, {safe: true}, callback);
		}
	});
}

exports.getDoctor = function(query,callback)
{
	doctors.find(query).toArray(function(err, items) {
		if (items){
			console.log("doctor found"+items)
			callback(null,items);
		}	else{
			callback(err);
			
		}    
		
        });
}
exports.deleteDoctor = function(query,callback)
{
	console.log("doctor ID to be deleted "+"-----"+JSON.stringify(query));
	doctors.remove({_id: getObjectId(query._id)},function(err, items) {
		if (items){
			console.log("doctor deleted"+"-----"+JSON.stringify(items));
			callback(null,items);
		}	else{
			console.log("doctor delete process not successfull")
			callback("doctor delete process not successfull");
			
		}    
		
        });
}
/*Doctor DB methords --------------------------------*/

/*User DB methords --------------------------------*/

exports.updateUser = function(user, callback)
{
	Users.findOne({_id: getObjectId(user._id)}, function(e, o) {
		
		if (o){
			console.log('User found '+  JSON.stringify(user));
			var _id  = user._id;
			delete user['_id'];
			console.log('User update after Deleting ID parameter'+ JSON.stringify(user));
			user.date = moment().format('MMMM Do YYYY, h:mm:ss a');
			Users.update({_id: getObjectId(_id)},{$set:user},{upsert:false}, callback);
		}	else{
			callback('User Not exist');
		}
	});
}
exports.addNewUser = function(newUser, callback)
{
	Users.findOne({userName:newUser.userName}, function(e, o) {
		if (o){
			callback('User name Already exist');
		}	else{
			saltAndHash(newUser.userPass, function(hash){
				newUser.userPass = hash;
			// append date stamp when record was created //
				newUser.date = moment().format('MMMM Do YYYY, h:mm:ss a');
				Users.insert(newUser, {safe: true}, callback);
			});
			
		}
	});
}

exports.getUser = function(query,callback)
{
	Users.find(query).toArray(function(err, items) {
		if (items){
			console.log("User found"+items)
			callback(null,items);
		}	else{
			callback(err);
			
		}    
		
        });
}
exports.deleteUser = function(query,callback)
{
	console.log("User ID to be deleted "+"-----"+JSON.stringify(query));
	Users.remove({_id: getObjectId(query._id)},function(err, items) {
		if (items){
			console.log("User deleted"+"-----"+JSON.stringify(items));
			callback(null,items);
		}	else{
			console.log("User delete process not successfull")
			callback("User delete process not successfull");
			
		}    
		
        });
}
/*User DB methords --------------------------------*/

/* login validation methods */

exports.autoLogin = function(user, pass, callback)
{
	accounts.findOne({user:user}, function(e, o) {
		if (o){
			o.pass == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}
exports.autoLoginAdmin = function(user, pass, callback)
{
	AdminAccounts.findOne({user:user}, function(e, o) {
		if (o){
			o.pass == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}
exports.autoLoginUser = function(user, pass, callback)
{
	Users.findOne({userName:user}, function(e, o) {
		console.log("Db--called--"+user);
		if (o){
			console.log("pass Db o.UserPass--"+o.userPass);
			console.log("pass Db--"+pass);
			o.userPass == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}
exports.manualLoginUser = function(UserData, callback)
{
	Users.findOne({userName:UserData.user,userRole:UserData.role}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
			validatePassword(UserData.pass, o.userPass, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}
exports.manualLoginAdmin = function(user, pass, callback)
{
	AdminAccounts.findOne({user:user}, function(e, o) {
		if (o == null){
			console.log(o);
			callback('Admin-not-found');
		}	else{
			console.log(o);
			validatePassword(pass, o.pass, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback('Admin invalid-password');
				}
			});
		}
	});
}
exports.validateAdmin = function(user, pass, callback)
{
	AdminAccounts.findOne({user:user}, function(e, o) {
		if (o == null){
			callback('No Admin Found');
		}	else{
			validatePassword(pass, o.pass, function(err, res) {
				if (res){
					callback(null);
				}	else{
					callback('Admin Password is invalid');
				}
			});
		}
	});
}

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newData, callback)
{
	accounts.findOne({user:newData.user}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
			accounts.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						accounts.insert(newData, {safe: true}, callback);
					});
				}
			});
		}
	});
}
exports.addNewAccountAdmin = function(newData, callback)
{
	AdminAccounts.findOne({user:newData.user}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
			AdminAccounts.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						AdminAccounts.insert(newData, {safe: true}, callback);
					});
				}
			});
		}
	});
}

exports.updateAccount = function(newData, callback)
{
	accounts.findOne({_id:getObjectId(newData.id)}, function(e, o){
		o.name 		= newData.name;
		o.email 	= newData.email;
		o.country 	= newData.country;
		if (newData.pass == ''){
			accounts.save(o, {safe: true}, function(e) {
				if (e) callback(e);
				else callback(null, o);
			});
		}	else{
			saltAndHash(newData.pass, function(hash){
				o.pass = hash;
				accounts.save(o, {safe: true}, function(e) {
					if (e) callback(e);
					else callback(null, o);
				});
			});
		}
	});
}

exports.updatePassword = function(email, newPass, callback)
{
	accounts.findOne({email:email}, function(e, o){
		if (e){
			callback(e, null);
		}	else{
			saltAndHash(newPass, function(hash){
		        o.pass = hash;
		        accounts.save(o, {safe: true}, callback);
			});
		}
	});
}

/* account lookup methods */

exports.deleteAccount = function(id, callback)
{
	accounts.remove({_id: getObjectId(id)}, callback);
}

exports.getAccountByEmail = function(email, callback)
{
	accounts.findOne({email:email}, function(e, o){ callback(o); });
}

exports.validateResetLink = function(email, passHash, callback)
{
	accounts.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function(callback)
{
	accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

exports.delAllRecords = function(callback)
{
	accounts.remove({}, callback); // reset accounts collection for testing //
}

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback)
{
	accounts.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

var findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	accounts.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}
