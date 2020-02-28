$(document).ready(function() {
    // Global Constants
    const promptText = $('#prompt-text'),
          counterText = $('#counter-text'),
          choicesContainer = $('#choices-container'),
          startContainer = $('#start-container'),
          startButton = $('#start-button'),
          resultContainer = $('#result-container'),
          roundTime = 15,
          correctAudio = new Audio('src/audio/correct.mp3'),
          incorrectAudio = new Audio('src/audio/incorrect.mp3')


    // Define Questions
    const questions = [
        {
            prompt: 'What year was the very first model of the iPhone released?',
            choices: ['2006', '2007', '2008', '2009'],
            answer: '2007'
        },
        {
            prompt: 'What’s the shortcut for the “copy” function on most computers?',
            choices: ['Ctrl/&#8984; + X', 'Ctrl/&#8984; + V', 'Ctrl/&#8984; + C', 'Ctrl/&#8984; + Z'],
            answer: 'Ctrl/⌘ + C'
        },
        {
            prompt: 'What does “HTTP” stand for?',
            choices: ['HyperType Transfer Program', 'HyperText Transmission Protocol', 'HTML Text Tranfer Protocol', 'HyperText Transfer Protocol'],
            answer: 'HyperText Transfer Protocol'
        },
        {
            prompt: 'What is the name of the man who launched eBay back in 1995?',
            choices: ['Elon Musk', 'Pierre Omidyar', 'Jeff Bezos', 'Mark Zuckerberg'],
            answer: 'Pierre Omidyar'
        },
        {
            prompt: 'What is the smallest unit of digital storage?',
            choices: ['Terabyte', 'Gigabyte', 'Bit', 'Byte'],
            answer: 'Bit'
        },
        {
            prompt: 'Which email service is owned by Microsoft?',
            choices: ['Gmail', 'Outlook', 'Hotmail', 'Yahoo!'],
            answer: 'Outlook'
        },
        {
            prompt: 'Google Chrome, Safari, Firefox and Edge are different types of what?',
            choices: ['Web Browsers', 'IDEs', 'Email Clients', 'Text Editors'],
            answer: 'Web Browsers'
        },
        {
            prompt: 'Is Java an OS?',
            choices: ['Yes', 'No'],
            answer: 'No'
        },
        {
            prompt: 'Who is often called the father of the computer?',
            choices: ['Steve Jobs', 'Elon Musk', 'Bill Gates', 'Charles Babbage'],
            answer: 'Charles Babbage'
        },
        {
            prompt: 'What was Twitter’s original name?',
            choices: ['BackRub', 'twtter', 'Blue Ribbon', 'Tweeter'],
            answer: 'twtter'
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


    // Reset Counter
    function resetCounter() {
        clearInterval(countdown)
        counterValue = roundTime
        counterText.text('')
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
                    `<button class="btn btn-secondary choice">${currentPrompt.choices[i]}</button>`
                )
            }
        }
    }


    // Determine If Selected Choice is Correct
    function processChoice(choice) {
        // Remove Choices From DOM
        choicesContainer.empty()
        resetCounter()
        counterText.text("The correct answer is " + currentPrompt.answer)

        setTimeout(displayQuestion, 2000)

        if (choice == currentPrompt.answer) {
            correct++
            correctAudio.play()
            promptText.text("CORRECT!")
        } else {
            incorrect++
            incorrectAudio.play()
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