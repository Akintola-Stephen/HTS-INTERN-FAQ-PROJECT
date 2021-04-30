var loginUsers = [];
var hub = $.connection.LoginHub;


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
