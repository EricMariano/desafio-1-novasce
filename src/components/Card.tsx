interface CardProps {
    position?: string;
    title: string;
    description: string;
    isActive: boolean;
    progress?: number;
}

export default function Card({ position, title, description, isActive, progress = 0 }: CardProps) {
    return (
        <div
            className={`
                transition-all duration-700 ease-in-out
                w-[90%] sm:w-[85%] md:w-[933px]
                ${isActive ? 'h-[374px]' : 'h-auto min-h-[77px]'}
                rounded-md border border-primary p-6
                ${isActive ? 'opacity-100 blur-none' : 'opacity-70 blur-[1px]'}
                transform ${isActive ? 'translate-y-0' : 'translate-y-2'}
            `}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-2 md:gap-4">
                    {position && ( 
                        <span className="text-black text-base sm:text-xl md:text-2xl">
                            {position}
                        </span>
                    )}
                    <h2 className="text-black text-[24px] font-normal">
                        {title}
                    </h2>
                </div>

                <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden 
                        ${isActive ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"}
                    `}
                >
                    <p className="text-black text-sm sm:text-base md:text-xl 
                        font-normal w-full md:w-[885px]"
                    >
                        {description}
                    </p>

                    {/* Barra de progresso */}
                    {isActive && (
                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mt-6">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}