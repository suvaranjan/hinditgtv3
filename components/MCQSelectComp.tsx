'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Syllabus as SyllabusType } from 'global'

interface MCQSelectCompProps {
  syllabusData: SyllabusType
  selectedSubject: string
  selectedTopic: string
}

export default function MCQSelectComp({
  syllabusData,
  selectedSubject: initialSelectedSubject,
  selectedTopic: initialSelectedTopic,
}: MCQSelectCompProps) {
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSelectedSubject)
  const [selectedTopic, setSelectedTopic] = useState<string>(initialSelectedTopic)

  // Handle subject selection
  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value)
    setSelectedTopic('') // Reset topic when subject changes
  }

  // Handle topic selection
  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value)
  }

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default form submission
    if (selectedSubject && selectedTopic) {
      router.push(`/mcqs?sub=${selectedSubject}&topic=${selectedTopic}`)
    }
  }

  const subjects = syllabusData.syllabus.map((item) => item.subject)

  // Get topics for the selected subject
  const topics = syllabusData.syllabus
    .find((item) => item.subject === selectedSubject)
    ?.topics.map((topic) => topic.name)

  return (
    <form onSubmit={handleSubmit} className="mb-5 space-y-6">
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
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="">-- Select a Subject --</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject} className="font-hindi">
              {subject}
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
          value={selectedTopic}
          onChange={handleTopicChange}
          disabled={!selectedSubject}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="">-- Select a Topic --</option>
          {topics?.map((topic, index) => (
            <option className="font-hindi" key={index} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={!selectedSubject || !selectedTopic}
          className="w-full rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          Show MCQs
        </button>
      </div>
    </form>
  )
}
