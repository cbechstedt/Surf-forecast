import React from 'react'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet'
import { Button } from './ui/button'
import { ChevronRight, HandMetal, PanelBottom } from 'lucide-react'
import { Dropdowns } from './Dropdowns'

export const Sidebar = () => {
  return (
    <div className='flex w-full flex-col bg-stone-950/40'>
      <div className='sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>

        <header className='sticky top-0 z-30 flex h-14 items-center px-4 gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icon' variant='outline' className='sm:hidden'>
                <ChevronRight className='w-5 h-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left'>
              <SheetHeader>
                <SheetTitle className='flex flex-row justify-center gap-1 mb-10' >
                  Find your wave
                  <HandMetal />
                </SheetTitle>
              </SheetHeader>
              <Dropdowns />
            </SheetContent>
          </Sheet>
        </header>
      </div>

    </div>
  )
}
