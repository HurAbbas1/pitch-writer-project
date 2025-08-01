// app/examples/page.tsx
"use client"

import { NavigationHeader } from "@/components/navigation-header"

export default function ExamplesPage() {
  return (
    <>
      <NavigationHeader />
      <main className="pt-16 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Examples</h1>
        <p className="text-muted-foreground mb-8">
          Explore some AI-generated pitch examples across various industries.
        </p>

        <section className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "🚀 Startup Pitch",
              text: "We're building a platform that connects creators with investors using AI-powered analysis."
            },
            {
              title: "🏥 HealthTech Demo",
              text: "Our system detects early signs of diabetes through non-invasive eye scanning technology."
            },
            {
              title: "🎓 EdTech Solution",
              text: "An AI tutor that personalizes learning based on student behavior and engagement metrics."
            },
            {
              title: "🌱 Sustainability Project",
              text: "Using IoT sensors to reduce water waste in agriculture with real-time soil monitoring."
            },
            {
              title: "🎮 Game Studio Pitch",
              text: "A story-driven RPG that uses AI to evolve game narratives based on player decisions."
            },
            {
              title: "📦 E-commerce Tool",
              text: "We streamline order fulfillment with AI-predicted demand and smart inventory planning."
            },
          ].map((example, index) => (
            <div key={index} className="bg-muted/40 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {example.title}
              </h2>
              <p className="text-muted-foreground">{example.text}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
