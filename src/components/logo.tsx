import { cn } from "@/lib/utils"
import { Play } from "lucide-react"
import Link from "next/link"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold text-primary", className)}>
      <div className="rounded-lg bg-primary p-2 text-primary-foreground">
        <Play className="h-4 w-4 fill-primary-foreground" />
      </div>
      PLXYGROUND
    </Link>
  )
}
