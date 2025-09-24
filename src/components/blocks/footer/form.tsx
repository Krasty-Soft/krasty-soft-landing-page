'use client'

import Attach from '@/assets/footer-clip.svg'
import { Button, Input } from '@/components/ui'
import { useState } from 'react'

export const FooterForm = () => {
    const [error] = useState<string | null>(null)
    return (
        <form className="flex flex-col gap-8" action="#">
            <Input placeholder={'Your name'} />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:gap-9">
                <Input placeholder={'Your email'} />
                <Input placeholder={'Your phone'} />
            </div>
            <div className="relative">
                <textarea
                    className="px-5 py-4 w-full outline-0 resize-none bg-dark-green hover:bg-dark-green/60 focus:bg-dark-green/60 text-white placeholder-dark-grey rounded-2xl h-48"
                    name="message"
                    id="message"
                    placeholder="Your message"
                />
                {error && (
                    <p className="absolute top-0 left-0 text-xs text-red">
                        {error}
                    </p>
                )}
            </div>
            <label
                htmlFor="attach"
                className="flex items-center gap-4 cursor-pointer text-base xl:text-lg"
            >
                <input
                    className="hidden"
                    type="file"
                    name="attach"
                    id="attach"
                />
                <div className="h-8 w-8 bg-background rounded-md center">
                    <Attach />
                </div>
                Attach your file
            </label>
            <Button
                title="Send"
                fullSize
                onClick={() => console.log('sent!')}
                variant="accent"
                classes="py-3 px-8 md:py-5 md:px-10 text-sm md:text-base xl:text-lg"
            />
        </form>
    )
}
