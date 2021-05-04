var loginUsers = [];
var hub = $.connection.loginHub;

// $("#log-form-btn").off("click").on("click", function(event){
//     console.log('I was clicked')
// });

hub.client.broadcastrecords = function (data) {
    var dData = JSON.parse(data)
    if (dData.ACTION_TYPE == 'SELECT') {
      pageload.generateTable(dData.RESULT);
    }
    else if (dData.ACTION_TYPE == 'INSERT' || dData.ACTION_TYPE == 'DELETE') {
      pageload.fetchData();
    }
  
  }


var pageload = function () {
    return {
        init: function () {
            pageload.pageEvents();
        },

        addUser: function (event) {
            event.preventDefault();
            console.warn(hub);

            // SignalR code that allows communication between VB and JS code together 
            $.connection.hub.start().done(function () {
                console.log('connected')

                let username = $("#user").val();
                let password = $("#pass").val();

                var myobj = [{ USERNAME: username, PASSWORD: password }]
                loginUsers.push(myobj)
                pageload.clearForm(event.target)

                hub.server.login(username, password)
                    .done(function (data) {
                        console.log(data);
                    });

            });
        },

        pageEvents: function(){        
            $(".deleteBtn").off("click").on("click", function(event){
              event.preventDefault()
              var product_id = $(this).data("id");
              $.connection.hub.start().done(function () {
                console.log('connected !!!')
                var myobj = [{PRODUCT_ID :product_id }]
                var JSON_STRING = JSON.stringify(myobj);
                chat.server.interns_Insert(JSON_STRING, 'DELETE');
               
              });
            });
            
  
            $("#log-form-btn").off("click").on("click", function(event){
              console.log('I was clicked')
              event.preventDefault();
              pageload.addUser(event);
            });
  
          },

        getDataFromFormData: function () {
            var obj = {};
            $("#log-form-id input").filter(function (i, o) {
                obj[$(o).attr("name")] = $(o)[0].value;
            });
            console.log(obj)
            return obj;
        },

        fetchData: function () {
            $.connection.hub.start().done(function () {
                // console.log('connected !!!')
                hub.server.interns_Insert("", 'SELECT');
            });
        },

        clearForm: function (form) {
            $("input").val("");
        }
    }

}();

pageload.init();
