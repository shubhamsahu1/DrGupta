//var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');

module.exports = function(app) {

  app.get('/', function(req, res) {
    console.log("Index called");
    res.sendfile(__dirname + '/views/index.html');
  });

  app.get('/auth', function(req, res) {
    // check if the user's credentials are saved in a cookie //
    console.log("auth req fire");

    if (req.session.user == undefined) {
      console.log("auth fail");
      res.status(200).send({
        "login": "non"
      });
    } else {
    	console.log("auth role"+ JSON.stringify(req.session.user));
      if (req.session.user.role == "admin") {
        console.log("auth role Admin");
        AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
          if (o != null) {
            console.log("auth role Admin success");
            req.session.user = o;
            res.status(200).send({
              "login": "Admin"
            });
          } else {
            console.log("auth fail");
            res.status(200).send({
              "login": "non"
            });
          }
        });
      } else if (req.session.user.userRole == "counter") {
          console.log("auth role counter--"+req.session.user.userName+"--"+req.session.user.userPass);
          AM.autoLoginUser(req.session.user.userName, req.session.user.userPass, function(o) {
            if (o != null) {
              console.log("auth role counter success");
              req.session.user = o;
              res.status(200).send({
                "login": o.userRole
              });
            } else {
              console.log("auth counter fail");
              res.status(200).send({
                "login": "non"
              });
            }
          });
        }
      else {
        res.status(200).send({
          "login": "non"
        });
      }

    }
  });

  app.post('/Login', function(req, res) {
    console.log("login" + req.body['role']);
    if (req.body['role'] == "Admin") {
      console.log("Admin login");
      AM.manualLoginAdmin(req.body['user'], req.body['pass'], function(e, o) {
        if (!o) {
          console.log("invalid login");
          res.status(400).send({
              "error": "Invalid Credential"
            });
        } else {
          console.log("login successfull");

          req.session.user = o;
          res.status(200).send({userName:"Admin:- " + o.user});
        }
      });
    } else if (req.body['role'] == "counter"){
      console.log("counter login");
      AM.manualLoginUser(req.body, function(e, o) {
        if (!o) {
        	console.log("Invalid Credential");
        	res.status(400).send({
                "error": "Invalid Credential"
              });
        } else {
          req.session.user = o;
       console.log("Login successfull ");
          res.status(200).send({userName:"Counter:- "+o.userName});
        }
      });
    }

  });
  app.post('/signup', function(req, res) {
    AM.validateAdmin(req.body['adminName'], req.body['adminPass'], function(e) {
      if (e) {
        res.status(400).send({
          "error": e
        });
      } else {
        AM.addNewAccount({
          name: req.body['name'],
          email: req.body['email'],
          user: req.body['user'],
          pass: req.body['pass'],
          security: req.body['security']
        }, function(e) {
          if (e) {
            res.status(400).send({
              "error": e
            });
          } else {
            res.status(200).send({
              "code": "200",
              "msg": "New User Added",
              "user": req.body['user']
            });
          }
        });
      }
    })
  });
  /*-----------------------------------------------------Department service--------------------------------------------------------*/
  // add New Department service call 
  app.post('/addDept', function(req, res) {
    console.log("add department service called");
    if (req.session.user.role == "admin") {
      AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
        if (o != null) {
          console.log("admin validation success");
          if (req.body["_id"] != null) {
            AM.updateDepartment({
              _id: req.body["_id"],
              deptName: req.body['deptName'],
              deptID: req.body['deptID']

            }, function(e) {
              if (e) {
                console.log("department add fail" + e);
                res.status(400).send({
                  "error": e
                });
              } else {
                console.log("New Department Added");
                res.status(200).send({
                  "code": "200",
                  "msg": "Department Updated" + JSON.stringify(req.body)
                });
              }
            });
          } else {
            AM.addNewDepartment({
              deptName: req.body['deptName'],
              deptID: req.body['deptID']

            }, function(e) {
              if (e) {
                console.log("department add fail" + e);
                res.status(400).send({
                  "error": e
                });
              } else {
                console.log("New Department Added");
                res.status(200).send({
                  "code": "200",
                  "msg": "New Department Added"
                });
              }
            });
          }

        } else {
          console.log("invalid Admin");
          res.status(400).send({
            "error": "invalid admin ID"
          });
        }

      })
    } else {
      console.log("To add Department login through Admin");
      res.status(400).send({
        "error": "To add Department login through Admin"
      });
    }
  });
  app.get('/getDept', function(req, res) {
    console.log("get department service called");
    if (req.session.user.role == "admin") {
      AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
        if (o != null) {
          console.log("admin validation success");
          AM.getDepartment(function(e, o) {
            if (e) {
              console.log("get department fail" + e);
              res.status(400).send({
                "error": e
              });
            } else {
              console.log("get department success");
              console.log("get department success" + o);

              res.status(200).send(o);
            }
          });
        } else {
          console.log("invalid Admin");
          res.status(400).send({
            "error": "invalid admin ID"
          });
        }

      })
    } else {
      console.log("To add Department login through Admin");
      res.status(400).send({
        "error": "To add Department login through Admin"
      });
    }
  });
  app.post('/deleteDept', function(req, res) {
    console.log("delete department service called");
    if (req.session.user.role == "admin") {
      AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
        if (o != null) {
          console.log("admin validation success");
          AM.deleteDepartment(req.body, function(e, o) {
            if (e) {
              console.log("delete department fail" + e);
              res.status(400).send({
                "error": e
              });
            } else {
              console.log("delete department success");
              res.status(200).send({
                "code": "200",
                "msg": "delete Department success"
              });
            }
          });
        } else {
          console.log("invalid Admin");
          res.status(400).send({
            "error": "invalid admin ID"
          });
        }

      })
    } else {
      console.log("To add Department login through Admin");
      res.status(400).send({
        "error": "To add Department login through Admin"
      });
    }
  });
  /*-----------------------------------------------------Department service--------------------------------------------------------*/

  /*-----------------------------------------------------Diagnosis service--------------------------------------------------------*/
  app.post('/addDiag', function(req, res) {
    console.log("add Diagnosis service called");
    if (req.session.user.role == "admin") {
      AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
        if (o != null) {
          console.log("admin validation success");
          if (req.body["_id"] != null) {
        	  console.log("update Diagnosis "+req.body["_id"]);
            AM.updateDiagnosis({
             _id: req.body["_id"],
             diagName: req.body['diagName'],
              patientRate: req.body['patientRate'],
              insDocLimited: req.body['insDocLimited'],
              setLimit: req.body['setLimit'],
              insDoctor: req.body['insDoctor'],
              insStaf: req.body['insStaf']

            }, function(e) {
              if (e) {
                console.log("Diagnosis add fail" + e);
                res.status(400).send({
                  "error": e
                });
              } else {
                console.log("New Diagnosis Added");
                res.status(200).send({
                  "code": "200",
                  "msg": "Diagnosis Updated"
                });
              }
            });
          } else {
            AM.addNewDiagnosis({
              diagName: req.body['diagName'],
              deptID: req.body['deptID'],
              patientRate: req.body['patientRate'],
              insDocLimited: req.body['insDocLimited'],
              setLimit: req.body['setLimit'],
              insDoctor: req.body['insDoctor'],
              insStaf: req.body['insStaf']

            }, function(e, o) {
              if (e) {
                console.log("Diagnosis add fail" + e);
                res.status(400).send({
                  "error": e
                });
              } else {
                console.log("New Diagnosis Added");
                console.log(o);
                res.status(200).send({
                  "code": "200",
                  "msg": "New Diagnosis Added"
                });
              }
            });
          }

        } else {
          console.log("invalid Admin");
          res.status(400).send({
            "error": "invalid admin ID"
          });
        }

      })
    } else {
      console.log("To add Diagnosis login through Admin");
      res.status(400).send({
        "error": "To add Diagnosis login through Admin"
      });
    }
  });
  app.post('/getDiag', function(req, res) {
    console.log("get Diagnosis service called");
    if (req.session.user.role == "admin") {
      AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
        if (o != null) {
          console.log("admin validation success");
          console.log("req DB query object  " + req.body);
          AM.getDiagnosis(req.body, function(e, o) {
            if (e) {
              console.log("get Diagnosis fail" + e);
              res.status(400).send({
                "error": e
              });
            } else {
              console.log("get Diagnosis success");
              console.log("get Diagnosis success" + o);

              res.status(200).send(o);
            }
          });
        } else {
          console.log("invalid Admin");
          res.status(400).send({
            "error": "invalid admin ID"
          });
        }

      })
    } else {
      console.log("To get Diagnosis login through Admin");
      res.status(400).send({
        "error": "To get Diagnosis login through Admin"
      });
    }
  });
  app.post('/deleteDiag', function(req, res) {
    console.log("delete Diagnosis service called");
    if (req.session.user.role == "admin") {
      AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
        if (o != null) {
          console.log("admin validation success"+JSON.stringify(req.body));
          AM.deleteDiagnosis(req.body, function(e, o) {
            if (e) {
              console.log("delete Diagnosis fail" + e);
              res.status(400).send({
                "error": e
              });
            } else {
              console.log("delete Diagnosis success");
              res.status(200).send({
                "code": "200",
                "msg": "delete Diagnosis success"
              });
            }
          });
        } else {
          console.log("invalid Admin");
          res.status(400).send({
            "error": "invalid admin ID"
          });
        }

      })
    } else {
      console.log("To delete Diagnosis login through Admin");
      res.status(400).send({
        "error": "To delete Diagnosis login through Admin"
      });
    }
  });
  /*-----------------------------------------------------Diagnosis service--------------------------------------------------------*/
  /*-----------------------------------------------------Doctor service--------------------------------------------------------*/
  
  app.post('/addDoc', function(req, res) {
	    console.log("add Doctor service called");
	    if (req.session.user.role == "admin") {
	      AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
	        if (o != null) {
	          console.log("add Doctor admin validation success");
	          if (req.body["_id"] != null) {
	        	  console.log("update Doctor "+req.body["_id"]);
	            AM.updateDoctor(req.body, function(e) {
	              if (e) {
	                console.log("Doctor update fail" + e);
	                res.status(400).send({
	                  "error": e
	                });
	              } else {
	                console.log("New Doctor Updated");
	                res.status(200).send({
	                  "code": "200",
	                  "msg": "Doctor Updated"
	                });
	              }
	            });
	          } else {
	            AM.addNewDoctor({
	            	 docName: req.body['docName'],
		              docMob: req.body['docMob'],
		              docAddress: req.body['docAddress'],
		              docDigree: req.body['docDigree']

	            }, function(e, o) {
	              if (e) {
	                console.log("Doctor add fail" + e);
	                res.status(400).send({
	                  "error": e
	                });
	              } else {
	                console.log("New Doctor Added");
	                console.log(o);
	                res.status(200).send({
	                  "code": "200",
	                  "msg": "New Doctor Added"
	                });
	              }
	            });
	          }

	        } else {
	          console.log("invalid Admin");
	          res.status(400).send({
	            "error": "invalid admin ID"
	          });
	        }

	      })
	    } else {
	      console.log("To add Doctor login through Admin");
	      res.status(400).send({
	        "error": "To add Doctor login through Admin"
	      });
	    }
	  });
	  app.post('/getDoc', function(req, res) {
	    console.log("get Doctor service called"+JSON.stringify(req.session.user));
	    if (req.session.user.role == "admin") {
	      AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
	        if (o != null) {
	          console.log("admin validation success");
	          console.log("req DB query object  " + req.body);
	          AM.getDoctor(req.body, function(e, o) {
	            if (e) {
	              console.log("get Doctor fail" + e);
	              res.status(400).send({
	                "error": e
	              });
	            } else {
	              console.log("get Doctor success");
	              console.log("get Doctor success" + o);

	              res.status(200).send(o);
	            }
	          });
	        } else {
	          console.log("invalid Admin");
	          res.status(400).send({
	            "error": "invalid admin ID"
	          });
	        }

	      })
	    } else if(req.session.user.userRole == "counter"){
	    	 AM.autoLoginUser(req.session.user.userName, req.session.user.userPass, function(o) {
			        if (o != null) {
			          console.log("counter validation success");
			          console.log("req DB query object  " + req.body);
			          AM.getDoctor(req.body, function(e, o) {
			            if (e) {
			              console.log("get Doctor fail" + e);
			              res.status(400).send({
			                "error": e
			              });
			            } else {
			              console.log("get Doctor success");
			              console.log("get Doctor success" + o);

			              res.status(200).send(o);
			            }
			          });
			        } else {
			          console.log("invalid Counter");
			          res.status(400).send({
			            "error": "invalid User ID"
			          });
			        }

			      })
			    }else {
	      console.log("To get Doctor login through Admin");
	      res.status(400).send({
	        "error": "To get Doctor login through Admin"
	      });
	    }
	  });
	  app.post('/deleteDoc', function(req, res) {
	    console.log("delete Doctor service called");
	    if (req.session.user.role == "admin") {
	      AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
	        if (o != null) {
	          console.log("admin validation success"+JSON.stringify(req.body));
	          AM.deleteDoctor(req.body, function(e, o) {
	            if (e) {
	              console.log("delete Doctor fail" + e);
	              res.status(400).send({
	                "error": e
	              });
	            } else {
	              console.log("delete Doctor success");
	              res.status(200).send({
	                "code": "200",
	                "msg": "delete Doctor success"
	              });
	            }
	          });
	        } else {
	          console.log("invalid Admin");
	          res.status(400).send({
	            "error": "invalid admin ID"
	          });
	        }

	      })
	    } else {
	      console.log("To delete Doctor login through Admin");
	      res.status(400).send({
	        "error": "To delete Doctor login through Admin"
	      });
	    }
	  });
  /*-----------------------------------------------------Doctor service--------------------------------------------------------*/
	  /*-----------------------------------------------------USER service--------------------------------------------------------*/
	  app.post('/addUser', function(req, res) {
	      console.log("add User service called");
	      if (req.session.user.role == "admin") {
	        AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
	          if (o != null) {
	            console.log("add User admin validation success");
	              AM.addNewUser(req.body, function(e, o) {
	                if (e) {
	                  console.log("User add fail" + e);
	                  res.status(400).send({
	                    "error": e
	                  });
	                } else {
	                  console.log("New User Added");
	                  console.log(o);
	                  res.status(200).send({
	                    "code": "200",
	                    "msg": "New User Added"
	                  });
	                }
	              });
	          } else {
	            console.log("invalid Admin");
	            res.status(400).send({
	              "error": "invalid admin ID"
	            });
	          }

	        })
	      } else {
	        console.log("To add User login through Admin");
	        res.status(400).send({
	          "error": "To add User login through Admin"
	        });
	      }
	    });
	    app.post('/getUser', function(req, res) {
	      console.log("get User service called");
	      if (req.session.user.role == "admin") {
	        AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
	          if (o != null) {
	            console.log("admin validation success");
	            console.log("req DB query object  " + req.body);
	            AM.getUser(req.body, function(e, o) {
	              if (e) {
	                console.log("get User fail" + e);
	                res.status(400).send({
	                  "error": e
	                });
	              } else {
	                console.log("get User success");
	                console.log("get User success" + o);

	                res.status(200).send(o);
	              }
	            });
	          } else {
	            console.log("invalid Admin");
	            res.status(400).send({
	              "error": "invalid admin ID"
	            });
	          }

	        })
	      } else {
	        console.log("To get User login through Admin");
	        res.status(400).send({
	          "error": "To get User login through Admin"
	        });
	      }
	    });
	    app.post('/deleteUser', function(req, res) {
	      console.log("delete User service called");
	      if (req.session.user.role == "admin") {
	        AM.autoLoginAdmin(req.session.user.user, req.session.user.pass, function(o) {
	          if (o != null) {
	            console.log("admin validation success"+JSON.stringify(req.body));
	            AM.deleteUser(req.body, function(e, o) {
	              if (e) {
	                console.log("delete User fail" + e);
	                res.status(400).send({
	                  "error": e
	                });
	              } else {
	                console.log("delete User success");
	                res.status(200).send({
	                  "code": "200",
	                  "msg": "delete User success"
	                });
	              }
	            });
	          } else {
	            console.log("invalid Admin");
	            res.status(400).send({
	              "error": "invalid admin ID"
	            });
	          }

	        })
	      } else {
	        console.log("To delete User login through Admin");
	        res.status(400).send({
	          "error": "To delete User login through Admin"
	        });
	      }
	    });
	  /*-----------------------------------------------------USER service--------------------------------------------------------*/
	    /*-----------------------------------------------------LogOut service--------------------------------------------------------*/
		app.post('/logout', function(req, res){
			//res.clearCookie('user');
			//res.clearCookie('pass');
			req.session.destroy(function(e){ res.status(200).send('ok'); });
		})
		/*-----------------------------------------------------LogOut service--------------------------------------------------------*/
};