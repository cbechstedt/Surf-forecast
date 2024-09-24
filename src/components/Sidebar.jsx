import React from 'react'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet'
import { Button } from './ui/button'
import { PanelLeftOpen, HandMetal } from 'lucide-react'
import { Dropdowns } from './Dropdowns'

export const Sidebar = () => {
  return (
    <div className='flex w-full flex-col bg-stone-950/40'>

      {/* This is the mobile version of the sidebar */}
      <div className='sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14 border-b border-slate-500'>

        <header className='sticky top-0 z-30 flex h-14 items-center px-4 gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button size='icon' variant='outline' className='sm:hidden'>
                <PanelLeftOpen className='w-5 h-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col border-slate-500'>
              <SheetHeader>
                <SheetTitle className='flex flex-row justify-center gap-1 mb-10' >
                  Find your wave
                  <HandMetal />
                </SheetTitle>
                <SheetDescription>
                  Search for the best surf spots around the world
                </SheetDescription>
              </SheetHeader>
              <Dropdowns />
              login
            </SheetContent>
          </Sheet>
          <h2>Menu</h2 >
        </header>
      </div>

      {/* This is the desktop version of the sidebar */}
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-40 border-r bg-stone-950/40 sm:flex'>
        <div className='w-full p-4 flex flex-col gap-10'>
          <p>(login)</p>
          <Dropdowns />
        </div>
      </aside>


    </div>
  )
}
