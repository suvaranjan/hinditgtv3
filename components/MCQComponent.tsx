'use client'

import { useState } from 'react'
import { Topic } from 'global'

export default function MCQComponent({ topic }: { topic: Topic }) {
  const [showAnswer, setShowAnswer] = useState<boolean>(true) // Default: Show answer

  return (
    <div className="space-y-4">
      <h2 className="font-hindi text-xl font-semibold text-gray-900 dark:text-gray-100">
        {topic.name}
      </h2>
      <p className="font-hindi text-gray-600 dark:text-gray-400">Author : {topic.author}</p>
      {topic.bookLink && (
        <a
          href={topic.bookLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
        >
          View Book
        </a>
      )}

      {/* Show Answer Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showAnswer"
          checked={showAnswer}
          onChange={(e) => setShowAnswer(e.target.checked)}
          className="text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
        />
        <label htmlFor="showAnswer" className="text-sm text-gray-700 dark:text-gray-300">
          Show Answer
        </label>
      </div>

      {/* MCQ Questions */}
      <div className="space-y-4 font-hindi">
        {topic.questions.map((question, questionIndex) => (
          <div
            key={question.id}
            className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {questionIndex + 1}. {question.question}
            </p>
            <div className="mt-2 space-y-2">
              {question.options.map((option, optionIndex) => {
                const optionLabel = String.fromCharCode(65 + optionIndex) // A, B, C, D
                return (
                  <div
                    key={optionIndex}
                    className={`rounded-md p-2 ${
                      showAnswer && option === question.answer
                        ? 'bg-primary-500 text-white dark:bg-primary-600 dark:text-gray-100'
                        : 'bg-gray-50 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="font-medium">{optionLabel}.</span> {option}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
