$(document).ready(function() {
    // Global Constants
    const promptText = $('#prompt-text'),
          counterText = $('#counter-text'),
          choicesContainer = $('#choices-container'),
          startContainer = $('#start-container'),
          startButton = $('#start-button'),
          resultContainer = $('#result-container'),
          roundTime = 15


    // Define Questions
    const questions = [
        {
            prompt: 'What was the suit color of the Greatest American Hero?',
            choices: ['Correct', 'Green', 'Blue', 'Orange'],
            answer: 'Correct'
        },
        {
            prompt: 'What was the suit?',
            choices: ['Correct', 'Green', 'Blue', 'Orange'],
            answer: 'Correct'
        }
    ]
    

    // Global Variables
    let countdown,
        counterValue = roundTime,
        correct = 0,
        incorrect = 0,
        currentPromptIndex = 0,
        currentPrompt = questions[currentPromptIndex]


    // Start Game
    function start() {
        startContainer.remove()
        displayQuestion()
    }
    

    // Counter
    function counter() {
        counterValue--
        counterText.text(counterValue)
        if (counterValue === 0) {
            clearInterval(countdown)
            processChoice()
        }
    }


    // Update and Display Prompt
    function displayQuestion() {
        if (currentPromptIndex > questions.length-1) {
            finish()
            return
        } else {
            // Update Prompt
            currentPrompt = questions[currentPromptIndex]
            promptText.text(currentPrompt.prompt)

            // Start Counter
            counterText.text(counterValue)
            countdown = setInterval(counter, 1000)

            // Display Choices
            for (i = 0; i < currentPrompt.choices.length; i++) {
                choicesContainer.append(
                    `<div class="choice">${currentPrompt.choices[i]}</div>`
                )
            }
        }
    }


    // Reset Counter
    function resetCounter() {
        clearInterval(countdown)
        counterValue = roundTime
        counterText.text('')
    }


    // Determine If Selected Choice is Correct
    function processChoice(choice) {
        // Remove Choices From DOM
        choicesContainer.empty()
        resetCounter()
        counterText.text("The correct answer is " + currentPrompt.answer);

        setTimeout(displayQuestion, 2000)

        if (choice == currentPrompt.answer) {
            correct++
            promptText.text("CORRECT!")
        } else {
            incorrect++
            promptText.text("Incorrect.")
        }

        currentPromptIndex++
    }


    // Finish Game and Show Results
    function finish() {
        promptText.text('')
        counterText.text('')
        resultContainer.append(`<h3>Correct Answers: ${correct}</h3>`)
        resultContainer.append(`<h3>Incorrect Answers: ${incorrect}</h3>`)
    }


    // Event Listeners
    startButton.click(start)

    choicesContainer.on('click', '.choice', function(){
        processChoice($(this).text())
    })
})