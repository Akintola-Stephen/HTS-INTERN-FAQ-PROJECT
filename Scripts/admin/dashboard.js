var databaseRegisteredUsers = [];
var table = $("#requestTable");
var chat = $.connection.chatHub;

chat.client.broadcastrecords = function(data){
  console.log(data);
  var dData = JSON.parse(data)
  if (dData.ACTION_TYPE == 'SELECT'){
      pageload.generateTable(dData.RESULT);
  }
  else if (dData.ACTION_TYPE == 'INSERT' || dData.ACTION_TYPE == 'DELETE'){
    pageload.fetchData();
  }
 
}


var pageload = function(){
    return {
        init: function(){
         pageload.pageEvents();
         pageload.fetchData();
        },

        addUser: function(event){
          event.preventDefault();         
          console.warn(chat);

          // SignalR code that allows communication between VB and JS code together 
          $.connection.hub.start().done(function () {
            console.log('connected !!!')
            var myobj = pageload.getDataFromFormData();
            console.log(myobj);
            databaseRegisteredUsers.push(myobj);
            
            var JSON_STRING = JSON.stringify(databaseRegisteredUsers);
            chat.server.interns_Insert(JSON_STRING, 'INSERT')
            .done(function(data){
              console.log(data);
            });   
         
            console.log(databaseRegisteredUsers);
            pageload.clearForm(event.target);
    
          });
        },
        
        compileAndInertHtml: function(template, data, outputelement) {
          const templateStr = document.getElementById(template).innerHTML
          const compilled = Handlebars.compile(templateStr)(data)
          document.getElementById(outputelement).innerHTML = compilled
        },

        generateTable: function(myDataa){
          pageload.compileAndInertHtml('table', {request:myDataa}, 'request-area');
          pageload.pageEvents();
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
          

          $("#assign-user-btn").off("click").on("click", function(event){
            event.preventDefault();
            pageload.addUser(event);
          });

        },
        
        getDataFromFormData: function() {
          var obj = {};
          $("#add-user-form input, #add-user-form select").filter(function(i,o){
              obj[$(o).attr("name")] = $(o)[0].value;
          });
          return obj;
         
        },

        fetchData: function(){
          $.connection.hub.start().done(function () {
            console.log('connected !!!')
            chat.server.interns_Insert("", 'SELECT');         
          });
        },

        clearForm: function(form) {
        $("input, textarea").val("");
        $("#qty").val(1);
      }
    }

}();


pageload.init();
