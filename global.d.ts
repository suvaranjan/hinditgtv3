export type Syllabus = {
  syllabus: Subject[]
}

export type Subject = {
  subject: string
  topics: Topic[]
}

export type Topic = {
  name: string
  author: string
  bookLink: string | null
  questions: Question[]
}

export type Question = {
  id: number
  question: string
  options: string[]
  answer: string
}
