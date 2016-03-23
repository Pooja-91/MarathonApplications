if(!(sessionStorage.getItem("stage")== "step1"))
    {
        document.location.href = '../index.html';
    } 

var refCustTrans = new Firebase('https://swachevent2016.firebaseio.com/Customer_transaction');

var refEmaillog = new Firebase('https://swachevent2016.firebaseio.com/Email_log');


//form Validation
    $(document).ready(function () {
        
               

                    jQuery.validator.addMethod("lettersonly", function (value, element) {
                        return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
                    }, "Please enter only letters");
                    
                    //Payment price details
                    var price=sessionStorage.getItem("price");
 var refBprice = new Firebase('https://swachevent2016.firebaseio.com/Price/0/Price25Below');
var refAprice = new Firebase('https://swachevent2016.firebaseio.com/Price/1/Price25Above');                   
 

                    var Distkey=sessionStorage.getItem("key");
                    var ghacRegistration=sessionStorage.getItem("ghacRegistration");
        if(ghacRegistration =="ghac")
            {
                refAprice.on("value", function(snapshot) {
                snapshot.forEach(function(data) {
                    if(data.key() == Distkey)
                        {
                          var price=data.val();
                
                        var samplePrice=parseInt(price);
                        price= (samplePrice+Math.round(((2.5/100) *samplePrice)));
                        
                document.getElementById("price").value=price;
                        }
              });
                }, function (errorObject) {
                  console.log("The read failed: " + errorObject.code);
                });
                
            }
                    
        else if(sessionStorage.getItem("age") < 25)
         { 
          
             refBprice.on("value", function(snapshot) {
            snapshot.forEach(function(data) {
        if(data.key() == Distkey)
            {
                var price=data.val();
                
                        var samplePrice=parseInt(price);
                        price= (samplePrice+Math.round(((2.5/100) *samplePrice)));
                        //alert(price);
                document.getElementById("price").value=price;
            
            }
              });
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });
         }
         else if(sessionStorage.getItem("age") >= 25 )
             {
                refAprice.on("value", function(snapshot) {
                snapshot.forEach(function(data) {
                    if(data.key() == Distkey)
                        {
                           var price=data.val();
                
                        var samplePrice=parseInt(price);
                        price= (samplePrice+Math.round(((2.5/100) *samplePrice)));
                        
                document.getElementById("price").value=price;
                        }
              });
                }, function (errorObject) {
                  console.log("The read failed: " + errorObject.code);
                });
                            
             }else
             {
                  window.location.href="../index.html";
             }
                    
                    
//validation start..........................................
                    $("#form2").validate({
                        rules: {
                            FirstName: {
                                required: true,
                                lettersonly: true
                            },
                            Email: {
                                required: true,
                                email: true
                            },
                            Phone: {
                                required: true,
                                phoneUS: true
                                    //max:10,
                            },
                            Address: "required"
                                // agree: "required"
                        },
                        messages: {
                            FirstName: "Please Enter Your Name",
                            Email: "Please Enter Your Valid Email Address",
                            Phone: "Please Enter Your Valid Contact Number",
                            Address: "Please Enter Your Valid Address "
                        }
                    });


                    $('#btn').click(function () {

                        if ($("#form2").valid()) {

                          var payForm = document.getElementById("form2");
                            billingInfoSave(payForm);

                            payForm.submit();
                            $("#form")[0].reset();



                        }


                    });


                });



var refCustomer=new Firebase("https://swachevent2016.firebaseio.com/Customer");
var regid=sessionStorage.getItem("regid");
document.cookie="regid="+regid;

 var c = 1;
    var d = new Date(),
        m = d.getMilliseconds() + "",
        u = ++d + m + (++c === 10000 ? (c = 1) : c);
var confirmationID=u;  

 document.cookie="ConfirmationID="+confirmationID;

 //billing data save into db
                function billingInfoSave(form) {

                    //var Role=form.captain.value;

                    var FirstName = form.FirstName.value;
                    var Email_Id = form.Email.value;
                    var Contact_No = form.Phone.value;
                    var Address = form.Address.value;
                    var priced=form.amount.value;
                   


                    refCustomer.push({
                        Customer: {
                            "FullName": FirstName,
                            "Email_id": Email_Id,
                            "Mobile_no": Contact_No,
                            "Address": Address,
                            "Price":priced,
                            "RegistrationID":regid
                        }

                    })
                    


                }

//on payment Success save data into db
function paymentSuccess(productinfo, amount, trans_id,payuid,regID,status) 
{

               var Servertime=Firebase.ServerValue.TIMESTAMP;
                    refCustTrans.push({

                        "Amount": amount,
                        "Customer_trans_id": trans_id,
                        "Event_Name": productinfo,
                        "Status": status,
                        "payuid":payuid,
                        "RegistrationID":regID,
                        "DateTime":Servertime
                    })


}

function emailSend(email,from,message,status,productinfo,send_date,tranID,payuid,amount,registid) 
{


                    refEmaillog.push({

                        "From": from,
                        "To": email,
                        "Message": productinfo,
                        "Subject":message,
                        "Status":status,
                        "Send_date":send_date,
                        "TransactionID":tranID,
                        "PayUID":payuid,
                        "Amount":amount,
                        "RegistrationID":registid

                    })

}