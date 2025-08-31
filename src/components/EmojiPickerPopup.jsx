import React from "react";
import {Image, X} from "lucide-react"
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({icon,onSelect}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "")
        setIsOpen(!isOpen);

    }

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
           <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 flex items-center gap-4 cursor-pointer justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-12 h-12" />
                    ): (
                        <Image/>
                    )}

                </div>
               <p className="">
                   {icon ? "Change icon" : "Pick icon"}
               </p>
           </div>
               {
                   isOpen && (
                       <div className="relative ">
                            <button className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer">
                                <X/>

                            </button>
                           <EmojiPicker open={isOpen} onEmojiClick={(e) => handleEmojiClick(e)}  />

                       </div>
                   )
               }

        </div>
    )
}
export default EmojiPickerPopup
