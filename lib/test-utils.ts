import syllabusData from '@/data/syllabus.json'
import { Question } from 'types/test'

export function getSubjects() {
  return ['All Subjects', ...syllabusData.syllabus.map((item) => item.subject)]
}

export function getTopics(subject: string) {
  if (subject === 'All Subjects') {
    return [
      'All Topics',
      ...syllabusData.syllabus.flatMap((item) => item.topics.map((t) => t.name)),
    ]
  }

  return (
    syllabusData.syllabus.find((item) => item.subject === subject)?.topics.map((t) => t.name) || []
  )
}

export function getTotalQuestions(subject: string, topic: string) {
  if (subject === 'All Subjects') {
    if (topic === 'All Topics') {
      return syllabusData.syllabus.reduce(
        (acc, item) => acc + item.topics.reduce((topicAcc, t) => topicAcc + t.questions.length, 0),
        0
      )
    }

    return (
      syllabusData.syllabus
        .find((item) => item.topics.some((t) => t.name === topic))
        ?.topics.find((t) => t.name === topic)?.questions.length || 0
    )
  }

  if (topic === 'All Topics') {
    return (
      syllabusData.syllabus
        .find((item) => item.subject === subject)
        ?.topics.reduce((acc, t) => acc + t.questions.length, 0) || 0
    )
  }

  return (
    syllabusData.syllabus
      .find((item) => item.subject === subject)
      ?.topics.find((t) => t.name === topic)?.questions.length || 0
  )
}

export function getQuestions(subject: string, topic: string) {
  if (subject === 'All Subjects') {
    return syllabusData.syllabus.flatMap((item) => item.topics.flatMap((t) => t.questions))
  }

  if (topic === 'All Topics') {
    return (
      syllabusData.syllabus
        .find((item) => item.subject === subject)
        ?.topics.flatMap((t) => t.questions) || []
    )
  }

  return (
    syllabusData.syllabus
      .find((item) => item.subject === subject)
      ?.topics.find((t) => t.name === topic)?.questions || []
  )
}

export function shuffleAndSliceQuestions(questions: Question[], count: number) {
  // Create a copy to avoid mutating the original array
  return [...questions].sort(() => Math.random() - 0.5).slice(0, count)
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}
