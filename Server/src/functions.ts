export function removeComments(data: string): string {
    var ret: string = ""
    var lines = data.split('\n');

    // loops throught the lines
    for (var i = 0; i < lines.length; i++) {
        var comment = lines[i].search("//")

        // if there is a comment removes that part
        if (comment != -1) {
            ret += lines[i].substring(0, comment)
        }
        else {
            ret += lines[i]
        }

    }

    return ret
}