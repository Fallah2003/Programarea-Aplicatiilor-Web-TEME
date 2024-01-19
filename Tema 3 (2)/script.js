document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submitBtn");
    const resultDiv = document.getElementById("result");
  
    submitButton.addEventListener("click", evaluateAnswers);
  
    function evaluateAnswers() {
      const questions = document.querySelectorAll(".question");
      let score = 0;
  
      questions.forEach(question => {
        const selectedAnswer = question.querySelector("input:checked");
  
        if (selectedAnswer) {
          const correctAnswer = question.querySelector("input[value='Paris']"); // Setează răspunsul corect pentru fiecare întrebare
          if (selectedAnswer === correctAnswer) {
            score++;
          }
        }
      });
  
      displayResult(score);
    }
  
    function displayResult(score) {
      resultDiv.textContent = `Scorul tău este: ${score} / 3`;
    }
  });
  