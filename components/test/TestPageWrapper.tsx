'use client'

import { useState, useEffect } from 'react'
import type { TestConfig, Question, UserAnswer } from '../../types/test'
import { getQuestions, shuffleAndSliceQuestions } from '../../lib/test-utils'
import TestPage from './TestPage'
import ResultPage from './ResultPage'

export default function TestPageWrapper({ testConfig }: { testConfig: TestConfig }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isTestSubmitted, setIsTestSubmitted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])

  // Initialize questions and user answers on component mount
  useEffect(() => {
    const allQuestions = getQuestions(testConfig.subject, testConfig.topic)
    const shuffledQuestions = shuffleAndSliceQuestions(allQuestions, testConfig.numberOfQuestions)

    setQuestions(shuffledQuestions)
    setUserAnswers(
      Array(testConfig.numberOfQuestions)
        .fill(null)
        .map((_, index) => ({
          questionId: shuffledQuestions[index]?.id || index + 1,
          selectedOption: null,
        }))
    )
    setIsLoading(false)
  }, [testConfig])

  const handleSubmitTest = (answers: UserAnswer[]) => {
    setUserAnswers(answers)
    setIsTestSubmitted(true)
  }

  if (isLoading) {
    return <div>Loading test questions...</div>
  }

  if (isTestSubmitted) {
    return <ResultPage testQuestions={questions} userAnswers={userAnswers} />
  }

  return <TestPage testConfig={testConfig} questions={questions} onSubmit={handleSubmitTest} />
}
