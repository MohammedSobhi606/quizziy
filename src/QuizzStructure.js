


export const quizzData = [
    {
        id: '1',
        icon: 0,
        title: 'javascript',
        quizzQuestions: [
            {
                id: '1',
                mainQuestion: 'What is the name of the global object in JavaScript?',
                choices: ['Object', 'Array', 'Global', 'Function'],
                correctAnswer: 0,
                // to add interactivity to the question answers 
                answeredResult: -1,
                statstics: {
                    totalAttempts: 0,
                    correctAttempts: 0,
                    incorrectAttempts: 0,
                }
            },
            // add more questions
            {

                id: '2',
                mainQuestion: 'Inside which HTML element do we put the JavaScript?',
                choices: ['<js>', '<script>', '<scripting>', 'var x = 10'],
                correctAnswer: 1,
                answeredResult: -1,

                statstics: {
                    totalAttempts: 0,
                    correctAttempts: 0,
                    incorrectAttempts: 0,
                }

            }
        ],
    },
    {
        id: '2',
        icon: 1,
        title: 'React',

        quizzQuestions: [
            {
                id: '1',
                mainQuestion: 'hello from react quizz😎What command is used to start the React local development server?',
                choices: ['npm run server', 'npm run dev', 'npm run dog', 'Function'],
                correctAnswer: 1,
                // to add interactivity to the question answers 
                answeredResult: -1,
                statstics: {
                    totalAttempts: 0,
                    correctAttempts: 0,
                    incorrectAttempts: 0,
                }
            },
            // add more questions
            {

                id: '2',
                mainQuestion: 'What is the default local host port that a React development server uses?',
                choices: ['3000', '2000', '3500', '1035'],
                correctAnswer: 0,
                answeredResult: -1,

                statstics: {
                    totalAttempts: 0,
                    correctAttempts: 0,
                    incorrectAttempts: 0,
                }

            }
        ],
    }
    // add more quizzes here...

    // each quiz object has 'id', 'icon', 'title', and 'qizzQuestions' properties
    // 'qizzQuestions' is an array of objects with 'id', 'question', 'choices', 'correctAnswer', 'answeredResult', and'statstics' properties
]