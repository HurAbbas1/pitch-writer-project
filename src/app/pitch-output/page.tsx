'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavigationHeader } from "@/components/navigation-header"
import { AnimatedBackground } from "@/components/animated-background"
import { 
  Download, 
  Edit3, 
  Copy, 
  Share2, 
  Sparkles,
  FileText,
  CheckCircle2,
  RefreshCw
} from "lucide-react"

const samplePitch = `# Elevator Pitch: EcoClean Solutions

## The Problem
Traditional cleaning products contain harsh chemicals that harm both our health and the environment. Families are increasingly concerned about toxic residues in their homes, while businesses struggle to maintain clean spaces without compromising their sustainability goals.

## Our Solution
EcoClean Solutions provides 100% biodegradable, plant-based cleaning products that are just as effective as conventional cleaners. Our innovative formula uses natural enzymes and essential oils to break down dirt and bacteria without leaving harmful residues.

## Market Opportunity
The global green cleaning products market is valued at $3.9 billion and growing at 11.4% annually. With increasing environmental awareness and health consciousness, demand for safe cleaning alternatives has never been higher.

## What Makes Us Different
- **Proven Effectiveness**: Laboratory tested to match or exceed traditional cleaners
- **Zero Toxins**: Safe for children, pets, and sensitive individuals
- **Sustainable Packaging**: 100% recyclable containers made from recycled materials
- **Cost Effective**: Concentrated formulas provide 30% more cleaning power per dollar

## Business Model
Direct-to-consumer sales through our online platform, with subscription options for regular deliveries. We're also partnering with eco-conscious retail chains and targeting commercial cleaning services.

## Traction
- $250K in pre-orders from beta customers
- 4.8/5 star rating from 500+ early users
- Partnerships signed with 3 major retail chains
- Patent pending on our proprietary enzyme blend

## The Ask
We're seeking $500K to scale production, expand our product line, and accelerate market penetration. With your investment, we project $2M in revenue by year two and a path to profitability within 18 months.

**Together, we can make every clean space a safe space.**`

export default function PitchOutputPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [pitchContent, setPitchContent] = useState(samplePitch)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pitchContent)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([pitchContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-pitch.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My AI-Generated Pitch',
          text: pitchContent,
        })
      } catch (err) {
        console.log('Share failed:', err)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <NavigationHeader />
      
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Pitch Generated Successfully
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              Your AI-Generated Pitch
            </h1>
            <p className="text-xl text-muted-foreground">
              Review, edit, and export your professional pitch
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Pitch Content
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        {isEditing ? 'Preview' : 'Edit'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {isEditing ? (
                    <textarea
                      value={pitchContent}
                      onChange={(e) => setPitchContent(e.target.value)}
                      className="w-full h-[600px] p-6 border-none resize-none focus:outline-none bg-background font-mono text-sm"
                      placeholder="Edit your pitch content..."
                    />
                  ) : (
                    <div className="p-6 h-[600px] overflow-y-auto prose prose-lg dark:prose-invert max-w-none">
                      {pitchContent.split('\n').map((line, index) => {
                        if (line.startsWith('# ')) {
                          return (
                            <h1 key={index} className="text-3xl font-bold text-foreground mb-4">
                              {line.replace('# ', '')}
                            </h1>
                          )
                        } else if (line.startsWith('## ')) {
                          return (
                            <h2 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
                              {line.replace('## ', '')}
                            </h2>
                          )
                        } else if (line.startsWith('- ')) {
                          return (
                            <li key={index} className="ml-4 mb-1 text-muted-foreground">
                              {line.replace('- ', '')}
                            </li>
                          )
                        } else if (line.trim()) {
                          return (
                            <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                              {line}
                            </p>
                          )
                        }
                        return <br key={index} />
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={handleDownload} className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    
                    <Button onClick={handleCopy} className="w-full" variant="outline">
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    
                    <Button onClick={handleShare} className="w-full" variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    
                    <Button className="w-full bg-gradient-primary text-white">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pitch Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Words:</span>
                      <span className="font-medium">
                        {pitchContent.split(' ').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Characters:</span>
                      <span className="font-medium">
                        {pitchContent.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reading time:</span>
                      <span className="font-medium">
                        {Math.ceil(pitchContent.split(' ').length / 200)} min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sections:</span>
                      <span className="font-medium">
                        {pitchContent.split('##').length - 1}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500" />
                      <span>Pitch generated successfully</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-0.5 border border-muted-foreground rounded-sm" />
                      <span>Review and customize content</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-0.5 border border-muted-foreground rounded-sm" />
                      <span>Practice your delivery</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-0.5 border border-muted-foreground rounded-sm" />
                      <span>Prepare for questions</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Create Another Pitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Card className="inline-block p-6 bg-gradient-primary text-white">
              <div className="flex items-center gap-4">
                <Sparkles className="w-8 h-8" />
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-2">
                    Ready for another pitch?
                  </h3>
                  <p className="text-white/80 mb-4">
                    Create different versions or new pitches entirely
                  </p>
                  <Button variant="secondary" size="lg">
                    Start New Pitch
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}