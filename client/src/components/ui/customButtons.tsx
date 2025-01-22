import { Check, Heart, Minus, Plus } from 'lucide-react';
import { Button } from "./button";




export const AddBtn = () => {
    return (
        <Button className="size-[30px]">
            <Plus size={16} absoluteStrokeWidth={true} strokeWidth={3} />
        </Button>
    )
}

export const DeleteBtn = () => {
    return (
        <Button className="size-[30px] bg-black hover:bg-gray-800">
            <Minus size={16}
                absoluteStrokeWidth={true} strokeWidth={3} color='#FFFFFF' />
        </Button>
    )
}


export const WishBtn = () => {
    return (
        <Button className="size-[30px] bg-white hover:bg-slate-100 shadow-md">
            <Heart size={16}
                absoluteStrokeWidth={true} strokeWidth={2} color='#000000' />
        </Button>
    )
}

export const CheckBtn = () => {
    return (
        <Button className="size-[30px] bg-slate-200 hover:bg-slate-300 shadow-md">
            <Check size={16}
                absoluteStrokeWidth={true} strokeWidth={2} color='#64748b' />
        </Button>
    )
}

