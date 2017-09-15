function initCheckbox () {
  $('#talented-checkbox').change(function () {
    var $this = $(this);
    if (!$this.is('checked')) {
      setTimeout(function () {
        $this.prop('checked', true);
      }, 500);
    }
  });
}

function showValidationError () {
  $('#validation_error').show();
}

function hideValidationError () {
  $('#validation_error').hide();
}

function showSuccessMessage () {
  $('#success_message').show();
}

function initForm () {
  $('#submit').click(function () {
    hideValidationError();

    if (window.ga) {
      ga('send', 'event', 'Submit', 'Click');
    }

    var data = {
      name: $('#name').val().trim(),
      email: $('#email').val().trim(),
      phone: $('#phone').val().trim()
    };

    if (!((data.name && data.email) || (data.name && data.phone))) {
      showValidationError();
      return;
    }

    $.ajax({
      url: '/email',
      method: 'POST',
      data: data
    }).done(function () {
      showSuccessMessage();
    }).fail(handleError);
  });
}

function handleError (error) {
  if (error.status === 406) {
    showValidationError();
  }
  console.error(error);
}

$(function () {
  initCheckbox();
  initForm();
});