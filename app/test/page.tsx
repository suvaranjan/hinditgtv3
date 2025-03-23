import { Suspense } from 'react'
import TestForm from '@/components/test/TestForm'
import TestPageWrapper from '@/components/test/TestPageWrapper'
import type { TestConfig } from '../../types/test'
import Loading from '@/components/ui/loading'

export default function Test({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { sub, topic, num, time } = searchParams

  // If no configuration is provided, show the test form
  if (!sub || !topic || !num || !time) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Test Configuration</h1>
        <Suspense fallback={<Loading />}>
          <TestForm />
        </Suspense>
      </div>
    )
  }

  // Parse the configuration from the URL
  const testConfig: TestConfig = {
    subject: sub as string,
    topic: topic as string,
    numberOfQuestions: Number.parseInt(num as string, 10),
    timer: Number.parseInt(time as string, 10),
  }

  // Show the test page with suspense for loading state
  return (
    <Suspense fallback={<Loading />}>
      <TestPageWrapper testConfig={testConfig} />
    </Suspense>
  )
}
