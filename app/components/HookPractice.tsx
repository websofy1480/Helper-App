"use client"
import { usePathname } from 'next/navigation'
import { useId, useMemo, useRef, useState } from 'react';

export const HookPractice = () => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const pathName = usePathname();

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    const [count, setCout] = useState(0);

    const handleCount = () => {
        setCout((prev) => prev + 1);
    }
    
    // const handleCount1 = useMemo(() => {
    //     setCout((prev) => prev + 1);
    // }, [])


    return (
        <div>
            <h1 className='text-2xl'>
                React Hook....
            </h1>

            <h2 className="text-xl">{count}</h2>
            <button onClick={handleCount}>Increase</button>
        </div>
    )
}
