'use client'

import { useState, useEffect } from 'react'
import type { TestConfig, Question, UserAnswer } from '../../types/test'
import { formatTime } from '../../lib/test-utils'
// import { Button } from '@/components/ui/button'

interface TestPageProps {
  testConfig: TestConfig
  questions: Question[]
  onSubmit: (answers: UserAnswer[]) => void
}

export default function TestPage({ testConfig, questions, onSubmit }: TestPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(testConfig.timer * 60)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(
    Array(questions.length)
      .fill(null)
      .map((_, index) => ({
        questionId: questions[index]?.id || index + 1,
        selectedOption: null,
      }))
  )

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onSubmit(userAnswers)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [userAnswers, onSubmit])

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    const updatedAnswers = [...userAnswers]
    updatedAnswers[currentQuestionIndex].selectedOption = option
    setUserAnswers(updatedAnswers)
  }

  // Handle "Next" button click
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  // Handle "Prev" button click
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  // Handle test submission
  const handleSubmit = () => {
    onSubmit(userAnswers)
  }

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex]

  if (!currentQuestion) {
    return <div>No questions available</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Test Page</h2>
      <div className="flex justify-between">
        <span>Time Left: {formatTime(timeLeft)}</span>
        <span>
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>
      <div className="rounded-md border p-4 font-hindi shadow-sm">
        <p className="font-medium">
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </p>
        <div className="mt-2 space-y-2">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={userAnswers[currentQuestionIndex].selectedOption === option}
                onChange={() => handleOptionSelect(option)}
                className="text-primary h-4 w-4"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="rounded-md bg-gray-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
          className="rounded-md bg-gray-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <button
        onClick={handleSubmit}
        // disabled={userAnswers.some((answer) => answer.selectedOption === null)}
        className="w-full rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 disabled:opacity-50"
      >
        Submit Test
      </button>
    </div>
  )
}
