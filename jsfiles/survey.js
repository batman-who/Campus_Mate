
    // 1. Q1 Conditional 'Specify' Input
    const q1Radios = document.querySelectorAll('input[name="q1"]');
    const specifyBox = document.getElementById('q1SpecifyBox');

    q1Radios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.id === 'q1OtherRadio' && radio.checked) {
          specifyBox.style.display = 'block';
          specifyBox.focus();
        } else {
          specifyBox.style.display = 'none';
        }
      });
    });

    // 2. Interactive 5-Star Rating Logic
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('ratingValue');
    const ratingLabel = document.getElementById('ratingText');

    const starDescriptions = {
      1: "1 Star - Needs a lot of work 😕",
      2: "2 Stars - Could be better 😐",
      3: "3 Stars - Good, but basic 🙂",
      4: "4 Stars - Really liked it! 😊",
      5: "5 Stars - Absolutely loved it! 🌟"
    };

    stars.forEach(star => {
      // Hover Effect
      star.addEventListener('mouseenter', () => {
        const val = parseInt(star.dataset.value);
        highlightStars(val);
        ratingLabel.innerText = starDescriptions[val];
      });

      // Click / Select
      star.addEventListener('click', () => {
        const val = parseInt(star.dataset.value);
        ratingInput.value = val;
        setActiveStars(val);
      });
    });

    document.getElementById('starGroup').addEventListener('mouseleave', () => {
      const selected = parseInt(ratingInput.value) || 0;
      if (selected > 0) {
        setActiveStars(selected);
        ratingLabel.innerText = starDescriptions[selected];
      } else {
        stars.forEach(s => s.classList.remove('active', 'hovered'));
        ratingLabel.innerText = "Tap a star to rate";
      }
    });

    function highlightStars(count) {
      stars.forEach((s, idx) => {
        s.classList.toggle('hovered', idx < count);
      });
    }

    function setActiveStars(count) {
      stars.forEach((s, idx) => {
        s.classList.remove('hovered');
        s.classList.toggle('active', idx < count);
      });
    }

    // 3. Form Submission Handling
    const form = document.getElementById('campusMateSurvey');
    const successScreen = document.getElementById('surveySuccessState');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check if star rating was selected
      if (!ratingInput.value) {
        alert('Please give a star rating in Question 3 before submitting ⭐');
        return;
      }

      // Collect data into an object
      const formData = new FormData(form);
      const surveyResult = Object.fromEntries(formData.entries());

      // Save to localStorage (allows you to view submitted feedback)
      const pastSurveys = JSON.parse(localStorage.getItem('campusmate_surveys') || '[]');
      pastSurveys.push({ ...surveyResult, submittedAt: new Date().toISOString() });
      localStorage.setItem('campusmate_surveys', JSON.stringify(pastSurveys));

      // Show Thank You Screen
      form.style.display = 'none';
      successScreen.style.display = 'block';
    });
 