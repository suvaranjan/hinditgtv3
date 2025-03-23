import MCQComponent from '@/components/MCQComponent'
import MCQSelectComp from '@/components/MCQSelectComp'
import syllabusData from '@/data/syllabus.json' assert { type: 'json' }

export default function Page({ searchParams }: { searchParams: { sub?: string; topic?: string } }) {
  const { sub, topic: topicName } = searchParams
  const selectedSubject = syllabusData.syllabus.find((item) => item.subject === sub)
  const selectedTopic = selectedSubject?.topics.find((t) => t.name === topicName)

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Read MCQs</h1>
      <MCQSelectComp
        syllabusData={syllabusData}
        selectedSubject={sub || ''}
        selectedTopic={topicName || ''}
      />
      {selectedTopic && <MCQComponent topic={selectedTopic} />}
    </div>
  )
}
