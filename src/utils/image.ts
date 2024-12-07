import { supabase } from "@/lib/server/services/supabaseStore";

export const uploadImage = async (file: File) => {
    try {
        const imageName = `${Date.now()}_${file.name}`
        const { data: image, error: uploadError } = await supabase.storage.from("product_images").upload(imageName, file);
        if (uploadError) {
            throw uploadError;
        }
        if (image) {
            return image.path
        }
    } catch (error) {
        console.log(error);
    }
}

export const downloadImage = async (path: string) => {
    try{
        const { data: img} = await supabase.storage
            .from("product_images")
            .download(path);
        if (img) {
            return img
        }
    } catch (error) {
        console.log(error);
    }
}