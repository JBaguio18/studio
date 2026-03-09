import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("font-headline flex items-center gap-2 text-2xl font-bold text-primary", className)}>
      <div className="rounded-lg bg-primary p-2 text-primary-foreground">
        <Sparkles className="h-5 w-5 fill-primary-foreground" />
      </div>
      PLXYGROUND
    </Link>
  )
}
