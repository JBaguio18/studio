interface PageHeaderProps {
    title: string;
    subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className="text-center">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">
                {title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground md:text-xl">
                {subtitle}
            </p>
        </div>
    )
}
