import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MascotIcon className="h-10 w-10 text-white" />
              <h1 className="text-2xl font-bold text-white">Qatysu</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/20 to-background py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary">
              <MascotIcon className="h-16 w-16 text-white" />
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight">Qatysu</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              Make attendance fun with gamification, streaks, and achievements
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20" id="features">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="overflow-hidden">
                <div className="bg-primary p-4 text-white">
                  <h3 className="text-xl font-bold">Smart Recognition</h3>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Facial recognition for quick identification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>ID card scanning as backup option</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Secure and accurate identification</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-primary p-4 text-white">
                  <h3 className="text-xl font-bold">Gamified Experience</h3>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Daily streaks to encourage consistency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Points and levels for attendance milestones</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Achievements and badges to collect</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="bg-primary p-4 text-white">
                  <h3 className="text-xl font-bold">Admin Tools</h3>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Real-time attendance monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Automated late pass generation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Comprehensive reporting and analytics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-12 text-3xl font-bold">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="mb-2 text-xl font-medium">Scan</h3>
                <p className="text-muted-foreground">Students scan their face or ID card</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="mb-2 text-xl font-medium">Record</h3>
                <p className="text-muted-foreground">System records attendance automatically</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="mb-2 text-xl font-medium">Earn</h3>
                <p className="text-muted-foreground">Students earn points and streaks</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                  4
                </div>
                <h3 className="mb-2 text-xl font-medium">Progress</h3>
                <p className="text-muted-foreground">Track progress and unlock achievements</p>
              </div>
            </div>
            <div className="mt-12">
              <Link href="/login">
                <Button size="lg">Try It Now</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <MascotIcon className="h-8 w-8" />
            <span className="text-xl font-bold">Qatysu</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Qatysu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

