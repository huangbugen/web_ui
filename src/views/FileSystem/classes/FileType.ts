import { getFileType } from "@/httpRequests/FileTypeRequest";
import { ref } from "vue";

export const fileTypes = ref((await getFileType()).data);
