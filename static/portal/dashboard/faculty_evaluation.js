document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    const courses = [
        { id: 'cs101', name: 'Introduction to Computer Science', faculty: 'Dr. Jane Doe', hasBeenEvaluated: false },
        { id: 'math202', name: 'Calculus II', faculty: 'Prof. John Smith', hasBeenEvaluated: true },
        { id: 'phys101', name: 'General Physics', faculty: 'Dr. Emily White', hasBeenEvaluated: false },
        { id: 'eng301', name: 'Technical Writing', faculty: 'Prof. Michael Brown', hasBeenEvaluated: true },
    ];

    const questions = [
        "Is the presentation/lecture of the instructor of good quality?",
        "The professor was adequately prepared for the class",
        "I have received a course outline at the beginning of the course",
        "Does the instructor come to the class on time?",
        "The professor motivated me regarding the importance and relevance of the course",
        "Course learning outcomes were explained clearly",
        "Does the instructor explain the ideas/topics clearly?",
        "The professor maintained a regular class schedule",
        "Required readings/texts were suggested and provided in due course of time",
        "Does the instructor encourage the ideas/discussion in class?",
        "The professor exhibited an appropriate depth and breadth of knowledge on the course",
        "Consultation hours were specified with date and time",
        "Does the teacher encourage reading reference material?",
        "The professor was able to communicate in the class effectively",
        "The classes were well planned and well prepared",
        "Does the instructor take all the scheduled classes?",
        "The professor made effective use of teaching aids (such as PowerPoint slides, videoclips, whiteboard and so on)",
        "I could learn the importance and relevance of the course",
        "Is the instructor available to students for counseling?",
        "Course learning outcomes were stated properly",
        "Classes maintained a regular schedule",
        "Does the instructor mark the exam. papers fairly?",
        "Required readings/texts were relevant and up-to-date",
        "Lectures exhibited depth and breadth of knowledge on the topics",
        "Does the instructor return the exam. paper on time ? (Within a week)",
        "The contents specified in the syllabus were covered",
        "I could understand lecture and discussions effectively",
        "Does the instructor relate theory to practice?",
        "I am overall satisfied with the course",
        "The classes involved effective use of learning aids (such as PowerPoint slides, videoclips, whiteboard etc.)",
        "Does the instructor give tutorials?",
        "The professor demonstrated respect for students as individuals",
        "All contents of the course outline were covered in the course",
        "Would you recommend this instructor to other students?",
        "The professor encouraged independent learning",
        "I have been dealt with respect and empathy as an individual during all course activity",
        "How would you rate this course overall?"
    ];

    const yesNoQuestions = [
        "I have received a course outline at the beginning of the course",
        "Required readings/texts were suggested and provided in due course of time",
        "Consultation hours were specified with date and time",
        "Is the instructor available to students for counseling?",
        "The contents specified in the syllabus were covered",
        "Does the instructor give tutorials?",
        "All contents of the course outline were covered in the course"
    ];
    
    const ratings = [
        "", // Index 0 is empty
        "1 = Almost Never",
        "2 = Few Times",
        "3 = Most Times",
        "4 = Almost Always",
        "5 = Always"
    ];

    // --- DOM Elements ---
    const courseCardsContainer = document.getElementById('course-cards-container');
    const courseList = document.getElementById('course-list');
    const surveyFormContainer = document.getElementById('survey-form-container');
    const surveyQuestionsContainer = document.getElementById('survey-questions-container');
    const backToCoursesBtn = document.getElementById('back-to-courses-btn');
    const submitEvaluationBtn = document.getElementById('submit-evaluation-btn');

    // --- Functions to toggle visibility ---
    const showCourseCards = () => {
        courseCardsContainer.classList.remove('d-none');
        surveyFormContainer.classList.add('d-none');
    };

    const showSurveyForm = (courseId) => {
        courseCardsContainer.classList.add('d-none');
        surveyFormContainer.classList.remove('d-none');
        // You can use the courseId here to load specific evaluation data if needed
        console.log(`Loading survey for course: ${courseId}`);
    };

    // --- Render Course Cards ---
    const renderCourseCards = () => {
        courseList.innerHTML = '';
        courses.forEach(course => {
            const cardClass = course.hasBeenEvaluated ? 'course-card-evaluated' : 'course-card-unevaluated';
            const buttonText = course.hasBeenEvaluated ? 'Edit your Evaluation' : 'Evaluate this Course & Faculty';
            const cardHtml = `
                <div class="col">
                    <div class="card course-card ${cardClass} h-100 p-3">
                        <div class="card-body">
                            <h5 class="card-title">${course.name}</h5>
                            <p class="card-text"><strong>Faculty:</strong> ${course.faculty}</p>
                            <p class="card-text"><small class="text-muted">Status: ${course.hasBeenEvaluated ? 'Evaluated' : 'Not Evaluated'}</small></p>
                            <button class="btn btn-primary mt-3 w-100" data-course-id="${course.id}">
                                ${buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            courseList.insertAdjacentHTML('beforeend', cardHtml);
        });

        // Add event listeners to the new buttons
        courseList.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const courseId = e.target.getAttribute('data-course-id');
                showSurveyForm(courseId);
            });
        });
    };

    // --- Render Survey Form ---
    const renderSurveyForm = () => {
        surveyQuestionsContainer.innerHTML = '';
        questions.forEach((question, index) => {
            const card = document.createElement('div');
            card.className = 'card question-card mb-3';
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            const questionHeader = document.createElement('h5');
            questionHeader.className = 'question-text card-title';
            questionHeader.textContent = `${index + 1}. ${question}`;
            cardBody.appendChild(questionHeader);
            const answerFieldContainer = document.createElement('div');
            answerFieldContainer.className = 'mt-3';

            if (yesNoQuestions.includes(question)) {
                const radioGroup = document.createElement('div');
                radioGroup.className = 'd-flex flex-wrap gap-2';
                
                const yesInput = document.createElement('input');
                yesInput.className = 'btn-radio yes';
                yesInput.type = 'radio';
                yesInput.name = `question${index + 1}`;
                yesInput.id = `question${index + 1}-yes`;
                yesInput.value = 'Yes';
                const yesLabel = document.createElement('label');
                yesLabel.className = 'd-flex align-items-center gap-2';
                yesLabel.htmlFor = `question${index + 1}-yes`;
                yesLabel.innerHTML = '<i class="fas fa-thumbs-up"></i> <span>Yes</span>';
                radioGroup.appendChild(yesInput);
                radioGroup.appendChild(yesLabel);

                const noInput = document.createElement('input');
                noInput.className = 'btn-radio no';
                noInput.type = 'radio';
                noInput.name = `question${index + 1}`;
                noInput.id = `question${index + 1}-no`;
                noInput.value = 'No';
                const noLabel = document.createElement('label');
                noLabel.className = 'd-flex align-items-center gap-2';
                noLabel.htmlFor = `question${index + 1}-no`;
                noLabel.innerHTML = '<i class="fas fa-thumbs-down"></i> <span>No</span>';
                radioGroup.appendChild(noInput);
                radioGroup.appendChild(noLabel);
                answerFieldContainer.appendChild(radioGroup);
            } else {
                const starRatingContainer = document.createElement('div');
                starRatingContainer.className = 'd-flex align-items-center';
                const starContainer = document.createElement('div');
                starContainer.className = 'star-rating';
                starContainer.setAttribute('data-rating', '0');

                for (let i = 1; i <= 5; i++) {
                    const star = document.createElement('i');
                    star.className = 'fa-regular fa-star';
                    star.setAttribute('data-value', i);
                    starContainer.appendChild(star);
                }

                const ratingText = document.createElement('div');
                ratingText.className = 'rating-text';
                ratingText.textContent = ratings[0];

                starContainer.addEventListener('mouseover', (e) => {
                    const stars = starContainer.querySelectorAll('i');
                    const hoverValue = e.target.getAttribute('data-value');
                    if (hoverValue) {
                        stars.forEach((star) => {
                            if (star.getAttribute('data-value') <= hoverValue) {
                                star.classList.remove('fa-regular');
                                star.classList.add('fas', 'hover-star');
                            } else {
                                star.classList.remove('fas', 'hover-star');
                                star.classList.add('fa-regular');
                            }
                        });
                        ratingText.textContent = ratings[hoverValue];
                    }
                });

                starContainer.addEventListener('mouseout', () => {
                    const stars = starContainer.querySelectorAll('i');
                    const selectedRating = starContainer.getAttribute('data-rating');
                    stars.forEach((star) => {
                        star.classList.remove('hover-star');
                        if (star.getAttribute('data-value') <= selectedRating) {
                            star.classList.remove('fa-regular');
                            star.classList.add('fas');
                        } else {
                            star.classList.remove('fas');
                            star.classList.add('fa-regular');
                        }
                    });
                    ratingText.textContent = ratings[selectedRating];
                });

                starContainer.addEventListener('click', (e) => {
                    const clickValue = e.target.getAttribute('data-value');
                    if (clickValue) {
                        starContainer.setAttribute('data-rating', clickValue);
                        ratingText.textContent = ratings[clickValue];
                        const stars = starContainer.querySelectorAll('i');
                        stars.forEach((star) => {
                            if (star.getAttribute('data-value') <= clickValue) {
                                star.classList.remove('fa-regular');
                                star.classList.add('fas');
                            } else {
                                star.classList.remove('fas');
                                star.classList.add('fa-regular');
                            }
                        });
                    }
                });

                starRatingContainer.appendChild(starContainer);
                starRatingContainer.appendChild(ratingText);
                answerFieldContainer.appendChild(starRatingContainer);
            }

            cardBody.appendChild(answerFieldContainer);
            card.appendChild(cardBody);
            surveyQuestionsContainer.appendChild(card);
        });
    };

    // --- Event Listeners for the Main UI ---
    backToCoursesBtn.addEventListener('click', showCourseCards);
    submitEvaluationBtn.addEventListener('click', () => {
        alert("Evaluation submitted! (Functionality not yet implemented)");
        // In a real application, you would submit the form data here.
        showCourseCards();
    });

    // --- Initial Page Load ---
    renderCourseCards();
    renderSurveyForm();
});