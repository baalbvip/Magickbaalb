import { exec } from "child_process"
import fs from "fs"

export function Magick(pathfile, callback = function (err, welcome) { }) {

    let command = {}
    let convert = {}
    let response = { magick: "", err: "" }

    const convertResponse = (response) => {
        const lines = response.split("\n");
        const objeto = {};

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line === "") continue;
            const [key, value] = line.split(":").map((s) => s.trim());
            objeto[key] = value;
        }

        return objeto;
    }


    const execute = async () => {

        let existsMagick = false
        let fileExists = false

        fileExists = fs.existsSync(pathfile)


        if (fileExists) {
            await new Promise((resolve, reject) => {
                exec("magick -version", (err, output) => {
                    if (output.indexOf("Copyright") >= 0) {
                        resolve(true)
                        existsMagick = true
                    } else {
                        reject(true)
                        response.magick = "You have not installed magick"
                        callback(response)
                    }
                })
            })
        } else {
            response.err = "The file not found"
            callback(response)
        }



        if (existsMagick && fileExists) {
            if (command.metadata) {

                await new Promise((resolve, reject) => {
                    exec(`magick identify -verbose ${pathfile}`, (err, output) => {
                        if (err) {
                            response.err = err
                        } else {
                        }
                        response.metadata = convertResponse(output)
                        callback(response)
                        resolve(true)
                    })
                })
            }

            if (command.convert) {
                await new Promise((resolve, reject) => {
                    exec(`magick convert  ${convert.resize !== undefined ? `-resize ${convert.resize}` : ''} ${convert.blur !== undefined ? `-blur ${convert.blur}` : ''} ${convert.quality !== undefined ? `-quality ${convert.quality}` : ''}  ${pathfile} ${convert.pathsave}`)
                    callback(response)
                })


            }
        }

    }

    const functions = {
        resize: (size) => {

            convert.resize = size
            return functions
        },

        metadata: () => {
            command.metadata = true
            execute()
            return functions
        },

        blur: (blur) => {
            convert.blur = blur
            return functions
        },

        quality: (quality) => {
            convert.quality = quality
            return functions
        },

        convert: (pathsave) => {
            command.convert = true;
            if (pathsave) {
                convert.pathsave = pathsave
                execute()
            } else {
                response.err = "!Error not found save path"
                callback(response)
            }
        }
    }


    return functions
}