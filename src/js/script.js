$(function() {
	$('.access__btn').on('click', validate);
		function validateEmail(email) {
	  let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	  return re.test(String(email).toLowerCase());
	}  
	function validate() {
	  let email = $('.access__input').val();
	  let $error = $('.access__input-error');
	  let input = $('.access__input-email');
	  $error.text("");
  
	  if (validateEmail(email)) {
		$error.fadeOut();
		$(window).ready(function () {
			if ($(window).width() < 601) {
				input.css('margin-bottom', '13px');
			}
		})
	  } else {
		$error.fadeIn();
		$error.text('Please enter a valid email address');
		
		$(window).ready(function () {
			if ($(window).width() < 601) {
				input.css('margin-bottom', '25px');
			}
		})
		
	  }
	  return false;
	}  
  });
  
  
