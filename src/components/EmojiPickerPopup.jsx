import {useState} from "react";
import {Image, X} from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    }
    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-5">
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 cursor-pointer group">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-xl border border-purple-100 transition-all duration-200 group-hover:border-purple-200 group-hover:shadow-sm">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-8 h-8" />
                    ): (
                        <Image className="w-5 h-5" />
                    )}
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-colors">
                    {icon ? "Change icon" : "Pick Icon"}
                </span>
            </div>

            {isOpen && (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer shadow-sm hover:bg-gray-50 transition-colors">
                        <X className="w-3.5 h-3.5" />
                    </button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup;