document.addEventListener('DOMContentLoaded', function() {
  var pwdInput   = document.getElementById('pwd');
  var toggle     = document.getElementById('toggle');
  var meterFill  = document.getElementById('meterFill');
  var ratingText = document.getElementById('rating');
  var feedbackEl = document.getElementById('feedback');

  toggle.addEventListener('click', function() {
    var type = pwdInput.type === 'password' ? 'text' : 'password';
    pwdInput.type = type;
    toggle.textContent = type === 'password' ? 'Show' : 'Hide';
  });

  pwdInput.addEventListener('input', function() {
    var result = evaluatePassword(pwdInput.value);
    updateUI(result);
  });

  function evaluatePassword(pwd) {
    if (!pwd) {
      return { score: 0, rating: '', feedback: [] };
    }
    var score = 0;
    var feedback = [];

    // 1) At least 4 letters
    var letterCount = (pwd.match(/[A-Za-z]/g) || []).length;
    if (letterCount >= 4) {
      score++;
    } else {
      feedback.push('Use at least 4 letters.');
    }

    // 2) Lowercase
    if (/[a-z]/.test(pwd)) {
      score++;
    } else {
      feedback.push('Add lowercase letters.');
    }

    // 3) Uppercase
    if (/[A-Z]/.test(pwd)) {
      score++;
    } else {
      feedback.push('Add uppercase letters.');
    }

    // 4) Digit
    if (/\d/.test(pwd)) {
      score++;
    } else {
      feedback.push('Include at least one digit.');
    }

    // 5) Special character
    if (/[^A-Za-z0-9]/.test(pwd)) {
      score++;
    } else {
      feedback.push('Include at least one special character.');
    }

    // Map score to rating
    var rating;
    switch (score) {
      case 0:
      case 1:
        rating = 'Very Weak';
        break;
      case 2:
        rating = 'Weak';
        break;
      case 3:
        rating = 'Medium';
        break;
      case 4:
        rating = 'Strong';
        break;
      case 5:
        rating = 'Very Strong';
        break;
      default:
        rating = '';
    }

    return { score: score, rating: rating, feedback: feedback };
  }

  function updateUI(result) {
    var score = result.score;
    var rating = result.rating;
    var feedback = result.feedback;

    var pct = (score / 5) * 100;
    meterFill.style.width = pct + '%';

    meterFill.classList.remove('very-weak','weak','medium','strong','very-strong');
    if (rating === 'Very Weak')   meterFill.classList.add('very-weak');
    if (rating === 'Weak')        meterFill.classList.add('weak');
    if (rating === 'Medium')      meterFill.classList.add('medium');
    if (rating === 'Strong')      meterFill.classList.add('strong');
    if (rating === 'Very Strong') meterFill.classList.add('very-strong');

    ratingText.textContent = rating ? 'Strength: ' + rating : '';

    feedbackEl.innerHTML = '';
    feedback.forEach(function(msg) {
      var li = document.createElement('li');
      li.textContent = msg;
      feedbackEl.appendChild(li);
    });
  }
});
