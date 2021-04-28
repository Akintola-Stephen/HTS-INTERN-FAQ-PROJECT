
    $(document).ready(function () {
        $('.table-responsive').hide();
        $('#customer-logs').click(function () {
          $('.table-responsive').show('slow');
          $('.wonder').hide();
          $('#add-user-form').hide();
          $("#user-log-table").hide();
          $('#customers-logs-form').hide();
        });
      });
  
  
      $(document).ready(function () {
        $('#add-user-form').hide();
        $('#add-user').click(function () {
          $('#add-user-form').show('slow');
          $('#log-table').hide();
          $("#user-log-table").hide();
          $('#customers-logs-form').hide();
        });
      });
  
  
      $(document).ready(function () {
        $('.d-flex').hide();
        $('#dash').click(function () {
          $('.d-flex').show('slow');
          $('.table-responsive').hide();
          $('#add-user-form').hide();
        });
      });
  
  
      $(document).ready(function () {
        $('#customers-logs-form').hide();
        $('#customers-logs').click(function () {
          $('#customers-logs-form').hide();
          $('.table-responsive').hide();
          $('#add-user-form').hide();
          $('#customers-logs-form').show('slow');
        });
      });
  
  
      $(document).ready(function () {
        $('#success-message').hide();
        $('#assign-user-btn').click(function () {
          $('#success-message').fadeIn('slow');
          setTimeout(function () {
            $('#success-message').fadeOut("slow");
          }, 1000);
          $('.table-responsive').hide();
        });
      });
  
      // Filtering name on-key press real time
      $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#log-table tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
  