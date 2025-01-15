import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CounterPage = () => {
    const [countInput, setCountInput] = useState(0)

    const counterSelector = useSelector((state) => state.counter)

    const dispatch = useDispatch()

    const incrementCounter = () => {
        dispatch({
            type: "COUNTER_INCREMENT_COUNT"
        })
    }
    const dencrementCounter = () => {
        dispatch({
            type: "COUNTER_DENCREMENT_COUNT"
        })
    }

    const setCounterWithInput = () => {
        dispatch({
            type: "COUNTER_SET_COUNT",
            payload: countInput,
        })
    }

    return (
        <main className='min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8 flex flex-col justify-center items-center gap-4'>
            <p className='text-5xl font-bold'>Count : {counterSelector.count}</p>

            <div className='flex items-center gap-4'>
                <Button onClick={dencrementCounter} size='icon'>
                    <Minus />
                </Button>
                <Button onClick={incrementCounter} size='icon'>
                    <Plus />
                </Button>
            </div>

            <div className='flex gap-2 mt-8'>
                <Input type='number' onChange={(e) => setCountInput(e.target.value)} />
                <Button onClick={setCounterWithInput}>Submit</Button>
            </div>
        </main>
    )
}

export default CounterPage