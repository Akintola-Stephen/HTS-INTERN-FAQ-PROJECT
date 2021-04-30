var loginUsers = [];
var chat = $.connection.LoginChatHub;

chat.client.broadcastrecords = function (data) {
    var dData = JSON.parse(data)
    pageload.generateTable(dData.RESULT);
}


var pageload = function () {
    return {
        init: function () {
            pageload.pageEvents();

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
                chat.server.interns_Insert("", 'SELECT');
            });
        },

        clearForm: function (form) {
            $("input").val("");
        }
    }

}();
