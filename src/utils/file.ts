import fs from "fs"

export const deletFile = async (fileName: string) => {
    try {
        await fs.promises.stat(fileName)
    } catch {
        return;
    }

    await fs.promises.unlink(fileName)
}