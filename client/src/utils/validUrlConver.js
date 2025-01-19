export const validUrlConver = (name) => {
    const url=name.toString().replaceAll(" ", "-").replaceAll(",","-").replaceAll("&","-")
    return url
}