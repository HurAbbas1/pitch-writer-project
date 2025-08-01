// app/pricing/page.tsx
"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  return (
    <>
      <NavigationHeader />
      <main className="pt-16 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Pricing</h1>
        <p className="text-muted-foreground mb-10">
          Choose the plan that fits your goals. Simple pricing. No surprises.
        </p>

        <section className="grid md:grid-cols-3 gap-6">
          {/* Free Plan */}
<div className="bg-gray-100 dark:bg-muted p-6 rounded-xl shadow-md">
  <h2 className="text-2xl font-semibold text-foreground mb-2">Free </h2>
  <p className="text-muted-foreground mb-4">Best for casual users and testing.</p>
  <ul className="list-disc list-inside text-muted-foreground mb-6">
    <li>3 pitch generations/day</li>
    <li>Basic styling</li>
    <li>Email support</li>
  </ul>
  <Button variant="outline" className="w-full">Start Free</Button>
</div>

{/* Pro Plan */}
<div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
  <h2 className="text-2xl font-semibold mb-2">Pro – 1000 PKR/mo</h2>
  <p className="mb-4">Great for individuals & founders.</p>
  <ul className="list-disc list-inside mb-6">
    <li>Unlimited pitch generations</li>
    <li>Advanced customization</li>
    <li>Priority email support</li>
  </ul>
  <Button className="bg-white text-indigo-600 hover:bg-white/90 w-full">Subscribe</Button>
</div>

{/* Enterprise Plan */}
<div className="bg-gradient-to-br from-green-600 to-emerald-500 text-white p-6 rounded-xl shadow-md">
  <h2 className="text-2xl font-semibold mb-2">Enterprise-custom</h2>
  <p className="mb-4">Custom solutions for teams </p>
  <ul className="list-disc list-inside mb-6">
    <li>Unlimited users & projects</li>
    <li>Dedicated account manager</li>
    <li>Onboarding & training</li>
  </ul>
  <Button className="bg-white text-green-600 hover:bg-white/90 w-full">Contact Sales</Button>
</div>

        </section>
      </main>
    </>
  )
}
