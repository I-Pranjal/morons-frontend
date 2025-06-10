"use client"

import React from "react"
import { Download, Target, TrendingUp, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

export default function AnalysisResults({analysisResult}) {
  const { score, strengths, weaknesses, suggestions, alignment } = analysisResult

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBadgeColor = (score) => {
    if (score >= 80) return "bg-green-500/20 text-green-400 border-green-500/30"
    if (score >= 60) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    return "bg-red-500/20 text-red-400 border-red-500/30"
  }

  const getProgressColor = (score) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-neutral-900 p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">Analysis Results</h1>
          </div>
          <Button variant="outline" className="border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Score Card */}
        <Card className="border-neutral-700 bg-neutral-800/50 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
              Overall Match Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</span>
                  <Badge className={getScoreBadgeColor(score)}>
                    {score >= 80 ? "Excellent Match" : score >= 60 ? "Good Match" : "Needs Improvement"}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-400">Based on skills, experience, and role requirements</p>
              </div>
              <div className="relative h-24 w-24">
                <svg className="h-24 w-24 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-neutral-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                    className={getScoreColor(score)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}%</span>
                </div>
              </div>
            </div>
            <Progress
              value={score}
              className="h-2 bg-neutral-700"
              style={
                {
                  "--progress-background": getProgressColor(score),
                }
              }
            />
          </CardContent>
        </Card>

        {/* Analysis Sections */}
        <Card className="border-neutral-700 bg-neutral-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {/* Strengths */}
              <AccordionItem value="strengths" className="border-neutral-700">
                <AccordionTrigger className="text-white hover:text-yellow-400 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Strengths</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      {strengths.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <ul className="space-y-3">
                    {strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-300">
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-green-400 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Weaknesses */}
              <AccordionItem value="weaknesses" className="border-neutral-700">
                <AccordionTrigger className="text-white hover:text-yellow-400 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <span>Areas for Improvement</span>
                    <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                      {weaknesses.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <ul className="space-y-3">
                    {weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-300">
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-red-400 flex-shrink-0" />
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Suggestions */}
              <AccordionItem value="suggestions" className="border-neutral-700">
                <AccordionTrigger className="text-white hover:text-yellow-400 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    <span>Recommendations</span>
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                      {suggestions.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <ul className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-3 text-neutral-300">
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-400 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Alignment */}
              <AccordionItem value="alignment" className="border-neutral-700">
                <AccordionTrigger className="text-white hover:text-yellow-400 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-blue-400" />
                    <span>Role Alignment</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="rounded-lg bg-neutral-700/50 p-4">
                    <p className="text-neutral-300 leading-relaxed">{alignment}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
