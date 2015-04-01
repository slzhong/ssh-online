(function () {

  // fucntions to load
  $(document).ready(function () {
    initSocket();
    eventHandler();
  });

  // global variables
  var socket;

  // functions
  function initSocket () {
    socket = io(location.host);
  }

  function login () {
    socket.emit('login', {
      host : $('#host').val(),
      password : $('#password').val()
    });
  }

  function eventHandler () {
    $('#submit').click(login);
  }

})();