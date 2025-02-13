
export async function createQuiz(userId, quizData) {


    const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, quizData }),
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.error || 'Failed to create quiz');


    }

    return data.quiz;
}

// delete functionality

export async function deleteQuiz(quizId) {
    const response = await fetch(`/api/quizzes?quizId=${quizId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete quiz");
    }
}

// modify functionality

export async function modifyQuiz(quizId, updatedQuizData) {
    const response = await fetch(`/api/quizzes?quizId=${quizId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuizData),
    });

    if (!response.ok) {
        throw new Error('Failed to modify quiz');
    }
}