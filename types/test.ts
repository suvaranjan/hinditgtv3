export interface Question {
  id: number
  question: string
  options: string[]
  answer: string
}

export interface Topic {
  name: string
  author: string
  bookLink: string | null
  questions: Question[]
}

export interface TestConfig {
  subject: string
  topic: string
  numberOfQuestions: number
  timer: number
}

export interface UserAnswer {
  questionId: number
  selectedOption: string | null
}
