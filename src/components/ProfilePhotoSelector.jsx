import {useRef, useState} from "react";
import {Trash, Upload, User} from "lucide-react";

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    }

    return (
        <div className="flex justify-center mb-4">
            <input type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-purple-50 rounded-full relative ring-2 ring-purple-100 ring-offset-2">
                    <User className="text-purple-400" size={32} />

                    <button
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full absolute -bottom-1 -right-1 shadow-md hover:bg-purple-700 transition-colors">
                        <Upload size={14} />
                    </button>
                </div>
            ): (
                <div className="relative">
                    <img src={previewUrl} alt="profile photo" className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-100 ring-offset-2" />
                    <button
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 shadow-md hover:bg-red-600 transition-colors">
                        <Trash size={14}/>
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector;