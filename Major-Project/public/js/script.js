(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false
    );
  });
})();

document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('rating');

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      const value = parseInt(star.getAttribute('data-value'));
      ratingInput.value = value;
      stars.forEach((s) => {
        if (parseInt(s.getAttribute('data-value')) <= value) {
          s.classList.add('selected');
        } else {
          s.classList.remove('selected');
        }
      });
    });
  });
});

setTimeout(function () {
  var successAlert = document.getElementById('successAlert');
  if (successAlert) {
    successAlert.style.opacity = '0';
    setTimeout(function () {
      successAlert.remove();
      document.body.style.transition = 'margin-top 0.5s';
      document.body.style.marginTop = '0';
    }, 500);
  }

  var errorAlert = document.getElementById('errorAlert');
  if (errorAlert) {
    errorAlert.style.opacity = '0';
    setTimeout(function () {
      errorAlert.remove();
      document.body.style.transition = 'margin-top 0.5s';
      document.body.style.marginTop = '0';
    }, 500);
  }
}, 2500);

function dismissAlert() {
  var alert = document.querySelector('.alert-dismissible.show');
  if (alert) {
    alert.style.opacity = '0';
    setTimeout(function () {
      alert.remove();
      document.body.style.transition = 'margin-top 0.5s';
      document.body.style.marginTop = '0';
    }, 500);
  }
}
