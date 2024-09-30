'use client'

import React, {useState} from 'react'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet'
import { Button } from './ui/button'
import { PanelLeftOpen, HandMetal } from 'lucide-react'
import { Dropdowns } from './Dropdowns'
import { Input } from './ui/input'
import { Label } from './ui/label'

export const Sidebar = () => {
  const [inputBeach, setInputBeach] = useState('');

  const handleChange = (event) => {
    setInputBeach(event.target.value);
  };

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
            <SheetContent side='left' className='flex flex-col border-slate-500 gap-10'>
              <SheetHeader>
                <SheetTitle className='flex flex-row justify-center gap-2 mb-10' >
                  Find your wave
                  <HandMetal />
                </SheetTitle>
                <SheetDescription>
                  Search for the best surf spots around the world
                </SheetDescription>
              </SheetHeader>
              <div>
                <Dropdowns />
              </div>
              <div>
                <Label htmlFor='inputBeach' >Or type a beach</Label>
                <Input id='inputBeach' placeholder='beach' />
              </div>
              login
            </SheetContent>
          </Sheet>
          <h2>Menu</h2 >
        </header>
      </div>

      {/* This is the desktop version of the sidebar */}
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-40 border-r border-slate-500 bg-stone-950/40 sm:flex'>
        <div className='w-full p-4 flex flex-col gap-10'>
          <p>(login)</p>
          <Dropdowns />
          <Input onChange={handleChange} value={inputBeach} placeholder='Or type a beach' />
        </div>

      </aside>


    </div>
  )
}
