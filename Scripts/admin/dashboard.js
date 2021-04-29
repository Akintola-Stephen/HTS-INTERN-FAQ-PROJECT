var databaseRegisteredUsers = [];
var table = $("#requestTable");
var chat = $.connection.chatHub;

chat.client.broadcastrecords = function (data) {
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
      pageload.fetchData();
    },

    addUser: function (event) {
      event.preventDefault();
      console.warn(chat);

      // SignalR code that allows communication between VB and JS code together 
      $.connection.hub.start().done(function () {
        console.log('connected !!!')
        var myobj = pageload.getDataFromFormData();
        databaseRegisteredUsers.push(myobj);
        pageload.clearForm(event.target);

        var JSON_STRING = JSON.stringify(databaseRegisteredUsers);
        chat.server.interns_Insert(JSON_STRING, 'INSERT')
          .done(function (data) {
            console.log(data);
          });

      });
    },

    compileAndInertHtml: function (template, data, outputelement) {
      const templateStr = document.getElementById(template).innerHTML
      const compilled = Handlebars.compile(templateStr)(data)
      document.getElementById(outputelement).innerHTML = compilled

      Handlebars.registerHelper('formatDate', function (date) {
        return new Date(date).toDateString();
      })

    },


    generateTable: function (myDataa) {
      pageload.compileAndInertHtml('table', { request: myDataa, users: [{ id: "1", username: "Stephen" }, { id: "2", username: "Akinola" }] }, 'request-area');
      pageload.pageEvents();
    },

    pageEvents: function () {
      $(".deleteBtn").off("click").on("click", function (event) {
        event.preventDefault()
        var product_id = $(this).data("id");
        $.connection.hub.start().done(function () {
          console.log('connected !!!')
          var myobj = [{ PRODUCT_ID: product_id }]
          var JSON_STRING = JSON.stringify(myobj);
          chat.server.interns_Insert(JSON_STRING, 'DELETE');

        });
      });

      $("#update-btn").off("click").on("click", function (event) {
        event.preventDefault()
        var user_id = $(this).data("id");
        console.log(user_id)
        $.connection.hub.start().done(function () {
          // console.log(' update function activated connected !!!')
          var myobj = [{ USERID: user_id }]

          var JSON_STRING = JSON.stringify(myobj);
          chat.server.interns_Update(JSON_STRING, 'UPDATE');

        });
      });


      $("#assign-user-btn").off("click").on("click", function (event) {
        event.preventDefault();
        pageload.addUser(event);
        $('#success-message').fadeIn('slow');
        setTimeout(function () {
          $('#success-message').fadeOut("slow");
        }, 1000);
      });

    },

    getDataForUpdate: function () {
      var updateObj = {};
      $("#log-table select, #log-table name").filter(function (i, o) {
        updateObj[$(o).attr("name")] = $(o)[0].value;
      });
      console.log(updateObj)
      return updateObj;

    },

    getDataFromFormData: function () {
      var obj = {};
      $("#add-user-form input, #add-user-form select").filter(function (i, o) {
        obj[$(o).attr("name")] = $(o)[0].value;
      });
      console.log(obj)
      return obj;

    },

    fetchData: function () {
      $.connection.hub.start().done(function () {
        // console.log('connected !!!')
        chat.server.interns_Insert("", 'SELECT');
      });
    },

    clearForm: function (form) {
      $("input, #selected").val("");
    }
  }

}();


pageload.init();
