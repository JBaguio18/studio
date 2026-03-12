interface PageHeaderProps {
    title: string;
    subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="space-y-2 text-center animate-in fade-in-0 slide-in-from-top-4 duration-500">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl">
                {title}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-foreground/80 text-balance sm:text-xl">
                {subtitle}
            </p>
        </div>
    )
}
