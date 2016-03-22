$(document).ready(function () {

    $(function () {
        /*date Validation*/
        jQuery.validator.addMethod("valdate", function (value, element) {
            return this.optional(element) || /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value);
        }, "Please enter valid date");
    });

    /*connect with firebase*/
    var regform = new Firebase('https://swachevent2016.firebaseio.com/Individual');
    var refBprice = new Firebase('https://swachevent2016.firebaseio.com/Price/0/Price25Below');
    var refAprice = new Firebase('https://swachevent2016.firebaseio.com/Price/1/Price25Above');
    var Servertime = Firebase.ServerValue.TIMESTAMP;

    // Attach an asynchronous callback to read the data at our posts reference
    $("#form1").validate({
        rules: {
            /*distance: {
                required: true
            },*/
            Fname: {
                required: true,
                lettersonly: true
            },

            Lname: {
                required: true,
                lettersonly: true
            },
            email: {
                required: true,
                email: true
            },

            contactNo: {
                required: true,
                phoneUS: true
                    //max:10,
            },

            address: {
                required: true

            },
            /*streetName: {
                required: true

            },
            streetNo: {
                required: true,
                digits: true

            },*/

            city: {
                required: true

            },
            state: {
                required: true
            },
            pincode: {
                required: true,
                digits: true,
                maxlength: 6,
                minlength: 6

            },
            shirt: {
                required: true,
            },
            dob: {
                required: true,
                valdate: true,
            }
        },
        messages: {

            Fname: "Please Enter Your First Name",
            Lname: "Please Enter Your Last Name",
            email: "Please Enter Your Valid Email Address",
            contactNo: "Please Enter Your Valid Contact Number",
            address: "Please Enter Your Address",
            streetName: "Please Enter Your Street Name",
            streetNo: "Please Enter Your Street Number",
            city: "Please Enter Your City",
            state: "Please Enter Your state",
            pincode: "Please Enter Your Pin Code",
            shirt: "Please select your T-Shirt-Size",
            dob: "Please Select Date in (dd/mm/yyyy)"
        }
    });

    //validate user information on button click
    $('#btn').click(function () {
        
        $("#form1").valid();
        if ($("#form1").valid() === true) {
            savePlayer(); //save user information
        }
    });

    function savePlayer() {
        var form = document.getElementById("form1");
        var grouptype = document.querySelector('input[name = "distance"]:checked').value;
        var GhacType;
        //GHAC logic
        if($("#ghac").prop('checked')== true)
        {
             document.getElementById("ghac").value="ghac";
             GhacType= document.getElementById("ghac").value;
             sessionStorage.setItem("ghacRegistration",GhacType);
             
                
        }else
            {
                document.getElementById("ghac").value="notghac";
                GhacType= document.getElementById("ghac").value;
                sessionStorage.setItem("ghacRegistration",GhacType);
                
                                
            }
        
        
        
        

        var FirstName = form.Fname.value;
        var LastName = form.Lname.value;
        var address = form.address.value;
        var Date_of_birth = form.dob.value;
        var Email_Id = form.email.value;
        var Contact_No = form.contactNo.value;
        /*var StreetName = form.streetName.value;
        var StreetNo = form.streetNo.value;*/
        var City = form.city.value;
        var State = form.state.value;
        var pincode = form.pincode.value;
        var Address = "Address:" + address + "," + "City:" + City + "," + "State:" + State + "," + "pincode:" + pincode;
        var T_shirt_size = form.shirt.value;
        var BloodGroup = form.blood.value;
        
        var regid = "swachhEvent_" + ("0000" + (Math.random() * Math.pow(36, 4) << 0)).slice(-4);
        var from = Date_of_birth.split("/");
        
        var birthDate = new Date(from[1] + '/' + from[0] + '/' + from[2]);
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear(); //Calculate Age
        sessionStorage.setItem("age",age);
        sessionStorage.setItem("key",grouptype);
        sessionStorage.setItem("regid",regid);
        
        //GHAC entry
         if (GhacType === "ghac") {
                   
             
                    refAprice.on("value", function (snapshot) {
                        snapshot.forEach(function (data) {
                    if (data.key() == grouptype) {
                        
                        
                        var pr = data.val();
                        
                        
                        var registrationFee=data.val();
                        sessionStorage.setItem("RegistrationFee",registrationFee);
                        var samplePrice=parseInt(pr);
                        document.cookie = "amt="+samplePrice;
                        pr= (samplePrice+Math.round(((2.5/100) *samplePrice)));
                        //alert(pr);
                        
                        sessionStorage.setItem("price", pr);
                        
                        regform.push({
                            Participant: {
                                "Registration_Id": regid,
                                "distance": grouptype,
                                "price": pr,
                                "FName": FirstName,
                                "LName": LastName,
                                "Date_of_birth": Date_of_birth,
                                "Email_id": Email_Id,
                                "Contact_no": Contact_No,
                                "T_shirt_size": T_shirt_size,
                                "Address": Address,
                                "Date_of_birth": Date_of_birth,
                                "T_shirt_size": T_shirt_size,
                                "Bloodgroup": BloodGroup,
                                "dateTime": Servertime,
                                "gha_club":"yes"
                            }
                        });
                        $("#form1")[0].reset();
                      document.location.href = 'payment.php';
                    }
                });
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
        else if (age < 25) {
            refBprice.on("value", function (snapshot) {
                amt = snapshot.val();
                snapshot.forEach(function (data) {
                    
            if (data.key() == grouptype) {
                        
                        var pr = data.val();
                
                        var registrationFee=data.val();
                        sessionStorage.setItem("RegistrationFee",registrationFee);
                        var samplePrice=parseInt(pr);
                         document.cookie = "amt="+samplePrice;
                        pr= (samplePrice+Math.round(((2.5/100) *samplePrice)));
                        //alert(pr);
                
                        sessionStorage.setItem("price", pr);
                
                        regform.push({
                            Participant: {
                                "Registration_Id": regid,
                                "distance": grouptype,
                                "price": pr,
                                "FName": FirstName,
                                "LName": LastName,
                                "Date_of_birth": Date_of_birth,
                                "Email_id": Email_Id,
                                "Contact_no": Contact_No,
                                "T_shirt_size": T_shirt_size,
                                "Address": Address,
                                "Date_of_birth": Date_of_birth,
                                "T_shirt_size": T_shirt_size,
                                "Bloodgroup": BloodGroup,
                                "dateTime": Servertime,
                                "gha_club":"No"
                            }
                        });
                        $("#form1")[0].reset();
                        document.location.href = 'payment.php';
                    }
                });
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        } else if (age >= 25) {
            refAprice.on("value", function (snapshot) {
                snapshot.forEach(function (data) {
       if (data.key() == grouptype) {
                       
                        var pr = data.val();
           
                        var registrationFee=data.val();
                        sessionStorage.setItem("RegistrationFee",registrationFee);
                        var samplePrice=parseInt(pr);
                         document.cookie = "amt="+samplePrice;
                        pr= (samplePrice+Math.round(((2.5/100) *samplePrice)));
                        //alert(pr);
           
                        sessionStorage.setItem("price", pr);
           
                        regform.push({
                            Participant: {
                                "Registration_Id": regid,
                                "distance": grouptype,
                                "price": pr,
                                "FName": FirstName,
                                "LName": LastName,
                                "Date_of_birth": Date_of_birth,
                                "Email_id": Email_Id,
                                "Contact_no": Contact_No,
                                "T_shirt_size": T_shirt_size,
                                "Address": Address,
                                "Date_of_birth": Date_of_birth,
                                "T_shirt_size": T_shirt_size,
                                "Bloodgroup": BloodGroup,
                                "dateTime": Servertime,
                                "gha_club":"No"
                            }
                        });
                        $("#form1")[0].reset();
                      document.location.href = 'payment.php';
                    }
                });
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }

        
    }
});