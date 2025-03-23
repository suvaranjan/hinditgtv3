'use client'

import type React from 'react'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getSubjects, getTopics, getTotalQuestions } from '../../lib/test-utils'

export default function TestForm() {
  const router = useRouter()
  const [subject, setSubject] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0)
  const [timer, setTimer] = useState<number>(0)
  const [totalQuestions, setTotalQuestions] = useState<number>(0)
  const [subjects, setSubjects] = useState<string[]>([])
  const [topics, setTopics] = useState<string[]>([])

  // Initialize subjects on component mount
  useEffect(() => {
    setSubjects(getSubjects())
  }, [])

  // Update topics when subject changes
  useEffect(() => {
    if (subject) {
      setTopics(getTopics(subject))
      setTopic('') // Reset topic when subject changes
    } else {
      setTopics([])
    }
  }, [subject])

  // Update total questions when subject or topic changes
  useEffect(() => {
    if (subject && topic) {
      const total = getTotalQuestions(subject, topic)
      setTotalQuestions(total)

      // Set default values
      const defaultNumberOfQuestions = Math.ceil(total * 0.7)
      const defaultTimer = Math.ceil(total / 2)

      setNumberOfQuestions(defaultNumberOfQuestions)
      setTimer(defaultTimer)
    } else {
      setTotalQuestions(0)
      setNumberOfQuestions(0)
      setTimer(0)
    }
  }, [subject, topic])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/test?sub=${subject}&topic=${topic}&num=${numberOfQuestions}&time=${timer}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Subject Dropdown */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Select Subject
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          required
        >
          <option value="">-- Select a Subject --</option>
          {subjects.map((subj, index) => (
            <option key={index} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      {/* Topic Dropdown */}
      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Select Topic
        </label>
        <select
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={!subject}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          required
        >
          <option value="">-- Select a Topic --</option>
          {topics.map((t, index) => (
            <option key={index} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Number of Questions */}
      {totalQuestions > 0 && (
        <div>
          <label
            htmlFor="numberOfQuestions"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Number of Questions (Total available questions: {totalQuestions})
          </label>
          <input
            type="range"
            id="numberOfQuestions"
            min={1}
            max={totalQuestions}
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="mt-1 block w-full"
          />
          <span className="text-gray-700 dark:text-gray-300">{numberOfQuestions}</span>
        </div>
      )}

      {/* Timer */}
      {totalQuestions > 0 && (
        <div>
          <label
            htmlFor="timer"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Timer
          </label>
          <input
            type="range"
            id="timer"
            min={1}
            max={totalQuestions}
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
            className="mt-1 block w-full"
          />
          <span className="text-gray-700 dark:text-gray-300">{timer} minutes</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!subject || !topic || numberOfQuestions <= 0 || timer <= 0}
        className="w-full rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700"
      >
        Start Test
      </button>
    </form>
  )
}
