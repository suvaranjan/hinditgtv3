'use client'

import type { Question, UserAnswer } from './../../types/test'

interface ResultPageProps {
  testQuestions: Question[]
  userAnswers: UserAnswer[]
}

export default function ResultPage({ testQuestions, userAnswers }: ResultPageProps) {
  // Calculate correct answers
  const correctAnswers = userAnswers.filter((answer, index) => {
    const question = testQuestions.find((q) => q.id === answer.questionId)
    return answer.selectedOption === question?.answer
  }).length

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Test Results</h2>
      <div className="mb-6 rounded-md bg-primary-50 p-4 dark:bg-primary-900">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          You scored <span className="text-primary font-bold">{correctAnswers}</span> out of{' '}
          <span className="font-bold">{testQuestions.length}</span>.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {Math.round((correctAnswers / testQuestions.length) * 100)}% correct
        </p>
      </div>

      <div className="space-y-4">
        {testQuestions.map((question, index) => {
          const userAnswer = userAnswers.find((a) => a.questionId === question.id)?.selectedOption
          const isCorrect = userAnswer === question.answer
          const isAttempted = userAnswer !== null

          return (
            <div key={question.id} className="rounded-md border p-4 shadow-sm dark:border-gray-700">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {index + 1}. {question.question}
              </p>
              <div className="mt-2 space-y-2">
                {question.options.map((option, optionIndex) => {
                  // Convert option index to alphabetical label (A, B, C, D)
                  const optionLabel = String.fromCharCode(65 + optionIndex) // 65 is ASCII for 'A'

                  let bgClass = 'bg-gray-50 dark:bg-gray-700'
                  if (option === userAnswer) {
                    bgClass = isCorrect
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'bg-red-100 dark:bg-red-900'
                  } else if (option === question.answer) {
                    bgClass = 'bg-blue-100 dark:bg-blue-900'
                  }

                  return (
                    <div key={optionIndex} className={`rounded-md p-2 ${bgClass}`}>
                      <span className="font-medium">{optionLabel}.</span> {option}
                    </div>
                  )
                })}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {isAttempted ? (
                  <span
                    className={`inline-block rounded-md px-2 py-1 text-sm ${
                      isCorrect
                        ? 'bg-green-500 text-white dark:bg-green-700'
                        : 'bg-red-500 text-white dark:bg-red-700'
                    }`}
                  >
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                ) : (
                  <span className="inline-block rounded-md bg-gray-500 px-2 py-1 text-sm text-white dark:bg-gray-700">
                    Not Attempted
                  </span>
                )}

                <span className="inline-block rounded-md bg-blue-500 px-2 py-1 text-sm text-white dark:bg-blue-700">
                  Correct Answer: {question.answer}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
