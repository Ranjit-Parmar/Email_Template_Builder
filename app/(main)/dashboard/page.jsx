'use client'
import Header from '@/components/Header'
import TemplateLists from '@/components/TemplateLists'
import React from 'react'

const Dashboard = () => {

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Dashboard
          </h1>
          <TemplateLists />
        </div>
      </main>
    </>
  )
}

export default Dashboard
